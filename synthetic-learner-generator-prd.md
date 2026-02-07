# Synthetic Learner Generator — Product Requirements Document

## The Problem

People are building AI-powered learning tools at an unprecedented pace — AI tutors, custom GPTs, courseware, coaching bots. But almost nobody is testing them against realistic learner behavior before shipping. Builders test by talking to their own tools themselves, which means they're testing against one persona: a motivated, knowledgeable adult who already knows what the tool is supposed to do. That's not who will actually use it.

Meanwhile, the techniques for generating synthetic personas do exist (statistical grounding, personality dimensions, behavioral modeling), but they live in research contexts and enterprise R&D labs. There's nothing accessible that says: "Here's a realistic learner you can throw at your AI tutor to see if it actually works."

## The Opportunity

A tool that generates grounded, realistic synthetic learner profiles — and makes them conversationally "playable" — so that anyone building AI learning experiences can stress-test their work against the diversity of learners who will actually show up.

What makes this different from generic persona generators:

- **Grounded in learning science, not just personality traits.** A synthetic learner has a *learning state* — specific misconceptions, prerequisite gaps, partially formed understanding — not just "introverted" or "unmotivated."
- **Powered by real curriculum structure.** By connecting to the Learning Commons Knowledge Graph, learner profiles can be anchored to actual standards, learning components, and prerequisite chains. "This learner thinks ¾ means 3 things out of 4 things" is rooted in a real, mappable gap in 3.NF.A.1.
- **Designed to behave coherently in dialogue.** Generating a list of 100 persona traits is easy. Getting a synthetic learner to *perform consistently* across a multi-turn conversation — where traits interact and compete — is the hard problem. This tool encodes lessons learned from building MentorAI's pedagogical promptbook.

## Target Users

1. **Vibe coders and indie builders** creating AI tutors, GPTs, or learning chatbots who need something better than testing on themselves
2. **Learning designers and instructional designers** evaluating AI-powered courseware
3. **EdTech product teams** who need to QA conversational learning features across learner types
4. **Researchers and faculty** exploring how AI responds to different learner profiles

## Core Concept

### The Flow

1. **Configure a learner** — Select or build a synthetic learner profile along meaningful dimensions
2. **Generate the profile** — The system assembles a coherent learner persona with internal consistency
3. **Interact with the learner** — Chat with the synthetic learner directly, or export the persona prompt to paste into your own AI tool
4. **Evaluate the interaction** (stretch) — Run lightweight eval criteria against a conversation between your AI tool and the synthetic learner

### Learner Profile Dimensions

The profile builder should organize learner characteristics into categories that reflect how learning science actually thinks about learner variation:

**Knowledge State** (the most important and distinctive dimension)
- Subject area / domain (freeform — math, coding, writing, nursing, anything)
- Topic or concept being assessed (freeform, or selected from a connected domain graph)
- Prerequisite gaps — which foundational concepts are shaky or missing (user describes, or auto-populated by a domain connector)
- Misconceptions — specific wrong mental models the learner holds. Not random errors, but *patterned* misconceptions that a real learner would develop (user describes, or suggested by a connector)
- Partial understanding — what they *do* know, so the persona isn't just "wrong about everything"
- Optional: paste in curriculum context (learning objectives, rubric, syllabus excerpt) to help the generator build a more grounded profile

