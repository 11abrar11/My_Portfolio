import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Since this is a single page application/portfolio, we just need the root path
  const baseUrl = 'https://www.mohammedabrarhussain.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
