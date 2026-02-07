import type {
  PriorKnowledgeLevel,
  WorkingMemoryLoad,
  MetacognitiveAwareness,
  LearningPreference,
  EngagementLevel,
  SelfEfficacy,
  GoalOrientation,
  FrustrationThreshold,
  Verbosity,
  HelpSeeking,
  ResponseToBeingWrong,
  LanguageRegister,
} from './types';

export interface DimensionOption<T extends string> {
  value: T;
  label: string;
  description: string;
}

// ============================================
// COGNITIVE & LEARNING PROFILE
// ============================================

export const PRIOR_KNOWLEDGE_OPTIONS: DimensionOption<PriorKnowledgeLevel>[] = [
  { value: 'novice', label: 'Novice', description: 'Little to no prior knowledge in this area' },
  { value: 'developing', label: 'Developing', description: 'Some foundational understanding, but significant gaps' },
  { value: 'approaching-mastery', label: 'Approaching Mastery', description: 'Strong foundation with minor gaps' },
];

export const WORKING_MEMORY_OPTIONS: DimensionOption<WorkingMemoryLoad>[] = [
  { value: 'low', label: 'Low', description: 'Struggles with multi-step reasoning; loses track easily' },
  { value: 'moderate', label: 'Moderate', description: 'Can handle 2-3 step problems with some effort' },
  { value: 'high', label: 'High', description: 'Comfortable holding multiple ideas at once' },
];

export const METACOGNITIVE_OPTIONS: DimensionOption<MetacognitiveAwareness>[] = [
  { value: 'unaware', label: 'Unaware', description: "Doesn't know what they don't know" },
  { value: 'emerging', label: 'Emerging', description: 'Sometimes notices confusion but can\'t pinpoint it' },
  { value: 'reflective', label: 'Reflective', description: 'Can identify their own gaps and ask targeted questions' },
];

export const LEARNING_PREFERENCE_OPTIONS: DimensionOption<LearningPreference>[] = [
  { value: 'examples', label: 'Examples', description: 'Learns best from worked examples and demonstrations' },
  { value: 'analogies', label: 'Analogies', description: 'Connects new ideas to familiar concepts' },
  { value: 'step-by-step', label: 'Step-by-Step', description: 'Prefers explicit procedures and sequences' },
  { value: 'visual', label: 'Visual', description: 'Benefits from diagrams, charts, and spatial representations' },
  { value: 'exploratory', label: 'Exploratory', description: 'Likes to experiment and discover patterns' },
];

// ============================================
// MOTIVATION & AFFECT
// ============================================

export const ENGAGEMENT_OPTIONS: DimensionOption<EngagementLevel>[] = [
  { value: 'eager', label: 'Eager', description: 'Actively participates and asks questions' },
  { value: 'compliant', label: 'Compliant', description: 'Does what is asked but no more' },
  { value: 'disengaged', label: 'Disengaged', description: 'Minimal effort, attention drifts' },
  { value: 'resistant', label: 'Resistant', description: 'Actively pushes back or refuses to engage' },
];

export const SELF_EFFICACY_OPTIONS: DimensionOption<SelfEfficacy>[] = [
  { value: 'confident', label: 'Confident', description: 'Believes they can succeed at this' },
  { value: 'uncertain', label: 'Uncertain', description: 'Not sure if they can do it' },
  { value: 'anxious', label: 'Anxious', description: 'Expects to fail; worries about being wrong' },
  { value: 'defeated', label: 'Defeated', description: 'Has given up; believes they can\'t learn this' },
];

export const GOAL_ORIENTATION_OPTIONS: DimensionOption<GoalOrientation>[] = [
  { value: 'mastery-seeking', label: 'Mastery-Seeking', description: 'Wants to truly understand the material' },
  { value: 'grade-seeking', label: 'Grade-Seeking', description: 'Wants the right answer for the grade' },
  { value: 'task-completing', label: 'Task-Completing', description: 'Just wants to finish the assignment' },
  { value: 'avoidant', label: 'Avoidant', description: 'Wants to minimize effort and avoid failure' },
];

