import { describe, expect, it } from 'vitest'
import { FILTERS, PROJECTS } from './projects'

describe('project catalog', () => {
  it('uses a unique HTTPS repository URL as each card key', () => {
    expect(PROJECTS.length).toBeGreaterThan(0)

    const links = PROJECTS.map(({ href }) => new URL(href))
    expect(new Set(links.map(({ href }) => href)).size).toBe(PROJECTS.length)
    for (const link of links) {
      expect(link.origin).toBe('https://github.com')
      expect(link.pathname).toMatch(/^\/[^/]+\/[^/]+$/)
    }
  })

  it('provides a filter for every group and a project for every group filter', () => {
    const ids = FILTERS.map(({ id }) => id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).toContain('all')
    expect(new Set(ids.filter((id) => id !== 'all'))).toEqual(
      new Set(PROJECTS.map(({ group }) => group)),
    )
  })

  it('provides a label and an HTTPS URL for each demo link', () => {
    for (const { demo } of PROJECTS) {
      if (!demo) continue
      expect(demo.label.trim()).not.toBe('')
      expect(new URL(demo.href).protocol).toBe('https:')
    }
  })
})
