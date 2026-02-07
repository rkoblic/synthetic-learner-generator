'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, Check, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const NAV_ITEMS = [
  { href: '/archetypes', label: 'Archetypes', step: 1 },
  { href: '/builder', label: 'Builder', step: 2 },
  { href: '/chat', label: 'Chat', step: 3 },
  { href: '/export', label: 'Export', step: 4 },
];

function getStepFromPath(pathname: string): number {
  const item = NAV_ITEMS.find((i) => i.href === pathname);
  return item?.step ?? 0;
}

export function Header() {
  const pathname = usePathname();
  const currentStep = getStepFromPath(pathname);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/" className="flex items-center gap-2 mr-8">
          <Brain className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm hidden sm:inline">Synthetic Learner Generator</span>
        </Link>
        <nav className="flex items-center gap-0.5 flex-1">
          {NAV_ITEMS.map((item, index) => {
            const isActive = item.step === currentStep;
            const isCompleted = item.step < currentStep;
            const isFuture = item.step > currentStep;

            return (
              <div key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-3 w-3 text-muted-foreground/40 mx-0.5 hidden sm:block" />
                )}
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded-md transition-colors',
                    isActive && 'bg-primary/10 text-primary font-medium',
                    isCompleted && 'text-muted-foreground hover:text-foreground hover:bg-muted',
                    isFuture && 'text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/50'
                  )}
                >
                  <span
                    className={cn(
                      'hidden sm:flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-medium shrink-0',
                      isActive && 'bg-primary text-primary-foreground',
                      isCompleted && 'bg-muted-foreground/20 text-muted-foreground',
                      isFuture && 'bg-muted text-muted-foreground/50'
                    )}
                  >
                    {isCompleted ? <Check className="h-3 w-3" /> : item.step}
                  </span>
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/research"
              className={cn(
                'ml-auto flex items-center justify-center p-2 rounded-md transition-colors',
                pathname === '/research'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
              aria-label="Research & References"
            >
              <BookOpen className="h-4 w-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">Research & References</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}
