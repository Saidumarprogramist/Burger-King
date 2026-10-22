import { useEffect, useRef } from 'react'

export default function useDialog(open, close, desktopQuery) {
  const containerRef = useRef(null)
  const openerRef = useRef(null)
  const closeRef = useRef(close)
  closeRef.current = close

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const element = containerRef.current
    const focusable = () => [...element.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])')]
      .filter(node => node.getClientRects().length)
    ;(focusable()[0] || element)?.focus()
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current()
      } else if (event.key === 'Tab') {
        const nodes = focusable()
        if (!nodes.length) { event.preventDefault(); element?.focus(); return }
        const first = nodes[0], last = nodes.at(-1)
        if (event.shiftKey && (document.activeElement === first || !element.contains(document.activeElement))) {
          event.preventDefault(); last.focus()
        } else if (!event.shiftKey && (document.activeElement === last || !element.contains(document.activeElement))) {
          event.preventDefault(); first.focus()
        }
      }
    }
    const onResize = () => {
      if (desktopQuery && window.matchMedia(desktopQuery).matches) closeRef.current()
    }
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      openerRef.current?.focus()
    }
  }, [open, desktopQuery])

  return { containerRef, openerRef }
}
