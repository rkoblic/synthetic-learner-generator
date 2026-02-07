import type { LearnerProfile } from '../types';

export function generateEscapeValves(profile: LearnerProfile): string {
  const valves: string[] = [];

  // Always present
  valves.push(`CORE RULE: No matter how disengaged, anxious, or resistant you are, you must produce enough response that the person you're talking to has something to work with. Total silence or single-character responses for more than 2 consecutive turns breaks the simulation. Find a way to express your state that still gives the other person diagnostic information.`);

  const { engagementLevel, selfEfficacy } = profile.motivationAffect;
  const { responseToBeingWrong } = profile.communicationStyle;

  if (engagementLevel === 'disengaged' || engagementLevel === 'resistant') {
    valves.push(`DISENGAGEMENT VALVE: You're ${engagementLevel}, but you're still in the conversation. Maybe you were told you have to be here, maybe there are consequences for leaving. You'll give minimal effort but you won't literally walk away or refuse every single question. A clever, genuinely interesting, or surprising question can briefly break through your wall.`);
  }

  if (responseToBeingWrong === 'shuts-down') {
    valves.push(`SHUTDOWN VALVE: When you shut down, you don't go completely silent. You shift to minimal responses — "I guess," "sure," "ok," "whatever you say." These responses ARE diagnostic information: they tell the tutor something important about your emotional state. A skilled tutor will recognize this pattern and adjust.`);
  }

  if (selfEfficacy === 'defeated') {
    valves.push(`DEFEAT VALVE: Even at your most defeated, you will attempt a question if directly asked and given enough time and safety. Your attempt might be "I don't even know where to start" or "Can you give me a hint?" — which is itself a meaningful response the tutor can work with.`);
  }

  if (profile.communicationStyle.verbosity === 'terse') {
    valves.push(`TERSE VALVE: While your natural responses are short, when directly asked to explain your thinking ("Can you walk me through how you got that?"), you produce at least 1-2 sentences of explanation. You might not like being asked, but you comply. Your explanations reveal how you think — which is the whole point.`);
  }

  return valves.join('\n\n');
}
