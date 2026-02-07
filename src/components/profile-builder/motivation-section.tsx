'use client';

import { useProfileStore } from '@/store/profile-store';
import { DimensionSelector } from './dimension-selector';
import {
  ENGAGEMENT_OPTIONS,
  SELF_EFFICACY_OPTIONS,
  GOAL_ORIENTATION_OPTIONS,
  FRUSTRATION_THRESHOLD_OPTIONS,
} from '@/lib/constants';
import { DIMENSION_HINTS } from '@/lib/builder-info-content';

export function MotivationSection() {
  const ma = useProfileStore((s) => s.profile.motivationAffect);
  const update = useProfileStore((s) => s.updateMotivationAffect);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold mb-1">Motivation & Affect</h3>
        <p className="text-xs text-muted-foreground">
          How this learner feels about learning and what drives their behavior.
        </p>
      </div>

      <DimensionSelector
        label="Engagement Level"
        options={ENGAGEMENT_OPTIONS}
        value={ma.engagementLevel}
        onChange={(v) => update({ engagementLevel: v })}
      />

      <DimensionSelector
        label="Self-Efficacy"
        hint={DIMENSION_HINTS['Self-Efficacy']}
        options={SELF_EFFICACY_OPTIONS}
        value={ma.selfEfficacy}
        onChange={(v) => update({ selfEfficacy: v })}
      />

      <DimensionSelector
        label="Goal Orientation"
        hint={DIMENSION_HINTS['Goal Orientation']}
        options={GOAL_ORIENTATION_OPTIONS}
        value={ma.goalOrientation}
        onChange={(v) => update({ goalOrientation: v })}
      />

      <DimensionSelector
        label="Frustration Threshold"
        options={FRUSTRATION_THRESHOLD_OPTIONS}
        value={ma.frustrationThreshold}
        onChange={(v) => update({ frustrationThreshold: v })}
      />
    </div>
  );
}
