import { services } from '@/services/data/services';
import type { ServiceDefinition } from '@/services/abstract-service';

export function getServiceSlug(name: string): string {
  return name.toLowerCase().replace(/[\s.]+/g, '-');
}

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return services.find((s) => getServiceSlug(s.name) === slug);
}

export function getServicesInCategory(category: string): ServiceDefinition[] {
  return services.filter((s) => s.category === category);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => getServiceSlug(s.name));
}

export function getAllCategories(): string[] {
  return [...new Set(services.map((s) => s.category))];
}

export function getServicesByCategory(): Map<string, ServiceDefinition[]> {
  const map = new Map<string, ServiceDefinition[]>();
  for (const s of services) {
    const list = map.get(s.category) ?? [];
    list.push(s);
    map.set(s.category, list);
  }
  return map;
}

const categoryDescriptions: Record<string, string> = {
  'Social Media':
    'Social media platforms are where your username becomes your identity. A consistent handle across networks makes you easier to find and builds brand recognition.',
  Developer:
    'Developer platforms are where your professional coding identity lives. A recognizable username helps with open source contributions, collaboration, and career visibility.',
  'Content & Blogging':
    'Blogging and content platforms let you publish under your own name. Securing your username early ensures readers can always find your writing.',
  'Creative & Design':
    'Creative platforms showcase your portfolio and design work. A clean, memorable username helps clients and collaborators discover your work.',
  'Music & Audio':
    'Music platforms are where artists and listeners connect. Your username is your artist brand — consistency across platforms helps fans find all your content.',
  'Video & Streaming':
    'Video and streaming platforms reward recognizable usernames. Whether you are a creator or viewer, your handle is how your audience finds you.',
  Gaming:
    'Gaming platforms tie your username to your achievements, friends list, and reputation. Many gamers keep the same tag across every platform they play on.',
  Professional:
    'Professional platforms connect you with opportunities, clients, and collaborators. A consistent username across these networks strengthens your personal brand.',
  Community:
    'Community platforms are built around participation and reputation. Your username follows you across discussions, contributions, and interactions.',
  'Finance & Crypto':
    'Finance and crypto platforms often use usernames for public profiles and transactions. Securing your preferred name protects your identity in these spaces.',
  Messaging:
    'Messaging platforms use usernames as your primary contact identifier. Having the same handle everywhere makes it easy for people to reach you.',
  'Education & Learning':
    'Education platforms track your learning progress and achievements under your username. A consistent handle lets you share your learning journey.',
  Photography:
    'Photography platforms are your visual portfolio. A clean username makes your profile URL memorable and professional when sharing your work.',
};

const platformInfo: Record<
  string,
  { description: string; rules: string; tips: string }
