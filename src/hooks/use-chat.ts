'use client';

import { useState, useCallback, useRef } from 'react';
import type { ChatMessage } from '@/lib/types';
import { generateId } from '@/lib/utils';
import { MAX_CONVERSATION_MESSAGES } from '@/lib/constants';

export function useChat(systemPrompt: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const isNearLimit = messages.length > MAX_CONVERSATION_MESSAGES - 10;

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return;

      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: content.trim(),
        timestamp: Date.now(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsStreaming(true);

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };

      setMessages([...updatedMessages, assistantMessage]);

      // Trim to last N messages to avoid exceeding context limits
      const messagesToSend = updatedMessages.length > MAX_CONVERSATION_MESSAGES
        ? updatedMessages.slice(-MAX_CONVERSATION_MESSAGES)
        : updatedMessages;

      try {
        abortRef.current = new AbortController();

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemPrompt,
            messages: messagesToSend.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`Chat request failed: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let accumulatedText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') break;

              try {
                const parsed = JSON.parse(data);
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
                if (parsed.text) {
                  accumulatedText += parsed.text;
                  setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    if (last.role === 'assistant') {
                      updated[updated.length - 1] = {
                        ...last,
                        content: accumulatedText,
                      };
                    }
                    return updated;
                  });
                }
              } catch (parseError) {
                if (parseError instanceof Error && parseError.message !== 'Stream error occurred') {
                  // Re-throw SSE errors, skip malformed JSON
                  if (parseError.message.startsWith('Stream')) {
                    throw parseError;
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        console.error('Chat error:', error);
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === 'assistant' && !last.content) {
            updated[updated.length - 1] = {
              ...last,
              content: 'Something went wrong. Please try again.',
              isError: true,
            };
          }
          return updated;
        });
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, systemPrompt, isStreaming]
  );

  const clearMessages = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setMessages([]);
    setIsStreaming(false);
  }, []);

  return { messages, isStreaming, sendMessage, clearMessages, isNearLimit };
}
