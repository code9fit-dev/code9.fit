import type { Book, BookInsight } from './types';

export const BOOKS: Omit<Book, 'id' | 'created_at'>[] = [
  // ─── Habits & Behavior Change ───────────────────────────────────────
  {
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'habits',
    source: 'healthynexercise.com',
    use_case: 'Build consistent training habits and break unhelpful patterns',
    description: 'The modern classic on building good habits and breaking bad ones',
    key_concepts: ['habit-stacking', 'tiny-changes', 'systems', 'identity'],
    coach_persona_tags: ['lifestyle-recovery-coach', 'muscle-gain-strategist'],
    published_year: 2018,
  },
  {
    slug: 'tiny-habits',
    title: 'Tiny Habits',
    author: 'BJ Fogg',
    category: 'habits',
    source: 'healthynexercise.com',
    use_case: 'For clients struggling with motivation; behavior-design approach',
    description: 'A Stanford researcher\'s behavior-design approach for those struggling with willpower',
    key_concepts: ['motivation', 'behavior-design', 'small-changes', 'anchor'],
    coach_persona_tags: ['lifestyle-recovery-coach'],
    published_year: 2019,
  },

  // ─── Nutrition & Diet ───────────────────────────────────────────────
  {
    slug: 'spoon-fed',
    title: 'Spoon-Fed',
    author: 'Tim Spector',
    category: 'nutrition',
    source: 'healthynexercise.com',
    use_case: 'Debunk nutrition myths with science-backed evidence',
    description: 'Debunks widespread nutritional myths using scientific evidence',
    key_concepts: ['nutrition-science', 'myth-debunking', 'microbiome', 'ultra-processing'],
    coach_persona_tags: ['nutrition-optimizer', 'fat-loss-strategist'],
    published_year: 2022,
  },
  {
    slug: 'how-not-to-die',
    title: 'How Not to Die',
    author: 'Michael Greger',
    category: 'nutrition',
    source: 'healthynexercise.com',
    use_case: 'Learn about food as medicine and disease prevention',
    description: 'Evidence-based exploration of food\'s role in disease prevention',
    key_concepts: ['food-medicine', 'disease-prevention', 'longevity', 'plant-based'],
    coach_persona_tags: ['nutrition-optimizer', 'longevity-optimizer'],
    published_year: 2015,
  },
  {
    slug: 'in-defense-of-food',
    title: 'In Defense of Food',
    author: 'Michael Pollan',
    category: 'nutrition',
    source: 'healthynexercise.com',
    use_case: 'For clients considering lifestyle changes like veganism or whole-foods eating',
    description: 'Famous for the principle: "Eat food. Not too much. Mostly plants."',
    key_concepts: ['whole-foods', 'minimalism', 'ancestral-diet', 'food-culture'],
    coach_persona_tags: ['nutrition-optimizer', 'fat-loss-strategist'],
    published_year: 2009,
  },

  // ─── Strength, Training & Movement ──────────────────────────────────
  {
    slug: 'bigger-leaner-stronger',
    title: 'Bigger Leaner Stronger',
    author: 'Michael Matthews',
    category: 'training',
    source: 'healthynexercise.com',
    use_case: 'Evidence-based strength training guide for male clients',
    description: 'Evidence-based strength training guide for men',
    key_concepts: ['strength-training', 'hypertrophy', 'progressive-overload', 'nutrition-periodization'],
    coach_persona_tags: ['muscle-gain-strategist', 'strength-coach'],
    published_year: 2012,
  },
  {
    slug: 'becoming-supple-leopard',
    title: 'Becoming a Supple Leopard',
    author: 'Kelly Starrett',
    category: 'training',
    source: 'healthynexercise.com',
    use_case: 'For improving mobility and preventing injuries',
    description: 'Comprehensive mobility and movement mechanics manual',
    key_concepts: ['mobility', 'movement-quality', 'injury-prevention', 'joint-health'],
    coach_persona_tags: ['injury-prevention-coach', 'strength-coach'],
    published_year: 2013,
  },
  {
    slug: 'born-to-run',
    title: 'Born to Run',
    author: 'Christopher McDougall',
    category: 'training',
    source: 'healthynexercise.com',
    use_case: 'Running form principles and endurance mindset',
    description: 'Adventure narrative combined with running-form principles',
    key_concepts: ['running-form', 'endurance', 'injury-prevention', 'mindset'],
    coach_persona_tags: ['endurance-coach'],
    published_year: 2009,
  },

  // ─── Sleep & Recovery ───────────────────────────────────────────────
  {
    slug: 'why-we-sleep',
    title: 'Why We Sleep',
    author: 'Matthew Walker',
    category: 'sleep',
    source: 'healthynexercise.com',
    use_case: 'For clients not getting 8 hours; understanding sleep importance',
    description: 'Influential examination of sleep\'s importance to health',
    key_concepts: ['sleep-architecture', 'circadian-rhythm', 'REM', 'cognitive-recovery'],
    coach_persona_tags: ['lifestyle-recovery-coach', 'longevity-optimizer'],
    published_year: 2017,
  },
  {
    slug: 'the-sleep-solution',
    title: 'The Sleep Solution',
    author: 'W. Chris Winter',
    category: 'sleep',
    source: 'healthynexercise.com',
    use_case: 'Practical, clinician-backed sleep improvement strategies',
    description: 'Practical clinician\'s approach to improving sleep quality',
    key_concepts: ['sleep-hygiene', 'sleep-disorders', 'cognitive-behavioral-sleep-therapy'],
    coach_persona_tags: ['lifestyle-recovery-coach'],
    published_year: 2018,
  },
  {
    slug: 'rest',
    title: 'Rest',
    author: 'Alex Soojung-Kim Pang',
    category: 'sleep',
    source: 'healthynexercise.com',
    use_case: 'Deliberate rest as recovery strategy; pushback on hustle culture',
    description: 'Argues deliberate rest produces greater health and performance',
    key_concepts: ['deliberate-rest', 'recovery', 'productivity', 'restoration'],
    coach_persona_tags: ['lifestyle-recovery-coach'],
    published_year: 2016,
  },

  // ─── Longevity & Whole-Body Health ────────────────────────────────
  {
    slug: 'outlive',
    title: 'Outlive',
    author: 'Peter Attia',
    category: 'longevity',
    source: 'Forbes Wellness List',
    use_case: 'Comprehensive longevity strategy: exercise, nutrition, prevention',
    description: 'Comprehensive guide to longevity through exercise, nutrition, and prevention',
    key_concepts: ['longevity', 'exercise-medicine', 'prevention', 'biomarkers'],
    coach_persona_tags: ['longevity-optimizer', 'nutrition-optimizer'],
    published_year: 2023,
  },
  {
    slug: 'lifespan',
    title: 'Lifespan',
    author: 'David Sinclair',
    category: 'longevity',
    source: 'healthynexercise.com',
    use_case: 'Understanding aging biology and interventions',
    description: 'Harvard researcher\'s perspective on aging biology',
    key_concepts: ['aging-biology', 'cellular-health', 'epigenetics', 'interventions'],
    coach_persona_tags: ['longevity-optimizer'],
    published_year: 2019,
  },
  {
    slug: 'the-blue-zones',
    title: 'The Blue Zones',
    author: 'Dan Buettner',
    category: 'longevity',
    source: 'healthynexercise.com',
    use_case: 'Learn practices of the world\'s longest-lived communities',
    description: 'Daily practices of the world\'s longest-lived communities',
    key_concepts: ['longevity-communities', 'lifestyle-practices', 'cultural-wisdom'],
    coach_persona_tags: ['longevity-optimizer', 'lifestyle-recovery-coach'],
    published_year: 2008,
  },
  {
    slug: 'breath',
    title: 'Breath',
    author: 'James Nestor',
    category: 'longevity',
    source: 'healthynexercise.com',
    use_case: 'Breathing techniques and their health impact',
    description: 'Explores breathing techniques and their health impact',
    key_concepts: ['breathing', 'respiratory-health', 'stress-management', 'oxygen-utilization'],
    coach_persona_tags: ['lifestyle-recovery-coach'],
    published_year: 2020,
  },

  // ─── Mind, Mental Health & Motivation ────────────────────────────
  {
    slug: 'cant-hurt-me',
    title: 'Can\'t Hurt Me',
    author: 'David Goggins',
    category: 'mental-health',
    source: 'healthynexercise.com',
    use_case: 'Mental toughness and resilience; pushes boundaries',
    description: 'Divisive mental-toughness memoir emphasizing resilience',
    key_concepts: ['mental-toughness', 'resilience', 'discipline', 'discomfort-training'],
    coach_persona_tags: ['strength-coach', 'endurance-coach'],
    published_year: 2018,
  },
  {
    slug: 'the-comfort-crisis',
    title: 'The Comfort Crisis',
    author: 'Michael Easter',
    category: 'mental-health',
    source: 'healthynexercise.com',
    use_case: 'How voluntary hardship improves wellbeing and resilience',
    description: 'Makes case that voluntary hardship improves wellbeing',
    key_concepts: ['hardship', 'resilience', 'growth-mindset', 'challenge'],
    coach_persona_tags: ['strength-coach', 'lifestyle-recovery-coach'],
    published_year: 2021,
  },
  {
    slug: 'flow',
    title: 'Flow',
    author: 'Mihaly Csikszentmihalyi',
    category: 'mental-health',
    source: 'healthynexercise.com',
    use_case: 'Achieving flow state in training and life',
    description: 'Classic psychology of optimal experience',
    key_concepts: ['flow-state', 'optimal-experience', 'engagement', 'skill-challenge-balance'],
    coach_persona_tags: ['all'],
    published_year: 1990,
  },
  {
    slug: 'mans-search-for-meaning',
    title: 'Man\'s Search for Meaning',
    author: 'Viktor Frankl',
    category: 'mental-health',
    source: 'healthynexercise.com',
    use_case: 'Finding purpose and resilience through adversity',
    description: 'Profound perspectives on resilience and purpose',
    key_concepts: ['meaning', 'resilience', 'purpose', 'adversity'],
    coach_persona_tags: ['all'],
    published_year: 1946,
  },
  {
    slug: 'the-body-keeps-the-score',
    title: 'The Body Keeps the Score',
    author: 'Bessel van der Kolk',
    category: 'mental-health',
    source: 'Forbes Wellness List',
    use_case: 'For clients dealing with trauma; understanding body-mind connection',
    description: 'Landmark work on trauma\'s physical manifestations',
    key_concepts: ['trauma', 'somatic-therapy', 'nervous-system', 'healing'],
    coach_persona_tags: ['injury-prevention-coach', 'lifestyle-recovery-coach'],
    published_year: 2015,
  },
  {
    slug: 'black-rainbow',
    title: 'Black Rainbow',
    author: 'Rachel Kelly',
    category: 'mental-health',
    source: 'Forbes Wellness List',
    use_case: 'Different approaches to treating depression and mental illness',
    description: 'How poetry helped recovery from depression and anxiety',
    key_concepts: ['depression', 'anxiety', 'creative-recovery', 'mental-health'],
    coach_persona_tags: ['lifestyle-recovery-coach'],
    published_year: 2015,
  },
  {
    slug: 'rest-is-resistance',
    title: 'Rest Is Resistance',
    author: 'Tricia Hersey',
    category: 'mental-health',
    source: 'Forbes Wellness List',
    use_case: 'For exhausted clients; revaluing rest and recovery',
    description: 'Pushback on hustle culture; rest as essential to wellbeing',
    key_concepts: ['rest', 'recovery', 'hustle-culture', 'self-care'],
    coach_persona_tags: ['lifestyle-recovery-coach'],
    published_year: 2022,
  },

  // ─── Women's Health ───────────────────────────────────────────────
  {
    slug: 'in-the-flo',
    title: 'In the FLO',
    author: 'Alisa Vitti',
    category: 'women-health',
    source: 'healthynexercise.com',
    use_case: 'For female clients; sync nutrition and training with cycles',
    description: 'Guide to synchronizing nutrition and training with menstrual cycles',
    key_concepts: ['menstrual-cycle', 'female-physiology', 'nutrition-sync', 'hormones'],
    coach_persona_tags: ['nutrition-optimizer', 'muscle-gain-strategist'],
    published_year: 2013,
  },
  {
    slug: 'roar',
    title: 'Roar',
    author: 'Stacy Sims',
    category: 'women-health',
    source: 'healthynexercise.com',
    use_case: 'Science-based training and nutrition for female physiology',
    description: 'Science-based training and nutrition for female physiology',
    key_concepts: ['female-training', 'female-nutrition', 'hormonal-cycles', 'performance'],
    coach_persona_tags: ['muscle-gain-strategist', 'nutrition-optimizer'],
    published_year: 2016,
  },
  {
    slug: 'the-new-menopause',
    title: 'The New Menopause',
    author: 'Mary Claire Haver',
    category: 'women-health',
    source: 'healthynexercise.com',
    use_case: 'For women in midlife transition; evidence-based guidance',
    description: 'Evidence-based guidance for midlife transitions',
    key_concepts: ['menopause', 'hormonal-transition', 'midlife-health', 'female-aging'],
    coach_persona_tags: ['longevity-optimizer', 'nutrition-optimizer'],
    published_year: 2023,
  },
  {
    slug: 'period-power',
    title: 'Period Power',
    author: 'Maisie Hill',
    category: 'women-health',
    source: 'healthynexercise.com',
    use_case: 'Practical strategies for working with hormonal cycles',
    description: 'Practical strategies for working with hormonal cycles',
    key_concepts: ['menstrual-health', 'cycle-syncing', 'hormone-optimization'],
    coach_persona_tags: ['nutrition-optimizer', 'muscle-gain-strategist'],
    published_year: 2019,
  },
];

