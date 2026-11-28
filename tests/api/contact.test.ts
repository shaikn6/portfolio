import { beforeEach, describe, expect, it } from 'vitest'
import { GET, POST } from '../../api/contact.js'
import { CATEGORIES, TILE_COUNT, TTL_MS, checkSelection, createChallenge } from '../../api/_puzzle.js'
import type { Challenge } from '../../api/_puzzle.js'

const SECRET = 'test-secret-not-used-anywhere-else'
const EMAIL = 'person@example.test'
const PHONE = '+1 (555) 010-0100'

// What a person does: pick the tiles that belong to the prompted category.
function solve({ prompt, tiles }: Pick<Challenge, 'prompt' | 'tiles'>): number[] {
  const members: readonly string[] = CATEGORIES[prompt.replace('Select all the ', '') as keyof typeof CATEGORIES]
  return tiles.flatMap((tile, index) => (members.includes(tile) ? [index] : []))
}

function post(body: unknown): Promise<Response> {
  return POST(new Request('https://site.test/api/contact', { method: 'POST', body: JSON.stringify(body) }))
}

describe('puzzle', () => {
  it('builds a 12-tile grid with 3 to 5 correct tiles and a signed, expiring token', () => {
    for (let i = 0; i < 50; i++) {
      const now = 1_000_000
      const challenge = createChallenge(SECRET, now)
      expect(challenge.tiles).toHaveLength(TILE_COUNT)
      expect(new Set(challenge.tiles).size).toBe(TILE_COUNT)
      expect(solve(challenge).length).toBeGreaterThanOrEqual(3)
      expect(solve(challenge).length).toBeLessThanOrEqual(5)
      expect(challenge.exp).toBe(now + TTL_MS)
      expect(challenge.sig).toMatch(/^[0-9a-f]{64}$/)
    }
  })

  it('draws every tile from the known categories', () => {
    const known = new Set<string>(Object.values(CATEGORIES).flat())
    expect(createChallenge(SECRET).tiles.every((tile) => known.has(tile))).toBe(true)
  })

  it('accepts the exact correct selection and nothing else', () => {
    const now = 5_000
    const challenge = createChallenge(SECRET, now)
    const answer = solve(challenge)
    const base = { exp: challenge.exp, nonce: challenge.nonce, sig: challenge.sig }

    expect(checkSelection(SECRET, { ...base, selection: answer }, now)).toBe(true)
    expect(checkSelection(SECRET, { ...base, selection: [...answer].reverse() }, now)).toBe(true)
    expect(checkSelection(SECRET, { ...base, selection: answer.slice(1) }, now)).toBe(false)
    const wrongTile = [0, 1, 2, 3, 4, 5].find((i) => !answer.includes(i))!
    expect(checkSelection(SECRET, { ...base, selection: [...answer, wrongTile] }, now)).toBe(false)
    expect(checkSelection(SECRET, { ...base, selection: [] }, now)).toBe(false)
  })

  it('rejects an expired challenge, a tampered one and one signed with another secret', () => {
    const now = 5_000
    const challenge = createChallenge(SECRET, now)
    const good = { selection: solve(challenge), exp: challenge.exp, nonce: challenge.nonce, sig: challenge.sig }

    expect(checkSelection(SECRET, good, challenge.exp + 1)).toBe(false)
    expect(checkSelection(SECRET, { ...good, exp: challenge.exp + 60_000 }, now)).toBe(false)
    expect(checkSelection(SECRET, { ...good, nonce: '0'.repeat(24) }, now)).toBe(false)
    expect(checkSelection('another-secret', good, now)).toBe(false)
  })

  it('rejects malformed bodies', () => {
    const now = 5_000
    const c = createChallenge(SECRET, now)
    const base = { exp: c.exp, nonce: c.nonce, sig: c.sig }
    for (const bad of [null, 'x', 42, {}, { ...base, selection: 'abc' }, { ...base, selection: [99] }, { ...base, selection: [1, 1] }, { ...base, selection: [-1] }, { ...base, selection: [0.5] }, { ...base, selection: [0], sig: 'zz' }, { ...base, selection: [0], nonce: 5 }, { ...base, selection: [0], exp: 'soon' }]) {
      expect(checkSelection(SECRET, bad, now)).toBe(false)
    }
  })
})

describe('/api/contact', () => {
  beforeEach(() => {
    process.env.PUZZLE_SECRET = SECRET
    process.env.CONTACT_EMAIL = EMAIL
    process.env.CONTACT_PHONE = PHONE
  })

  it('GET returns a challenge that does not contain the answer, the secret or the contact details', async () => {
    const res = await GET()
    const text = await res.text()
    expect(res.status).toBe(200)
    expect(res.headers.get('cache-control')).toBe('no-store')
    expect(Object.keys(JSON.parse(text)).sort()).toEqual(['exp', 'nonce', 'prompt', 'sig', 'tiles'])
    for (const secretValue of [SECRET, EMAIL, PHONE]) expect(text).not.toContain(secretValue)
  })

  it('POST with the correct selection returns the details; a wrong one returns none', async () => {
    const challenge = (await (await GET()).json()) as Challenge
    const base = { exp: challenge.exp, nonce: challenge.nonce, sig: challenge.sig }

    const ok = await post({ ...base, selection: solve(challenge) })
    expect(ok.status).toBe(200)
    expect(await ok.json()).toEqual({ email: EMAIL, phone: PHONE })

    const wrong = await post({ ...base, selection: [] })
    const wrongText = await wrong.text()
    expect(wrong.status).toBe(400)
    expect(wrongText).not.toContain(EMAIL)
    expect(wrongText).not.toContain(PHONE)
  })

  it('POST rejects invalid JSON', async () => {
    const res = await POST(new Request('https://site.test/api/contact', { method: 'POST', body: '{not json' }))
    expect(res.status).toBe(400)
  })

  it('answers 503 to both methods, and issues no puzzle, while any setting is missing', async () => {
    for (const key of ['PUZZLE_SECRET', 'CONTACT_EMAIL', 'CONTACT_PHONE']) {
      const value = process.env[key]
      delete process.env[key]
      expect((await GET()).status).toBe(503)
      expect((await post({})).status).toBe(503)
      process.env[key] = value
    }
  })
})
