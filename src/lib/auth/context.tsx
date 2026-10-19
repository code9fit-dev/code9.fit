'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { User } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { canAccessPackage } from '@/lib/packages/access';
import { getUserCoaches, getUserTier } from '@/lib/auth/tier';
import type { AuthContextType, Coach, UserProfile } from '@/lib/auth/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = getSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tier, setTier] = useState<string | null>(null);
  const [coaches, setCoaches] = useState<Coach[]>([]);

  /**
   * Fetch user profile from Supabase
   */
  const fetchProfile = useCallback(
    async (userId: string) => {
      if (!supabase) return null;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, email, display_name, role, created_at')
          .eq('id', userId)
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Failed to fetch profile:', error);
          return null;
        }

        if (data) {
          const profileData: UserProfile = {
            id: data.id,
            email: data.email,
            displayName: data.display_name,
            role: data.role,
            createdAt: data.created_at,
          };
          setProfile(profileData);
          return profileData;
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }

      return null;
    },
    [supabase]
  );

  /**
   * Refresh user data (profile, tier, coaches)
   */
  const refetchUserData = useCallback(async () => {
    if (!supabase || !user) return;

    try {
      // Fetch profile
      await fetchProfile(user.id);

      // Fetch tier
      const userTier = await getUserTier(supabase, user.id);
      setTier(userTier);

      // Fetch coaches
      const userCoaches = await getUserCoaches(supabase, user.id);
      setCoaches(userCoaches);
    } catch (error) {
      console.error('Error refetching user data:', error);
    }
  }, [supabase, user, fetchProfile]);

  /**
   * Check if user has access to a specific package
   */
  const hasAccessTo = useCallback(
    async (packageId: string): Promise<boolean> => {
      if (!supabase || !user) return false;
      return canAccessPackage(supabase, user.id, packageId);
    },
    [supabase, user]
  );

  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    const initAuth = async () => {
      try {
        // Get current session
        const {
          data: { user: currentUser },
          error: getUserError,
        } = await supabase.auth.getUser();

        if (getUserError) {
          console.error('Failed to get user:', getUserError);
          setUser(null);
          setProfile(null);
          setTier(null);
          setCoaches([]);
          setIsLoading(false);
          return;
        }

        if (currentUser) {
          setUser(currentUser);
          await fetchProfile(currentUser.id);
          const userTier = await getUserTier(supabase, currentUser.id);
          setTier(userTier);
          const userCoaches = await getUserCoaches(supabase, currentUser.id);
          setCoaches(userCoaches);
        } else {
          setUser(null);
          setProfile(null);
          setTier(null);
          setCoaches([]);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
        const userTier = await getUserTier(supabase, session.user.id);
        setTier(userTier);
        const userCoaches = await getUserCoaches(supabase, session.user.id);
        setCoaches(userCoaches);
      } else {
        setUser(null);
        setProfile(null);
        setTier(null);
        setCoaches([]);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase, fetchProfile]);

  /**
   * Sign out user
   */
  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setTier(null);
    setCoaches([]);
  }, [supabase]);

  const value: AuthContextType = {
    user,
    profile,
    isLoading,
    tier,
    coaches,
    hasAccessTo,
    refetchUserData,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Hook to get current user
 */
export function useUser() {
  const { user, isLoading } = useAuth();
  return { user, isLoading };
}

/**
 * Hook to get user tier
 */
export function useUserTier() {
  const { tier, isLoading } = useAuth();
  return { tier, isLoading };
}

/**
 * Hook to get user coaches
 */
export function useUserCoaches() {
  const { coaches, isLoading } = useAuth();
  return { coaches, isLoading };
}

/**
 * Hook to check if user has access to a package
 */
export function usePackageAccess(packageId: string) {
  const { hasAccessTo, isLoading: authLoading } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const access = await hasAccessTo(packageId);
        setHasAccess(access);
      } catch (error) {
        console.error('Error checking package access:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      checkAccess();
    }
  }, [hasAccessTo, packageId, authLoading]);

  return { hasAccess, isLoading: isLoading || authLoading };
}
