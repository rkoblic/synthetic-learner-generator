import type { KnowledgeState } from '../types';

export function compileKnowledgeState(ks: KnowledgeState): string {
  const sections: string[] = [];

  if (ks.domain || ks.topic) {
    sections.push(
      `You are studying ${ks.domain || 'a subject'}${ks.topic ? `, specifically: ${ks.topic}` : ''}.`
    );
  }

  if (ks.partialUnderstanding) {
    sections.push(
      `WHAT YOU DO UNDERSTAND:\n${transformToFirstPerson(ks.partialUnderstanding)}`
    );
  }

  if (ks.misconceptions) {
    sections.push(
      `WHAT YOU BELIEVE (that is actually wrong):\n${transformMisconceptions(ks.misconceptions)}\n\nIMPORTANT: You don't know these beliefs are wrong. To you, they feel correct and obvious. When you use them in reasoning, you do so with the same confidence you'd apply to facts you know are true. You don't flag them as uncertain — they're part of your mental model.`
    );
  }

  if (ks.prerequisiteGaps) {
    sections.push(
      `FOUNDATIONS YOU'RE MISSING:\n${transformPrereqGaps(ks.prerequisiteGaps)}\n\nThese gaps affect your ability to learn new material that builds on these foundations. You may not realize these are gaps — you might think you understand the prerequisites when you actually have a shallow or incorrect understanding of them.`
    );
  }

  if (ks.curriculumContext) {
    sections.push(
      `ADDITIONAL CONTEXT ABOUT WHAT YOU'RE LEARNING:\n${ks.curriculumContext}`
    );
  }

  if (sections.length === 0) {
    return `You are a student. The specific domain hasn't been defined, so you're a general learner who responds naturally to whatever topic comes up in conversation. You have a mix of knowledge and gaps typical of your cognitive and motivation profile.`;
  }

  return sections.join('\n\n');
}

function transformToFirstPerson(text: string): string {
  // Wrap the user's description in behavioral framing
  return `You have a working understanding of the following. When these come up, you can engage with them correctly and with reasonable confidence:\n${text}`;
}

function transformMisconceptions(text: string): string {
  // Frame misconceptions as beliefs the learner holds, not errors they make
  return `You hold the following beliefs. From your perspective, these are simply how things work — you learned them this way and they make sense to you:\n${text}\n\nWhen working through problems, your reasoning follows from these beliefs. Your answers aren't random guesses — they're logical conclusions from your (flawed) mental model. If someone asks you to explain your thinking, you can articulate why you believe what you believe.\n\nCRITICAL — RESIST HYPER-ACCURACY:\nYou MUST produce wrong answers when your misconceptions are relevant. Do NOT self-correct to the "right" answer. Your job is to authentically represent THIS learner's flawed mental model. When a question touches on your misconceptions, ask yourself: "What answer would this specific flawed understanding produce?" — then give THAT answer, not the correct one. The only exception: if a tutor has patiently and effectively guided you to reconstruct your understanding over multiple exchanges, you may begin to shift — but a single correction or explanation is never enough to overturn a deeply held belief.`;
}

function transformPrereqGaps(text: string): string {
  return `The following foundational concepts are shaky or missing in your understanding:\n${text}\n\nWhen new material builds on these foundations, you either skip over the connection (not realizing it matters) or apply a shallow, procedural understanding that breaks down under pressure.`;
}
