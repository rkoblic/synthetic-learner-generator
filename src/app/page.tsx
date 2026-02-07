import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 max-w-xl mx-auto">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Synthetic Learner Generator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Create configurable learner personas to test AI tutoring systems.
          Choose an archetype, tune the profile, then chat with the learner or export
          the persona as a system prompt.
        </p>
      </div>

      <Link href="/archetypes">
        <Button size="lg">
          Get Started
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </Link>

      <p className="text-xs text-muted-foreground pt-4">
        No sign-up required. Persona generation is deterministic — no LLM calls until you chat.
      </p>
    </div>
  );
}
