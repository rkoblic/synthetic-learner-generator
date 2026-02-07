'use client';

import Link from 'next/link';
import { Info } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface InfoPopoverProps {
  title: string;
  content: string;
  citation?: string;
}

export function InfoPopover({ title, content, citation }: InfoPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
            }
          }}
          className="inline-flex items-center justify-center ml-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label={`Info: ${title}`}
        >
          <Info className="h-3.5 w-3.5" />
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 text-xs leading-relaxed"
        side="top"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <p className="font-medium mb-1">{title}</p>
        <p className="text-muted-foreground">{content}</p>
        {citation && (
          <p className="text-[10px] text-muted-foreground/70 mt-2 italic">
            {citation}
          </p>
        )}
        <Link
          href="/research"
          className="text-[10px] text-primary hover:underline mt-1 inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          Learn more
        </Link>
      </PopoverContent>
    </Popover>
  );
}
