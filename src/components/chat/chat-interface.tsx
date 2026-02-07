'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatMessage } from './chat-message';
import { useChat } from '@/hooks/use-chat';
import { Send, RotateCcw, GraduationCap } from 'lucide-react';

interface ChatInterfaceProps {
  systemPrompt: string;
  learnerName?: string;
}

const STARTER_PROMPTS = [
  "Hi! What topic are you working on today?",
  "Can you tell me what you already know about this?",
  "Let's start with a warm-up problem.",
];

export function ChatInterface({ systemPrompt, learnerName }: ChatInterfaceProps) {
  const { messages, isStreaming, sendMessage, clearMessages, isNearLimit } = useChat(systemPrompt);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = () => {
    if (!input.trim() || isStreaming) return;
    sendMessage(input);
    setInput('');
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b shrink-0">
        <div>
          <h2 className="text-sm font-semibold">
            Chatting with {learnerName || 'Synthetic Learner'}
          </h2>
          <p className="text-xs text-muted-foreground">
            You are the tutor. Talk to this learner to test your approach.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={clearMessages}>
          <RotateCcw className="h-3.5 w-3.5 mr-1" />
          Reset
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <div className="text-center space-y-4 max-w-sm">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Chat with {learnerName || 'your synthetic learner'}
                </p>
                <p className="text-xs text-muted-foreground">
                  You are the tutor. Try asking a question, presenting a problem, or
                  starting a lesson.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInput(prompt)}
                    className="text-xs text-left px-3 py-2 rounded-md border border-dashed
                               hover:bg-muted hover:border-border transition-colors
                               text-muted-foreground"
                  >
                    &ldquo;{prompt}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isStreaming={
                  isStreaming &&
                  msg === messages[messages.length - 1] &&
                  msg.role === 'assistant'
                }
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t p-3 shrink-0">
        {isNearLimit && (
          <p className="text-[10px] text-amber-600 px-1 pb-1.5">
            Long conversation — older messages will be trimmed from context.
          </p>
        )}
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message as the tutor..."
            rows={1}
            className="min-h-[40px] max-h-[120px] text-sm resize-none"
          />
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || isStreaming}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
