# Synthetic Learner Generator

Generate configurable synthetic learner personas to test and evaluate AI tutoring systems. Each persona has a knowledge state, cognitive profile, motivation model, and communication style — compiled into a behavioral system prompt.

## Why

If you're building an AI tutor, you need to test it against diverse learner types. Real students are expensive and hard to recruit for iterative testing. This tool generates realistic synthetic learners with configurable traits so you can stress-test tutoring strategies, evaluate scaffolding approaches, and surface edge cases.

## How It Works

1. **Choose an archetype** — Pick from 7 research-grounded learner archetypes (e.g., "Confident but Wrong", "Silent Struggler", "ESL Learner"), or start from scratch.
2. **Configure the profile** — Tune 4 dimensions: knowledge state, cognitive profile, motivation/affect, and communication style. Each dimension has 3-4 options with descriptions.
3. **Chat or export** — Talk to the synthetic learner as a tutor (powered by Claude), or copy/download the persona as a system prompt to use in your own tools.

Persona generation is deterministic (no LLM call) — the engine compiles your profile into a behavioral system prompt using templates and map lookups. The only LLM call happens when you chat.

## Archetypes

| Archetype | Key Traits |
|-----------|-----------|
| Confident but Wrong | High knowledge, argues when corrected, Dunning-Kruger zone |
| Eager Novice | Low knowledge, asks freely, eager but overwhelmed |
| Silent Struggler | Won't volunteer confusion, waits to be asked, shuts down when wrong |
| Grade Optimizer | Wants the answer not understanding, demands answers, task-completing |
| Capable but Disengaged | Has prerequisites, isn't trying, resistant |
| Anxious Perfectionist | Expects to fail, verbose (nervous energy), low frustration threshold |
| ESL Learner | Strong concepts masked by language barriers, ESL speech patterns |

Each archetype comes with demo knowledge states across 3 universal domains (Math: Fractions, Writing: Essay Structure, Science: Water Cycle) so you can compare learner types on the same topic.

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind v4 + shadcn/ui
- **Anthropic API** (Claude Sonnet 4.5) for chat
- **Zustand** for client-side state
- No database, no auth — client-side only

## Project Structure

```
src/
  app/                  # Pages and API routes
    archetypes/         # Archetype picker
    builder/            # Profile builder form
    chat/               # Chat interface
    export/             # Prompt viewer/exporter
    api/chat/           # Streaming SSE endpoint (Anthropic)
    api/persona/        # Deterministic persona compiler
  components/           # React components by feature
  hooks/                # useChat hook
  lib/
    persona-engine/     # 7-module template compiler
    archetypes.ts       # 7 static archetype definitions
    types.ts            # TypeScript types
    constants.ts        # Dimension options and defaults
  store/                # Zustand profile store
```

## Deploy

Deploy to Vercel (zero-config for Next.js):

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add `ANTHROPIC_API_KEY` in project settings > Environment Variables
4. Deploy
