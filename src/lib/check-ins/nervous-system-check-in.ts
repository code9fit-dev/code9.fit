/**
 * Nervous System Coach Check-In Flow Integration
 * Specialized check-in questions and tracking for nervous system coaching
 * Server-only: never import into client components
 */

import type { NervousSystemCheckIn } from './types';

/**
 * Check-in questions specific to Nervous System Coach
 * Each tier gets progressively more sophisticated tracking
 */
export const NERVOUS_SYSTEM_CHECK_IN_QUESTIONS = {
  free: [
    {
      id: 'awareness',
      question: 'How aware were you of your nervous system state this week?',
      type: 'scale',
      scale: { min: 1, max: 10, labels: { 1: 'Not at all', 10: 'Very aware' } },
      required: true,
    },
    {
      id: 'sleep',
      question: 'How many hours of sleep did you get on average?',
      type: 'number',
      required: false,
    },
  ],

  subscription: [
    {
      id: 'awareness',
      question: 'On a scale of 1-10, how aware are you of your nervous system state right now?',
      type: 'scale',
      scale: { min: 1, max: 10, labels: { 1: 'Not aware', 10: 'Very aware' } },
      required: true,
    },
    {
      id: 'techniques_tried',
      question: 'Which techniques did you try this week?',
      type: 'checkboxes',
      options: [
        'Slow breathing',
        'Body scan',
        'Grounding exercise',
        'Gentle movement',
        'Cold water/ice',
        'Other',
      ],
      required: false,
    },
    {
      id: 'techniques_helpful',
      question: 'Which of those actually helped?',
      type: 'text',
      placeholder: 'e.g., "slow breathing before squats" or "body scan in the morning"',
      required: false,
    },
    {
      id: 'stress_level',
      question: 'Overall stress level this week (life + training)?',
      type: 'scale',
      scale: { min: 1, max: 10, labels: { 1: 'Low', 10: 'High' } },
      required: false,
    },
    {
      id: 'sleep',
      question: 'Average hours of sleep per night?',
      type: 'number',
      required: false,
    },
    {
      id: 'patterns',
      question: 'Have you noticed any patterns in how you feel?',
      type: 'text',
      placeholder: 'e.g., "Always tense before heavy lifts" or "Better when I sleep well"',
      required: false,
    },
    {
      id: 'confidence',
      question: 'How confident do you feel using these techniques?',
      type: 'scale',
      scale: { min: 1, max: 10, labels: { 1: 'Not confident', 10: 'Very confident' } },
      required: false,
    },
  ],

  premium: [
    // All subscription questions, plus:
    {
      id: 'training_integration',
      question: 'How did nervous system awareness affect your training this week?',
      type: 'text',
      placeholder: 'e.g., "Scaled back intensity because I noticed high arousal" or "Stayed consistent because I felt regulated"',
      required: false,
    },
    {
      id: 'life_stress',
      question: 'What major stressors did you experience outside the gym?',
      type: 'text',
      placeholder: 'Work, relationships, health, etc.',
      required: false,
    },
    {
      id: 'insights',
      question: 'Any breakthroughs or realizations this week?',
      type: 'text',
      placeholder: 'Anything about yourself or your patterns you learned?',
      required: false,
    },
  ],
};

/**
 * Process incoming check-in data and create NervousSystemCheckIn record
 */
export function processNervousSystemCheckIn(
  responses: Record<string, any>,
): NervousSystemCheckIn {
  return {
    awareness_score: responses.awareness,
    techniques_tried: Array.isArray(responses.techniques_tried)
      ? responses.techniques_tried
      : responses.techniques_tried?.split(',').map((t: string) => t.trim()),
    techniques_helpful: responses.techniques_helpful ? [responses.techniques_helpful] : [],
    stress_level: responses.stress_level,
    sleep_hours: responses.sleep,
    noticed_patterns: responses.patterns,
    regulation_confidence: responses.confidence,
  };
}

/**
 * Generate coach insights from nervous system check-in data
 * Used to inform the coach's follow-up messages
 */
