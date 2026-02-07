'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { SimulateMessage } from './simulate-message';
import { useSimulate } from '@/hooks/use-simulate';
import { DEMO_TUTOR_PROMPT, DEMO_TUTOR_SUMMARY } from '@/lib/tutor-prompt';
import { SIMULATION_TURN_COUNT } from '@/lib/constants';
import {
  Play,
  Square,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  Loader2,
  BookOpenCheck,
  AlertCircle,
} from 'lucide-react';

interface SimulateInterfaceProps {
  systemPrompt: string;
  learnerName?: string;
  archetypeId?: string | null;
  domain?: string;
  topic?: string;
}

export function SimulateInterface({
  systemPrompt,
  learnerName,
  archetypeId,
  domain,
  topic,
}: SimulateInterfaceProps) {
  const {
    messages,
    status,
    currentTurn,
    error,
    startSimulation,
    cancelSimulation,
    resetSimulation,
  } = useSimulate();

  const [tutorMode, setTutorMode] = useState<'demo' | 'custom'>('demo');
  const [customPrompt, setCustomPrompt] = useState('');
  const [showFullPrompt, setShowFullPrompt] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleGenerate = () => {
    const tutorPrompt = tutorMode === 'demo' ? DEMO_TUTOR_PROMPT : customPrompt;
    if (!tutorPrompt.trim()) return;
    startSimulation(systemPrompt, tutorPrompt);
  };

  const handleCopyTranscript = async () => {
    const header = [
      '=== Simulated Tutoring Conversation ===',
      learnerName ? `Learner: ${learnerName}${archetypeId ? ` (${archetypeId})` : ''}` : '',
      domain ? `Domain: ${domain}${topic ? ` — ${topic}` : ''}` : '',
      '',
      '---',
      '',
    ]
      .filter(Boolean)
      .join('\n');

    const transcript = messages
      .map((msg) => {
        const label = msg.role === 'tutor' ? 'Tutor' : (learnerName || 'Learner');
        return `${label}: ${msg.content}`;
      })
      .join('\n\n');

    await navigator.clipboard.writeText(header + transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Idle state — show setup
  if (status === 'idle') {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b shrink-0">
          <div>
            <h2 className="text-sm font-semibold">Simulate a Conversation</h2>
            <p className="text-xs text-muted-foreground">
              Watch an AI tutor interact with {learnerName || 'your synthetic learner'}.
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-lg mx-auto space-y-4">
            <div className="flex items-center justify-center pt-4 pb-2">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                <BookOpenCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <Card>
              <CardContent className="p-4 space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Tutor Prompt
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => setTutorMode('demo')}
                    className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                      tutorMode === 'demo'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    Demo Tutor
                  </button>
                  <button
                    onClick={() => setTutorMode('custom')}
                    className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                      tutorMode === 'custom'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    Custom Tutor
                  </button>
                </div>

                {tutorMode === 'demo' ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{DEMO_TUTOR_SUMMARY}</p>
                    <button
                      onClick={() => setShowFullPrompt(!showFullPrompt)}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronDown
                        className={`h-3 w-3 transition-transform ${showFullPrompt ? '' : '-rotate-90'}`}
                      />
                      {showFullPrompt ? 'Hide full prompt' : 'Show full prompt'}
                    </button>
                    {showFullPrompt && (
                      <div className="bg-muted/50 rounded-md p-3 text-xs text-muted-foreground whitespace-pre-wrap max-h-48 overflow-y-auto">
                        {DEMO_TUTOR_PROMPT}
                      </div>
                    )}
                  </div>
                ) : (
                  <Textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Paste your tutor system prompt here..."
                    rows={6}
                    className="text-sm resize-none"
                  />
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                onClick={handleGenerate}
                disabled={tutorMode === 'custom' && !customPrompt.trim()}
              >
                <Play className="h-4 w-4 mr-2" />
                Generate Conversation
              </Button>
            </div>

            <p className="text-[10px] text-muted-foreground text-center">
              Generates {SIMULATION_TURN_COUNT} messages — takes about 30-60 seconds.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Generating or complete or error — show conversation
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b shrink-0">
        <div>
          {status === 'generating' ? (
            <>
              <h2 className="text-sm font-semibold inline-flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Generating turn {currentTurn} of {SIMULATION_TURN_COUNT}...
              </h2>
              <p className="text-xs text-muted-foreground">
                Conversation with {learnerName || 'Synthetic Learner'}
              </p>
            </>
          ) : status === 'error' ? (
            <>
              <h2 className="text-sm font-semibold inline-flex items-center gap-2 text-destructive">
                <AlertCircle className="h-3.5 w-3.5" />
                {messages.length > 0
                  ? `Stopped at turn ${messages.length} of ${SIMULATION_TURN_COUNT}`
                  : 'Generation failed'}
              </h2>
              <p className="text-xs text-destructive/80">{error}</p>
            </>
          ) : (
            <>
              <h2 className="text-sm font-semibold">
                Conversation complete ({messages.length} turns)
              </h2>
              <p className="text-xs text-muted-foreground">
                {learnerName || 'Synthetic Learner'}
                {domain ? ` — ${domain}` : ''}
                {topic ? `: ${topic}` : ''}
              </p>
            </>
          )}
        </div>

        <div className="flex gap-2">
          {status === 'generating' ? (
            <Button variant="ghost" size="sm" onClick={cancelSimulation}>
              <Square className="h-3.5 w-3.5 mr-1" />
              Stop
            </Button>
          ) : (
            <>
              {messages.length > 0 && (
                <Button variant="ghost" size="sm" onClick={handleCopyTranscript}>
                  {copied ? (
                    <Check className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 mr-1" />
                  )}
                  {copied ? 'Copied' : 'Copy Transcript'}
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={resetSimulation}>
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                {messages.length > 0 ? 'Regenerate' : 'Back'}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
        <div className="space-y-4 pb-4">
          {messages.map((msg) => (
            <SimulateMessage
              key={msg.id}
              message={msg}
              learnerName={learnerName}
              isStreaming={
                status === 'generating' &&
                msg.turn === currentTurn &&
                !msg.isComplete
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
