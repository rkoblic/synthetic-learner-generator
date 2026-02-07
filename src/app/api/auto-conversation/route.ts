import Anthropic from '@anthropic-ai/sdk';
import { anthropic, MODEL } from '@/lib/anthropic';
import type { AutoConversationRequest } from '@/lib/types';
import { SIMULATION_TURN_COUNT, MAX_TOKENS_SIMULATION } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const body: AutoConversationRequest = await request.json();

    if (!body.learnerPrompt || !body.tutorPrompt) {
      return new Response('learnerPrompt and tutorPrompt are required', {
        status: 400,
      });
    }

    const encoder = new TextEncoder();
    const conversationHistory: { role: 'tutor' | 'learner'; content: string }[] = [];

    const readable = new ReadableStream({
      async start(controller) {
        const emit = (data: Record<string, unknown>) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );
        };

        try {
          for (let turn = 1; turn <= SIMULATION_TURN_COUNT; turn++) {
            const isTutorTurn = turn % 2 === 1;
            const currentRole = isTutorTurn ? 'tutor' : 'learner';
            const systemPrompt = isTutorTurn ? body.tutorPrompt : body.learnerPrompt;

            // Build messages from the current speaker's perspective:
            // Their own prior messages = 'assistant', the other party's = 'user'
            const apiMessages: { role: 'user' | 'assistant'; content: string }[] =
              conversationHistory.map((msg) => ({
                role: msg.role === currentRole ? 'assistant' : 'user',
                content: msg.content,
              }));

            // First turn: tutor speaks with no history — add a synthetic kickoff message
            if (turn === 1 && apiMessages.length === 0) {
              apiMessages.push({
                role: 'user',
                content: '[A student has joined the tutoring session. Greet them and ask what they need help with.]',
              });
            }

            emit({ type: 'message_start', turn, role: currentRole });

            const stream = await anthropic.messages.stream({
              model: MODEL,
              max_tokens: MAX_TOKENS_SIMULATION,
              system: systemPrompt,
              messages: apiMessages,
            });

            let fullText = '';
            for await (const event of stream) {
              if (
                event.type === 'content_block_delta' &&
                event.delta.type === 'text_delta'
              ) {
                fullText += event.delta.text;
                emit({ type: 'token', text: event.delta.text });
              }
            }

            emit({ type: 'message_end', turn });
            conversationHistory.push({ role: currentRole, content: fullText });
          }

          emit({ type: 'done', totalTurns: SIMULATION_TURN_COUNT });
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Auto-conversation stream error:', error);

          let message = 'An error occurred during conversation generation.';
          if (error instanceof Anthropic.APIError) {
            if (error.status === 429) {
              message = 'Rate limit exceeded. Please wait a moment and try again.';
            } else if (error.status === 401) {
              message = 'API authentication failed. Check your API key.';
            }
          }

          emit({ type: 'error', message });
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Auto-conversation error:', error);

    if (error instanceof Anthropic.APIError) {
      if (error.status === 429) {
        return new Response('Rate limit exceeded. Please wait a moment.', { status: 429 });
      }
      if (error.status === 401) {
        return new Response('API authentication failed.', { status: 401 });
      }
    }

    return new Response('Failed to process auto-conversation request', { status: 500 });
  }
}
