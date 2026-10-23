'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CoachingPreferencesForm } from '@/components/CoachingPreferencesForm';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

interface PreferencesData {
  trainingData: boolean;
  healthData: boolean;
  analytics: boolean;
  emailEssential: boolean;
  emailWeekly: boolean;
  emailProgress: boolean;
  emailMarketing: boolean;
  coachFullAccess: boolean;
  profileVisibility: boolean;
  researchParticipation: boolean;
  privacyAgreed: boolean;
  dataProcessingConsent: boolean;
}

export default function PreferencesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = getSupabaseBrowserClient();

  const handlePreferencesComplete = async (preferences: PreferencesData) => {
    try {
      // Save preferences to user profile or preferences table
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Save preferences to database (you'll need to create this table)
        await supabase.from('user_preferences').upsert({
          user_id: user.id,
          training_data: preferences.trainingData,
          health_data: preferences.healthData,
          analytics: preferences.analytics,
          email_essential: preferences.emailEssential,
          email_weekly: preferences.emailWeekly,
          email_progress: preferences.emailProgress,
          email_marketing: preferences.emailMarketing,
          coach_full_access: preferences.coachFullAccess,
          profile_visibility: preferences.profileVisibility,
          research_participation: preferences.researchParticipation,
          privacy_agreed: preferences.privacyAgreed,
          data_processing_consent: preferences.dataProcessingConsent,
          updated_at: new Date().toISOString(),
        });

        // Redirect based on flow (from onboarding or from settings)
        const redirectTo = searchParams.get('redirect') || '/dashboard';
        router.push(redirectTo);
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      // Even if there's an error, redirect - preferences can be updated later
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(redirectTo);
    }
  };

  return (
    <main className="flex-1 relative z-10">
      <CoachingPreferencesForm
        onComplete={handlePreferencesComplete}
        showHeader={true}
      />
    </main>
  );
}
