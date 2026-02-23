'use client'

import { createContext, useContext, useEffect, useCallback, useState } from 'react'
import { getProgress, markLessonVisited as saveProgress } from '@/lib/progress'

type ProgressContextType = {
  visited: Set<string>
  markVisited: (slug: string) => void
  refresh: () => void
}

const ProgressContext = createContext<ProgressContextType | null>(null)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [visited, setVisited] = useState<Set<string>>(new Set())

  const refresh = useCallback(() => {
    setVisited(getProgress())
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const markVisited = useCallback((slug: string) => {
    saveProgress(slug)
    setVisited(getProgress())
  }, [])

  return (
    <ProgressContext.Provider value={{ visited, markVisited, refresh }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  return ctx ?? { visited: new Set<string>(), markVisited: () => {}, refresh: () => {} }
}
