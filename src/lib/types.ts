// ============================================
// DIMENSION ENUMS
// ============================================

export type PriorKnowledgeLevel = 'novice' | 'developing' | 'approaching-mastery';
export type WorkingMemoryLoad = 'low' | 'moderate' | 'high';
export type MetacognitiveAwareness = 'unaware' | 'emerging' | 'reflective';
export type LearningPreference = 'examples' | 'analogies' | 'step-by-step' | 'visual' | 'exploratory';

export type EngagementLevel = 'eager' | 'compliant' | 'disengaged' | 'resistant';
export type SelfEfficacy = 'confident' | 'uncertain' | 'anxious' | 'defeated';
export type GoalOrientation = 'mastery-seeking' | 'grade-seeking' | 'task-completing' | 'avoidant';
export type FrustrationThreshold = 'high' | 'moderate' | 'low' | 'very-low';

export type Verbosity = 'terse' | 'conversational' | 'verbose';
export type HelpSeeking = 'asks-freely' | 'waits-to-be-asked' | 'avoids-asking' | 'demands-answers';
export type ResponseToBeingWrong = 'receptive' | 'defensive' | 'shuts-down' | 'argues';
export type LanguageRegister = 'formal' | 'casual' | 'slang-heavy' | 'esl-patterns';

// ============================================
// KNOWLEDGE STATE
// ============================================

export interface KnowledgeState {
  domain: string;
  topic: string;
  partialUnderstanding: string;
  misconceptions: string;
  prerequisiteGaps: string;
  curriculumContext?: string;
}

// ============================================
// PROFILE DIMENSIONS
// ============================================

export interface CognitiveProfile {
  priorKnowledgeLevel: PriorKnowledgeLevel;
  workingMemoryLoad: WorkingMemoryLoad;
  metacognitiveAwareness: MetacognitiveAwareness;
  learningPreferences: LearningPreference[];
}

export interface MotivationAffect {
  engagementLevel: EngagementLevel;
  selfEfficacy: SelfEfficacy;
  goalOrientation: GoalOrientation;
  frustrationThreshold: FrustrationThreshold;
}

export interface CommunicationStyle {
  verbosity: Verbosity;
  helpSeeking: HelpSeeking;
  responseToBeingWrong: ResponseToBeingWrong;
  languageRegister: LanguageRegister;
}

// ============================================
// FULL LEARNER PROFILE
// ============================================

export interface LearnerProfile {
  id: string;
  name?: string;
  archetypeId?: ArchetypeId | null;
  knowledgeState: KnowledgeState;
  cognitiveProfile: CognitiveProfile;
  motivationAffect: MotivationAffect;
  communicationStyle: CommunicationStyle;
}

// ============================================
// ARCHETYPES
// ============================================

export type ArchetypeId =
  | 'confident-but-wrong'
  | 'eager-novice'
  | 'silent-struggler'
  | 'grade-optimizer'
  | 'capable-but-disengaged'
  | 'anxious-perfectionist'
  | 'esl-learner';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  shortDescription: string;
  icon: string;
  cognitiveProfile: CognitiveProfile;
  motivationAffect: MotivationAffect;
  communicationStyle: CommunicationStyle;
  behavioralNotes: string;
}

// ============================================
// CHAT
// ============================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isError?: boolean;
}

// ============================================
// API TYPES
// ============================================

export interface PersonaRequest {
  profile: LearnerProfile;
}

export interface PersonaResponse {
  systemPrompt: string;
  promptSections: PromptSections;
}

export interface PromptSections {
  knowledgeState: string;
  cognitiveProfile: string;
  motivationAffect: string;
  communicationStyle: string;
  traitResolutions: string;
  innerMonologue: string;
  escapeValves: string;
}

export interface ChatRequest {
  systemPrompt: string;
  messages: { role: 'user' | 'assistant'; content: string }[];
}

// ============================================
// SIMULATION
// ============================================

export interface SimulateMessage {
  id: string;
  role: 'tutor' | 'learner';
  content: string;
  turn: number;
  isComplete: boolean;
}

export interface AutoConversationRequest {
  learnerPrompt: string;
  tutorPrompt: string;
}
