'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/primitives';

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

interface CoachingPreferencesFormProps {
  onComplete?: (preferences: PreferencesData) => void;
  showHeader?: boolean;
}

export function CoachingPreferencesForm({ onComplete, showHeader = true }: CoachingPreferencesFormProps) {
  const [htmlContent, setHtmlContent] = useState('');
  const [styles, setStyles] = useState('');

  useEffect(() => {
    fetch('/code9-coaching-preferences.html')
      .then((res) => res.text())
      .then((content) => {
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/);
        const bodyContent = bodyMatch ? bodyMatch[1] : content;

        const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
        const styleContent = styleMatch ? styleMatch[1] : '';

        setHtmlContent(bodyContent);
        setStyles(styleContent);

        // Set up callback for preferences submission
        if (onComplete) {
          (window as any).onPreferencesAccepted = (preferences: PreferencesData) => {
            onComplete(preferences);
          };
        }
      })
      .catch((error) => console.error('Error loading preferences:', error));
  }, [onComplete]);

  return (
    <>
      {showHeader && (
        <section style={{ borderBottom: '1px solid var(--line)', paddingBottom: '24px', paddingTop: '24px' }}>
          <Container>
            <div className="flex gap-6 items-start">
              <Image
                src="/code9-logo-dark.svg"
                alt="Code9 Fitness"
                width={56}
                height={56}
                className="flex-shrink-0"
                style={{ height: '56px', width: 'auto' }}
              />
              <div className="max-w-2xl">
                <h1 className="font-display text-[32px] font-semibold mb-2" style={{ color: 'var(--ink)' }}>
                  Coaching Preferences
                </h1>
                <p style={{ color: 'var(--ink-dim)' }}>
                  GDPR compliance and customizing your coaching experience
                </p>
              </div>
            </div>
          </Container>
        </section>
      )}

      <section>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </section>
    </>
  );
}
