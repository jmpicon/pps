import { allModules, getModule } from '@/content/modules/registry'
import type { Module, Lesson } from '@/content/modules/index'

export interface NavLesson {
  module: Module
  lesson: Lesson
  moduleIndex: number
  lessonIndex: number
}

export function getAllLessonsOrdered(): NavLesson[] {
  const result: NavLesson[] = []
  allModules.forEach((mod, modIdx) => {
    mod.lessons.forEach((lesson, lessonIdx) => {
      result.push({ module: mod, lesson, moduleIndex: modIdx, lessonIndex: lessonIdx })
    })
  })
  return result
}

export function getPrevNextLesson(moduleId: string, lessonSlug: string): {
  prev: NavLesson | null
  next: NavLesson | null
} {
  const all = getAllLessonsOrdered()
  const idx = all.findIndex(
    (n) => n.module.id === moduleId && n.lesson.slug === lessonSlug
  )
  if (idx < 0) return { prev: null, next: null }
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}

export function getPrevNextBySlug(lessonSlug: string): {
  prev: NavLesson | null
  next: NavLesson | null
} {
  const all = getAllLessonsOrdered()
  const idx = all.findIndex((n) => n.lesson.slug === lessonSlug)
  if (idx < 0) return { prev: null, next: null }
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}
