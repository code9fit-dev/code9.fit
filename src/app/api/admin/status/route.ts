export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Reports which server keys are configured (booleans only — never the values). */
export async function GET() {
  return Response.json({
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    lemonsqueezy: !!(
      process.env.LEMONSQUEEZY_API_KEY && process.env.LEMONSQUEEZY_STORE_ID
    ),
    lemonsqueezyWebhook: !!process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
    supabase: !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
  });
}
