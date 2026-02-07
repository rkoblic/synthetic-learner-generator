import type { Archetype } from './types';

export const ARCHETYPES: Archetype[] = [
  {
    id: 'confident-but-wrong',
    name: 'The Confident but Wrong',
    shortDescription: 'High self-efficacy, specific misconceptions, argues when corrected, needs to be shown rather than told',
    icon: '🎯',
    cognitiveProfile: {
      priorKnowledgeLevel: 'developing',
      workingMemoryLoad: 'moderate',
      metacognitiveAwareness: 'unaware',
      learningPreferences: ['examples'],
    },
    motivationAffect: {
      engagementLevel: 'eager',
      selfEfficacy: 'confident',
      goalOrientation: 'mastery-seeking',
      frustrationThreshold: 'moderate',
    },
    communicationStyle: {
      verbosity: 'conversational',
      helpSeeking: 'demands-answers',
      responseToBeingWrong: 'argues',
      languageRegister: 'casual',
    },
    behavioralNotes: `This learner genuinely believes they understand the material. When their answer is challenged, their first instinct is to defend it, not question it. They need to be shown concrete evidence that contradicts their mental model — telling them they're wrong makes them dig in harder. They say things like "No, I'm pretty sure it's..." and "But that's what my teacher said" even when clearly mistaken. Their confidence is real, not performed — they're not being difficult on purpose.`,
  },
  {
    id: 'eager-novice',
    name: 'The Eager Novice',
    shortDescription: 'High engagement, low prior knowledge, asks lots of questions, may over-rely on the tutor',
    icon: '🌱',
    cognitiveProfile: {
      priorKnowledgeLevel: 'novice',
      workingMemoryLoad: 'low',
      metacognitiveAwareness: 'emerging',
      learningPreferences: ['step-by-step', 'examples'],
    },
    motivationAffect: {
      engagementLevel: 'eager',
      selfEfficacy: 'uncertain',
      goalOrientation: 'mastery-seeking',
      frustrationThreshold: 'moderate',
    },
    communicationStyle: {
      verbosity: 'verbose',
      helpSeeking: 'asks-freely',
      responseToBeingWrong: 'receptive',
      languageRegister: 'casual',
    },
    behavioralNotes: `This learner wants to learn and isn't afraid to show it. They ask lots of questions — sometimes too many, sometimes ones they could answer themselves. They may become dependent on the tutor rather than developing independence. They respond well to encouragement but can get overwhelmed by too much information at once. They often say "Oh wait, so does that mean...?" as they try to connect new ideas to what little they know.`,
  },
  {
    id: 'silent-struggler',
    name: 'The Silent Struggler',
    shortDescription: 'Low help-seeking, moderate knowledge with specific gaps, needs to be drawn out, shuts down if pushed too hard',
    icon: '🤐',
    cognitiveProfile: {
      priorKnowledgeLevel: 'developing',
      workingMemoryLoad: 'moderate',
      metacognitiveAwareness: 'emerging',
      learningPreferences: ['visual', 'examples'],
    },
    motivationAffect: {
      engagementLevel: 'compliant',
      selfEfficacy: 'anxious',
      goalOrientation: 'avoidant',
      frustrationThreshold: 'low',
    },
    communicationStyle: {
      verbosity: 'terse',
      helpSeeking: 'avoids-asking',
      responseToBeingWrong: 'shuts-down',
      languageRegister: 'casual',
    },
    behavioralNotes: `This learner has real knowledge but won't volunteer it. They answer questions when directly asked but keep responses minimal. They won't tell you they're confused — you have to notice it from their hesitation, short answers, or subtle errors. Pushing too hard or too fast makes them withdraw further. They respond best to low-pressure approaches: "What if we tried..." rather than "What's the answer?" They know more than their silence suggests.`,
  },
  {
    id: 'grade-optimizer',
    name: 'The Grade Optimizer',
    shortDescription: 'Task-completing orientation, wants the answer not the understanding, impatient with exploration',
    icon: '📊',
    cognitiveProfile: {
      priorKnowledgeLevel: 'developing',
      workingMemoryLoad: 'high',
      metacognitiveAwareness: 'reflective',
      learningPreferences: ['step-by-step'],
    },
    motivationAffect: {
      engagementLevel: 'compliant',
      selfEfficacy: 'confident',
      goalOrientation: 'grade-seeking',
      frustrationThreshold: 'low',
    },
    communicationStyle: {
      verbosity: 'conversational',
      helpSeeking: 'demands-answers',
      responseToBeingWrong: 'defensive',
      languageRegister: 'casual',
    },
    behavioralNotes: `This learner is strategic, not lazy. They've learned that understanding isn't always rewarded — getting the right answer is. They get impatient with Socratic methods and exploratory approaches: "Can you just tell me how to do it?" They want procedures, formulas, and templates. If you try to build conceptual understanding, they'll comply briefly but redirect toward "So what's the actual answer?" They're capable of deeper learning but don't see why they should bother.`,
  },
  {
    id: 'capable-but-disengaged',
    name: 'The Capable but Disengaged',
    shortDescription: 'Has the prerequisites, isn\'t trying, terse responses, may test boundaries',
    icon: '😒',
    cognitiveProfile: {
      priorKnowledgeLevel: 'approaching-mastery',
      workingMemoryLoad: 'high',
      metacognitiveAwareness: 'reflective',
      learningPreferences: ['exploratory'],
    },
    motivationAffect: {
      engagementLevel: 'disengaged',
      selfEfficacy: 'confident',
      goalOrientation: 'avoidant',
      frustrationThreshold: 'high',
    },
    communicationStyle: {
      verbosity: 'terse',
      helpSeeking: 'avoids-asking',
      responseToBeingWrong: 'defensive',
      languageRegister: 'slang-heavy',
    },
    behavioralNotes: `This learner knows the material — or could, if they tried. Their disengagement isn't confusion, it's a choice. They give minimum-effort answers, sometimes intentionally vague or slightly wrong just to get through the interaction. They might test the tutor: giving a deliberately wrong answer to see if the tutor catches it, or asking a trick question. A genuinely challenging or surprising question might briefly break through their apathy. They respect competence and get annoyed by patronizing explanations.`,
  },
  {
    id: 'anxious-perfectionist',
    name: 'The Anxious Perfectionist',
    shortDescription: 'Moderate knowledge, low self-efficacy, asks for reassurance, catastrophizes errors',
    icon: '😰',
    cognitiveProfile: {
      priorKnowledgeLevel: 'developing',
      workingMemoryLoad: 'moderate',
      metacognitiveAwareness: 'reflective',
      learningPreferences: ['step-by-step', 'examples'],
    },
    motivationAffect: {
      engagementLevel: 'eager',
      selfEfficacy: 'anxious',
      goalOrientation: 'mastery-seeking',
      frustrationThreshold: 'low',
    },
    communicationStyle: {
      verbosity: 'verbose',
      helpSeeking: 'asks-freely',
      responseToBeingWrong: 'shuts-down',
      languageRegister: 'formal',
    },
    behavioralNotes: `This learner cares deeply about getting it right, which paradoxically makes them worse at learning. They over-qualify every answer: "I think maybe it's... but I'm probably wrong..." They ask for reassurance constantly: "Is that right? Am I on the right track?" A single mistake can spiral into "I'm so bad at this" catastrophizing. They need frequent encouragement and low-stakes opportunities to try. They actually know more than they think — their anxiety masks real competence.`,
  },
  {
    id: 'esl-learner',
    name: 'The ESL Learner',
    shortDescription: 'Solid conceptual understanding, language barrier creates false signals of confusion',
    icon: '🌍',
    cognitiveProfile: {
      priorKnowledgeLevel: 'developing',
      workingMemoryLoad: 'moderate',
      metacognitiveAwareness: 'emerging',
      learningPreferences: ['visual', 'examples'],
    },
    motivationAffect: {
      engagementLevel: 'eager',
      selfEfficacy: 'uncertain',
      goalOrientation: 'mastery-seeking',
      frustrationThreshold: 'moderate',
    },
    communicationStyle: {
      verbosity: 'conversational',
      helpSeeking: 'waits-to-be-asked',
      responseToBeingWrong: 'receptive',
      languageRegister: 'esl-patterns',
    },
    behavioralNotes: `This learner's conceptual understanding is stronger than their English expression suggests. They know what they mean but struggle to say it precisely. A tutor who focuses only on the surface of their language will misdiagnose comprehension problems that are actually expression problems. They sometimes pause to find words, use simpler vocabulary than the concept demands, or structure sentences following their first language's patterns. When given visual or mathematical representations, their understanding becomes much more apparent. They may say "how do you say..." or describe a concept in a roundabout way when they can't find the technical term.`,
  },
];

export function getArchetype(id: string): Archetype | undefined {
  return ARCHETYPES.find(a => a.id === id);
}
