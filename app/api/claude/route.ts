import { NextRequest, NextResponse } from 'next/server'

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-20250514'

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY no configurada' }, { status: 500 })
  }

  const { prompt, stream: wantStream = false } = await req.json() as {
    prompt: string
    stream?: boolean
  }

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt requerido' }, { status: 400 })
  }

  const body = {
    model: MODEL,
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
    stream: wantStream,
  }

  if (!wantStream) {
    const res = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json() as { content?: { text: string }[]; error?: { message: string } }
    if (!res.ok) return NextResponse.json({ error: data.error?.message ?? 'Error API' }, { status: res.status })
    const text = data.content?.[0]?.text ?? ''
    return NextResponse.json({ text })
  }

  // Streaming mode
  const upstream = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  })

  if (!upstream.ok) {
    const err = await upstream.json() as { error?: { message: string } }
    return NextResponse.json({ error: err.error?.message ?? 'Error API' }, { status: upstream.status })
  }

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader()
      const decoder = new TextDecoder()
      let done = false
      while (!done) {
        const { value, done: d } = await reader.read()
        done = d
        if (value) {
          const chunk = decoder.decode(value)
          for (const line of chunk.split('\n')) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') { done = true; break }
              try {
                const json = JSON.parse(data) as {
                  type: string
                  delta?: { type: string; text: string }
                }
                if (json.type === 'content_block_delta' && json.delta?.type === 'text_delta') {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: json.delta.text })}\n\n`))
                }
              } catch {}
            }
          }
        }
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
