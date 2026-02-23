import type { MetadataRoute } from 'next'
import { allModules } from '@/content/modules/registry'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://pps.example.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/start`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/syllabus`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/modulos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/laboratorio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contenido`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/labs/setup`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/glossary`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/changelog`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/ethics`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/challenges`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const modulePages: MetadataRoute.Sitemap = allModules.map((mod) => ({
    url: `${baseUrl}/modulos/${mod.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const lessonPages: MetadataRoute.Sitemap = allModules.flatMap((mod) =>
    mod.lessons.map((lesson) => ({
      url: `${baseUrl}/lessons/${lesson.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  const labPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/labs/lab-sqli`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/labs/dvwa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  return [...staticPages, ...modulePages, ...lessonPages, ...labPages]
}
