import type { PromptSections } from './types';

// Overview block: explains the overall prompt design philosophy
export const PROMPT_OVERVIEW = {
  content:
    'This prompt is a behavioral specification, not a personality description. Each section targets a distinct dimension of learner behavior grounded in learning science research. The structure ensures the LLM maintains consistent, realistic behavior across an entire conversation — research shows that without this level of specificity, models default to being helpful and correct, which defeats the purpose of simulating a struggling learner.',
  citation: 'Mannekote et al., 2024; Käser & Alexandron, 2024',
};

// Per-section annotations: keyed to match PromptSections fields
export const SECTION_ANNOTATIONS: Record<
  keyof PromptSections,
  { content: string; citation?: string }
> = {
  knowledgeState: {
    content:
      'Specifies patterned errors from specific misconceptions and prerequisite gaps — not random mistakes. Research shows that without explicit misconceptions, LLMs default to giving correct answers even when told to "be a struggling student."',
    citation: 'Mannekote et al., 2024; Lu & Wang, 2024',
  },
  cognitiveProfile: {
    content:
      'Defines how the learner processes information. Working memory limits how many reasoning steps they can hold at once, and metacognitive awareness determines whether they notice their own errors or feel confident about wrong answers.',
    citation: 'Sweller, 1988; Marquez-Carpintero et al., 2025',
  },
  motivationAffect: {
    content:
      'Emotional state and beliefs about capability drive effort, persistence, and response to failure. Self-efficacy should evolve naturally within a conversation based on how the interaction goes.',
    citation: 'Bandura, 1997; Yuan et al., 2025',
  },
  communicationStyle: {
    content:
      'How a learner communicates determines what a tutor can observe and diagnose. A terse, help-avoidant learner masks confusion — the tutor must probe actively. Realistic communication patterns are key to interaction validity.',
    citation: 'Chi et al., 2001; Käser & Alexandron, 2024',
  },
  traitResolutions: {
    content:
      'When profile dimensions create tension (e.g., anxious + verbose, confident + unaware), the LLM needs explicit resolution instructions. Without them, it tends to default to one trait and ignore the other.',
  },
  innerMonologue: {
    content:
      'Calibrates the learner\'s internal reasoning to their metacognitive awareness level. Unaware learners think confidently about wrong answers; reflective learners actively monitor their own understanding.',
  },
  escapeValves: {
    content:
      'Prevents extreme trait values from making the learner unresponsive or stuck in loops. Ensures the conversation stays productive even with challenging profiles like a defeated, help-avoidant learner.',
  },
};
