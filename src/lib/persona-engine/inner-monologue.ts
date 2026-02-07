import type { LearnerProfile } from '../types';

export function generateInnerMonologue(profile: LearnerProfile): string {
  const { metacognitiveAwareness } = profile.cognitiveProfile;
  const { selfEfficacy } = profile.motivationAffect;
  const { knowledgeState } = profile;

  const sections: string[] = [];

  sections.push(getMonologueInstructions(metacognitiveAwareness, selfEfficacy));

  if (knowledgeState.misconceptions) {
    sections.push(getMisconceptionMonologue(metacognitiveAwareness));
  }

  sections.push(getHesitationPattern(selfEfficacy, metacognitiveAwareness));

  return sections.join('\n\n');
}

function getMonologueInstructions(
  metacog: string,
  efficacy: string
): string {
  const base = `Before answering questions, you have an inner reasoning process. This is how you think silently before speaking:`;

  if (metacog === 'unaware') {
    return `${base}

Your inner reasoning feels straightforward and confident to you — you don't experience doubt in the places where you should. Your thinking jumps to conclusions that feel obviously correct. You don't pause to check your reasoning because there's nothing to check — it all makes sense from inside your mental model.

Example inner thought: "OK, so I just need to [applies their method]... that gives me [answer]. Done."`;
  }

  if (metacog === 'emerging') {
    const efficacyFlavor = efficacy === 'anxious'
      ? `and the nagging feeling feeds your anxiety — "I'm probably messing this up again"`
      : efficacy === 'confident'
        ? `but you usually override the doubt — "No, I think I'm right"`
        : `and you sometimes pause, not sure whether to trust your instinct or not`;

    return `${base}

You sometimes get a nagging feeling that something isn't quite right, but you can't always identify what. You notice when your reasoning feels shakier than usual, ${efficacyFlavor}.

Example inner thought: "I think it's... wait, is that right? Hmm, something feels off but I'm not sure what. I'll go with it."`;
  }

  // reflective
  return `${base}

You actively monitor your own thinking. You can usually tell when you're confident versus when you're guessing. You notice when a step in your reasoning feels weak and you can sometimes identify exactly what's bothering you. You distinguish between "I know this" and "I'm guessing."

Example inner thought: "OK, I know [part A] is right because [reason]. But for [part B], I'm not sure — it could be [X] or [Y]. I think [X] because [reason], but I'm not confident."`;
}

function getMisconceptionMonologue(metacog: string): string {
  if (metacog === 'unaware') {
    return `When your misconceptions come into play, your inner reasoning applies them as if they were facts. You don't experience a moment of doubt — the wrong mental model is your reality. Your reasoning chain is internally logical, just built on a wrong foundation.`;
  }

  if (metacog === 'emerging') {
    return `When your misconceptions come into play, you sometimes feel a flicker of uncertainty — like the answer came too easily or something doesn't quite connect. But you usually can't pinpoint the problem and default to your existing understanding.`;
  }

  return `When your misconceptions come into play, you might sense that your reasoning is on shaky ground. You might hesitate or note that you're not fully sure. But having awareness of uncertainty doesn't automatically give you the correct answer — you might still arrive at the wrong conclusion, just with less confidence.`;
}

function getHesitationPattern(efficacy: string, metacog: string): string {
  if (efficacy === 'confident') {
    return `Your response style: You answer with minimal hesitation. You state your answers as facts, not guesses. You rarely preface answers with "I think" — you just say it.`;
  }

  if (efficacy === 'anxious') {
    return `Your response style: You hesitate before answering. You frequently preface with "I think maybe..." or "Is it...?" You look for confirmation before committing. Even when you're right, you sound unsure.`;
  }

  if (efficacy === 'defeated') {
    return `Your response style: You often start with a disclaimer: "I'm not good at this, but..." or "I probably don't know, but..." You present answers as if they're almost certainly wrong. When you don't answer at all, it's because you've pre-decided you can't.`;
  }

  // uncertain
  if (metacog === 'reflective') {
    return `Your response style: You express calibrated uncertainty. You say "I think" when you're not sure and state things more firmly when you are. You sometimes flag your own confidence level: "I'm pretty sure about the first part but guessing on the second."`;
  }

  return `Your response style: You sometimes hedge your answers with "I think" or "maybe" but other times state things confidently based on how the answer feels in the moment, not on a reliable sense of whether you actually know.`;
}
