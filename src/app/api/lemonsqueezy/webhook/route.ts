import crypto from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lemon Squeezy webhook — production source of truth for payment completion.
 * Verifies the X-Signature HMAC, then (in the auth+DB phase) persists the
 * unlocked tier to the user's account. Configure the endpoint + signing secret
 * in the Lemon Squeezy dashboard; locally forward with a tunnel (e.g. ngrok).
 */
export async function POST(req: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json(
      { error: "LEMONSQUEEZY_WEBHOOK_SECRET is not set." },
      { status: 501 },
    );
  }

  const raw = await req.text();
  const sig = req.headers.get("x-signature") ?? "";
  const expected = crypto
    .createHmac("sha256", secret)
    .update(raw)
    .digest("hex");

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(raw);
  const name = event?.meta?.event_name as string | undefined;
  const custom = event?.meta?.custom_data as
    | { coach_slug?: string; tier?: string }
    | undefined;

  if (name === "order_created" || name === "subscription_created") {
    // TODO(auth phase): persist tier unlock for custom.coach_slug / custom.tier
    // to the user's account. Lemon Squeezy handles document delivery itself.
    void custom;
  }

  return Response.json({ received: true });
}
