import { create } from 'zustand';
import type {
  LearnerProfile,
  ArchetypeId,
  KnowledgeState,
  CognitiveProfile,
  MotivationAffect,
  CommunicationStyle,
  PromptSections,
} from '@/lib/types';
import { getArchetype } from '@/lib/archetypes';
import {
  DEFAULT_KNOWLEDGE_STATE,
  DEFAULT_COGNITIVE_PROFILE,
  DEFAULT_MOTIVATION_AFFECT,
  DEFAULT_COMMUNICATION_STYLE,
} from '@/lib/constants';
import { generateId } from '@/lib/utils';

interface ProfileStore {
  profile: LearnerProfile;
  generatedPrompt: string | null;
  promptSections: PromptSections | null;

  setFromArchetype: (id: ArchetypeId) => void;
  updateKnowledgeState: (partial: Partial<KnowledgeState>) => void;
  updateCognitiveProfile: (partial: Partial<CognitiveProfile>) => void;
  updateMotivationAffect: (partial: Partial<MotivationAffect>) => void;
  updateCommunicationStyle: (partial: Partial<CommunicationStyle>) => void;
  setName: (name: string) => void;
  resetProfile: () => void;
  setGeneratedPrompt: (prompt: string, sections: PromptSections) => void;
  clearGeneratedPrompt: () => void;
}

function createDefaultProfile(): LearnerProfile {
  return {
    id: generateId(),
    knowledgeState: { ...DEFAULT_KNOWLEDGE_STATE },
    cognitiveProfile: { ...DEFAULT_COGNITIVE_PROFILE, learningPreferences: [...DEFAULT_COGNITIVE_PROFILE.learningPreferences] },
    motivationAffect: { ...DEFAULT_MOTIVATION_AFFECT },
    communicationStyle: { ...DEFAULT_COMMUNICATION_STYLE },
  };
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: createDefaultProfile(),
  generatedPrompt: null,
  promptSections: null,

  setFromArchetype: (id) => {
    const archetype = getArchetype(id);
    if (!archetype) return;

    set({
      profile: {
        id: generateId(),
        name: archetype.name.replace('The ', ''),
        archetypeId: id,
        knowledgeState: { ...DEFAULT_KNOWLEDGE_STATE },
        cognitiveProfile: {
          ...archetype.cognitiveProfile,
          learningPreferences: [...archetype.cognitiveProfile.learningPreferences],
        },
        motivationAffect: { ...archetype.motivationAffect },
        communicationStyle: { ...archetype.communicationStyle },
      },
      generatedPrompt: null,
      promptSections: null,
    });
  },

  updateKnowledgeState: (partial) =>
    set((state) => ({
      profile: {
        ...state.profile,
        knowledgeState: { ...state.profile.knowledgeState, ...partial },
      },
      generatedPrompt: null,
      promptSections: null,
    })),

  updateCognitiveProfile: (partial) =>
    set((state) => ({
      profile: {
        ...state.profile,
        cognitiveProfile: { ...state.profile.cognitiveProfile, ...partial },
      },
      generatedPrompt: null,
      promptSections: null,
    })),

  updateMotivationAffect: (partial) =>
    set((state) => ({
      profile: {
        ...state.profile,
        motivationAffect: { ...state.profile.motivationAffect, ...partial },
      },
      generatedPrompt: null,
      promptSections: null,
    })),

  updateCommunicationStyle: (partial) =>
    set((state) => ({
      profile: {
        ...state.profile,
        communicationStyle: { ...state.profile.communicationStyle, ...partial },
      },
      generatedPrompt: null,
      promptSections: null,
    })),

  setName: (name) =>
    set((state) => ({
      profile: { ...state.profile, name },
    })),

  resetProfile: () =>
    set({
      profile: createDefaultProfile(),
      generatedPrompt: null,
      promptSections: null,
    }),

  setGeneratedPrompt: (prompt, sections) =>
    set({ generatedPrompt: prompt, promptSections: sections }),

  clearGeneratedPrompt: () =>
    set({ generatedPrompt: null, promptSections: null }),
}));