**Cognitive & Learning Profile**
- Prior knowledge level (novice / developing / approaching mastery)
- Working memory load tolerance (can they hold multi-step reasoning?)
- Metacognitive awareness (do they know what they don't know?)
- Learning preferences (not "learning styles" — more like: do they respond to examples, analogies, step-by-step procedures, visual representations?)

**Motivation & Affect**
- Engagement level (eager / compliant / disengaged / resistant)
- Self-efficacy (confident / uncertain / anxious / defeated)
- Goal orientation (mastery-seeking / grade-seeking / task-completing / avoidant)
- Frustration threshold (how many failed attempts before they disengage?)

**Communication Style**
- Verbosity (terse / conversational / verbose)
- Help-seeking behavior (asks for help freely / waits to be asked / avoids asking / demands answers)
- Response to being wrong (receptive / defensive / shuts down / argues)
- Language register (formal / casual / slang-heavy / ESL patterns)

### Learner Archetypes (Pre-built Profiles)

For users who don't want to configure from scratch, offer recognizable archetypes that combine dimensions in realistic, internally consistent ways:

- **The Confident but Wrong** — High self-efficacy, specific misconceptions, argues when corrected, needs to be shown rather than told
- **The Eager Novice** — High engagement, low prior knowledge, asks lots of questions, may over-rely on the tutor
- **The Silent Struggler** — Low help-seeking, moderate knowledge with specific gaps, needs to be drawn out, shuts down if pushed too hard
- **The Grade Optimizer** — Task-completing orientation, wants the answer not the understanding, impatient with exploratory approaches
- **The Capable but Disengaged** — Has the prerequisites, isn't trying, terse responses, may test boundaries
- **The Anxious Perfectionist** — Moderate knowledge, low self-efficacy, asks for reassurance, catastrophizes errors
- **The ESL Learner** — Solid conceptual understanding, language barrier creates false signals of confusion, needs patience with expression

Users should be able to start from an archetype and adjust individual dimensions.

### Domain & Knowledge State

**The core engine is domain-agnostic.** Users describe the learner's knowledge state in their own terms — what the learner knows, what they're confused about, what misconceptions they hold. This works for any domain: math, coding, writing, nursing, marketing, music theory, whatever. The persona prompt engine doesn't care whether the knowledge state came from a structured graph or from the user's expertise.

The user configures Knowledge State by:
- Naming the domain and topic (freeform text)
- Describing what the learner *does* understand (partial knowledge)
- Describing specific misconceptions or wrong mental models
- Describing prerequisite gaps (what foundational concepts are shaky)
- Optionally: pasting in their own curriculum structure, learning objectives, or rubric to give the generator more context

This keeps the tool useful for the broadest possible audience — anyone building AI learning experiences in any domain.

### Domain Connectors (Optional Power-Ups)

When structured curriculum data *is* available, the tool can auto-populate the Knowledge State fields with precision that no human would bother to type out manually. This is where the real magic happens.

**Learning Commons Knowledge Graph (first available connector)**

When a user selects "Math Standards" as their domain:
1. They browse or search for a standard (e.g., 3.NF.A.1)
2. The tool queries the KG for the standard statement, learning components, and prerequisite chain
3. Knowledge State fields auto-populate with real options:
   - Which learning components could be gaps
   - Which prerequisite standards might be unfinished
   - What specific misconceptions map to this standard
4. The generated persona prompt includes curriculum-grounded knowledge gaps — not vague "struggles with fractions" but precise "treats the numerator as a count of shaded parts rather than a count of equal-sized parts named by the denominator"

**Future connectors could include:**
- A user's own course syllabus (parsed and structured)
- Custom curriculum maps or competency frameworks
- Other structured knowledge sources (coding skill trees, medical competency models, etc.)

The connector pattern means the tool gets smarter as more structured data becomes available — but it's fully functional without any of it. The Knowledge Graph integration serves as a proof of concept for what's possible when AI learning tools are grounded in real curriculum architecture. It's a demo of Rachel's thesis built into the product itself.

### The Persona Prompt Engine

The hardest technical and design challenge: translating a configured profile into a system prompt that makes an LLM behave coherently as that learner across multiple conversational turns.

Key lessons from MentorAI's promptbook work:
- **Traits compete.** "Anxious" and "verbose" pull in different directions than "anxious" and "terse." The prompt must resolve these tensions, not just list traits.
- **Behavior > description.** "You are an anxious student" produces worse results than "When you encounter a question you're unsure about, you hesitate, ask if you're doing it right, and sometimes give a non-answer to avoid being wrong."
- **Knowledge state must be operationalized.** "You have a misconception about fractions" is useless. "When you see ¾ of a shape, you count 3 shaded parts and 4 total parts, producing the fraction 3/4 without checking whether parts are equal-sized" gives the LLM something concrete to perform.
- **Inner monologue helps.** Giving the persona an internal reasoning trace ("I think I'm supposed to count the colored ones... that's 3... and there are 4 total... so 3/4?") produces more consistent behavior than just specifying what they should say.
- **Constraints need escape valves.** A "disengaged" learner who literally refuses to respond isn't useful. The persona needs enough engagement to actually produce a testable interaction.

### Interaction Modes

**Mode 1: Direct Chat**
User talks to the synthetic learner directly. Useful for:
- Practicing tutoring approaches
- Understanding how a learner with specific gaps actually behaves
- Testing your own pedagogical instincts

**Mode 2: Prompt Export**
Generate the learner persona as a copy-paste-ready system prompt. User drops it into their own AI tool (ChatGPT, Claude, their custom app) to test how their tool handles this learner.

**Mode 3: Agent vs. Agent** (stretch goal)
Paste in your AI tutor's system prompt. The app runs a simulated conversation between your tutor and the synthetic learner. You watch and evaluate.

**Mode 4: Eval Mode** (stretch goal)
After a conversation (from any mode), run an evaluation pass using LLM-as-judge against configurable criteria. Did the tutor:
- Correctly identify the learner's misconception?
- Address the root cause rather than the surface error?
- Maintain appropriate tone for the learner's affect state?
- Avoid giving away the answer?
- Adapt when the learner showed signs of frustration?

This connects directly to the boolean eval criteria approach from MentorAI.

## Architecture

### Stack
- **Next.js** (React frontend + API routes)
- **Deployed on Vercel**
- **Anthropic API** (Claude) for generating learner responses and running evals
- **Learning Commons Knowledge Graph** (via API/MCP) for optional curriculum grounding in math
- **GitHub** for source control

### Key Components

**Frontend**
- Learner profile builder (archetype selection + dimension sliders/selectors)
- Knowledge Graph browser (when user selects a math standard, show the components and prereqs pulled from the KG)
- Chat interface (for direct interaction with the synthetic learner)
- Prompt export view (generated persona prompt, formatted and copyable)
- Conversation viewer (for agent-vs-agent mode)
- Eval results display (stretch)

**API Layer (Next.js API routes on Vercel)**
- Persona prompt assembly — takes configured dimensions and generates the full system prompt
- Chat orchestration — manages the Anthropic API calls for synthetic learner responses
- Knowledge Graph queries (optional) — fetches standards, learning components, and progressions when using a domain connector
- Eval runner (stretch) — takes a conversation transcript and eval criteria, returns scores

**Data**
- Archetype definitions (static JSON)
- Misconception libraries per standard (could be static initially, enriched over time)
- Eval criteria templates (static, based on MentorAI promptbook patterns)

## What's In and Out for V1

### In
- Learner profile builder with all four dimension categories, fully domain-agnostic
- Freeform knowledge state configuration (works for any subject)
- Learning Commons Knowledge Graph connector for math standards (optional power-up)
- 5-7 pre-built archetypes (behavioral/motivational dimensions are universal; knowledge state adapts to whatever domain the user specifies)
- Direct chat mode (talk to the synthetic learner)
- Prompt export mode (copy the persona prompt)
- Clean, usable UI (leave design choices to Claude Code)

### Out (future)
- Agent-vs-agent mode
- Eval mode
- Additional domain connectors (syllabus parser, custom curriculum maps, coding skill trees)
- User accounts / saved profiles
- Batch generation (generate 10 learners at once for systematic testing)
- API access (let other tools call the generator programmatically)

## Design Notes

- Leave visual design, color scheme, and UI polish to Claude Code's judgment — it does well without over-specification
- The app should feel like a professional tool, not a toy — this is aimed at builders and designers, not students
- The Knowledge Graph integration should feel seamless — when a user picks a standard, the relevant components and prereqs should populate naturally, not feel like a separate lookup step
- The generated persona prompt should be transparent — users should be able to see and understand *why* the learner will behave a certain way, not just get a black box

## Success Criteria

The tool works if:
1. A builder can generate a synthetic learner in any domain in under 2 minutes
2. The synthetic learner behaves consistently and realistically across a 10+ turn conversation
3. The learner's knowledge gaps produce *specific, diagnosable errors* — not random wrongness
4. Someone who tests their AI tutor against 3-4 different synthetic learners discovers real weaknesses they wouldn't have found testing alone
5. When using the Knowledge Graph connector, the auto-populated knowledge state is noticeably more precise than what a user would type freeform — demonstrating the value of structured curriculum data

## Why This Matters (Rachel's Thesis)

This tool embodies the argument that **the connective architecture between human learning science and AI capability is the missing layer.** 

At the freeform level, the tool demonstrates that learning science expertise — how to model a learner, what dimensions matter, how misconceptions actually work — produces dramatically better synthetic personas than personality-trait generators. That's the learning design layer.

At the Knowledge Graph level, it demonstrates what becomes possible when structured curriculum data enters the picture. A generic LLM can simulate "a confused student" but it can't simulate "a student whose understanding of fractions breaks down specifically at the transition from part-whole to number line representations because their 2nd grade foundation in equal partitioning was procedural rather than conceptual." That precision requires curriculum structure — the knowledge graph — and learning science expertise translated into machine-readable form.

The tool works in any domain. It works *better* when grounded in structured knowledge. That's the whole argument, made tangible.

Building this tool is both a product and a proof of concept.
