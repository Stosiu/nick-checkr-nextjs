import { siteConfig } from '@/config/site';

export async function getGitHubStars(): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${siteConfig.social.repoSlug}`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return null;

    const data = await response.json();
    return typeof data.stargazers_count === 'number' ? data.stargazers_count : null;
  } catch {
    return null;
  }
}
