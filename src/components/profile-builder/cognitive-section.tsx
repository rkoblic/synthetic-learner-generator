'use client';

import { useProfileStore } from '@/store/profile-store';
import { DimensionSelector, MultiSelector } from './dimension-selector';
import {
  PRIOR_KNOWLEDGE_OPTIONS,
  WORKING_MEMORY_OPTIONS,
  METACOGNITIVE_OPTIONS,
  LEARNING_PREFERENCE_OPTIONS,
} from '@/lib/constants';
import { DIMENSION_HINTS } from '@/lib/builder-info-content';
import type { LearningPreference } from '@/lib/types';

export function CognitiveSection() {
  const cp = useProfileStore((s) => s.profile.cognitiveProfile);
  const update = useProfileStore((s) => s.updateCognitiveProfile);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold mb-1">Cognitive & Learning Profile</h3>
        <p className="text-xs text-muted-foreground">
          How this learner thinks, processes information, and prefers to learn.
        </p>
      </div>

      <DimensionSelector
        label="Prior Knowledge Level"
        options={PRIOR_KNOWLEDGE_OPTIONS}
        value={cp.priorKnowledgeLevel}
        onChange={(v) => update({ priorKnowledgeLevel: v })}
      />

      <DimensionSelector
        label="Working Memory"
        hint={DIMENSION_HINTS['Working Memory']}
        options={WORKING_MEMORY_OPTIONS}
        value={cp.workingMemoryLoad}
        onChange={(v) => update({ workingMemoryLoad: v })}
      />

      <DimensionSelector
        label="Metacognitive Awareness"
        hint={DIMENSION_HINTS['Metacognitive Awareness']}
        options={METACOGNITIVE_OPTIONS}
        value={cp.metacognitiveAwareness}
        onChange={(v) => update({ metacognitiveAwareness: v })}
      />

      <MultiSelector
        label="Learning Preferences"
        options={LEARNING_PREFERENCE_OPTIONS}
        value={cp.learningPreferences}
        onChange={(v) => update({ learningPreferences: v as LearningPreference[] })}
      />
    </div>
  );
}
