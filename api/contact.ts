import { checkSelection, createChallenge } from './_puzzle.js'

// GET issues a puzzle. POST returns the contact details only for a correct answer.
// The details live in Vercel environment variables (CONTACT_EMAIL, CONTACT_PHONE), never in the repository or the page bundle.

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  })
}

// All three settings or none: without them there is nothing to protect, so no puzzle is issued either.
function settings() {
  const { PUZZLE_SECRET: secret, CONTACT_EMAIL: email, CONTACT_PHONE: phone } = process.env
  return secret && email && phone ? { secret, email, phone } : null
}

export function GET(): Response {
  const config = settings()
  if (!config) return json({ error: 'unavailable' }, 503)
  return json(createChallenge(config.secret))
}

export async function POST(request: Request): Promise<Response> {
  const config = settings()
  if (!config) return json({ error: 'unavailable' }, 503)

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'bad request' }, 400)
  }
  if (!checkSelection(config.secret, body)) return json({ error: 'incorrect' }, 400)
  return json({ email: config.email, phone: config.phone })
}
