'use client';

import { useRouter } from 'next/navigation';
import { useProfileStore } from '@/store/profile-store';
import { PromptDisplay } from '@/components/export/prompt-display';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquare, Settings, Copy } from 'lucide-react';

export default function ExportPage() {
  const router = useRouter();
  const generatedPrompt = useProfileStore((s) => s.generatedPrompt);
  const promptSections = useProfileStore((s) => s.promptSections);

  if (!generatedPrompt || !promptSections) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Copy className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center space-y-1">
          <p className="font-medium text-sm">No learner persona yet</p>
          <p className="text-muted-foreground text-xs max-w-xs">
            Choose an archetype and configure a learner profile to view and export the persona prompt.
          </p>
        </div>
        <Button onClick={() => router.push('/')}>
          Choose an Archetype
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end gap-2">
        <Link href="/chat">
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            Chat with Learner
          </Button>
        </Link>
        <Link href="/builder">
          <Button variant="ghost" size="sm">
            <Settings className="h-3.5 w-3.5 mr-1" />
            Edit Profile
          </Button>
        </Link>
      </div>

      <PromptDisplay systemPrompt={generatedPrompt} sections={promptSections} />
    </div>
  );
}
