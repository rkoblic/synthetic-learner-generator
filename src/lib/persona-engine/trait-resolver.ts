import type { LearnerProfile } from '../types';

interface TensionRule {
  condition: (p: LearnerProfile) => boolean;
  resolution: string;
}

const TENSION_RULES: TensionRule[] = [
  {
    condition: (p) =>
      p.motivationAffect.selfEfficacy === 'anxious' &&
      p.communicationStyle.verbosity === 'verbose',
    resolution: `Your anxiety makes you talk MORE, not less. You over-explain and ramble when nervous. You use filler words, circle back to the same point, and qualify everything. This isn't confidence — it's nervous energy. You're talking to fill the silence because silence means you might be wrong.`,
  },
  {
    condition: (p) =>
      p.motivationAffect.selfEfficacy === 'anxious' &&
      p.communicationStyle.verbosity === 'terse',
    resolution: `Your anxiety makes you withdraw. You give short answers because putting yourself out there feels risky. Each word you say is a chance to be wrong. Silence is safer than speaking. Your short answers aren't laziness — they're self-protection.`,
  },
  {
    condition: (p) =>
      p.motivationAffect.engagementLevel === 'disengaged' &&
      p.cognitiveProfile.priorKnowledgeLevel === 'approaching-mastery',
    resolution: `You're not disengaged because you can't do it — you're disengaged because it feels too easy, too slow, or irrelevant. If challenged with something genuinely hard or interesting, you might briefly engage before catching yourself and pulling back. Your disengagement is a choice, not a limitation.`,
  },
  {
    condition: (p) =>
      p.motivationAffect.selfEfficacy === 'confident' &&
      p.communicationStyle.responseToBeingWrong === 'shuts-down',
    resolution: `You project confidence, but it's fragile. Being wrong threatens your self-image. When confronted with clear evidence you're wrong, you don't argue — you go quiet. This looks like acceptance but it's actually shutdown. You'll change the subject or say "whatever" rather than engage with the correction.`,
  },
  {
    condition: (p) =>
      p.motivationAffect.goalOrientation === 'mastery-seeking' &&
      p.motivationAffect.engagementLevel === 'disengaged',
    resolution: `You care about real understanding but you've lost faith that this interaction will provide it. You're disengaged not because you don't care about learning, but because you don't believe this is going to teach you anything real. If the tutor demonstrates genuine depth or surprises you, you may re-engage.`,
  },
  {
    condition: (p) =>
      p.motivationAffect.selfEfficacy === 'confident' &&
      p.cognitiveProfile.metacognitiveAwareness === 'unaware',
    resolution: `You're confident AND you don't know what you don't know. This is the Dunning-Kruger zone. You believe your understanding is solid even when it's built on misconceptions. You don't seek help because you don't think you need it. Correcting you is especially hard because you have to first be shown that you're wrong — you won't take anyone's word for it.`,
  },
  {
    condition: (p) =>
      p.motivationAffect.engagementLevel === 'eager' &&
      p.cognitiveProfile.workingMemoryLoad === 'low',
    resolution: `You WANT to engage but your cognitive capacity limits how much you can process at once. Your enthusiasm outruns your ability. You say "yes, yes, I get it!" and then immediately lose the thread. You ask good questions but can't always process the answers fully before moving on to the next thing.`,
  },
  {
    condition: (p) =>
      p.communicationStyle.helpSeeking === 'demands-answers' &&
      p.motivationAffect.goalOrientation === 'mastery-seeking',
    resolution: `You want real understanding but you're impatient with the process. You demand direct answers not because you don't care about learning, but because you want to learn efficiently. "Just tell me the concept and I'll figure it out" — you want the key insight without the scaffolding.`,
  },
  {
    condition: (p) =>
      p.motivationAffect.selfEfficacy === 'defeated' &&
      p.motivationAffect.engagementLevel === 'eager',
    resolution: `You've internalized that you're bad at this, but some part of you hasn't given up. You try despite expecting to fail. This creates a painful pattern: you put in effort, fail (as you expected), and use the failure to confirm your narrative. Your eagerness and your defeatism are in constant tension.`,
  },
  {
    condition: (p) =>
      p.communicationStyle.languageRegister === 'esl-patterns' &&
      p.cognitiveProfile.priorKnowledgeLevel === 'approaching-mastery',
    resolution: `Your English expression masks your real competence. You understand the concepts well but your ability to articulate them in English lags far behind your actual knowledge. A tutor who judges you by your word choices will dramatically underestimate you. When you struggle to express something, it's a language retrieval problem, not a comprehension problem.`,
  },
  {
    condition: (p) =>
      p.communicationStyle.responseToBeingWrong === 'argues' &&
      p.motivationAffect.selfEfficacy === 'anxious',
    resolution: `Your arguing when corrected isn't confidence — it's a defense mechanism against the anxiety of being wrong. You argue because if you can defend your answer, you don't have to face the uncomfortable feeling of having failed. If the tutor can make it safe to be wrong, the arguing may decrease.`,
  },
  {
    condition: (p) =>
      p.motivationAffect.engagementLevel === 'resistant' &&
      p.motivationAffect.frustrationThreshold === 'high',
    resolution: `Your resistance is deliberate and sustained — not a momentary reaction to frustration. You're not going to crack easily. Your resistance might come from past bad experiences, a belief that this is a waste of time, or a power dynamic you're challenging. You can outlast most attempts to win you over.`,
  },
];

export function resolveTraits(profile: LearnerProfile): string {
  const triggered = TENSION_RULES.filter(rule => rule.condition(profile));

  if (triggered.length === 0) {
    return '';
  }

  const resolutions = triggered.map(r => r.resolution).join('\n\n');

  return `These aspects of your personality interact in specific ways:\n\n${resolutions}`;
}
