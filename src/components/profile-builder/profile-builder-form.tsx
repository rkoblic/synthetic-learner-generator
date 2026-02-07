'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { KnowledgeStateSection } from './knowledge-state-section';
import { CognitiveSection } from './cognitive-section';
import { MotivationSection } from './motivation-section';
import { CommunicationSection } from './communication-section';
import { useProfileStore } from '@/store/profile-store';
import { MessageSquare, Copy, ChevronDown, RotateCcw, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProfileBuilderForm() {
  const router = useRouter();
  const profile = useProfileStore((s) => s.profile);
  const resetProfile = useProfileStore((s) => s.resetProfile);
  const setGeneratedPrompt = useProfileStore((s) => s.setGeneratedPrompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    knowledge: true,
    cognitive: true,
    motivation: false,
    communication: false,
  });

  const toggleSection = (key: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const generateAndNavigate = async (destination: '/chat' | '/export') => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch('/api/persona', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });

      if (!response.ok) throw new Error('Failed to generate persona');

      const data = await response.json();
      setGeneratedPrompt(data.systemPrompt, data.promptSections);
      router.push(destination);
    } catch (err) {
      console.error('Generation error:', err);
      setError('Failed to generate persona. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const hasKnowledgeState = profile.knowledgeState.domain || profile.knowledgeState.misconceptions;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            {profile.archetypeId
              ? `Customize: ${profile.name || 'Learner Profile'}`
              : 'Build a Learner Profile'}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure the learner across four dimensions. Knowledge state is the most important.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={resetProfile}>
          <RotateCcw className="h-3.5 w-3.5 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        <SectionCard
          title="Knowledge State"
          subtitle="What the learner knows, believes, and misunderstands"
          expanded={expandedSections.knowledge}
          onToggle={() => toggleSection('knowledge')}
          priority
        >
          <KnowledgeStateSection />
        </SectionCard>

        <SectionCard
          title="Cognitive & Learning Profile"
          subtitle="How the learner thinks and processes information"
          expanded={expandedSections.cognitive}
          onToggle={() => toggleSection('cognitive')}
        >
          <CognitiveSection />
        </SectionCard>

        <SectionCard
          title="Motivation & Affect"
          subtitle="How the learner feels about learning"
          expanded={expandedSections.motivation}
          onToggle={() => toggleSection('motivation')}
        >
          <MotivationSection />
        </SectionCard>

        <SectionCard
          title="Communication Style"
          subtitle="How the learner talks and responds"
          expanded={expandedSections.communication}
          onToggle={() => toggleSection('communication')}
        >
          <CommunicationSection />
        </SectionCard>
      </div>

      <Separator />

      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={() => generateAndNavigate('/export')}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Copy className="h-4 w-4 mr-2" />
          )}
          {isGenerating ? 'Generating...' : 'Generate & Export Prompt'}
        </Button>
        <Button
          onClick={() => generateAndNavigate('/chat')}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <MessageSquare className="h-4 w-4 mr-2" />
          )}
          {isGenerating ? 'Generating...' : 'Generate & Chat'}
        </Button>
      </div>

      {error && (
        <p className="text-xs text-destructive text-center">{error}</p>
      )}

      {!error && !hasKnowledgeState && (
        <p className="text-xs text-amber-600 text-center">
          Tip: Add a domain and some misconceptions for more realistic learner behavior.
        </p>
      )}
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  expanded,
  onToggle,
  priority,
  children,
}: {
  title: string;
  subtitle: string;
  expanded: boolean;
  onToggle: () => void;
  priority?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card className={cn(priority && !expanded && 'border-primary/30')}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors rounded-t-lg"
      >
        <div>
          <h2 className={cn('text-sm font-semibold', priority && 'text-primary')}>
            {title}
          </h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform duration-200',
            !expanded && '-rotate-90'
          )}
        />
      </button>
      <div
        className="grid transition-all duration-200 ease-out"
        style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <CardContent className="pt-0 pb-4 px-4">
            {children}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
