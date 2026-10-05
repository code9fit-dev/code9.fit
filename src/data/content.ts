// Misc structured landing copy: how-it-works steps, trust pillars,
// and the comparison table.

export interface Step {
  n: number;
  title: string;
  desc: string;
}

export const steps: Step[] = [
  {
    n: 1,
    title: "Tell us your goal",
    desc: "We route you to the right specialist — or a pair, if your goal spans two.",
  },
  {
    n: 2,
    title: "Confirm your data",
    desc: "Age, stats, experience, equipment. Your coach reads it back before building anything.",
  },
  {
    n: 3,
    title: "Get your system",
    desc: "A structured plan, not a generic template — matched to your tier and your goal.",
  },
  {
    n: 4,
    title: "Adjust as you go",
    desc: "Subscription tiers adapt weekly. Premium adds a real coach reviewing every change.",
  },
];

export interface TrustPillar {
  mark: string;
  title: string;
  body: string;
}

export const trustPillars: TrustPillar[] = [
  {
    mark: "01",
    title: "Lived experience, not a data scrape",
    body: "The training and nutrition principles behind every C9F coach come from a lifetime of competing in high-level sport and training seriously — not scraped from generic fitness content. The AI layer applies that real methodology consistently, at scale.",
  },
  {
    mark: "02",
    title: "Proven programs, not a first draft",
    body: "The One-Time and Subscription programming is built from ImpactShredz — an already-developed catalogue of structured 9-week training programs and wellness content, refined before it ever became C9F.",
  },
  {
    mark: "03",
    title: "Safety isn't an afterthought",
    body: "C9F is one of the only AI coaching systems with a dedicated safety-escalation layer — pain and injury signals route to human review by default, not left for a chatbot to guess at.",
  },
];

export interface CompareRow {
  feature: string;
  chatbots: string;
  logging: string;
  c9f: string;
}

export const compareColumns = ["Generic AI chatbots", "Logging apps", "C9F"];

export const compareRows: CompareRow[] = [
  {
    feature: "Specialist-trained coaching",
    chatbots: "Generic",
    logging: "None — logging only",
    c9f: "9 dedicated specialists",
  },
  {
    feature: "Remembers your history across coaches",
    chatbots: "No memory system",
    logging: "Tracks, doesn't coach",
    c9f: "Shared client history",
  },
  {
    feature: "Adapts your plan over time",
    chatbots: "Only if re-prompted",
    logging: "Manual only",
    c9f: "Automatic, tier-based",
  },
  {
    feature: "Injury/safety escalation",
    chatbots: "None",
    logging: "None",
    c9f: "Built-in, human-reviewed",
  },
  {
    feature: "Real human oversight available",
    chatbots: "No",
    logging: "No",
    c9f: "Premium tier",
  },
];