export const INSIGHTS: Omit<BookInsight, 'id' | 'created_at'>[] = [
  // ─── ATOMIC HABITS INSIGHTS ──────────────────────────────────────────
  {
    book_id: 'atomic-habits', // Will be replaced with actual ID in seed
    level: 'beginner',
    category: 'mindset',
    title: 'Identity-Based Habits: Become the Athlete',
    content:
      'The most effective way to build a training habit is to focus on who you want to become, not what you want to achieve. Instead of "I want to lose 10 pounds," think "I am someone who trains consistently." This shift from outcome-based to identity-based goals creates intrinsic motivation. When you tie your training to your identity, you\'re more likely to stick with it even when motivation wanes. Start by deciding what kind of person you want to be—a strong athlete, a disciplined trainer, a healthy version of yourself—and then align your small daily actions with that identity.',
    coaching_prompt:
      'Ask the client to define their athlete identity, not just their goals. Explore what kind of person they want to become through training.',
    example_question:
      'If you were the healthiest, strongest version of yourself, what would you do daily that you\'re not doing now?',
    follow_up_actions: [
      'Create a daily training ritual that reinforces identity',
      'Track identity-based habits (e.g., "I trained today" vs tracking weight loss)',
    ],
  },
  {
    book_id: 'atomic-habits',
    level: 'intermediate',
    category: 'mindset',
    title: 'Habit Stacking: Layer Training Into Existing Routines',
    content:
      'Habit stacking is attaching a new habit to an existing one. For training consistency, identify your strongest current habit (morning coffee, lunch break, evening walk) and stack your training next to it. Example: "After I pour my morning coffee, I do 10 push-ups." or "After my lunch, I do a 20-minute walk." This reduces friction and leverages existing neural pathways. The key is making the new habit adjacent to something you already do automatically, so you don\'t rely on willpower to trigger it. Start with tiny stacks (as short as 2 minutes) and expand from there.',
    coaching_prompt:
      'Identify the client\'s strongest existing daily habits and find opportunities to stack training adjacent to them.',
    example_question:
      'What\'s something you do every single day without thinking about it? How could we attach your training to that?',
    follow_up_actions: [
      'Map 3 existing daily habits',
      'Design 2-minute training stacks for each',
      'Test stacks for 1 week, refine based on friction points',
    ],
  },
  {
    book_id: 'atomic-habits',
    level: 'advanced',
    category: 'mindset',
    title: 'The Compound Effect of 1% Improvements',
    content:
      'Small changes compound over time in exponential ways. A 1% improvement in training form, nutrition, sleep, or recovery effort seems insignificant daily but creates massive differences over months and years. This is why chasing "perfect" is counterproductive—instead, focus on the system, not the goal. If you improve your training efficiency by 1% each week, in one year you\'re 52% better. The book calls this "the aggregation of marginal gains." For advanced clients, this means moving beyond outcome-based metrics and examining the systems: Are you improving your movement quality 1% per session? Your nutrition knowledge 1% per day? Your recovery practices 1% per week? Track system improvements, not just weight or strength numbers.',
    coaching_prompt:
      'Shift the client\'s focus from outcome metrics to system metrics. Celebrate 1% improvements in form, consistency, or recovery practices.',
    example_question:
      'In your training system, where could you improve by just 1% this week? Form? Consistency? Recovery sleep? Nutrition quality?',
    follow_up_actions: [
      'Define 3 system-based micro-improvements for this month',
      'Track system metrics separately from outcome metrics',
      'Reflect on compounding effect at 30-day mark',
    ],
  },

  // ─── WHY WE SLEEP INSIGHTS ────────────────────────────────────────────
  {
    book_id: 'why-we-sleep',
    level: 'beginner',
    category: 'sleep',
    title: 'Sleep Architecture: REM vs Deep Sleep and Why It Matters',
    content:
      'Most people think sleep is just "8 hours of downtime," but your brain is actively rebuilding you every night. Sleep has two main stages: REM (dream sleep, where emotional memories form) and deep sleep (where your brain consolidates learning and repairs muscles). You need both. A typical night cycles between them multiple times. When you skimp on sleep, you lose proportionally more deep sleep and REM, which impairs emotional regulation, muscle recovery, and cognitive function. This is why all-nighters before a workout feel awful—your body hasn\'t had time to consolidate the previous day\'s training. Training stress actually increases your need for deep sleep, so better athletes need better sleep to adapt to their training load.',
    coaching_prompt:
      'Help the client understand that sleep is when adaptation happens, not during training. Make sleep a priority equal to the workout itself.',
    example_question:
      'How many hours of quality sleep are you getting each night? On nights when you sleep less, how does your training feel the next day?',
    follow_up_actions: [
      'Track sleep duration for 1 week (use phone, watch, or log)',
      'Identify biggest sleep barrier (schedule, environment, caffeine, stress)',
      'Test one sleep hygiene change (bedtime routine, room temperature, light)',
    ],
  },
  {
    book_id: 'why-we-sleep',
    level: 'intermediate',
    category: 'sleep',
    title: 'Circadian Rhythm: Align Training and Sleep to Your Body Clock',
    content:
      'Your body has a 24-hour internal clock called the circadian rhythm that controls hormones, energy, body temperature, and alertness. Training, eating, and light exposure all influence this rhythm. Morning light exposure sets your clock and improves nighttime sleep quality. Training time matters: evening training can suppress melatonin (your sleep hormone) if done too close to bedtime, while morning or afternoon training reinforces the rhythm. Consistency is critical—your body craves predictable sleep and wake times. Even 2-hour variations in sleep/wake time can disrupt your rhythm and impair recovery. For optimized training adaptation, align your training time with your natural energy peaks (usually 2-6 pm for most people) and protect a consistent sleep schedule.',
    coaching_prompt:
      'Help the client understand their personal energy peaks and align training time with those peaks, while protecting sleep consistency.',
    example_question:
      'What time of day do you have the most energy? Are you training at that time, or fighting your natural rhythm?',
    follow_up_actions: [
      'Track energy levels throughout the day for 3 days',
      'Identify optimal training window based on energy',
      'Aim for consistent sleep/wake times (within 1 hour) for 2 weeks',
    ],
  },

  // ─── OUTLIVE INSIGHTS ────────────────────────────────────────────────
  {
    book_id: 'outlive',
    level: 'beginner',
    category: 'training',
    title: 'Exercise as Medicine: The Biggest Bang for Your Buck',
    content:
      'Peter Attia argues that exercise is the single most powerful medicine we have, yet it\'s chronically underutilized. Exercise improves cardiovascular health, prevents chronic disease, builds muscle (which declines with age), and protects cognitive function. For longevity, the most important factors are: (1) cardiovascular fitness, (2) muscle strength and mass, (3) metabolic health (blood sugar control). Three types of training matter: zone 2 cardio (sustainable effort where you can talk but not sing), VO2 max work (high-intensity intervals), and strength training (3 days/week minimum). Most people do too much slow cardio and not enough strength. The "biggest bang" is combining consistent strength training with a sustainable cardio base.',
    coaching_prompt:
      'Reframe training not as "fitness" but as "medicine preventing disease." This shifts motivation from vanity to longevity.',
    example_question:
      'What do you want to be able to do when you\'re 80? Your training now is either building toward that or away from it.',
    follow_up_actions: [
      'Include strength training 3+ days per week',
      'Add zone 2 cardio (sustainable pace) 2-3 days per week',
      'Test one VO2 max session monthly to assess fitness',
    ],
  },
  {
    book_id: 'outlive',
    level: 'intermediate',
    category: 'recovery',
    title: 'The Training-Recovery Paradox: Stress Creates Adaptation',
    content:
      'Training creates a "stress signal" in your body. The adaptation (strength gain, endurance improvement, muscle growth) happens during recovery, not during the workout. Many clients push hard but don\'t recover well, so they plateau or regress. Attia emphasizes that your training intensity is only as good as your recovery. Recovery includes: sleep (80% of adaptation happens here), nutrition timing (carbs + protein post-workout), stress management, and adequate rest days. Advanced clients often need to train LESS to progress faster, because they\'re training at the right intensity and recovering fully. If you\'re always fatigued, sore, or unmotivated, you\'re either training too hard or recovering too poorly. The signal is the work done; adaptation is the rest taken.',
    coaching_prompt:
      'Ask about recovery as much as training. Make recovery a coached variable, not an afterthought.',
    example_question:
      'How\'s your sleep quality? Your stress level? Your nutrition consistency? These matter as much as your training intensity.',
    follow_up_actions: [
      'Establish non-negotiable sleep target (7-9 hours)',
      'Add post-workout protein + carbs within 30 min of training',
      'Schedule 1 complete rest day per week (no training)',
    ],
  },

  // ─── BLUE ZONES INSIGHTS ────────────────────────────────────────────
  {
    book_id: 'the-blue-zones',
    level: 'beginner',
    category: 'mindset',
    title: 'Movement Throughout the Day: The Anti-Sedentary Lifestyle',
    content:
      'In the world\'s longest-lived communities (Okinawa, Sardinia, Costa Rica, etc.), people don\'t "exercise"—they move constantly throughout the day. They walk to shops, climb stairs, do manual work, garden, and stay active without visiting a gym. This natural movement is more important for longevity than occasional intense training. The problem with modern fitness is that we sit for 8-10 hours, then "exercise" for 1 hour, then sit again. The Blue Zones data shows that consistent low-intensity movement (walking, gardening, climbing stairs) correlates more with longevity than peak athletic performance. This changes how we coach: for a client\'s first week, count daily movement (stairs, walking, gardening) as equal to gym training. Build the habit of moving throughout the day, not just during workouts.',
    coaching_prompt:
      'Reframe fitness to include all movement, not just structured training. Celebrate daily steps, walking, and natural activity as "training."',
    example_question:
      'How many hours do you spend sitting each day? How much of that could become walking or light activity?',
    follow_up_actions: [
      'Aim for 10,000 steps daily (walk, don\'t drive)',
      'Take stairs instead of elevators',
      'Walk to nearby destinations instead of driving',
      'Stand or move during phone calls',
    ],
  },

  // ─── IN THE FLO INSIGHTS ─────────────────────────────────────────────
  {
    book_id: 'in-the-flo',
    level: 'beginner',
    category: 'nutrition',
    title: 'Menstrual Cycle Phases: Sync Training Intensity With Hormones',
    content:
      'Women\'s hormones fluctuate predictably across a 28-day cycle, and this impacts energy, strength, injury risk, and recovery capacity. The cycle has 4 phases: menstruation (lowest estrogen/progesterone), follicular (rising estrogen, best for high-intensity work), ovulation (peak estrogen, good for strength), and luteal (rising progesterone, best for steady-state and recovery). High-intensity training (sprints, heavy lifts) syncs best with follicular/ovulation phases. Low-intensity, longer-duration training syncs best with luteal phase. During menstruation, many women feel stronger than expected and recover well, so training intensity can be maintained. Ignoring this rhythm leads to injuries (more likely in follicular phase due to hormonal looseness of ligaments) and burnout. For female clients, tracking the cycle isn\'t neurotic—it\'s optimizing biology.',
    coaching_prompt:
      'Ask about menstrual cycle. Encourage cycle tracking. Design the program to sync intensity with cycle phases.',
    example_question:
      'Do you track your menstrual cycle? We can optimize your training to match your natural energy patterns.',
    follow_up_actions: [
      'Download cycle-tracking app (Flo, Natural Cycles, or similar)',
      'Track energy, strength, and recovery feelings for 1 full cycle',
      'Adjust training intensity based on phase',
    ],
  },

  // ─── DEEP NUTRITION INSIGHTS ─────────────────────────────────────────
  {
    book_id: 'spoon-fed',
    level: 'intermediate',
    category: 'nutrition',
    title: 'Gut Health: The Hidden Link to Performance and Immunity',
    content:
      'Your gut microbiome—the trillions of bacteria in your intestines—impacts your immune system, energy, mood, and even how efficiently you build muscle. Ultra-processed foods, antibiotics, and low fiber diets destroy beneficial bacteria. A healthy gut is built on diversity of plants (aim for 30+ different plant foods per week), fermented foods (yogurt, kimchi, sauerkraut), and resistant starch (cooled rice, potatoes). When gut health is poor, inflammation rises, digestion suffers, and training adaptation decreases. For athletic clients, improving gut health through food diversity and fermentation is often more impactful than expensive supplements. The book challenges the assumption that protein powder and isolates are superior to whole foods—a diverse diet of whole plants, legumes, and fermented foods builds a healthier gut and often better performance.',
    coaching_prompt:
      'Ask about digestive health. Challenge clients to increase food diversity, not just protein intake.',
    example_question:
      'How many different plant foods did you eat this week? Can you name 30? If not, let\'s add diversity.',
    follow_up_actions: [
      'Aim for 30 different plant foods per week',
      'Add one fermented food daily (yogurt, kimchi, tempeh)',
      'Increase fiber gradually (15g+ per day)',
      'Reduce ultra-processed foods',
    ],
  },

  // ─── HOW NOT TO DIE INSIGHTS ─────────────────────────────────────────
  {
    book_id: 'how-not-to-die',
    level: 'beginner',
    category: 'nutrition',
    title: 'Food as Medicine: The "Dirty Dozen" and "Clean Fifteen"',
    content:
      'Michael Greger emphasizes that for most people, what matters most isn\'t perfection—it\'s consistency. The foods that most impact disease prevention are plants: vegetables, fruits, beans, whole grains, and nuts. The "dirty dozen" (produce with highest pesticide residue) can be bought organic if budget allows, but eating conventional produce is infinitely better than avoiding vegetables. Don\'t let perfectionism prevent progress. For beginners, focus on adding plants, not on organic vs. conventional. A simple framework: half your plate vegetables/fruits, quarter plate whole grains, quarter plate legumes/protein. This pattern naturally crowds out processed foods and improves health markers without requiring supplementation or complex meal plans.',
    coaching_prompt:
      'Remove perfectionism from nutrition. Focus on adding plants and whole foods, not eliminating items.',
    example_question:
      'How many servings of vegetables did you eat today? Tomorrow, can you aim for one more?',
    follow_up_actions: [
      'Aim for 5+ servings of vegetables/fruits daily',
      'Include one legume dish per week (beans, lentils, chickpeas)',
      'Try one new whole grain (quinoa, farro, oats)',
    ],
  },

  // ─── TINY HABITS INSIGHTS ────────────────────────────────────────────
  {
    book_id: 'tiny-habits',
    level: 'beginner',
    category: 'mindset',
    title: 'Start Absurdly Small: The 2-Minute Rule for Consistency',
    content:
      'BJ Fogg\'s research shows that motivation is unreliable. Instead of relying on motivation to build habits, design behaviors so small they feel trivial. Instead of "I\'ll train 60 minutes," start with "I\'ll put on my workout shoes" (2 minutes). The goal is not the behavior itself—it\'s to build the neural pathway and prove to yourself you\'re someone who trains. Once the habit is solid (2-4 weeks), expand it. Tiny habits work because: (1) low barrier to entry = high consistency, (2) success breeds motivation, (3) small wins build identity. For clients with zero training history, suggest 5 minutes of walking or 10 push-ups, not a "training program." Get the habit installed first, then add intensity.',
    coaching_prompt:
      'Make the first habit absurdly small. Your job is habit installation, not immediate results.',
    example_question:
      'What\'s the smallest version of training that you could do every single day without needing willpower?',
    follow_up_actions: [
      'Start with 2-5 minute daily habit',
      'Do it at the same time each day (anchor to existing habit)',
      'Celebrate completion (this triggers dopamine and builds identity)',
      'After 3 weeks, expand duration or intensity',
    ],
  },

  // ─── REST IS RESISTANCE INSIGHTS ─────────────────────────────────────
  {
    book_id: 'rest-is-resistance',
    level: 'intermediate',
    category: 'recovery',
    title: 'Strategic Rest: Recovery is a Competitive Advantage',
    content:
      'Tricia Hersey challenges "hustle culture" and argues that rest is not laziness—it\'s resistance against a system that extracts productivity at the cost of health. In training, this translates to: rest days are not failures; they\'re where adaptation happens. A client who trains 5 days and rests 2 will progress faster than someone who trains 7 days with poor recovery. Elite athletes spend 70-80% of their effort on recovery (sleep, nutrition, mobility, stress management), not 20%. If you\'re constantly exhausted, checking your phone at midnight, or pushing hard without rest, you\'re not building resilience—you\'re burning out. True discipline is knowing when to rest, not just when to push. For overachievers and high-stress clients, this is revolutionary: rest is where the magic happens.',
    coaching_prompt:
      'For driven, over-stressed clients, reframe rest as a performance strategy. Give them "permission" to rest.',
    example_question:
      'When was the last time you took a full day off from training AND work stress? How did you feel?',
    follow_up_actions: [
      'Schedule 1-2 complete rest days weekly (no training)',
      'Implement a "phone-free hour" before bed',
      'Add one leisure activity weekly that\'s pure rest (not productive)',
    ],
  },
];
