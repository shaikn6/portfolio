import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    const API = 'https://portfolio-analytics-five.vercel.app/api/track'
    const t0 = Date.now()

    // Anonymous, per-session id only — no canvas/browser fingerprinting.
    // Cleared when the tab closes (sessionStorage), so it cannot track a
    // visitor across sessions. Keeps analytics consent-free under GDPR/CCPA.
    let stored = sessionStorage.getItem('_vsid')
    if (!stored) {
      stored = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) =>
        b.toString(16).padStart(2, '0'),
      ).join('')
      sessionStorage.setItem('_vsid', stored)
    }
    const sid = stored

    try {
      fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'visit',
          session_id: sid,
          page: location.pathname,
          referrer: document.referrer || '',
        }),
      }).catch(() => {})

      const handleBeforeUnload = () => {
        navigator.sendBeacon(
          API,
          JSON.stringify({
            type: 'leave',
            session_id: sid,
            time_spent: Math.round((Date.now() - t0) / 1000),
          }),
        )
      }

      window.addEventListener('beforeunload', handleBeforeUnload)
      return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    } catch {
      // silently ignore
    }
  }, [])

  return null
}
