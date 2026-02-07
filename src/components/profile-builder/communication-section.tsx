'use client';

import { useProfileStore } from '@/store/profile-store';
import { DimensionSelector } from './dimension-selector';
import {
  VERBOSITY_OPTIONS,
  HELP_SEEKING_OPTIONS,
  RESPONSE_TO_WRONG_OPTIONS,
  LANGUAGE_REGISTER_OPTIONS,
} from '@/lib/constants';

export function CommunicationSection() {
  const cs = useProfileStore((s) => s.profile.communicationStyle);
  const update = useProfileStore((s) => s.updateCommunicationStyle);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold mb-1">Communication Style</h3>
        <p className="text-xs text-muted-foreground">
          How this learner talks, asks for help, and responds to being corrected.
        </p>
      </div>

      <DimensionSelector
        label="Verbosity"
        options={VERBOSITY_OPTIONS}
        value={cs.verbosity}
        onChange={(v) => update({ verbosity: v })}
      />

      <DimensionSelector
        label="Help-Seeking Behavior"
        options={HELP_SEEKING_OPTIONS}
        value={cs.helpSeeking}
        onChange={(v) => update({ helpSeeking: v })}
      />

      <DimensionSelector
        label="Response to Being Wrong"
        options={RESPONSE_TO_WRONG_OPTIONS}
        value={cs.responseToBeingWrong}
        onChange={(v) => update({ responseToBeingWrong: v })}
      />

      <DimensionSelector
        label="Language Register"
        options={LANGUAGE_REGISTER_OPTIONS}
        value={cs.languageRegister}
        onChange={(v) => update({ languageRegister: v })}
      />
    </div>
  );
}
