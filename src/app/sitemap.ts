import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { getAllPosts } from '@/lib/blog';
import { getAllCategories, getCategorySlug, getServiceSlug } from '@/lib/platform-utils';
import { services } from '@/services/data/services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const now = new Date();

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${siteConfig.url}/check/category/${getCategorySlug(category)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const checkPages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/check/${getServiceSlug(service.name)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteConfig.url}/check`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteConfig.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteConfig.url}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteConfig.url}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${siteConfig.url}/disclaimer`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    ...categoryPages,
    ...checkPages,
    ...blogPosts,
  ];
}
