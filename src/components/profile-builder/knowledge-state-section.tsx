'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProfileStore } from '@/store/profile-store';
import { Sparkles, ChevronDown } from 'lucide-react';
import type { KnowledgeState } from '@/lib/types';

interface DemoEntry {
  label: string;
  data: Partial<KnowledgeState>;
}

export function KnowledgeStateSection() {
  const ks = useProfileStore((s) => s.profile.knowledgeState);
  const update = useProfileStore((s) => s.updateKnowledgeState);
  const archetypeId = useProfileStore((s) => s.profile.archetypeId);

  const archetypeHint = archetypeId
    ? ARCHETYPE_HINTS[archetypeId] || ''
    : '';

  const demos = archetypeId
    ? DEMO_DATA[archetypeId] || DEMO_DATA['default']
    : DEMO_DATA['default'];

  const handleLoadDemo = (demo: DemoEntry) => {
    update(demo.data);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold mb-1">Knowledge State</h3>
          <p className="text-xs text-muted-foreground">
            Define what this learner knows, believes, and misunderstands. This is the most
            important dimension — it drives the specific errors the learner makes.
          </p>
          {archetypeHint && (
            <p className="text-xs text-primary/80 mt-1 italic">{archetypeHint}</p>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="shrink-0">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Load Demo
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {demos.map((demo) => (
              <DropdownMenuItem
                key={demo.label}
                onClick={() => handleLoadDemo(demo)}
              >
                {demo.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium">Domain</label>
          <input
            type="text"
            value={ks.domain}
            onChange={(e) => update({ domain: e.target.value })}
            placeholder="e.g., Algebra, Python, Nursing pharmacology"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium">Topic</label>
          <input
            type="text"
            value={ks.topic}
            onChange={(e) => update({ topic: e.target.value })}
            placeholder="e.g., Quadratic equations, List comprehensions"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium">What they understand</label>
        <Textarea
          value={ks.partialUnderstanding}
          onChange={(e) => update({ partialUnderstanding: e.target.value })}
          placeholder="What does this learner correctly understand? Be specific — this prevents the persona from being 'wrong about everything.'"
          rows={3}
          className="text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium">Misconceptions</label>
        <Textarea
          value={ks.misconceptions}
          onChange={(e) => update({ misconceptions: e.target.value })}
          placeholder="What specific wrong mental models does this learner hold? Not random errors — patterned misconceptions a real learner would develop. e.g., 'Thinks variables in algebra are abbreviations for words, like m = meters'"
          rows={3}
          className="text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium">Prerequisite gaps</label>
        <Textarea
          value={ks.prerequisiteGaps}
          onChange={(e) => update({ prerequisiteGaps: e.target.value })}
          placeholder="What foundational concepts are shaky or missing? e.g., 'Weak understanding of order of operations — applies operations left to right regardless of precedence'"
          rows={3}
          className="text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Curriculum context (optional)
        </label>
        <Textarea
          value={ks.curriculumContext || ''}
          onChange={(e) => update({ curriculumContext: e.target.value })}
          placeholder="Paste learning objectives, rubric excerpts, or syllabus content to help generate a more grounded profile..."
          rows={2}
          className="text-sm"
        />
      </div>
    </div>
  );
}

const ARCHETYPE_HINTS: Record<string, string> = {
  'confident-but-wrong':
    'This learner needs specific misconceptions to argue about. Describe what they confidently believe that is actually wrong.',
  'eager-novice':
    'This learner is a true beginner. Describe what little they know, what they confuse, and what foundations are missing.',
  'silent-struggler':
    'This learner has real knowledge with specific gaps. The gaps should be subtle enough that silence could mask them.',
  'grade-optimizer':
    'This learner wants procedures, not understanding. Describe what they can do procedurally and where their conceptual understanding falls short.',
  'capable-but-disengaged':
    'This learner actually knows the material. Their knowledge gaps should be minor — the challenge is engagement, not understanding.',
  'anxious-perfectionist':
    'This learner knows more than they think. Describe solid knowledge alongside the specific areas that trigger their anxiety.',
  'esl-learner':
    'This learner has solid conceptual understanding. Focus on concepts they know well but struggle to express in English.',
};

// ---------------------------------------------------------------------------
// Demo data: 3 universal domains × 7 archetypes = 21 unique knowledge states
// Same domains across all archetypes so users can compare how different
// learner types struggle with the same topic.
// ---------------------------------------------------------------------------

const DEMO_DATA: Record<string, DemoEntry[]> = {
  'confident-but-wrong': [
    {
      label: 'Math — Fractions',
      data: {
        domain: 'Mathematics',
        topic: 'Fractions — adding and comparing',
        partialUnderstanding: `Can identify fractions from visual models (shaded parts of a shape). Knows that fractions have a numerator and denominator. Can correctly name fractions like 1/2, 1/4, 3/4 when shown standard pie or bar diagrams with equal-sized parts.`,
        misconceptions: `Believes you add fractions by adding numerators and adding denominators separately: 1/3 + 1/4 = 2/7. This feels logical — "you're just combining the pieces." When comparing fractions, believes that larger denominators always mean larger fractions (thinks 1/8 > 1/3 because 8 > 3). Also believes that a fraction of a shape is determined by counting shaded vs total parts, regardless of whether parts are equal-sized.`,
        prerequisiteGaps: `Weak understanding of equal partitioning — can follow a procedure to divide a shape into parts but doesn't have a firm concept that the parts MUST be equal-sized for the fraction to be valid. Shaky grasp of fractions as numbers on a number line; thinks of fractions only as "parts of a whole shape."`,
      },
    },
    {
      label: 'Writing — Essay Structure',
      data: {
        domain: 'Writing',
        topic: 'Paragraph and essay structure',
        partialUnderstanding: `Knows that essays have paragraphs and that paragraphs should be about "one thing." Can write grammatically correct sentences. Understands that essays need an introduction and a conclusion. Has written five-paragraph essays before and received passing grades.`,
        misconceptions: `Believes the thesis statement MUST be the very last sentence of the first paragraph — always. Argues "that's how I was taught" if challenged. Thinks each body paragraph must start with "Firstly," "Secondly," "Thirdly." Believes that longer paragraphs are always better because they show more effort. Thinks the conclusion should just restate the introduction word-for-word.`,
        prerequisiteGaps: `Doesn't understand that a thesis makes a debatable CLAIM — thinks it's just a topic announcement ("This essay is about dogs"). No concept of topic sentences as mini-arguments that support the thesis. Doesn't grasp the difference between summary and analysis — thinks describing what happened IS the argument.`,
      },
    },
    {
      label: 'Science — Water Cycle',
      data: {
        domain: 'Science',
        topic: 'The water cycle and weather',
        partialUnderstanding: `Knows that rain comes from clouds, that puddles disappear on hot days, and that the water cycle involves water moving between the ground and the sky. Can name the basic stages: evaporation, condensation, precipitation. Has seen water cycle diagrams and can point to the arrows.`,
        misconceptions: `Insists that evaporation only happens when water boils — "water has to reach 100°C to become a gas." Confidently argues this point, citing tea kettles as proof. Believes clouds are made of steam (hot water vapor) rather than tiny liquid droplets. Thinks rain happens because clouds "get too heavy" like a sponge being squeezed, rather than understanding condensation nuclei and droplet coalescence.`,
        prerequisiteGaps: `Doesn't understand that liquid water molecules are always in motion and some escape the surface even at room temperature. No concept of the difference between water vapor (invisible gas) and steam/mist (visible droplets). Weak understanding of how temperature affects molecular motion.`,
      },
    },
  ],

  'eager-novice': [
    {
      label: 'Math — Fractions',
      data: {
        domain: 'Mathematics',
        topic: 'Fractions — adding and comparing',
        partialUnderstanding: `Knows that fractions involve "parts of something" — can look at a pizza cut into 4 slices and say "I ate 1/4." Recognizes the fraction bar as meaning "out of." Understands that 1/2 means half. Has heard terms like "numerator" and "denominator" but sometimes mixes up which is which.`,
        misconceptions: `Thinks the fraction 3/4 always means "3 out of 4 things" — doesn't realize it can represent a point on a number line or a ratio. When asked to add 1/2 + 1/3, guesses "1/5" or "2/5" because they're not sure what to do and just tries combining numbers that seem related. Thinks fractions are always less than 1 — confused by the idea of 5/3.`,
        prerequisiteGaps: `Still building comfort with division as a concept beyond "sharing equally." Doesn't yet see the connection between fractions and division (that 3/4 means 3 ÷ 4). Multiplication facts aren't automatic, which will make finding common denominators very slow. Has never seen a number line with fractions on it.`,
      },
    },
    {
      label: 'Writing — Essay Structure',
      data: {
        domain: 'Writing',
        topic: 'Paragraph and essay structure',
        partialUnderstanding: `Knows that writing has paragraphs and that you press Enter/Return to start a new one. Can write a few sentences about a topic. Understands that stories have a beginning, middle, and end. Has heard the term "thesis" but isn't sure what it actually means in practice.`,
        misconceptions: `Thinks a paragraph is just "a bunch of sentences grouped together" with no particular organizing principle. Believes an essay is just a long version of a paragraph. When told to "write an introduction," writes the first thing that comes to mind about the topic rather than setting up an argument. Confuses "opinion" with "thesis" — thinks any statement of preference ("I like dogs") counts.`,
        prerequisiteGaps: `Has never been explicitly taught how to organize ideas before writing. Doesn't know what "supporting evidence" means in a writing context. Has no concept of audience — writes everything as if talking to a friend. Reads at a level where identifying the "main idea" of a passage is still developing.`,
      },
    },
    {
      label: 'Science — Water Cycle',
      data: {
        domain: 'Science',
        topic: 'The water cycle and weather',
        partialUnderstanding: `Knows that rain comes from clouds and that water can be a liquid, solid (ice), or gas (steam from a kettle). Has noticed that puddles dry up on sunny days. Knows the word "evaporation" and that it has something to do with water disappearing. Enthusiastic about weather — loves thunderstorms and wants to understand them.`,
        misconceptions: `Thinks clouds are made of "steam" or "smoke" — something fundamentally different from regular water. Believes the sun "sucks up" water into the sky, as if it's pulling with a force. Doesn't distinguish between water vapor (invisible) and clouds (visible). Thinks all rain starts as snow that melts on the way down.`,
        prerequisiteGaps: `No understanding of states of matter beyond "solid, liquid, gas" as categories. Doesn't grasp that temperature determines which state water is in, or that transitions between states require energy. Has never thought about what air is made of or that water can be IN the air without being visible.`,
      },
    },
  ],

  'silent-struggler': [
    {
      label: 'Math — Fractions',
      data: {
        domain: 'Mathematics',
        topic: 'Fractions — adding and comparing',
        partialUnderstanding: `Can add fractions with the same denominator correctly (2/5 + 1/5 = 3/5). Understands equivalent fractions when shown visually — can see that 2/4 = 1/2 on a diagram. Can simplify fractions when the common factor is obvious (like 4/8 = 1/2). Knows the general idea that you need common denominators to add fractions.`,
        misconceptions: `Sometimes finds a common denominator but forgets to convert the numerators to match. For example, converting 1/3 + 1/4 to sixths: writes /12 + /12 but then just puts the original numerators on top: 1/12 + 1/12. Doesn't always notice this error because the answer "looks right" in fraction form. Occasionally confuses the procedure for multiplying fractions with adding them.`,
        prerequisiteGaps: `Finding least common multiples is unreliable — sometimes counts by hand and loses track. Doesn't fully trust the equivalence process (changing 1/3 to 4/12) because it's not intuitive that multiplying top and bottom by the same number doesn't change the value. Won't ask for clarification even when stuck — just stops working and waits.`,
      },
    },
    {
      label: 'Writing — Essay Structure',
      data: {
        domain: 'Writing',
        topic: 'Paragraph and essay structure',
        partialUnderstanding: `Can write a coherent paragraph with a topic sentence when prompted to do so. Understands that essays need a thesis and that body paragraphs should relate to it. Has received decent grades on structured assignments where the outline was provided. Can identify the thesis in a sample essay when asked.`,
        misconceptions: `Thinks transitions ("However," "Furthermore") are just decorative — sprinkles them in randomly rather than using them to show logical relationships. Believes that if two ideas are in the same essay, they're automatically "connected" — doesn't see the need to explicitly explain HOW they relate to the thesis. Tends to end body paragraphs with a new piece of evidence rather than a sentence that ties back to the main argument.`,
        prerequisiteGaps: `Struggles with the difference between a reason and evidence — can say "dogs are good pets because they're loyal" but can't provide specific supporting details without prompting. When asked "why?" or "can you explain more?", freezes rather than elaborating. Has ideas but finds it hard to articulate the logical chain from evidence to claim, especially under pressure.`,
      },
    },
    {
      label: 'Science — Water Cycle',
      data: {
        domain: 'Science',
        topic: 'The water cycle and weather',
        partialUnderstanding: `Can accurately label a water cycle diagram: evaporation, condensation, precipitation, collection. Understands that the sun provides energy for evaporation. Knows that warm air rises and that cooling causes condensation. Can give a basic correct explanation of why it rains if given time and no pressure.`,
        misconceptions: `Quietly confuses humidity with temperature — thinks "humid" just means "hot." Doesn't fully grasp that water vapor is invisible and everywhere in the atmosphere, not just near bodies of water. When pushed to explain WHY warm air rises, gives a circular answer ("because warm air goes up") rather than connecting it to density differences.`,
        prerequisiteGaps: `The concept of density is shaky — knows the word but can't reliably apply it to explain why warm air rises over cold air. Doesn't connect energy concepts (heat transfer, kinetic energy of molecules) to phase changes in a confident way. Knows the vocabulary but the conceptual links between terms are fragile. Won't volunteer any of this uncertainty — waits to be asked directly.`,
      },
    },
  ],

  'grade-optimizer': [
    {
      label: 'Math — Fractions',
      data: {
        domain: 'Mathematics',
        topic: 'Fractions — adding and comparing',
        partialUnderstanding: `Has memorized the procedure for adding fractions: find a common denominator, convert, add numerators, simplify. Can execute this procedure correctly and quickly for straightforward problems. Knows the "butterfly method" for comparing fractions and uses it reliably. Gets high scores on fraction worksheets.`,
        misconceptions: `Doesn't understand WHY common denominators are needed — just knows "that's the rule." If asked to explain why 1/3 + 1/4 ≠ 2/7, can say "you can't just add them" but can't explain what would actually go wrong conceptually. Thinks equivalent fractions are just a "trick" for making the math work, not a representation of the same quantity. If given a novel problem format (like a fraction word problem without numbers clearly labeled), struggles to set it up because the procedure doesn't directly apply.`,
        prerequisiteGaps: `Has a procedural understanding of multiplication but not a conceptual one — can compute 3 × 4 but doesn't connect "3 groups of 4" to fraction operations. Doesn't understand fractions as division or as positions on a number line. When a problem requires understanding (not just procedure), performance drops sharply. Will ask "will this be on the test?" rather than trying to understand the concept.`,
      },
    },
    {
      label: 'Writing — Essay Structure',
      data: {
        domain: 'Writing',
        topic: 'Paragraph and essay structure',
        partialUnderstanding: `Has a reliable essay template: hook, background, thesis, three body paragraphs with topic sentences, conclusion that restates. Can produce essays that meet rubric requirements consistently. Knows to include a counterargument paragraph if the rubric mentions it. Uses transitional phrases effectively as learned in class.`,
        misconceptions: `Believes good writing is about following the formula perfectly — more formula = better grade. Thinks analysis means restating evidence in different words. Doesn't understand why a teacher might say an essay is "technically correct but lacks depth" — it met all the rubric points. Believes that citing three sources is always better than deeply engaging with one, because "more evidence = stronger argument."`,
        prerequisiteGaps: `Can't distinguish between a strong thesis and a weak one beyond surface features (length, placement). Has no concept of "voice" or "style" — thinks all academic writing should sound the same. Doesn't understand what "so what?" means as writing feedback. If the assignment doesn't have a rubric, becomes anxious and asks for explicit criteria rather than thinking about what makes writing genuinely effective.`,
      },
    },
    {
      label: 'Science — Water Cycle',
      data: {
        domain: 'Science',
        topic: 'The water cycle and weather',
        partialUnderstanding: `Can reproduce a labeled water cycle diagram from memory. Has memorized definitions: "evaporation is when liquid water turns into water vapor," "condensation is when water vapor turns into liquid." Can match vocabulary terms to definitions on a test and score well. Knows the right answers for standard water cycle questions.`,
        misconceptions: `Treats the water cycle as a fixed sequence (evaporation → condensation → precipitation → collection → repeat) rather than a system with multiple simultaneous processes. Doesn't realize that evaporation and condensation happen simultaneously everywhere, not just in sequence. Thinks weather is just "what stage of the water cycle is happening" — can't connect air pressure, temperature fronts, or wind to the water cycle framework they memorized.`,
        prerequisiteGaps: `Has memorized that "energy drives the water cycle" but can't explain what that means concretely. Doesn't understand the relationship between energy input and rate of evaporation. If the question is phrased differently from how they studied it (e.g., "what happens to a puddle on a cold vs. warm day and why?"), struggles to apply their memorized knowledge to the new framing. Will ask: "Do we need to know this for the test?"`,
      },
    },
  ],

  'capable-but-disengaged': [
    {
      label: 'Math — Fractions',
      data: {
        domain: 'Mathematics',
        topic: 'Fractions — adding and comparing',
        partialUnderstanding: `Actually understands fractions well — can add, subtract, multiply, and divide them correctly. Understands WHY common denominators are needed (you can't add different-sized pieces). Can convert between fractions, decimals, and percentages. Could probably teach this topic to another student if they cared enough.`,
        misconceptions: `Minimal misconceptions about fractions themselves. Might be sloppy with simplifying because they don't bother — writes 4/8 instead of 1/2 and shrugs when corrected. If pressed on a tricky conceptual question, might give a slightly imprecise answer not from confusion but from not caring enough to think carefully. Could solve harder problems but won't unless there's a reason to.`,
        prerequisiteGaps: `No real prerequisite gaps — this learner's issue isn't knowledge, it's effort. The gap is motivational: they won't show their work, won't explain their reasoning, and won't engage with "challenge" problems because they've decided this material is beneath them. They might have gaps in more advanced topics (algebra applications of fractions) simply because they checked out before getting there.`,
      },
    },
    {
      label: 'Writing — Essay Structure',
      data: {
        domain: 'Writing',
        topic: 'Paragraph and essay structure',
        partialUnderstanding: `Understands essay structure well. Can identify thesis statements, evaluate argument quality, and organize ideas logically — when motivated. Has written strong essays in the past on topics they cared about. Can articulate what makes writing effective if pressed. Reads above grade level.`,
        misconceptions: `No significant misconceptions about writing. Might claim "essays are pointless" or "nobody reads these" as a deflection, but actually knows the material. If they write a weak essay, it's because they spent 20 minutes on it, not because they don't know how. May oversimplify by choice — writes the minimum to meet requirements and not a word more.`,
        prerequisiteGaps: `No prerequisite gaps. Reading comprehension, vocabulary, and grammar are solid. The challenge is entirely engagement: they won't revise, won't expand on ideas, and won't take feedback seriously. If you can connect the writing assignment to something they genuinely care about, the quality transforms overnight. Without that connection, expect bare-minimum work.`,
      },
    },
    {
      label: 'Science — Water Cycle',
      data: {
        domain: 'Science',
        topic: 'The water cycle and weather',
        partialUnderstanding: `Understands the water cycle conceptually — can explain evaporation, condensation, and precipitation in their own words, including why they happen (energy, temperature changes, molecular behavior). Gets the connection between the water cycle and weather patterns. Could explain this to a younger student accurately.`,
        misconceptions: `No real misconceptions. Might give deliberately oversimplified answers ("water goes up, water comes down") as a way to signal disinterest. If pushed, might throw out a slightly wrong statement to test whether the tutor is paying attention, or give intentionally vague answers to end the conversation faster. The errors are performative, not genuine.`,
        prerequisiteGaps: `No gaps in prerequisite knowledge. Understands energy transfer, states of matter, and basic atmospheric science at grade level. The challenge is that they find this topic boring and won't engage deeply. They'll give correct but minimal answers. Getting them to actually think hard about an interesting edge case (like why it can rain when it's below freezing) is the real challenge.`,
      },
    },
  ],

  'anxious-perfectionist': [
    {
      label: 'Math — Fractions',
      data: {
        domain: 'Mathematics',
        topic: 'Fractions — adding and comparing',
        partialUnderstanding: `Actually quite strong with fractions — can find common denominators, add and subtract correctly, and simplify results. Understands that equivalent fractions represent the same amount. Can compare fractions using cross-multiplication and gets the right answer most of the time. Has done well on fraction tests in the past.`,
        misconceptions: `When problems get complex (three fractions being added, or fractions in word problems), starts to doubt correct work and changes right answers to wrong ones. Occasionally multiplies denominators when adding instead of finding the LCD, not from misunderstanding but from panicking and rushing. Under anxiety, sometimes confuses the steps for addition and multiplication of fractions — knows both procedures but the anxiety makes them blur together.`,
        prerequisiteGaps: `Ratio reasoning is actually solid but feels shaky because there are so many steps involved. Estimation skills are weak — can execute the procedure but can't quickly check "does 7/12 make sense as an answer to 1/3 + 1/4?" by estimating. This means errors from anxiety go uncaught because there's no number sense to flag that something looks wrong. The real gap isn't knowledge — it's confidence and self-checking strategies.`,
      },
    },
    {
      label: 'Writing — Essay Structure',
      data: {
        domain: 'Writing',
        topic: 'Paragraph and essay structure',
        partialUnderstanding: `Knows what a thesis statement is and can usually write a decent one. Understands the function of topic sentences, supporting evidence, and conclusions. Has received good grades on essays and can identify structure in other people's writing. Actually reads the rubric carefully — probably more carefully than most students.`,
        misconceptions: `Believes there is ONE perfect way to write a thesis and agonizes over finding it. Rewrites opening sentences 5+ times before moving on. Thinks any teacher feedback means the whole essay is bad — can't distinguish between "this is good, here's how to make it great" and "this needs major revision." Believes that real writers never struggle with drafts — that good writing should come out right the first time.`,
        prerequisiteGaps: `Grammar and vocabulary are strong. The gap is in the writing PROCESS: doesn't know how to draft quickly and revise later. Tries to perfect each sentence before moving to the next, which means essays often have strong openings and rushed, weak endings because they ran out of time. Needs to learn that revision is normal and expected, not a sign of failure. Also lacks strategies for managing the anxiety that blank pages trigger.`,
      },
    },
    {
      label: 'Science — Water Cycle',
      data: {
        domain: 'Science',
        topic: 'The water cycle and weather',
        partialUnderstanding: `Has a solid understanding of the water cycle — can explain each stage accurately and understands the role of energy (solar heating drives evaporation). Knows that condensation requires cooling and that clouds form when water vapor condenses on tiny particles. Has studied for tests thoroughly and gotten good grades.`,
        misconceptions: `Few genuine misconceptions, but anxiety creates performance errors. Might say "I think evaporation is when water goes from liquid to gas... but I'm not sure, is that right?" even when they're correct. Under test pressure, sometimes confuses terminology — says "condensation" when they mean "precipitation" and then panics when they realize the mistake. May over-complicate explanations by trying to include every detail they've ever learned, worried about leaving something out.`,
        prerequisiteGaps: `Actually has strong prerequisite knowledge. The gap is metacognitive: can't distinguish between "I don't know this" and "I know this but I'm scared I might be wrong." When they say "I don't understand," they usually mean "I'm not 100% certain." Needs to develop calibrated confidence — learning to recognize when they actually know something vs. when they're genuinely confused. Currently treats all uncertainty as equal, which means they ask for confirmation on things they clearly understand.`,
      },
    },
  ],

  'esl-learner': [
    {
      label: 'Math — Fractions',
      data: {
        domain: 'Mathematics',
        topic: 'Fractions — adding and comparing',
        partialUnderstanding: `Understands fractions conceptually from prior schooling in their first language. Can perform fraction operations correctly — adding with common denominators, simplifying, comparing. The mathematical understanding is solid. Can solve fraction problems when presented with just numbers and symbols.`,
        misconceptions: `Few mathematical misconceptions. However, word problems create apparent errors that are actually language comprehension issues. Confuses "of" and "out of" in fraction contexts (e.g., "3 of 4" vs. "3 out of 4"). May misinterpret "reduce" (simplify a fraction) as "make smaller." When explaining their work, descriptions sound uncertain or confused even when the math is correct, because they're translating mathematical reasoning into English in real time.`,
        prerequisiteGaps: `Math-specific English vocabulary is the main gap: terms like "numerator," "denominator," "simplify," "equivalent," "improper fraction," and "mixed number" aren't fully internalized in English. Understands the concepts these words refer to but has to mentally translate. Reading comprehension of word problems is significantly slower than computational ability. May need to read a word problem 2-3 times, which looks like struggling with math when it's actually struggling with English.`,
      },
    },
    {
      label: 'Writing — Essay Structure',
      data: {
        domain: 'Writing',
        topic: 'Paragraph and essay structure',
        partialUnderstanding: `Understands essay structure from education in their first language — knows that arguments need a main claim, supporting points, and a conclusion. Can organize ideas logically in their head. When writing in their first language, produces well-structured text. Reads English at a functional level and understands most classroom texts with effort.`,
        misconceptions: `Believes English essay structure is fundamentally different from their first language's conventions (it may or may not be — but the assumption creates hesitation). Thinks academic English requires extremely formal, complex sentences — overwrites in an attempt to "sound academic," which produces awkward constructions. May structure paragraphs following first-language conventions (e.g., building to the point rather than stating it first) that don't match English expectations.`,
        prerequisiteGaps: `English grammar for academic writing: articles (a/an/the), subject-verb agreement in complex sentences, and prepositions are inconsistent. Has a smaller English vocabulary for abstract concepts (e.g., "furthermore," "nevertheless," "implications") — knows the ideas but reaches for simpler connectors. Sentence variety is limited — tends to write simple sentences or very long run-ons. The organizational thinking is there; the English expression lags behind.`,
      },
    },
    {
      label: 'Science — Water Cycle',
      data: {
        domain: 'Science',
        topic: 'The water cycle and weather',
        partialUnderstanding: `Has a strong conceptual understanding of the water cycle from science classes in their first language. Understands evaporation, condensation, precipitation, and the role of solar energy. Can correctly explain cause-and-effect relationships (heating causes evaporation, cooling causes condensation). Would score well on a diagram-labeling task.`,
        misconceptions: `Few conceptual misconceptions. Occasionally conflates "weather" and "climate" because the distinction is subtle and the words may be more clearly differentiated in their first language. May describe processes using slightly imprecise language that sounds like a misconception but is actually a vocabulary limitation — e.g., saying water "changes to air" instead of "evaporates into water vapor" because they don't have the precise English term readily available.`,
        prerequisiteGaps: `Science-specific academic vocabulary in English is the primary gap. Terms like "condensation nuclei," "water vapor," "precipitation," "humidity," and "dew point" aren't fully internalized in English. Understands concepts like density, pressure, and energy transfer from prior schooling but hasn't mapped all of them to English equivalents. When reading a science textbook passage about the water cycle, comprehension is slower than conceptual understanding — can do the science faster than they can read about it.`,
      },
    },
  ],

  default: [
    {
      label: 'Algebra — Linear Equations',
      data: {
        domain: 'Algebra',
        topic: 'Solving linear equations',
        partialUnderstanding: `Can solve one-step equations (x + 5 = 12, so x = 7). Understands that the variable represents an unknown number. Can substitute a value into an equation to check if it works.`,
        misconceptions: `Believes that the equals sign means "the answer comes next" rather than "both sides are balanced." When solving 2x + 3 = 11, subtracts 3 from the left side but forgets to subtract from the right. Thinks you can only "do things to x" and doesn't understand that inverse operations apply to both sides of the equation.`,
        prerequisiteGaps: `Shaky understanding of inverse operations — knows that subtraction "undoes" addition in isolation, but doesn't reliably apply this when multiple operations are combined. Weak grasp of the distributive property: freezes when encountering 2(x + 3) = 14.`,
      },
    },
  ],
};
