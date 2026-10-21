'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { isUserAdmin } from '@/lib/admin/access';

interface StartNowButtonProps {
  programId: string;
  programSlug: string;
  isPurchasable?: boolean;
}

export function StartNowButton({ programId, programSlug, isPurchasable = false }: StartNowButtonProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const adminStatus = await isUserAdmin(supabase, user.id);
        setIsAdmin(adminStatus);
      }

      setLoading(false);
    };

    checkUser();
  }, [supabase]);

  const handleClick = () => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Admins always go to coach selection (bypass checkout)
    if (isAdmin || !isPurchasable) {
      router.push(`/coach/select?program=${programSlug}`);
    } else {
      router.push(`/checkout?program=${programSlug}`);
    }
  };

  if (loading) {
    return (
      <button
        disabled
        style={{
          padding: '12px 24px',
          backgroundColor: '#2D5F4F',
          color: '#F5F1EA',
          border: 'none',
          borderRadius: '4px',
          fontWeight: '700',
          fontSize: '14px',
          cursor: 'not-allowed',
          opacity: 0.6,
          fontFamily: 'inherit',
        }}
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '12px 24px',
        backgroundColor: '#2D5F4F',
        color: '#F5F1EA',
        border: 'none',
        borderRadius: '4px',
        fontWeight: '700',
        fontSize: '14px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background-color 0.2s ease',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#1B4D3E';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#2D5F4F';
      }}
    >
      START NOW
    </button>
  );
}
