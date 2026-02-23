'use client'

import { useEffect } from 'react'
import { useProgress } from './ProgressProvider'

export function LessonVisitedTracker({ slug }: { slug: string }) {
  const { markVisited } = useProgress()
  useEffect(() => {
    markVisited(slug)
  }, [slug, markVisited])
  return null
}
