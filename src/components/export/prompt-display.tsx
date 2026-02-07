'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Check, Download, ChevronDown, ChevronRight } from 'lucide-react';
import type { PromptSections } from '@/lib/types';
import { PROMPT_OVERVIEW, SECTION_ANNOTATIONS } from '@/lib/export-info-content';

interface PromptDisplayProps {
  systemPrompt: string;
  sections: PromptSections;
}

const SECTION_LABELS: Record<keyof PromptSections, string> = {
  knowledgeState: 'Knowledge State',
  cognitiveProfile: 'Cognitive Profile',
  motivationAffect: 'Motivation & Affect',
  communicationStyle: 'Communication Style',
  traitResolutions: 'Trait Interactions',
  innerMonologue: 'Inner Voice',
  escapeValves: 'Boundaries',
};

export function PromptDisplay({ systemPrompt, sections }: PromptDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([systemPrompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'synthetic-learner-prompt.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Persona Prompt</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Copy this system prompt into your AI tool to simulate this learner.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-3.5 w-3.5 mr-1" />
            Download
          </Button>
          <Button size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy to Clipboard
              </>
            )}
          </Button>
        </div>
      </div>

      <div>
        <button
          onClick={() => setOverviewOpen(!overviewOpen)}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {overviewOpen ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
          About this prompt
        </button>
        {overviewOpen && (
          <div className="mt-2 rounded-md border bg-muted/50 px-3 py-2.5">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {PROMPT_OVERVIEW.content}
            </p>
            <p className="text-[10px] text-muted-foreground/70 mt-1.5 italic">
              {PROMPT_OVERVIEW.citation}
            </p>
          </div>
        )}
      </div>

      <Tabs defaultValue="full">
        <TabsList>
          <TabsTrigger value="full">Full Prompt</TabsTrigger>
          <TabsTrigger value="sections">By Section</TabsTrigger>
        </TabsList>

        <TabsContent value="full">
          <Card>
            <ScrollArea className="h-[calc(100vh-300px)] min-h-[300px]">
              <CardContent className="p-4">
                <pre className="text-xs leading-relaxed whitespace-pre-wrap font-mono">
                  {systemPrompt}
                </pre>
              </CardContent>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="sections">
          <div className="space-y-3">
            {(Object.keys(SECTION_LABELS) as (keyof PromptSections)[]).map((key) => {
              const content = sections[key];
              if (!content) return null;

              const annotation = SECTION_ANNOTATIONS[key];

              return (
                <Card key={key}>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold mb-1 text-primary">
                      {SECTION_LABELS[key]}
                    </h3>
                    <p className="text-[11px] leading-relaxed text-muted-foreground/80 mb-2">
                      {annotation.content}
                      {annotation.citation && (
                        <span className="text-[10px] italic text-muted-foreground/60">
                          {' '}({annotation.citation})
                        </span>
                      )}
                    </p>
                    <pre className="text-xs leading-relaxed whitespace-pre-wrap font-mono text-muted-foreground">
                      {content}
                    </pre>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
