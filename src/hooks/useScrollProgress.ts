import { useEffect } from 'react'

export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-bar')
    if (!bar) return

    const onScroll = () => {
      const pct =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      bar.style.height = pct + '%'
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
