const STORAGE_KEY = 'pps-progress'

export function getProgress(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function markLessonVisited(slug: string): void {
  const set = getProgress()
  set.add(slug)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)))
  } catch {}
}

export function getModuleProgress(lessonSlugs: string[]): number {
  const visited = getProgress()
  const count = lessonSlugs.filter((s) => visited.has(s)).length
  return lessonSlugs.length > 0 ? Math.round((count / lessonSlugs.length) * 100) : 0
}

export function getTotalProgress(allLessons: { slug: string }[]): number {
  const visited = getProgress()
  const count = allLessons.filter((l) => visited.has(l.slug)).length
  return allLessons.length > 0 ? Math.round((count / allLessons.length) * 100) : 0
}
