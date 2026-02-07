// Section-level content: "Why this matters" for each of the 4 SectionCard headings
export const SECTION_INFO = {
  knowledge: {
    title: 'Why Knowledge State matters',
    content:
      'Learner errors aren\'t random — they come from specific misconceptions and gaps in prerequisite knowledge. Research on LLM-simulated learners shows that without detailed misconceptions, models default to being correct. Specific, patterned wrong answers — not random errors — are what make a simulated learner realistic.',
    citation: 'Mannekote et al., 2024; Lu & Wang, 2024',
  },
  cognitive: {
    title: 'Why Cognitive Profile matters',
    content:
      'How a learner processes information determines what kind of help works. Working memory limits how many reasoning steps they can hold at once — a core principle of Cognitive Load Theory. Metacognitive awareness — knowing what you don\'t know — determines whether they notice their own errors or feel confident about wrong answers.',
    citation: 'Sweller, 1988; Marquez-Carpintero et al., 2025',
  },
  motivation: {
    title: 'Why Motivation & Affect matters',
    content:
      'Emotions and beliefs shape learning behavior as much as knowledge does. Self-efficacy — a learner\'s belief about their own capability — predicts effort, persistence, and how they interpret failure. Research on simulated learners shows self-efficacy should evolve within a conversation based on success and failure.',
    citation: 'Bandura, 1997; Yuan et al., 2025',
  },
  communication: {
    title: 'Why Communication Style matters',
    content:
      'How learners communicate determines what a tutor can observe and diagnose. A terse, help-avoidant learner masks their confusion — the tutor must probe actively. Simulated learner research emphasizes that realistic communication patterns are key to passing interaction validity tests.',
    citation: 'Chi et al., 2001; Käser & Alexandron, 2024',
  },
} as const;

export type SectionInfoKey = keyof typeof SECTION_INFO;

// Dimension-level content: 1-sentence hints for selected dimensions
// Keys match the `label` props passed to DimensionSelector in section components
export const DIMENSION_HINTS: Record<string, string> = {
  'Working Memory':
    'From Cognitive Load Theory — working memory limits how many steps a learner can hold at once. Low-capacity learners can do each step but lose track of multi-step explanations.',
  'Metacognitive Awareness':
    'Determines whether the learner knows what they don\'t know. Unaware learners feel confident about wrong answers — their gaps feel like solid ground.',
  'Self-Efficacy':
    'From Bandura\'s research — beliefs about capability predict effort, persistence, and how learners interpret failure. This can evolve during a tutoring session.',
  'Goal Orientation':
    'From Achievement Goal Theory — mastery-seekers process deeply and persist; grade-seekers optimize for correct answers and may skip understanding.',
};
