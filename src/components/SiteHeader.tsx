'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { useState } from 'react';

export function SiteHeader() {
  const { user, isAdmin, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[9999] border-b border-line bg-white/80 backdrop-blur-sm px-6 py-4 w-full">
      <div className="mx-auto flex max-w-[720px] w-full items-center justify-between">
      <Link href="/" className="font-display text-xl font-bold tracking-wide hover:opacity-80">
        CODE<span className="text-accent">9</span> FITNESS
      </Link>
      <div className="flex items-center gap-3">
        {/* Navigation Dropdown */}
        <div className="relative z-[9999]">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-sm border border-line px-3 py-1.5 font-mono text-[11px] font-semibold text-ink hover:bg-panel transition-colors"
          >
            Menu ▼
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white border border-line rounded-sm shadow-lg z-[9999]">
              <Link
                href="/#coaches"
                className="block px-4 py-2.5 text-sm text-ink hover:bg-accent hover:text-white transition-colors border-b border-line last:border-b-0"
                onClick={() => setMenuOpen(false)}
              >
                Explore Coaches
              </Link>
              <Link
                href="/downloads"
                className="block px-4 py-2.5 text-sm text-ink hover:bg-accent hover:text-white transition-colors border-b border-line last:border-b-0"
                onClick={() => setMenuOpen(false)}
              >
                Resources
              </Link>
              <a
                href="/code9-pricing.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2.5 text-sm text-ink hover:bg-accent hover:text-white transition-colors border-b border-line last:border-b-0"
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </a>
              <Link
                href="/login"
                className="block px-4 py-2.5 text-sm text-ink hover:bg-accent hover:text-white transition-colors border-b border-line last:border-b-0"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
        <div className="rounded-sm border border-line px-2.5 py-1 font-mono text-[11px] text-ink-dim">
          v3.0
        </div>
        {!loading && (
          user ? (
            <Link
              href="/dashboard"
              className="rounded-sm border border-accent bg-accent px-3 py-1.5 font-mono text-[11px] font-semibold text-white hover:opacity-90"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-sm border border-accent bg-accent px-3 py-1.5 font-mono text-[11px] font-semibold text-white hover:opacity-90"
            >
              Login
            </Link>
          )
        )}
      </div>
      </div>
    </header>
  );
}