export const FRUSTRATION_THRESHOLD_OPTIONS: DimensionOption<FrustrationThreshold>[] = [
  { value: 'high', label: 'High', description: 'Persistent; keeps trying through difficulty' },
  { value: 'moderate', label: 'Moderate', description: 'Tolerates some struggle before getting frustrated' },
  { value: 'low', label: 'Low', description: 'Gets frustrated quickly; needs early success' },
  { value: 'very-low', label: 'Very Low', description: 'Gives up almost immediately when stuck' },
];

// ============================================
// COMMUNICATION STYLE
// ============================================

export const VERBOSITY_OPTIONS: DimensionOption<Verbosity>[] = [
  { value: 'terse', label: 'Terse', description: 'One-word or one-sentence answers' },
  { value: 'conversational', label: 'Conversational', description: 'Normal-length, natural responses' },
  { value: 'verbose', label: 'Verbose', description: 'Lengthy explanations, thinks out loud' },
];

export const HELP_SEEKING_OPTIONS: DimensionOption<HelpSeeking>[] = [
  { value: 'asks-freely', label: 'Asks Freely', description: 'Comfortable requesting help whenever needed' },
  { value: 'waits-to-be-asked', label: 'Waits to Be Asked', description: 'Won\'t volunteer confusion; needs to be checked on' },
  { value: 'avoids-asking', label: 'Avoids Asking', description: 'Would rather struggle silently than ask' },
  { value: 'demands-answers', label: 'Demands Answers', description: 'Wants the answer directly, not guidance' },
];

export const RESPONSE_TO_WRONG_OPTIONS: DimensionOption<ResponseToBeingWrong>[] = [
  { value: 'receptive', label: 'Receptive', description: 'Open to correction; adjusts thinking' },
  { value: 'defensive', label: 'Defensive', description: 'Makes excuses or deflects blame' },
  { value: 'shuts-down', label: 'Shuts Down', description: 'Goes quiet; stops participating' },
  { value: 'argues', label: 'Argues', description: 'Pushes back; needs to be convinced' },
];

export const LANGUAGE_REGISTER_OPTIONS: DimensionOption<LanguageRegister>[] = [
  { value: 'formal', label: 'Formal', description: 'Academic, polished language' },
  { value: 'casual', label: 'Casual', description: 'Relaxed, everyday speech' },
  { value: 'slang-heavy', label: 'Slang-Heavy', description: 'Heavy use of slang and informal expression' },
  { value: 'esl-patterns', label: 'ESL Patterns', description: 'English as second language; solid concepts, expression barriers' },
];

// ============================================
// DEFAULTS
// ============================================

export const DEFAULT_KNOWLEDGE_STATE = {
  domain: '',
  topic: '',
  partialUnderstanding: '',
  misconceptions: '',
  prerequisiteGaps: '',
  curriculumContext: '',
};

export const DEFAULT_COGNITIVE_PROFILE = {
  priorKnowledgeLevel: 'developing' as const,
  workingMemoryLoad: 'moderate' as const,
  metacognitiveAwareness: 'emerging' as const,
  learningPreferences: ['examples'] as const,
};

export const DEFAULT_MOTIVATION_AFFECT = {
  engagementLevel: 'compliant' as const,
  selfEfficacy: 'uncertain' as const,
  goalOrientation: 'task-completing' as const,
  frustrationThreshold: 'moderate' as const,
};

export const DEFAULT_COMMUNICATION_STYLE = {
  verbosity: 'conversational' as const,
  helpSeeking: 'waits-to-be-asked' as const,
  responseToBeingWrong: 'receptive' as const,
  languageRegister: 'casual' as const,
};

// ============================================
// CHAT LIMITS
// ============================================

export const MAX_CONVERSATION_MESSAGES = 50;
export const MAX_TOKENS_RESPONSE = 1024;
