import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    const API = 'https://portfolio-analytics-five.vercel.app/api/track'
    const t0 = Date.now()

    function fp(): string {
      try {
        const c = document.createElement('canvas')
        const x = c.getContext('2d')!
        x.textBaseline = 'top'
        x.font = '14px Arial'
        x.fillStyle = '#f60'
        x.fillRect(125, 1, 62, 20)
        x.fillStyle = '#069'
        x.fillText('Nagizaaz\u{1F499}', 2, 15)
        x.fillStyle = 'rgba(102,204,0,0.7)'
        x.fillText('Nagizaaz\u{1F499}', 4, 17)
        return c.toDataURL().slice(-32)
      } catch {
        return ''
      }
    }

    const fprint = fp()
    let stored = sessionStorage.getItem('_vsid')
    if (!stored) {
      stored = Math.random().toString(36).slice(2) + Date.now().toString(36)
      sessionStorage.setItem('_vsid', stored)
    }
    const sid = stored + (fprint ? fprint.replace(/[^a-z0-9]/gi, '').slice(0, 8) : '')

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
