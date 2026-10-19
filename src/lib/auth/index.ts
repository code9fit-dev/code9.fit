// Auth context and hooks
export {
  AuthProvider,
  useAuth,
  useUser,
  useUserTier,
  useUserCoaches,
  usePackageAccess,
} from './context';

// Auth types
export type { AuthContextType, Coach, UserProfile } from './types';

// Tier management
export {
  initializeUserTier,
  getUserTier,
  getUserCoaches,
  hasAccessToCoach,
  assignCoachToUser,
  upgradeUserTier,
} from './tier';
