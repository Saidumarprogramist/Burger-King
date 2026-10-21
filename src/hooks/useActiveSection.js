import { useEffect, useState } from 'react'

export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0])
  const key = ids.join(',')

  useEffect(() => {
    const sections = key
      .split(',')
      .map(id => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-140px 0px -55% 0px' },
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [key])

  return activeId
}
