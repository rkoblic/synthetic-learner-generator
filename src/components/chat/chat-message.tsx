'use client';

import type { ChatMessage as ChatMessageType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { User, GraduationCap } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-3 animate-fade-in', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
          <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      )}
      <div
        className={cn(
          'rounded-lg px-3 py-2 max-w-[80%] text-sm',
          message.isError
            ? 'bg-destructive/10 text-destructive border border-destructive/20'
            : isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {isStreaming && !message.content && (
          <span className="inline-flex gap-1 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-pulse-dot" />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-pulse-dot-delay-200" />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-pulse-dot-delay-400" />
          </span>
        )}
      </div>
      {isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
          <User className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}
