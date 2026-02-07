import Anthropic from '@anthropic-ai/sdk';
import { anthropic, MODEL } from '@/lib/anthropic';
import type { ChatRequest } from '@/lib/types';
import { MAX_TOKENS_RESPONSE } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();

    if (!body.systemPrompt || !body.messages) {
      return new Response('systemPrompt and messages are required', {
        status: 400,
      });
    }

    const stream = await anthropic.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS_RESPONSE,
      system: body.systemPrompt,
      messages: body.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: 'Stream error occurred' })}\n\n`
            )
          );
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
    console.error('Chat error:', error);

    if (error instanceof Anthropic.APIError) {
      if (error.status === 429) {
        return new Response('Rate limit exceeded. Please wait a moment.', { status: 429 });
      }
      if (error.status === 401) {
        return new Response('API authentication failed.', { status: 401 });
      }
    }

    return new Response('Failed to process chat request', { status: 500 });
  }
}