export function generateNervousSystemInsights(
  checkIn: NervousSystemCheckIn,
  previousCheckIns?: NervousSystemCheckIn[],
): string[] {
  const insights: string[] = [];

  // Awareness trend
  if (checkIn.awareness_score) {
    if (previousCheckIns?.length) {
      const prevAvg =
        previousCheckIns.reduce((sum, ci) => sum + (ci.awareness_score || 0), 0) /
        previousCheckIns.length;
      if (checkIn.awareness_score > prevAvg) {
        insights.push(`awareness_improving`);
      } else if (checkIn.awareness_score < prevAvg - 2) {
        insights.push(`awareness_declining`);
      }
    }
  }

  // Sleep connection
  if (checkIn.sleep_hours && checkIn.sleep_hours < 6) {
    insights.push(`poor_sleep_alert`);
  }

  // Technique effectiveness
  if (checkIn.techniques_tried?.length && checkIn.techniques_helpful?.length) {
    const effectiveness =
      checkIn.techniques_helpful.length / checkIn.techniques_tried.length;
    if (effectiveness < 0.5) {
      insights.push(`low_technique_effectiveness`);
    } else if (effectiveness > 0.7) {
      insights.push(`high_technique_effectiveness`);
    }
  }

  // Confidence trajectory
  if (
    checkIn.regulation_confidence &&
    previousCheckIns?.length &&
    previousCheckIns[0].regulation_confidence
  ) {
    if (checkIn.regulation_confidence > previousCheckIns[0].regulation_confidence) {
      insights.push(`confidence_building`);
    }
  }

  // Stress level alert
  if (checkIn.stress_level && checkIn.stress_level > 8) {
    insights.push(`high_stress_period`);
  }

  return insights;
}

/**
 * Suggested coach follow-up based on check-in data
 */
export const NERVOUS_SYSTEM_FOLLOW_UP_TEMPLATES = {
  poor_sleep_alert: `
I noticed your sleep has been under 6 hours. That's going to make everything harder — your nervous system can't recover well on that little sleep. This week, let's prioritize one solid sleep habit. What's the biggest sleep barrier you're facing?
  `,

  awareness_improving: `
Your awareness score is climbing — that's the foundation. You're getting better at noticing your patterns. What's one thing you noticed about yourself this week that you didn't before?
  `,

  awareness_declining: `
Awareness dipped a bit this week. That happens when life gets hectic or stress spikes. No judgment. Let's recalibrate: what was different this week? More stress? Less sleep? Different training?
  `,

  high_technique_effectiveness: `
The techniques you're trying are actually working for you. That's huge. Double down on what's working — you're building a toolkit that your body responds to.
  `,

  low_technique_effectiveness: `
The techniques haven't clicked yet. That's not a failure — it means we need to find what resonates with YOU. Let's try something different this week. Which one felt closest to working?
  `,

  confidence_building: `
Your confidence in using these tools is growing. That's the real win. As you trust yourself more, the techniques become more effective. Keep going.
  `,

  high_stress_period: `
You're in a high-stress window. This is exactly when nervous system awareness matters most. What do you need most right now — more recovery? Simpler training? Just acknowledgment that it's hard?
  `,
};

/**
 * Integration with coaching flow
 * Coach can reference this data in check-in responses
 */
export function formatNervousSystemSummary(checkIn: NervousSystemCheckIn): string {
  const parts = [];

  if (checkIn.awareness_score) {
    parts.push(`Awareness: ${checkIn.awareness_score}/10`);
  }

  if (checkIn.techniques_tried?.length) {
    parts.push(`Tried: ${checkIn.techniques_tried.join(', ')}`);
  }

  if (checkIn.techniques_helpful?.length) {
    parts.push(`Helped: ${checkIn.techniques_helpful.join(', ')}`);
  }

  if (checkIn.stress_level) {
    parts.push(`Stress: ${checkIn.stress_level}/10`);
  }

  if (checkIn.sleep_hours) {
    parts.push(`Sleep: ${checkIn.sleep_hours}h/night`);
  }

  if (checkIn.regulation_confidence) {
    parts.push(`Confidence: ${checkIn.regulation_confidence}/10`);
  }

  return parts.join(' • ');
}
