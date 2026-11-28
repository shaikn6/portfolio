import { createHmac, randomBytes, randomInt, timingSafeEqual } from 'node:crypto'

// A stateless "select all the ..." check. The server signs each challenge with an HMAC over the
// correct answer, so the browser never receives the answer and nothing has to be stored.

export const CATEGORIES = {
  animals: ['🐶', '🐱', '🐘', '🦊', '🐼', '🐸', '🦁', '🐧', '🐢', '🐙'],
  fruit: ['🍎', '🍌', '🍇', '🍓', '🍉', '🍒', '🍑', '🍍', '🥝', '🍋'],
  vehicles: ['🚗', '🚌', '🚲', '✈️', '🚂', '🚀', '🛵', '🚁', '⛵', '🚜'],
} as const

type Category = keyof typeof CATEGORIES

export const TILE_COUNT = 12
export const TTL_MS = 2 * 60 * 1000

export interface Challenge {
  prompt: string
  tiles: string[]
  exp: number
  nonce: string
  sig: string
}

function sign(secret: string, exp: number, nonce: string, indices: number[]): string {
  const answer = [...indices].sort((a, b) => a - b).join(',')
  return createHmac('sha256', secret).update(`${exp}.${nonce}.${answer}`).digest('hex')
}

function sample<T>(items: readonly T[], count: number): T[] {
  const pool = [...items]
  const picked: T[] = []
  while (picked.length < count) picked.push(pool.splice(randomInt(pool.length), 1)[0])
  return picked
}

export function createChallenge(secret: string, now = Date.now()): Challenge {
  const names = Object.keys(CATEGORIES) as Category[]
  const target = names[randomInt(names.length)]
  const targets = sample(CATEGORIES[target], 3 + randomInt(3))
  const others = names.filter((name) => name !== target).flatMap((name) => CATEGORIES[name])
  const tiles = sample([...targets, ...sample(others, TILE_COUNT - targets.length)], TILE_COUNT)

  const exp = now + TTL_MS
  const nonce = randomBytes(12).toString('hex')
  const answer = tiles.flatMap((tile, index) => (targets.includes(tile) ? [index] : []))
  return { prompt: `Select all the ${target}`, tiles, exp, nonce, sig: sign(secret, exp, nonce, answer) }
}

export function checkSelection(secret: string, body: unknown, now = Date.now()): boolean {
  if (typeof body !== 'object' || body === null) return false
  const { selection, exp, nonce, sig } = body as Record<string, unknown>
  if (!Array.isArray(selection)) return false
  if (!selection.every((i) => Number.isInteger(i) && i >= 0 && i < TILE_COUNT)) return false
  if (new Set(selection).size !== selection.length) return false
  if (typeof exp !== 'number' || now > exp) return false
  if (typeof nonce !== 'string') return false
  if (typeof sig !== 'string' || !/^[0-9a-f]{64}$/.test(sig)) return false

  const expected = Buffer.from(sign(secret, exp, nonce, selection as number[]), 'hex')
  return timingSafeEqual(Buffer.from(sig, 'hex'), expected)
}
