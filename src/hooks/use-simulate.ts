'use client';

import { useState, useCallback, useRef } from 'react';
import type { SimulateMessage } from '@/lib/types';
import { generateId } from '@/lib/utils';

type SimulateStatus = 'idle' | 'generating' | 'complete' | 'error';

export function useSimulate() {
  const [messages, setMessages] = useState<SimulateMessage[]>([]);
  const [status, setStatus] = useState<SimulateStatus>('idle');
  const [currentTurn, setCurrentTurn] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const startSimulation = useCallback(
    async (learnerPrompt: string, tutorPrompt: string) => {
      setMessages([]);
      setStatus('generating');
      setCurrentTurn(0);
      setError(null);

      try {
        abortRef.current = new AbortController();

        const response = await fetch('/api/auto-conversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ learnerPrompt, tutorPrompt }),
          signal: abortRef.current.signal,
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || `Request failed: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);

              if (parsed.type === 'message_start') {
                const newMessage: SimulateMessage = {
                  id: generateId(),
                  role: parsed.role,
                  content: '',
                  turn: parsed.turn,
                  isComplete: false,
                };
                setMessages((prev) => [...prev, newMessage]);
                setCurrentTurn(parsed.turn);
              } else if (parsed.type === 'token') {
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last) {
                    updated[updated.length - 1] = {
                      ...last,
                      content: last.content + parsed.text,
                    };
                  }
                  return updated;
                });
              } else if (parsed.type === 'message_end') {
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last) {
                    updated[updated.length - 1] = { ...last, isComplete: true };
                  }
                  return updated;
                });
              } else if (parsed.type === 'done') {
                setStatus('complete');
              } else if (parsed.type === 'error') {
                setError(parsed.message);
                setStatus('error');
              }
            } catch {
              // Skip malformed JSON lines
            }
          }
        }

        // In case the done event was missed (e.g., stream ended cleanly)
        setStatus((prev) => (prev === 'generating' ? 'complete' : prev));
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          // User cancelled — keep whatever messages we have
          setStatus('complete');
          return;
        }
        console.error('Simulation error:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        setStatus('error');
      } finally {
        abortRef.current = null;
      }
    },
    []
  );

  const cancelSimulation = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
  }, []);

  const resetSimulation = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setMessages([]);
    setStatus('idle');
    setCurrentTurn(0);
    setError(null);
  }, []);

  return {
    messages,
    status,
    currentTurn,
    error,
    startSimulation,
    cancelSimulation,
    resetSimulation,
  };
}
