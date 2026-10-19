import { User } from '@supabase/supabase-js';

export interface Coach {
  id: string;
  slug: string;
  name: string;
  tier: string;
  unlockedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  role: 'client' | 'human_coach' | 'admin';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  tier: string | null;
  coaches: Coach[];
  hasAccessTo: (programId: string) => Promise<boolean>;
  refetchUserData: () => Promise<void>;
  signOut: () => Promise<void>;
}
