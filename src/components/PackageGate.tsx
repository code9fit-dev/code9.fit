'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { canAccessPackage } from '@/lib/packages/access';

interface PackageGateProps {
  packageId: string;
  children: React.ReactNode;
}

export function PackageGate({ packageId, children }: PackageGateProps) {
  const supabase = getSupabaseBrowserClient();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAccess = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      try {
        const access = await canAccessPackage(supabase, user.id, packageId);
        setHasAccess(access);
      } catch (error) {
        console.error('Failed to check access:', error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [supabase, packageId]);

  // Track scroll position for progressive blur
  useEffect(() => {
    if (hasAccess) return; // No need to track if user has access

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAccess]);

  if (loading) {
    return <div className="text-stone-600">Loading...</div>;
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  // Calculate blur amount based on scroll position
  // Top 1/4 (0-25% of container) = no blur
  // Bottom 3/4 = progressive blur up to 8px
  const containerTop = containerRef.current?.getBoundingClientRect().top ?? 0;
  const containerHeight = containerRef.current?.scrollHeight ?? 1000;
  const visibleStart = Math.max(0, -containerTop);
  const scrollPercent = Math.min(1, Math.max(0, visibleStart / containerHeight));

  // Blur starts after 9% of content
  const blurStartPercent = 0.09;
  const blurIntensity = Math.max(0, (scrollPercent - blurStartPercent) / (1 - blurStartPercent)) * 88;

  // Progressive mask: top 9% visible, then gradient blur
  const maskPosition = 9 + scrollPercent * 50; // Moves from 9% to ~59% as user scrolls

  return (
    <div ref={containerRef} className="relative">
      {/* Content with dynamic blur */}
      <div
        style={{
          WebkitMaskImage: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) ${maskPosition}%,
            rgba(0, 0, 0, 0) ${maskPosition + 30}%
          )`,
          maskImage: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) ${maskPosition}%,
            rgba(0, 0, 0, 0) ${maskPosition + 30}%
          )`,
          filter: `blur(${blurIntensity}px)`,
          transition: 'filter 0.1s ease-out',
        }}
      >
        {children}
      </div>

      {/* Sign-in prompt at bottom */}
      {scrollPercent > 0.15 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          <style>{`
            @keyframes slideUp {
              from {
                transform: translateY(100%);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}</style>
          <div className="flex flex-col items-center gap-4">
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-stone-900">Unlock full program details</p>
              <p className="text-xs text-stone-600">
                Sign in to see if your tier includes this package, or ask your coach about access.
              </p>
            </div>
            <Link
              href="/login"
              className="rounded bg-accent px-6 py-2 font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
