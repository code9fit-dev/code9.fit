import { getCoachBySlug, type Tier } from "@/data/coaches";
import { PAYMENT_TIERS, variantIdFor } from "@/lib/payments/tiers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LS_API = "https://api.lemonsqueezy.com/v1/checkouts";

/**
 * Creates a Lemon Squeezy hosted checkout (Merchant of Record — handles VAT/tax;
 * architecture §2.10 / LOCKED #4). Lemon Squeezy also fulfils file delivery for
 * standalone documents, so there's no separate delivery step.
 */
export async function POST(req: Request) {
  const { coachSlug, tier } = (await req.json()) as {
    coachSlug?: string;
    tier?: Tier;
  };

  const coach = coachSlug ? getCoachBySlug(coachSlug) : undefined;
  const cfg = tier ? PAYMENT_TIERS[tier] : undefined;
  if (!coach || !tier || !cfg) {
    return Response.json(
      { error: "Unknown coach or tier, or tier is not purchasable." },
      { status: 400 },
    );
  }
  if (!coach.tiers.includes(tier)) {
    return Response.json(
      { error: `${coach.name} isn't available on the ${tier} tier.` },
      { status: 403 },
    );
  }

  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const variantId = variantIdFor(tier);
  if (!apiKey || !storeId || !variantId) {
    return Response.json(
      {
        error:
          "Lemon Squeezy isn't configured. Set LEMONSQUEEZY_API_KEY, LEMONSQUEEZY_STORE_ID, and the tier's variant id (e.g. LEMONSQUEEZY_VARIANT_SUBSCRIPTION) in c9f-web/.env.local.",
      },
      { status: 501 },
    );
  }

  const origin = req.headers.get("origin") ?? new URL(req.url).origin;
  const redirectUrl = `${origin}/checkout/success?coach=${coachSlug}&tier=${encodeURIComponent(
    tier,
  )}`;

  try {
    const res = await fetch(LS_API, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: { coach_slug: coachSlug, tier },
            },
            product_options: { redirect_url: redirectUrl },
            checkout_options: { embed: false },
          },
          relationships: {
            store: { data: { type: "stores", id: String(storeId) } },
            variant: { data: { type: "variants", id: String(variantId) } },
          },
        },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      const detail = data?.errors?.[0]?.detail ?? "Lemon Squeezy rejected the checkout.";
      return Response.json({ error: detail }, { status: 502 });
    }

    const url = data?.data?.attributes?.url;
    if (!url) {
      return Response.json(
        { error: "Lemon Squeezy did not return a checkout URL." },
        { status: 502 },
      );
    }
    return Response.json({ url });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Failed to create checkout." },
      { status: 502 },
    );
  }
}
