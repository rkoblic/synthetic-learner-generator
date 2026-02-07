# Synthetic Learner Generator

## What This Is
A Next.js app that generates realistic synthetic learner personas for testing AI tutoring systems. Users configure a learner profile across four dimensions (knowledge state, cognitive profile, motivation/affect, communication style), then chat with the synthetic learner or export the persona as a system prompt.

## Stack
- **Next.js 16** (App Router) + TypeScript + Tailwind v4 + shadcn/ui
- **Anthropic API** (Claude Sonnet 4.5) for chat responses
- **Zustand** for client-side state (no persistence)
- No database, no auth — client-side only for V1

## Commands
- `npm run dev` — start dev server on localhost:3000
- `npm run build` — production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — type check

## Architecture

### Pages
| Route | Purpose |
|-------|---------|
| `/` | Archetype picker (7 cards + "Start from Scratch") |
| `/builder` | Profile builder — 4-section form with dimension controls |
| `/chat` | Chat interface with the synthetic learner |
| `/export` | View/copy the generated persona prompt |

### Core Modules
- **Persona engine** (`src/lib/persona-engine/`) — Deterministic template compiler (no LLM call) that translates a LearnerProfile into a behavioral system prompt. 7 modules: index, knowledge-state, cognitive-profile, motivation-affect, communication, trait-resolver, inner-monologue, escape-valves.
- **Archetypes** (`src/lib/archetypes.ts`) — 7 static learner archetypes with pre-filled dimensions.
- **Types** (`src/lib/types.ts`) — LearnerProfile, KnowledgeState, CognitiveProfile, MotivationAffect, CommunicationStyle.
- **Constants** (`src/lib/constants.ts`) — Dimension option values.
- **Store** (`src/store/profile-store.ts`) — Zustand store for current profile.

### API Routes
- `POST /api/persona` — Runs persona engine, returns compiled system prompt. Pure computation, no LLM.
- `POST /api/chat` — Calls Anthropic API with streaming SSE. Sends full conversation history each request.

### Key Design Decisions
- Persona engine is template compilation, not LLM-generated (instant, free, debuggable)
- Trait resolver detects tension pairs (e.g., anxious + verbose) and generates resolution instructions
- Knowledge state is freeform text for any domain
- Escape valves prevent extreme traits from making the learner unresponsive
- Inner monologue calibrates reasoning traces to metacognitive awareness level
- Demo knowledge states use 3 universal domains (Math: Fractions, Writing: Essay Structure, Science: Water Cycle) across all 7 archetypes so users can compare learner types on the same topic

## Environment
- `ANTHROPIC_API_KEY` in `.env.local`
- Model: `claude-sonnet-4-5-20250929` (set in `src/lib/anthropic.ts`)

## Project Status
- **Milestone 1 (Core Product)**: Complete
- **Milestone 2 (Knowledge Graph Integration)**: Not started / may skip
- **Milestone 3 (Polish & Deploy)**: Not started
- **Research-informed improvements**: Deferred — see `.claude/projects/-Users-rachelkoblic-synthetic-learner-generator/memory/research-insights.md` for 5 specific prompt engine improvements backed by papers in `/research/`

## Style Guidelines
- shadcn/ui components for all UI primitives
- Tailwind v4 (uses `@import "shadcn/tailwind.css"` — not v3 config format)
- Components in `src/components/` organized by feature (profile-builder, chat, export, layout, ui)
- Hooks in `src/hooks/`