> = {
  Instagram: {
    description:
      'Instagram is a photo and video sharing platform owned by Meta with over 2 billion monthly active users.',
    rules:
      'Usernames must be 1-30 characters. Only letters, numbers, periods, and underscores are allowed. No spaces or special characters.',
    tips: 'Short, memorable names without numbers tend to perform best. Periods and underscores can separate words but make the username harder to remember.',
  },
  Reddit: {
    description:
      'Reddit is a network of communities organized around topics and interests, with over 50 million daily active users.',
    rules:
      'Usernames must be 3-20 characters. Letters, numbers, hyphens, and underscores are allowed. Once chosen, a Reddit username cannot be changed.',
    tips: 'Choose carefully — Reddit usernames are permanent. Avoid anything too personal since your post history is public.',
  },
  GitHub: {
    description:
      'GitHub is the largest platform for software development and version control, hosting over 200 million repositories.',
    rules:
      'Usernames can contain alphanumeric characters and hyphens. They cannot begin or end with a hyphen or contain consecutive hyphens. Maximum 39 characters.',
    tips: 'Your GitHub username appears in all your repository URLs. Keep it short and professional if you use it for work.',
  },
  Twitch: {
    description:
      'Twitch is the leading live streaming platform, primarily focused on gaming, esports, and creative content.',
    rules:
      'Usernames must be 4-25 characters. Only letters, numbers, and underscores are allowed.',
    tips: 'Twitch usernames are case-insensitive but display with your chosen capitalization. Pick something easy to type in chat.',
  },
  Steam: {
    description:
      'Steam is the largest PC gaming platform and storefront by Valve, with over 130 million monthly active users.',
    rules:
      'Custom URL names (vanity URLs) can contain letters, numbers, and underscores. Display names are separate and can be changed freely.',
    tips: 'Steam custom URLs are different from display names. The custom URL is what appears in your profile link.',
  },
  TikTok: {
    description:
      'TikTok is a short-form video platform with over 1 billion monthly active users worldwide.',
    rules:
      'Usernames must be 2-24 characters. Only letters, numbers, underscores, and periods are allowed. They cannot end with a period.',
    tips: 'TikTok usernames can be changed, but your old username becomes available for others immediately.',
  },
  Twitter: {
    description:
      'Twitter (now X) is a social media platform for real-time conversations, news, and public discourse with over 500 million monthly active users.',
    rules:
      'Usernames must be 1-15 characters. Only letters, numbers, and underscores are allowed. No spaces or special characters.',
    tips: 'Short Twitter handles are extremely valuable. If your preferred name is taken, try adding your profession or location as a suffix.',
  },
  Facebook: {
    description:
      'Facebook is the largest social network in the world with over 3 billion monthly active users.',
    rules:
      'Usernames must be at least 5 characters and can only contain letters, numbers, and periods. No consecutive periods allowed.',
    tips: 'Facebook usernames create your vanity URL (facebook.com/username). This cannot be transferred, so choose wisely.',
  },
  YouTube: {
    description:
      'YouTube is the largest video sharing platform with over 2 billion logged-in monthly users.',
    rules:
      'Custom handles start with @ and can be 3-30 characters. Letters, numbers, underscores, hyphens, and periods are allowed.',
    tips: 'YouTube handles appear in your channel URL and @mentions. Shorter handles are easier for viewers to remember and type.',
  },
  Pinterest: {
    description:
      'Pinterest is a visual discovery and bookmarking platform with over 450 million monthly active users.',
    rules:
      'Usernames can be 3-30 characters. Only letters, numbers, and underscores are allowed.',
    tips: 'Pinterest profile URLs use your username directly. A clean name makes your boards easier to share.',
  },
  Spotify: {
    description:
      'Spotify is the largest music streaming platform with over 600 million users including 220 million subscribers.',
    rules:
      'Spotify usernames are auto-generated and cannot be chosen. However, display names can be changed freely.',
    tips: 'While you cannot choose a Spotify username, you can set a custom display name that appears on your profile and playlists.',
  },
  Medium: {
    description:
      'Medium is an online publishing platform with an emphasis on long-form articles and thought leadership.',
    rules:
      'Usernames can contain letters, numbers, and underscores. They appear after the @ symbol in your profile URL.',
    tips: 'Use your real name or a professional handle — Medium is a platform where credibility matters.',
  },
  Behance: {
    description:
      'Behance is Adobe\'s platform for showcasing and discovering creative work across graphic design, illustration, photography, and more.',
    rules:
      'Usernames can contain letters, numbers, and some special characters. They form part of your portfolio URL.',
    tips: 'Use your professional name or studio name since Behance is primarily a portfolio platform.',
  },
  Dribbble: {
    description:
      'Dribbble is a community for designers to share their work, process, and projects.',
    rules:
      'Usernames can contain letters, numbers, hyphens, and underscores. They are used in your profile URL.',
    tips: 'Dribbble is invite-only for posting. Secure your preferred username early by creating an account.',
  },
  SoundCloud: {
    description:
      'SoundCloud is an audio distribution platform that allows users to upload, promote, and share music.',
    rules:
      'Usernames can be up to 25 characters. Letters, numbers, spaces, hyphens, and underscores are allowed.',
    tips: 'Your SoundCloud URL uses a simplified version of your display name. Set a clean custom URL in your settings.',
  },
  Mastodon: {
    description:
      'Mastodon is a decentralized, open-source social network that is part of the Fediverse.',
    rules:
      'Usernames can contain letters, numbers, and underscores. Your full handle includes your instance (e.g., @user@mastodon.social).',
    tips: 'Since Mastodon is decentralized, the same username can exist on different instances. Pick your instance carefully.',
  },
  Bluesky: {
    description:
      'Bluesky is a decentralized social network built on the AT Protocol, founded by Jack Dorsey.',
    rules:
      'Handles are in the format username.bsky.social. You can also use a custom domain as your handle.',
    tips: 'Using a custom domain as your Bluesky handle (e.g., yourname.com) verifies your identity and looks professional.',
  },
  GitLab: {
    description:
      'GitLab is a DevOps platform that provides Git repository management, CI/CD, and project planning tools.',
    rules:
      'Usernames can contain alphanumeric characters, underscores, hyphens, and periods. Must start with a letter or number.',
    tips: 'GitLab usernames affect your namespace for all projects. Choose something you will want long-term.',
  },
  Threads: {
    description:
      'Threads is Meta\'s text-based social platform, linked to Instagram accounts.',
    rules:
      'Threads uses your Instagram username. Changing it on one platform changes it on both.',
    tips: 'Since Threads is tied to Instagram, securing your username on Instagram automatically secures it on Threads.',
  },
  Snapchat: {
    description:
      'Snapchat is a multimedia messaging app with over 750 million monthly active users, known for disappearing messages.',
    rules:
      'Usernames must be 3-15 characters. Only letters, numbers, hyphens, and underscores are allowed. Must start with a letter.',
    tips: 'Snapchat usernames cannot be changed after creation. Choose wisely and keep it short for easy sharing via Snapcode.',
  },
  Tumblr: {
    description:
      'Tumblr is a microblogging and social networking platform known for creative communities and fan culture.',
    rules:
      'Usernames (blog names) can be up to 32 characters. Letters, numbers, and hyphens are allowed.',
    tips: 'Your Tumblr username becomes your subdomain (username.tumblr.com). You can have multiple blogs with different names.',
  },
  Vimeo: {
    description:
      'Vimeo is a video hosting platform focused on high-quality, ad-free video for creators and businesses.',
    rules:
      'Usernames can contain letters, numbers, and some special characters. They are used in your profile URL.',
    tips: 'Vimeo caters to professional video creators. Use a username that matches your brand or studio name.',
  },
  'Product Hunt': {
    description:
      'Product Hunt is a platform for discovering and sharing new tech products, apps, and tools.',
    rules:
      'Usernames can contain letters, numbers, and underscores. They appear after @ in your profile URL.',
    tips: 'Product Hunt is a startup and tech community. Use your real name for credibility when launching or reviewing products.',
  },
  Linktree: {
    description:
      'Linktree is a link-in-bio tool that lets you create a landing page with all your important links.',
    rules:
      'Usernames can contain letters, numbers, periods, and underscores. They form your linktr.ee URL.',
    tips: 'Your Linktree URL is what you share in social media bios. Keep it identical to your other usernames for consistency.',
  },
  Patreon: {
    description:
      'Patreon is a membership platform that lets creators earn recurring revenue from their fans and supporters.',
    rules:
      'Page URLs can contain letters, numbers, and underscores. They form your patreon.com profile link.',
    tips: 'Your Patreon URL should match your brand name across other platforms so fans can find you easily.',
  },
  'Chess.com': {
    description:
      'Chess.com is the largest online chess platform with over 100 million members worldwide.',
    rules:
      'Usernames can be 3-20 characters. Letters, numbers, hyphens, and underscores are allowed.',
    tips: 'Chess.com usernames are permanent. Many players use their real name or a chess-related handle.',
  },
  Lichess: {
    description:
      'Lichess is a free, open-source chess server that is entirely funded by donations.',
    rules:
      'Usernames must be 2-20 characters. Only letters, numbers, hyphens, and underscores are allowed.',
    tips: 'Lichess is open source and ad-free. Your username is permanent once created.',
  },
  Letterboxd: {
    description:
      'Letterboxd is a social film discovery and review platform popular among movie enthusiasts.',
    rules:
      'Usernames can contain letters, numbers, and underscores. They are used in your profile URL.',
    tips: 'Letterboxd has a tight-knit film community. Use a name that reflects your cinephile identity.',
  },
  Duolingo: {
    description:
      'Duolingo is the most popular language-learning platform with over 500 million registered users.',
    rules:
      'Usernames can contain letters, numbers, and some special characters. They appear in your profile URL.',
    tips: 'Your Duolingo username is visible on leaderboards and friend lists. Pick something fun and recognizable.',
  },
};

export function getCategoryDescription(category: string): string {
  return (
    categoryDescriptions[category] ??
    `${category} platforms each have their own username requirements. Checking availability across all of them saves time and helps you maintain a consistent online identity.`
  );
}

export function getPlatformInfo(name: string): {
  description: string;
  rules: string;
  tips: string;
} {
  if (platformInfo[name]) {
    return platformInfo[name];
  }

  const service = services.find((s) => s.name === name);
  const category = service?.category ?? 'online';

  return {
    description: `${name} is a popular ${category.toLowerCase()} platform where millions of users connect and share content.`,
    rules: `${name} usernames typically allow letters, numbers, and common special characters like underscores. Check the platform for exact length limits.`,
    tips: `Secure your preferred username on ${name} early. Consistent usernames across platforms make you easier to find.`,
  };
}
