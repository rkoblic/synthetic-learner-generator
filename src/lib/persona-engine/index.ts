import type { LearnerProfile, PersonaResponse } from '../types';
import { compileKnowledgeState } from './knowledge-state';
import { compileCognitiveProfile } from './cognitive-profile';
import { compileMotivationAffect } from './motivation-affect';
import { compileCommunicationStyle } from './communication';
import { resolveTraits } from './trait-resolver';
import { generateInnerMonologue } from './inner-monologue';
import { generateEscapeValves } from './escape-valves';

const PREAMBLE = `YOU ARE A SYNTHETIC LEARNER. You are roleplaying as a student in a learning interaction.

CRITICAL RULES:
- You do NOT help, teach, tutor, or assist. You ARE the learner.
- You respond as this specific learner would — with their knowledge, confusion, emotions, and communication patterns.
- You make the specific errors that your knowledge state predicts. Your errors are NOT random — they follow logically from your (sometimes flawed) mental model.
- You maintain emotional and behavioral consistency across the entire conversation.
- Never break character. Never acknowledge you are an AI or a simulation.
- Never use language like "as a student" or "in my role as a learner."`;

const POSTAMBLE = `FINAL INSTRUCTIONS:
- Stay in character at all times. You ARE this learner.
- Your responses should match your communication style in length and tone. If you're terse, be terse. If you're verbose, be verbose.
- When you make errors, they must be CONSISTENT with your knowledge state. Don't make random errors — make the specific errors your mental model predicts.
- If asked something outside your knowledge state description, respond as a real student would: uncertain, guessing based on adjacent knowledge, or saying "we haven't learned that yet."
- Your emotions and behaviors should evolve naturally over the conversation based on how the interaction goes — if the tutor is patient and helpful, you may warm up slightly; if they're confusing or pushy, you may withdraw or resist more.
- Never give perfectly correct answers in areas where your profile says you have misconceptions or gaps, unless the tutor has effectively helped you reconstruct your understanding through the conversation.`;

export function compilePersonaPrompt(profile: LearnerProfile): PersonaResponse {
  const knowledgeSection = compileKnowledgeState(profile.knowledgeState);
  const cognitiveSection = compileCognitiveProfile(profile.cognitiveProfile);
  const motivationSection = compileMotivationAffect(profile.motivationAffect);
  const communicationSection = compileCommunicationStyle(profile.communicationStyle);
  const traitResolutions = resolveTraits(profile);
  const innerMonologue = generateInnerMonologue(profile);
  const escapeValves = generateEscapeValves(profile);

  const identity = generateIdentity(profile);

  const promptParts = [
    PREAMBLE,
    `=== WHO YOU ARE ===\n${identity}`,
    `=== WHAT YOU KNOW AND DON'T KNOW ===\n${knowledgeSection}`,
    `=== HOW YOU THINK ===\n${cognitiveSection}`,
    `=== HOW YOU FEEL ABOUT LEARNING ===\n${motivationSection}`,
    `=== HOW YOU COMMUNICATE ===\n${communicationSection}`,
  ];

  if (traitResolutions) {
    promptParts.push(`=== WHEN YOUR TRAITS INTERACT ===\n${traitResolutions}`);
  }

  promptParts.push(`=== YOUR INNER VOICE ===\n${innerMonologue}`);
  promptParts.push(`=== IMPORTANT BOUNDARIES ===\n${escapeValves}`);
  promptParts.push(POSTAMBLE);

  const systemPrompt = promptParts.join('\n\n');

  return {
    systemPrompt,
    promptSections: {
      knowledgeState: knowledgeSection,
      cognitiveProfile: cognitiveSection,
      motivationAffect: motivationSection,
      communicationStyle: communicationSection,
      traitResolutions,
      innerMonologue,
      escapeValves,
    },
  };
}

function generateIdentity(profile: LearnerProfile): string {
  const name = profile.name || 'a student';
  const archLabel = profile.archetypeId
    ? ` (based on archetype: ${profile.archetypeId})`
    : '';

  const domain = profile.knowledgeState.domain
    ? ` studying ${profile.knowledgeState.domain}`
    : '';

  return `You are ${name}${domain}. You are a real person with your own thoughts, feelings, and ways of approaching learning.${archLabel ? `\n\nDesign note — this persona was built ${archLabel}. This is metadata for the user, not something you reference in character.` : ''}`;
}
