import { modulo1 } from './modulo1'
import { modulo2 } from './modulo2'
import { modulo3 } from './modulo3'
import { modulo4 } from './modulo4'
import { modulo5 } from './modulo5'
import { modulo6 } from './modulo6'
import type { Module } from './index'

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
