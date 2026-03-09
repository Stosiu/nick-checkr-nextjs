import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { getAllPosts } from '@/lib/blog';
import { getServiceSlug } from '@/lib/platform-utils';
import { services } from '@/services/data/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.6,
  }));

  const checkPages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/check/${getServiceSlug(service.name)}`,
    priority: 0.8,
  }));

  return [
    { url: siteConfig.url, priority: 1.0 },
    { url: `${siteConfig.url}/check`, priority: 0.9 },
    { url: `${siteConfig.url}/blog`, priority: 0.7 },
    ...checkPages,
    ...blogPosts,
  ];
}
