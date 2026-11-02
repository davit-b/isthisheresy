import { MetadataRoute } from 'next';
import { topics } from '@/data/topics';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://isthisheresy.com';

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // All topic pages
  topics.forEach((topic) => {
    routes.push({
      url: `${baseUrl}/${topic.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  ['talking-back', 'talking-back/acedia'].forEach((path) => {
    routes.push({
      url: `${baseUrl}/${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return routes;
}
