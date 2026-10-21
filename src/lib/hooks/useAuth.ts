import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Check admin session first
      const adminSession = typeof window !== 'undefined' ? localStorage.getItem('admin_session') : null;
      if (adminSession) {
        setIsAdmin(true);
        setUser({ id: 'admin', email: 'admin@localhost' });
        setLoading(false);
        return;
      }

      // Check Supabase user
      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, isAdmin, loading, isAuthenticated: !!user };
}
