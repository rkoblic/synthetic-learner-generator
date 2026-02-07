'use client';

import { useRouter } from 'next/navigation';
import { useProfileStore } from '@/store/profile-store';
import { ChatInterface } from '@/components/chat/chat-interface';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Settings, Copy, MessageSquare } from 'lucide-react';

export default function ChatPage() {
  const router = useRouter();
  const generatedPrompt = useProfileStore((s) => s.generatedPrompt);
  const profile = useProfileStore((s) => s.profile);

  if (!generatedPrompt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <MessageSquare className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center space-y-1">
          <p className="font-medium text-sm">No learner persona yet</p>
          <p className="text-muted-foreground text-xs max-w-xs">
            Choose an archetype and configure a learner profile to start chatting.
          </p>
        </div>
        <Button onClick={() => router.push('/archetypes')}>
          Choose an Archetype
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {profile.archetypeId && (
            <Badge variant="secondary" className="text-xs">
              {profile.archetypeId}
            </Badge>
          )}
          {profile.knowledgeState.domain && (
            <Badge variant="outline" className="text-xs">
              {profile.knowledgeState.domain}
            </Badge>
          )}
          {profile.knowledgeState.topic && (
            <Badge variant="outline" className="text-xs">
              {profile.knowledgeState.topic}
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Link href="/export">
            <Button variant="ghost" size="sm">
              <Copy className="h-3.5 w-3.5 mr-1" />
              Export
            </Button>
          </Link>
          <Link href="/builder">
            <Button variant="ghost" size="sm">
              <Settings className="h-3.5 w-3.5 mr-1" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="border rounded-lg h-[calc(100vh-200px)]">
        <ChatInterface
          systemPrompt={generatedPrompt}
          learnerName={profile.name}
        />
      </div>
    </div>
  );
}
