'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { ARCHETYPES } from '@/lib/archetypes';
import { useProfileStore } from '@/store/profile-store';
import { cn } from '@/lib/utils';
import type { ArchetypeId } from '@/lib/types';
import { Pencil } from 'lucide-react';

export function ArchetypePicker() {
  const router = useRouter();
  const setFromArchetype = useProfileStore((s) => s.setFromArchetype);
  const resetProfile = useProfileStore((s) => s.resetProfile);
  const currentArchetype = useProfileStore((s) => s.profile.archetypeId);

  const handleSelect = (id: ArchetypeId) => {
    setFromArchetype(id);
    router.push('/builder');
  };

  const handleScratch = () => {
    resetProfile();
    router.push('/builder');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Choose a Learner Archetype</h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Start from a research-grounded archetype and customize from there, or build a
          learner from scratch.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ARCHETYPES.map((arch) => (
          <Card
            key={arch.id}
            className={cn(
              'cursor-pointer transition-all duration-150 hover:shadow-md hover:border-primary/50 hover:scale-[1.02]',
              currentArchetype === arch.id && 'border-primary shadow-md scale-[1.02]'
            )}
            onClick={() => handleSelect(arch.id)}
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{arch.icon}</span>
                <h3 className="font-semibold text-sm">{arch.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {arch.shortDescription}
              </p>
            </CardContent>
          </Card>
        ))}

        <Card
          className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50 border-dashed"
          onClick={handleScratch}
        >
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Pencil className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-sm">Start from Scratch</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Build a custom learner profile by configuring every dimension yourself.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
