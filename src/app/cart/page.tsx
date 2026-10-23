'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/primitives';
import { PageBranding } from '@/components/PageBranding';
import { getCart, removeFromCart, type CartItem } from '@/lib/cart-store';
import { getProgram } from '@/data/workout-library';
import { getCoachBySlug } from '@/data/coaches';
import { PAYMENT_TIERS, formatPrice } from '@/lib/payments/tiers';
import type { Tier } from '@/data/coaches';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tier, setTier] = useState<Tier>('Subscription');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cartData = getCart();
    setCart(cartData.items);
    setLoading(false);
  }, []);

  const getItemDetails = (item: CartItem) => {
    if (item.type === 'program') {
      const program = getProgram(item.slug) as any;
      return {
        title: program?.meta.title || item.name,
        description: program?.focus || 'Training Program',
      };
    } else {
      const coach = getCoachBySlug(item.slug);
      return {
        title: coach?.name || item.name,
        description: 'Coach Access',
      };
    }
  };

  const handleRemove = (type: 'program' | 'coach', slug: string) => {
    removeFromCart(type, slug);
    setCart(cart.filter(i => !(i.type === type && i.slug === slug)));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setBusy(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          items: cart,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setError(data.error ?? 'Could not start checkout.');
    } catch (err) {
      setError('Network error starting checkout.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
        <Container className="py-16 text-center">
          <p style={{ color: 'var(--ink-dim)' }}>Loading cart...</p>
        </Container>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="flex-1 relative z-10">
        <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '24px', paddingTop: '24px', background: 'var(--surface)' }}>
          <Container>
            <PageBranding variant="light" centered={true} />
          </Container>
        </section>

        <section style={{ paddingBottom: '48px', paddingTop: '48px' }}>
          <Container>
            <div className="max-w-2xl text-center">
              <h1 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--ink)' }}>
                Your cart is empty
              </h1>
              <p className="mb-8" style={{ color: 'var(--ink-dim)' }}>
                Browse our programs and coaches to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/library"
                  className="px-6 py-3 rounded font-semibold text-sm"
                  style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
                >
                  Browse Programs
                </Link>
                <Link
                  href="/#coaches"
                  className="px-6 py-3 rounded font-semibold text-sm"
                  style={{ background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--line)' }}
                >
                  Browse Coaches
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1 relative z-10">
      <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '24px', paddingTop: '24px', background: 'var(--surface)' }}>
        <Container>
          <PageBranding variant="light" centered={true} />
        </Container>
      </section>

      <section style={{ paddingBottom: '48px', paddingTop: '48px' }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h1 className="font-display text-2xl font-semibold mb-8" style={{ color: 'var(--ink)' }}>
                Your Cart ({cart.length})
              </h1>

              <div className="space-y-4">
                {cart.map((item) => {
                  const details = getItemDetails(item);
                  return (
                    <div
                      key={`${item.type}-${item.slug}`}
                      className="rounded-lg border p-6"
                      style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-semibold px-2 py-1 rounded" style={{ background: 'var(--surface)', color: 'var(--ink-dim)' }}>
                              {item.type === 'program' ? 'Program' : 'Coach'}
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg" style={{ color: 'var(--ink)' }}>
                            {details.title}
                          </h3>
                          <p style={{ color: 'var(--ink-dim)', marginTop: '4px' }}>
                            {details.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(item.type, item.slug)}
                          className="text-sm font-semibold"
                          style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tier Selection & Summary */}
            <div>
              <div className="rounded-lg border sticky top-24 p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
                <h2 className="font-semibold mb-6" style={{ color: 'var(--ink)' }}>
                  Select Membership
                </h2>

                <div className="space-y-3 mb-8">
                  {(Object.keys(PAYMENT_TIERS) as Tier[]).map((t) => {
                    const cfg = PAYMENT_TIERS[t];
                    if (!cfg) return null;
                    const isSelected = tier === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setTier(t)}
                        className="w-full p-4 text-left rounded-lg border transition-all"
                        style={{
                          borderColor: isSelected ? 'var(--accent)' : 'var(--line)',
                          background: isSelected ? 'var(--surface)' : 'transparent',
                          opacity: isSelected ? 1 : 0.7,
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold" style={{ color: 'var(--ink)' }}>
                            {t}
                          </p>
                          <p style={{ color: 'var(--accent)' }} className="font-semibold">
                            {formatPrice(cfg)}
                          </p>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--ink-dim)' }}>
                          {cfg.blurb}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded text-sm" style={{ background: '#fee', color: '#d32f2f' }}>
                    {error}
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={busy || cart.length === 0}
                  className="w-full py-3 rounded font-semibold text-sm transition-all disabled:opacity-40"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--on-accent)',
                    border: 'none',
                    cursor: busy ? 'wait' : 'pointer',
                  }}
                >
                  {busy ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                <p className="text-xs mt-4 text-center" style={{ color: 'var(--ink-dim)' }}>
                  Secure checkout by Lemon Squeezy
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
