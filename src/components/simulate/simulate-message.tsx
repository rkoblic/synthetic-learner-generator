'use client';

import type { SimulateMessage as SimulateMessageType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { GraduationCap, BookOpenCheck } from 'lucide-react';

interface SimulateMessageProps {
  message: SimulateMessageType;
  isStreaming?: boolean;
  learnerName?: string;
}

export function SimulateMessage({ message, isStreaming, learnerName }: SimulateMessageProps) {
  const isTutor = message.role === 'tutor';

  return (
    <div className={cn('flex gap-3 animate-fade-in', isTutor ? 'justify-start' : 'justify-end')}>
      {isTutor && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/40">
          <BookOpenCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
        </div>
      )}
      <div className="max-w-[80%]">
        <p className="text-[10px] text-muted-foreground mb-0.5 px-1">
          {isTutor ? 'Tutor' : learnerName || 'Learner'}
        </p>
        <div
          className={cn(
            'rounded-lg px-3 py-2 text-sm',
            isTutor
              ? 'bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30'
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
      </div>
      {!isTutor && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
          <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
