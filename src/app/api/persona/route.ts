import { NextResponse } from 'next/server';
import { compilePersonaPrompt } from '@/lib/persona-engine';
import type { PersonaRequest } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body: PersonaRequest = await request.json();

    if (!body.profile) {
      return NextResponse.json(
        { error: 'Profile is required' },
        { status: 400 }
      );
    }

    const result = compilePersonaPrompt(body.profile);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Persona generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate persona' },
      { status: 500 }
    );
  }
}
