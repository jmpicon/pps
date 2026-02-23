import { modulo1 } from './modulo1'
import { modulo2 } from './modulo2'
import { modulo3 } from './modulo3'
import { modulo4 } from './modulo4'
import { modulo5 } from './modulo5'
import { modulo6 } from './modulo6'
import type { Module, Lesson } from './index'

export const allModules: Module[] = [
  modulo1,
  modulo2,
  modulo3,
  modulo4,
  modulo5,
  modulo6
]

export function getModule(id: string): Module | undefined {
  return allModules.find(m => m.id === id)
}

export function getLesson(moduleId: string, lessonSlug: string) {
  const mod = getModule(moduleId)
  return mod?.lessons.find(l => l.slug === lessonSlug)
}

export function getLessonBySlug(lessonSlug: string): { module: Module; lesson: Lesson } | undefined {
  for (const mod of allModules) {
    const lesson = mod.lessons.find(l => l.slug === lessonSlug)
    if (lesson) return { module: mod, lesson }
  }
  return undefined
}

export function getAllLessonsFlat(): { module: Module; lesson: Lesson }[] {
  const result: { module: Module; lesson: Lesson }[] = []
  for (const mod of allModules) {
    for (const lesson of mod.lessons) {
      result.push({ module: mod, lesson })
    }
  }
  return result
}
