import type { LucideIcon } from 'lucide-react';
import {
  AtSign,
  Bitcoin,
  Camera,
  Code,
  Codepen,
  Dribbble,
  Dumbbell,
  Facebook,
  Figma,
  Gamepad2,
  Github,
  Gitlab,
  Globe,
  GraduationCap,
  Instagram,
  Linkedin,
  MessageCircle,
  Music,
  Palette,
  Pencil,
  ShoppingBag,
  Slack,
  Trello,
  Twitch,
  Twitter,
  Video,
  Youtube,
} from 'lucide-react';

import type { ServiceDefinition } from '@/services/abstract-service';
import { services } from '@/services/data/services';

export function getServiceSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[\s.]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
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

export function getCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+&\s+/g, '-')
    .replace(/\s+/g, '-');
}

export function getCategoryBySlug(slug: string): string | undefined {
  return getAllCategories().find((c) => getCategorySlug(c) === slug);
}

export function getAllCategorySlugs(): string[] {
  return getAllCategories().map(getCategorySlug);
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
  Marketplace:
    'Marketplace platforms tie your username to your seller reputation and buyer trust. A consistent handle across marketplaces strengthens your brand and makes you easier to find.',
  'Fitness & Sports':
    'Fitness and sports platforms track your activities and connect you with communities. Your username is how training partners and followers find your profile.',
  'Domain Names':
    'Domain names are the foundation of your online presence. Checking if your preferred name is available as a domain helps you secure a matching website alongside your usernames.',
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
  'VK': {
    description: 'Russian social network with over 100 million monthly active users, widely used across Eastern Europe and Central Asia.',
    rules: 'Usernames (short addresses) allow letters, numbers, and underscores. Minimum 5 characters, maximum 32.',
    tips: 'VK uses a short address system separate from your display name. Pick something Latin-alphabet friendly since Cyrillic is not allowed in short addresses.',
  },
  'Ello': {
    description: 'Ad-free social network originally launched as a Facebook alternative, now focused on creative communities.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 2 characters, maximum 20.',
    tips: 'Ello attracts artists and designers. A clean, memorable username works better than something overly clever.',
  },
  'Flipboard': {
    description: 'Content curation platform that aggregates news and articles into magazine-style feeds.',
    rules: 'Usernames allow letters, numbers, and underscores. No spaces or special characters.',
    tips: 'Your username becomes part of your profile URL. Keep it short and professional since people may share your curated magazines.',
  },
  'Taringa': {
    description: 'Latin American social network and content-sharing platform popular in Argentina and Spanish-speaking countries.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Maximum 20 characters.',
    tips: 'Taringa has a Spanish-speaking audience. A username that reads well in Spanish will resonate better with the community.',
  },
  'Gab': {
    description: 'Social network positioning itself as a free speech platform, launched in 2016.',
    rules: 'Usernames allow letters, numbers, and underscores. Maximum 15 characters.',
    tips: 'Gab usernames follow a Twitter-like format. Short, recognizable handles work best.',
  },
  'Parler': {
    description: 'Social network marketed as a free speech alternative to mainstream platforms.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 3 characters, maximum 20.',
    tips: 'Keep your username simple and easy to type since the platform uses handles similar to Twitter.',
  },
  'Coub': {
    description: 'Video platform for creating short looping videos with remixed audio, popular in Russian-speaking countries.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 3 characters.',
    tips: 'Coub is visual and entertainment-focused. A catchy, easy-to-remember username helps your loops get shared.',
  },
  'Myspace': {
    description: 'Once the largest social network in the world, now repositioned as a music and entertainment platform.',
    rules: 'Usernames allow letters, numbers, underscores, and periods. Minimum 6 characters.',
    tips: 'Most original Myspace usernames were lost during the 2013 relaunch. Previously taken names may now be available.',
  },
  'Clubhouse': {
    description: 'Audio-based social network where users join live voice conversations in virtual rooms.',
    rules: 'Usernames allow letters, numbers, underscores, and periods. Maximum 16 characters.',
    tips: 'Your username is how hosts and speakers will refer to you. Make it easy to pronounce since this is an audio platform.',
  },
  'Mastodon.online': {
    description: 'One of the largest public Mastodon instances, operated by the Mastodon project team.',
    rules: 'Usernames allow letters, numbers, and underscores. Maximum 30 characters. Cannot start or end with an underscore.',
    tips: 'Your full handle includes the instance domain (@user@mastodon.online). If you plan to move instances later, your followers can migrate with you.',
  },
  'Pixelfed': {
    description: 'Federated image-sharing platform built on ActivityPub, designed as a decentralized alternative to Instagram.',
    rules: 'Usernames allow letters, numbers, underscores, and periods. Maximum 15 characters.',
    tips: 'Pixelfed federates with Mastodon and other ActivityPub platforms. Your username is visible across the entire fediverse.',
  },
  'Misskey.io': {
    description: 'The largest Misskey instance, a Japanese-developed federated social platform on ActivityPub.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 1 character, maximum 20.',
    tips: 'Misskey.io has a large Japanese-speaking user base. Your username will be part of your fediverse-wide identity.',
  },
  'Gettr': {
    description: 'Social media platform launched in 2021 as an alternative to mainstream social networks.',
    rules: 'Usernames allow letters, numbers, and underscores. Maximum 15 characters.',
    tips: 'Gettr uses a Twitter-style handle system. Grab a short, recognizable name early.',
  },
  'Plurk': {
    description: 'Microblogging platform popular in Taiwan and Southeast Asia, displaying posts on a horizontal timeline.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 3 characters, maximum 20.',
    tips: 'Plurk has a strong Taiwanese user base. The horizontal timeline format makes your username visible on every post.',
  },
  'Hubzilla': {
    description: 'Federated platform combining social networking, cloud storage, and web publishing with nomadic identity.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Check your specific hub for exact limits.',
    tips: 'Hubzilla supports nomadic identity, meaning your account can move between servers. Pick a username you want to keep long-term.',
  },
  'Mastodon.world': {
    description: 'Large general-purpose Mastodon instance with a global, English-speaking user base.',
    rules: 'Usernames allow letters, numbers, and underscores. Maximum 30 characters. Cannot start or end with an underscore.',
    tips: 'Same rules as other Mastodon instances. Your handle will be @user@mastodon.world across the fediverse.',
  },
  'Diaspora': {
    description: 'Decentralized social network built on federated pods, one of the earliest alternatives to centralized platforms.',
    rules: 'Usernames allow lowercase letters, numbers, and underscores. Minimum 1 character.',
    tips: 'Your Diaspora ID includes your pod (user@pod.example.com). Choose a pod you trust since migration between pods is not straightforward.',
  },
  'Friendica': {
    description: 'Federated social network that connects with Diaspora, Mastodon, and other decentralized platforms.',
    rules: 'Usernames allow letters, numbers, and common special characters. Check your specific node for limits.',
    tips: 'Friendica bridges multiple federated networks. Your username will be visible across Mastodon, Diaspora, and other connected platforms.',
  },
  'Bitbucket': {
    description: 'Atlassian-owned Git hosting platform with built-in CI/CD, used widely by teams already in the Atlassian ecosystem.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 1 character, maximum 30. Must start with a letter.',
    tips: 'If you use Jira or Confluence, your Atlassian username carries over to Bitbucket. Keep it professional.',
  },
  'DEV Community': {
    description: 'Developer blogging platform with millions of registered developers sharing articles and tutorials.',
    rules: 'Usernames allow letters, numbers, and underscores. Maximum 30 characters.',
    tips: 'DEV is a writing-focused platform. Use your real name or a recognizable developer handle to build credibility with your articles.',
  },
  'Hacker News': {
    description: 'Y Combinator-run tech news aggregator and discussion forum, one of the most influential communities in tech.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 2 characters, maximum 15.',
    tips: 'Hacker News accounts gain karma over years. Pick a username you want associated with your tech opinions long-term, since you cannot change it.',
  },
  'PyPI': {
    description: 'Official package repository for Python, hosting over 500,000 packages.',
    rules: 'Usernames allow letters, numbers, hyphens, underscores, and periods. Not case-sensitive.',
    tips: 'Your PyPI username appears as the maintainer on every package you publish. Use something recognizable if you maintain open source Python libraries.',
  },
  'Hashnode': {
    description: 'Developer blogging platform that lets you publish on your own custom domain with built-in community features.',
    rules: 'Usernames allow letters, numbers, and hyphens. Minimum 3 characters.',
    tips: 'Hashnode lets you map a custom domain, but your username still appears in the community. Match it to your domain or GitHub handle.',
  },
  'Replit': {
    description: 'Browser-based IDE and deployment platform used for coding, collaboration, and hosting applications.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 2 characters, maximum 15.',
    tips: 'Replit usernames appear in your project URLs. Keep it short since every repl you create includes your username in its URL.',
  },
  'Kaggle': {
    description: 'Google-owned data science platform hosting competitions, datasets, and notebooks with over 15 million users.',
    rules: 'Usernames allow letters, numbers, and hyphens. Minimum 3 characters, maximum 20.',
    tips: 'Competition rankings display your username prominently. If you plan to compete seriously, use a name you want on leaderboards.',
  },
  'Gitee': {
    description: 'Chinese Git hosting platform, often called the GitHub of China, with millions of developers and repositories.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 2 characters, maximum 20. Must start with a letter.',
    tips: 'Gitee is the dominant code hosting platform in China. If you work with Chinese development teams, having a Gitee account is practically required.',
  },
  'Coderwall': {
    description: 'Developer profile platform that displays programming achievements and badges based on open source contributions.',
    rules: 'Usernames allow letters, numbers, and hyphens. Minimum 3 characters.',
    tips: 'Coderwall pulls data from your GitHub profile. Using the same username across both platforms keeps your developer identity consistent.',
  },
  'devRant': {
    description: 'Community platform where developers share programming frustrations, jokes, and memes.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 3 characters, maximum 20.',
    tips: 'devRant is casual and humor-driven. A fun username fits the culture better than a corporate-sounding one.',
  },
  'HackerOne': {
    description: 'Bug bounty and vulnerability disclosure platform connecting security researchers with organizations.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Maximum 20 characters.',
    tips: 'Your HackerOne reputation is tied to your username. Security researchers often use handles, but a recognizable name builds trust with program owners.',
  },
  'SourceForge': {
    description: 'One of the oldest open source hosting platforms, still hosting thousands of active projects.',
    rules: 'Usernames allow lowercase letters, numbers, and underscores. Minimum 3 characters, maximum 15. Must start with a letter.',
    tips: 'SourceForge usernames cannot be changed after creation. Double-check your spelling before registering.',
  },
  'Docker Hub': {
    description: 'Container image registry and distribution platform, the default registry for Docker images.',
    rules: 'Usernames allow lowercase letters, numbers, and hyphens. Minimum 4 characters, maximum 30. Must start with a letter.',
    tips: 'Your Docker Hub username is your namespace for all published images (username/image). Organizations often match their GitHub org name.',
  },
  'Crates.io': {
    description: 'Official package registry for the Rust programming language.',
    rules: 'Usernames are synced from your GitHub account. You log in via GitHub OAuth.',
    tips: 'Crates.io uses your GitHub username directly. If you want a specific name on Crates.io, set it on GitHub first.',
  },
  'RubyGems': {
    description: 'Official package registry for Ruby, hosting over 175,000 gems.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Not case-sensitive.',
    tips: 'Your RubyGems handle appears on every gem you publish. Match it to your GitHub username for consistency.',
  },
  'Packagist': {
    description: 'Default package repository for PHP Composer, the standard dependency manager for PHP projects.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 2 characters.',
    tips: 'Packagist uses vendor namespaces (vendor/package). Your username is your vendor name, so keep it professional if publishing packages.',
  },
  'Exercism': {
    description: 'Free coding practice platform offering mentored exercises in over 60 programming languages.',
    rules: 'Usernames are synced from your GitHub account via OAuth.',
    tips: 'Exercism links to your GitHub profile. Using the same handle across both is automatic since it pulls from GitHub.',
  },
  'LeetCode': {
    description: 'Coding interview preparation platform with thousands of algorithm and data structure problems.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 3 characters, maximum 20.',
    tips: 'LeetCode profiles are sometimes reviewed by recruiters. Use a professional username if you plan to share your profile in job applications.',
  },
  'CodeWars': {
    description: 'Coding challenge platform where developers train on kata to improve their programming skills.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 3 characters, maximum 20.',
    tips: 'CodeWars ranks are displayed next to your username. Pick something you are comfortable with on public leaderboards.',
  },
  'HackerRank': {
    description: 'Technical assessment and coding challenge platform used by companies for developer hiring.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 3 characters, maximum 30.',
    tips: 'Companies see your HackerRank username during hiring assessments. Use something professional and easy to associate with your resume.',
  },
  'Glitch': {
    description: 'Browser-based platform for building and remixing web apps, owned by Fastly.',
    rules: 'Usernames allow lowercase letters, numbers, and hyphens. Minimum 1 character, maximum 30.',
    tips: 'Glitch project URLs include your username. Short usernames make for cleaner project URLs.',
  },
  'Codeberg': {
    description: 'Non-profit Git hosting platform based in Germany, running on Forgejo as a GitHub alternative.',
    rules: 'Usernames allow letters, numbers, underscores, hyphens, and periods. Maximum 40 characters. Must start with a letter or number.',
    tips: 'Codeberg attracts developers who prefer non-corporate hosting. Matching your GitHub username makes it easier for people to find you.',
  },
  'Observable': {
    description: 'Data visualization and notebook platform for JavaScript, used for interactive data analysis and dashboards.',
    rules: 'Usernames allow letters, numbers, and hyphens. Minimum 2 characters.',
    tips: 'Observable notebooks are often embedded in articles and presentations. A professional username adds credibility to shared visualizations.',
  },
  'Codementor': {
    description: 'Platform connecting developers with experienced mentors for live 1-on-1 coding help.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 3 characters.',
    tips: 'If you are a mentor, your username appears in your profile URL that clients will see. Use your real name or a professional handle.',
  },
  'Keybase': {
    description: 'Cryptographic identity platform linking social accounts to encryption keys, now owned by Zoom.',
    rules: 'Usernames allow lowercase letters, numbers, and underscores. Minimum 2 characters, maximum 16.',
    tips: 'Keybase is designed for identity verification. Your username ties together all your verified accounts, so pick something you use everywhere.',
  },
  'Pastebin': {
    description: 'Text and code snippet sharing service, one of the most widely used paste tools on the internet.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 3 characters, maximum 20.',
    tips: 'Most Pastebin users share links anonymously. An account is mainly useful if you want to organize and manage your pastes.',
  },
  'Hugging Face': {
    description: 'AI model hosting and collaboration platform, the largest hub for open source machine learning models and datasets.',
    rules: 'Usernames allow letters, numbers, hyphens, and periods. Minimum 3 characters. Must start with a letter.',
    tips: 'Hugging Face usernames are your namespace for models, datasets, and Spaces. If you publish models, your username becomes part of the model ID (username/model-name).',
  },
  'Wakatime': {
    description: 'Automated coding time tracking tool that generates dashboards from your editor activity.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 3 characters.',
    tips: 'WakaTime profiles can be public or private. If you share your coding stats, your username is visible on leaderboards.',
  },
  'Lobsters': {
    description: 'Invite-only technology link aggregation site focused on computing, with a smaller and more curated community than Hacker News.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 1 character.',
    tips: 'Lobsters requires an invite from an existing member. The invite tree is public, so your username is permanently visible alongside your inviter.',
  },
  'Hackster': {
    description: 'Community platform for hardware developers and IoT projects, with tutorials and project showcases.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 3 characters.',
    tips: 'Hackster is hardware-focused. If you build IoT or embedded projects, use a username consistent with your maker identity elsewhere.',
  },
  'npm': {
    description: 'Default package registry for Node.js with over 2 million packages, the largest software registry in the world.',
    rules: 'Usernames allow lowercase letters, numbers, hyphens, and periods. Minimum 1 character, maximum 214. Must start with a letter or number.',
    tips: 'Your npm username is your scope for published packages (@username/package). Match it to your GitHub username for ecosystem consistency.',
  },
  'Codeforces': {
    description: 'Competitive programming platform hosting regular contests, widely used in the competitive programming community.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 3 characters, maximum 24. Must start with a letter.',
    tips: 'Codeforces colors your username based on rating. Your handle becomes well-known in competitive programming circles, so choose carefully.',
  },
  'CodeChef': {
    description: 'Indian competitive programming platform hosting monthly contests and practice problems.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 3 characters, maximum 14. Must start with a letter.',
    tips: 'CodeChef usernames cannot be changed. Many competitive programmers use the same handle across CodeChef, Codeforces, and AtCoder.',
  },
  'AtCoder': {
    description: 'Japanese competitive programming platform known for high-quality algorithm contests.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 3 characters, maximum 16. Must start with a letter.',
    tips: 'AtCoder colors your username by rating like Codeforces. Using the same handle across competitive programming sites helps others recognize you.',
  },
  'TryHackMe': {
    description: 'Cybersecurity training platform with guided learning paths and hands-on virtual labs.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 3 characters, maximum 20.',
    tips: 'TryHackMe profiles show your completed rooms and ranking. Use a handle you are comfortable displaying on a cybersecurity resume.',
  },
  'HackTheBox': {
    description: 'Cybersecurity training platform with realistic penetration testing labs and challenges.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 3 characters, maximum 20.',
    tips: 'Hack The Box rankings are competitive. Many security professionals use their HTB username as their hacker handle across the industry.',
  },
  'GeeksforGeeks': {
    description: 'Computer science learning platform with coding practice problems, tutorials, and interview preparation resources.',
    rules: 'Usernames allow letters, numbers, and underscores. Minimum 5 characters, maximum 30.',
    tips: 'GeeksforGeeks profiles are sometimes shared in job applications. Keep your username professional.',
  },
  'Crowdin': {
    description: 'Localization management platform where translators and developers collaborate on software translations.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 3 characters, maximum 20.',
    tips: 'Crowdin profiles show your translation contributions to open source projects. Use a recognizable name if you want credit for your work.',
  },
  'Replicate': {
    description: 'Platform for running and deploying machine learning models via API, focused on making AI models accessible.',
    rules: 'Usernames allow letters, numbers, and hyphens. Minimum 2 characters. Must start with a letter.',
    tips: 'Your Replicate username namespaces your published models (username/model). Match it to your GitHub or Hugging Face handle.',
  },
  'Weights & Biases': {
    description: 'MLOps platform for experiment tracking, model monitoring, and dataset versioning used by ML teams.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 3 characters.',
    tips: 'W&B usernames appear in shared experiment reports. Use a professional handle if you collaborate with ML teams.',
  },
  'CivitAI': {
    description: 'Community platform for sharing AI-generated art models, particularly Stable Diffusion checkpoints and LoRAs.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 3 characters.',
    tips: 'CivitAI is focused on AI art model sharing. Your username appears on all models and images you upload.',
  },
  'Vercel': {
    description: 'Frontend deployment platform and the company behind Next.js, used for hosting web applications.',
    rules: 'Usernames allow lowercase letters, numbers, and hyphens. Maximum 48 characters. Must start with a letter.',
    tips: 'Vercel usernames appear in default deployment URLs (username-project.vercel.app). A short username keeps your preview URLs clean.',
  },
  'Render': {
    description: 'Cloud application hosting platform offering managed services for web apps, databases, and background workers.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Render uses your account name in dashboard URLs. Keep it professional if you share deployment links with clients.',
  },
  'Heroku': {
    description: 'Salesforce-owned cloud platform for deploying and running applications, one of the original PaaS providers.',
    rules: 'Usernames are your email address. App names allow lowercase letters, numbers, and hyphens, 3 to 30 characters.',
    tips: 'Heroku uses email for login, but app names are globally unique. Good app names matter more than usernames here.',
  },
  'Netlify': {
    description: 'Web hosting and automation platform popular for static sites, JAMstack apps, and serverless functions.',
    rules: 'Usernames (team slugs) allow lowercase letters, numbers, and hyphens. Must start with a letter.',
    tips: 'Your Netlify team slug appears in default site URLs. A short, clean slug makes your preview deployments look more professional.',
  },
  'GitHub Pages': {
    description: 'Free static site hosting from GitHub repositories, serving sites at username.github.io.',
    rules: 'Uses your GitHub username. Your site URL will be username.github.io.',
    tips: 'Your GitHub Pages URL is locked to your GitHub username. If you want a specific .github.io URL, you need that GitHub username.',
  },
  'Railway': {
    description: 'Cloud deployment platform for full-stack apps with built-in databases and infrastructure management.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Railway is growing fast as a Heroku alternative. Grab your preferred username early.',
  },
  'Surge': {
    description: 'Simple static web publishing tool for frontend developers, deploying sites from the command line.',
    rules: 'Surge uses email for authentication. Project names (subdomains) allow lowercase letters, numbers, and hyphens.',
    tips: 'Surge project names become your subdomain (project.surge.sh). Pick descriptive project names since there are no user profiles.',
  },
  'Webflow': {
    description: 'Visual web design and development platform that generates production-ready code without manual coding.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Webflow is used by designers to showcase portfolio work. A professional username strengthens your personal brand on the platform.',
  },
  'Postman': {
    description: 'API development and testing platform used by millions of developers to build and document APIs.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 3 characters.',
    tips: 'Postman profiles can showcase public API collections and workspaces. Use a professional username if you share API documentation publicly.',
  },
  'Bower': {
    description: 'Front-end package manager for the web, now largely deprecated in favor of npm and yarn.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Bower is effectively unmaintained. New registrations are unlikely to be useful.',
  },
  'CPAN': {
    description: 'Comprehensive Perl Archive Network, the main repository for Perl modules since 1995.',
    rules: 'PAUSE IDs (usernames) allow uppercase letters and numbers. Minimum 2 characters, maximum 9.',
    tips: 'CPAN IDs are traditionally uppercase and short (e.g., MIYAGAWA). Request your ID through PAUSE and choose something memorable.',
  },
  'OpenStreetMap': {
    description: 'Collaborative open-source mapping project with millions of contributors worldwide.',
    rules: 'Usernames allow most characters. Minimum 3 characters, maximum 255. Must be unique case-insensitively.',
    tips: 'OpenStreetMap usernames are visible on every edit you make. Many mappers use their real name to build trust in the community.',
  },
  'Conan.io': {
    description: 'Package manager and registry for C and C++ libraries.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Conan Center uses GitHub authentication. Your identity is tied to your GitHub account.',
  },
  'F-Droid': {
    description: 'Free and open source Android app repository, an alternative to the Google Play Store.',
    rules: 'F-Droid is an app repository, not a user account platform. Contributors use GitLab accounts.',
    tips: 'F-Droid contributions go through their GitLab instance. Your GitLab username is what matters here.',
  },
  'Homebrew': {
    description: 'The most popular package manager for macOS and Linux, maintained by a community of open source contributors.',
    rules: 'Homebrew contributions use GitHub accounts. There are no separate Homebrew usernames.',
    tips: 'Homebrew formula contributions are tied to your GitHub identity. No separate username needed.',
  },
  'npm Package': {
    description: 'Public profile on the npm registry for Node.js packages.',
    rules: 'Usernames allow lowercase letters, numbers, hyphens, and periods. Minimum 1 character, maximum 214. Must start with a letter or number.',
    tips: 'Same as npm. Your username scopes your packages under @username. Short, lowercase names are standard.',
  },
  'CodeSandbox': {
    description: 'Browser-based IDE for rapid web development, supporting React, Vue, Angular, and other frameworks.',
    rules: 'Usernames are synced from GitHub via OAuth login.',
    tips: 'CodeSandbox uses your GitHub username. Sandboxes you create are associated with that identity.',
  },
  'StackBlitz': {
    description: 'Browser-based IDE powered by WebContainers, running Node.js entirely in the browser.',
    rules: 'Usernames are synced from GitHub via OAuth login.',
    tips: 'StackBlitz uses your GitHub username. Your projects are accessible at stackblitz.com/@username.',
  },
  'Launchpad': {
    description: 'Canonical-operated platform for Ubuntu package hosting, bug tracking, and code collaboration.',
    rules: 'Usernames allow lowercase letters, numbers, hyphens, and periods. Minimum 2 characters. Must start with a letter.',
    tips: 'Launchpad is the hub for Ubuntu development. If you contribute to Ubuntu packages or PPAs, your username is your identity in that ecosystem.',
  },
  'OpenHub': {
    description: 'Open source contributor analytics platform that tracks your contributions across multiple repositories.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'OpenHub aggregates your open source stats into a single profile. Use the same username as your primary code hosting account.',
  },
  'Repl.it': {
    description: 'Alternative domain for Replit, the browser-based coding and deployment platform.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 2 characters, maximum 15.',
    tips: 'Repl.it and Replit are the same platform. Your username works on both domains.',
  },
  'Libraries.io': {
    description: 'Open source package monitoring service tracking dependencies across 36 package managers.',
    rules: 'Libraries.io uses GitHub, GitLab, or Bitbucket authentication. No separate usernames.',
    tips: 'Your profile on Libraries.io reflects your package manager identity. No separate registration needed.',
  },
  'CoCalc': {
    description: 'Collaborative computing platform for Jupyter notebooks, LaTeX editing, and scientific computing.',
    rules: 'CoCalc uses email for accounts. Project sharing uses email addresses, not usernames.',
    tips: 'CoCalc is account-based rather than username-based. Your identity is your email address.',
  },
  'Hex.pm': {
    description: 'Package manager and registry for the Erlang and Elixir ecosystems.',
    rules: 'Usernames allow lowercase letters, numbers, and underscores. Minimum 3 characters.',
    tips: 'Your Hex.pm username namespaces your published packages. Match it to your GitHub handle for consistency in the Elixir community.',
  },
  'Sourcehut': {
    description: 'Minimalist open source software forge emphasizing simplicity, email-driven workflows, and no JavaScript requirement.',
    rules: 'Usernames allow lowercase letters, numbers, and underscores. Minimum 2 characters, maximum 30. Must start with a letter.',
    tips: 'Sourcehut uses a tilde prefix (~username) in URLs. Pick something short since it appears in every project and mailing list URL.',
  },
  'NotABug': {
    description: 'Free software code hosting platform running on Gitea, focused on libre and open source projects.',
    rules: 'Usernames allow letters, numbers, underscores, hyphens, and periods. Maximum 40 characters. Must start with a letter or number.',
    tips: 'NotABug caters to free software advocates. It follows Gitea conventions, so the rules are similar to Codeberg and other Gitea instances.',
  },
  'Bugcrowd': {
    description: 'Bug bounty and vulnerability disclosure platform connecting security researchers with organizations.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Minimum 3 characters, maximum 20.',
    tips: 'Bugcrowd ranks researchers on public leaderboards. Your username is your reputation in the bug bounty community alongside HackerOne.',
  },
  'Substack': {
    description: 'Newsletter and publishing platform used by over 35 million active subscriptions for independent writers and journalists.',
    rules: 'Subdomain-style handles (yourname.substack.com). Letters, numbers, and hyphens allowed. No spaces or special characters.',
    tips: 'Your Substack handle becomes your subdomain, so pick something short and memorable. Many writers use their real name.',
  },
  'WordPress': {
    description: 'The most widely used content management system, powering over 40% of all websites on the internet.',
    rules: 'WordPress.com usernames must be at least 4 characters. Letters, numbers, and hyphens allowed. Cannot start or end with a hyphen.',
    tips: 'If you plan to use WordPress.com hosting, your username also becomes your subdomain. Consider using a name that works as both.',
  },
  'Blogspot': {
    description: 'Google-owned blogging platform (Blogger) that provides free blog hosting with a blogspot.com subdomain.',
    rules: 'Blog addresses allow letters, numbers, and hyphens. Tied to your Google account username.',
    tips: 'The blog URL is what matters most here. Short, descriptive names work better than clever ones for discoverability.',
  },
  'HubPages': {
    description: 'Revenue-sharing writing platform where users publish articles across a network of niche topic sites.',
    rules: 'Usernames must be 2-32 characters. Letters, numbers, and underscores only. Cannot start with a number.',
    tips: 'Your username appears in article URLs, so pick something professional. Many successful HubPages writers use pen names.',
  },
  'LiveJournal': {
    description: 'One of the earliest blogging platforms, founded in 1999, still active with a large Russian-speaking user base.',
    rules: 'Usernames must be 1-15 characters. Letters, numbers, and underscores allowed. Must start with a letter.',
    tips: 'LiveJournal usernames are permanent and cannot be changed. Many short usernames were claimed years ago.',
  },
  'Scribd': {
    description: 'Digital reading subscription service with over 170 million documents including books, audiobooks, and articles.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Scribd profiles are less prominent than on social platforms. Use your real name if you plan to publish documents.',
  },
  'GoodReads': {
    description: 'Amazon-owned social cataloging site with over 150 million members for tracking and reviewing books.',
    rules: 'Profile URLs use numeric IDs by default, but display names are flexible. No strict username character limits on display names.',
    tips: 'Your display name is what other readers see. Use your real name if you are an author to make it easy for readers to find you.',
  },
  'Wattpad': {
    description: 'Social storytelling platform with over 90 million users, focused on user-written fiction and fanfiction.',
    rules: 'Usernames must be 6-20 characters. Letters, numbers, and underscores allowed. No spaces.',
    tips: 'Wattpad skews young, so trendy or creative names fit the culture. Avoid overly generic names that blend into the crowd.',
  },
  'Ghost': {
    description: 'Open-source publishing platform designed for professional bloggers and online publications.',
    rules: 'Ghost(Pro) handles follow subdomain rules: letters, numbers, and hyphens. Self-hosted instances set their own rules.',
    tips: 'If using Ghost(Pro), your handle is your subdomain. Many publishers move to custom domains quickly, so the handle matters less long-term.',
  },
  'Telegraph': {
    description: 'Minimalist anonymous publishing tool created by Telegram, requiring no account to post articles.',
    rules: 'Telegraph does not use traditional usernames. Author names are freeform text entered per article.',
    tips: 'Since there are no accounts, consistency is up to you. Use the same author name across posts if you want to build recognition.',
  },
  'Goodreads Author': {
    description: 'Author profile program on Goodreads that lets published writers claim their bibliography and interact with readers.',
    rules: 'Author profiles use your real name as it appears on published works. Profile URLs use numeric IDs.',
    tips: 'Use the exact name on your book covers. Consistency between your published name and Goodreads author profile helps readers find you.',
  },
  'Write.as': {
    description: 'Privacy-focused minimalist blogging platform that allows anonymous publishing without tracking.',
    rules: 'Usernames must be 1-16 characters. Lowercase letters, numbers, and hyphens allowed.',
    tips: 'Short handles work well since they become your subdomain. The platform attracts privacy-conscious writers.',
  },
  'Bear Blog': {
    description: 'Minimalist blogging platform focused on fast, no-JavaScript pages with zero tracking.',
    rules: 'Handles become your subdomain (yourname.bearblog.dev). Letters, numbers, and hyphens allowed.',
    tips: 'Bear Blog appeals to minimalists and developers. Simple, clean handles fit the platform ethos.',
  },
  'Micro.blog': {
    description: 'Independent microblogging platform and social network focused on short posts and personal websites.',
    rules: 'Usernames follow standard rules: letters, numbers, underscores. Your username becomes your subdomain on micro.blog.',
    tips: 'The community values indie web culture. Real names are common, and short handles are preferred.',
  },
  'Neocities': {
    description: 'Free static web hosting inspired by GeoCities, with a community of personal websites and creative projects.',
    rules: 'Site names allow lowercase letters, numbers, and hyphens. 2-32 characters. Must start with a letter.',
    tips: 'Neocities is about personal expression. Creative or nostalgic names fit the retro web culture well.',
  },
  'Tumblelog': {
    description: 'Tumblr-hosted blog format emphasizing short-form mixed media posts in a stream-like layout.',
    rules: 'Tumblr blog URLs allow letters, numbers, and hyphens. 1-32 characters.',
    tips: 'Your blog name is your identity on Tumblr. Fandom and aesthetic names are deeply embedded in the culture.',
  },
  'Archive.org': {
    description: 'Non-profit digital library offering free access to millions of books, movies, music, and archived web pages.',
    rules: 'Usernames must be 3-100 characters. Letters, numbers, hyphens, underscores, and periods allowed. Must start with a letter or number.',
    tips: 'Most users interact as consumers rather than uploaders. If you upload content, pick a recognizable handle.',
  },
  'Royal Road': {
    description: 'Web fiction platform popular for serialized fantasy and LitRPG stories, with a large reader community.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Author names on Royal Road often lean into the fantasy genre. Your pen name is what readers will associate with your fiction.',
  },
  'Penzu': {
    description: 'Private online journal and diary application focused on personal writing rather than public sharing.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Penzu is a private journaling tool, so your username is mostly for login purposes. Pick something you will remember.',
  },
  'Svbtle': {
    description: 'Invite-based blogging platform with a minimalist design, originally exclusive to select writers.',
    rules: 'Handles become your subdomain (yourname.svbtle.com). Letters and numbers allowed.',
    tips: 'Svbtle attracts a tech and design audience. Clean, professional handles work best.',
  },
  'Typeshare': {
    description: 'Writing platform focused on helping creators build an audience through short-form social writing.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Your Typeshare handle should match your presence on Twitter/LinkedIn since the platform is designed for cross-posting.',
  },
  'DeviantArt': {
    description: 'One of the largest online art communities with over 70 million registered members sharing visual art and writing.',
    rules: 'Usernames must be 3-20 characters. Letters, numbers, and hyphens allowed. Must start with a letter. No consecutive hyphens.',
    tips: 'DeviantArt usernames are permanent. Many artists use stylized versions of their artist name or online alias.',
  },
  'Unsplash': {
    description: 'Free stock photography platform with over 3 million high-resolution images contributed by photographers worldwide.',
    rules: 'Usernames allow letters, numbers, and underscores. Profile URLs use your username directly.',
    tips: 'Photographers benefit from using their real name or studio name. Your username appears as the credit on downloaded photos.',
  },
  'VSCO': {
    description: 'Photography and creative expression app known for its film-inspired filters and curated visual content.',
    rules: 'Usernames allow letters, numbers, underscores, and periods. Case-insensitive.',
    tips: 'VSCO has a strong aesthetic culture. Short, clean usernames fit the minimalist vibe of the platform.',
  },
  'Coroflot': {
    description: 'Design portfolio and job board connecting designers with companies looking to hire creative talent.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Use your real name since this is a professional portfolio platform. Recruiters and hiring managers will be looking at your profile.',
  },
  'Designspiration': {
    description: 'Visual discovery platform for designers to find and save design inspiration across various creative fields.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'A clean, professional handle works well. The platform is used for collecting inspiration, so your name is secondary to your boards.',
  },
  'Crevado': {
    description: 'Simple online portfolio builder for creatives to showcase work without needing web development skills.',
    rules: 'Usernames become your subdomain (yourname.crevado.com). Letters, numbers, and hyphens allowed.',
    tips: 'Use your real name or brand name. Many creatives use Crevado as a quick portfolio link.',
  },
  'ArtStation': {
    description: 'Portfolio platform for game, film, and entertainment artists, widely used in the professional concept art industry.',
    rules: 'Usernames must be 3-20 characters. Lowercase letters, numbers, and underscores allowed. Cannot start with a number.',
    tips: 'ArtStation is a professional platform. Use your real name or established artist handle. Recruiters actively browse profiles.',
  },
  'Figma': {
    description: 'Collaborative interface design tool used by millions of designers for UI/UX work and prototyping.',
    rules: 'Figma uses display names and team names rather than unique usernames. Profile URLs use numeric IDs.',
    tips: 'Your Figma profile is tied to your email. Display name should match your professional identity.',
  },
  'Canva': {
    description: 'Online graphic design platform with over 170 million monthly users for creating visual content.',
    rules: 'Canva uses display names rather than unique public usernames. Account is tied to email.',
    tips: 'Canva profiles are not prominent. Focus on your display name if you plan to share templates publicly.',
  },
  'CreativeMarket': {
    description: 'Marketplace for design assets including fonts, graphics, templates, and themes from independent creators.',
    rules: 'Shop names allow letters, numbers, spaces, and basic punctuation. Display names are separate from shop URLs.',
    tips: 'If you sell assets, your shop name is your brand. Pick something that signals the type of work you create.',
  },
  'Redbubble': {
    description: 'Print-on-demand marketplace where artists upload designs that are printed on clothing, stickers, and other products.',
    rules: 'Usernames allow letters, numbers, and hyphens. Your username appears in your shop URL.',
    tips: 'Your username is your shop identity. Short, memorable names help customers find and remember your store.',
  },
  'Carbonmade': {
    description: 'Portfolio hosting platform for creatives to build simple, visually focused online portfolios.',
    rules: 'Usernames become your subdomain (yourname.carbonmade.com). Letters, numbers, and hyphens allowed.',
    tips: 'Use your name or brand since this is a portfolio site. The subdomain is what you will share with potential clients.',
  },
  'Sketchfab': {
    description: 'Platform for publishing and sharing 3D models, widely used by 3D artists and game developers.',
    rules: 'Usernames must be 3-25 characters. Letters, numbers, hyphens, and underscores allowed.',
    tips: 'Sketchfab is professional-leaning. Use your artist name or studio name if you showcase 3D work for clients.',
  },
  'Threadless': {
    description: 'Artist community and marketplace where creators submit designs for printing on apparel and other products.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Your artist name is your storefront. Pick something that reflects your art style and is easy to spell.',
  },
  'Pixiv': {
    description: 'Japanese online art community focused on illustration, manga, and anime-style artwork, with over 90 million users.',
    rules: 'User IDs are numeric. Display names can use any characters including Japanese. pixiv IDs cannot be changed.',
    tips: 'Display name matters more than the numeric ID. Many artists use Japanese or stylized names. Tag your work well for discoverability.',
  },
  'Artfol': {
    description: 'Social media platform designed specifically for artists to share their work and connect with other creators.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Artfol is artist-focused, so use your established artist handle to maintain consistency across platforms.',
  },
  'Cara': {
    description: 'Portfolio and social networking platform for artists, created as an alternative focused on protecting artists from AI scraping.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Profile URLs use your username.',
    tips: 'Cara grew rapidly among artists concerned about AI training. Use your established artist name for cross-platform recognition.',
  },
  'Drawcrowd': {
    description: 'Art community platform where artwork is ranked by crowd voting, focused on digital and concept art.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Use the same handle as your other art profiles. The voting system means your art does the talking.',
  },
  'Awwwards': {
    description: 'Website awards platform recognizing outstanding web design, development, and creativity.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Awwwards is a professional recognition platform. Use your studio name or real name for credibility.',
  },
  'Layers': {
    description: 'Design community platform for sharing and discovering creative work across design disciplines.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Use your professional name or studio identity. The platform caters to a design-savvy audience.',
  },
  'Bandcamp': {
    description: 'Independent music platform where artists sell directly to fans, known for giving artists the majority of revenue.',
    rules: 'Band/artist URLs use lowercase letters, numbers, and hyphens. Your username becomes yourname.bandcamp.com.',
    tips: 'Your Bandcamp URL is your storefront. Use your band or artist name exactly. Fans will search for it directly.',
  },
  'Last.fm': {
    description: 'Music discovery and tracking service that scrobbles listening history across platforms, running since 2002.',
    rules: 'Usernames must be 2-15 characters. Letters, numbers, hyphens, and underscores allowed. Must start with a letter.',
    tips: 'Last.fm usernames cannot be changed once set. Pick something you will want long-term since your listening history is tied to it.',
  },
  'ReverbNation': {
    description: 'Music marketing platform connecting independent musicians with venues, labels, and fans.',
    rules: 'Profile URLs use your artist name slug. Letters, numbers, and hyphens allowed.',
    tips: 'Use your exact artist or band name. ReverbNation is about music industry networking, so professionalism matters.',
  },
  'House Mixes': {
    description: 'DJ mix hosting platform for uploading and sharing DJ sets and live recordings.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Use your DJ name. The audience is electronic music listeners looking for specific DJs and mix styles.',
  },
  'Mixcloud': {
    description: 'Audio streaming platform focused on DJ mixes, radio shows, and podcasts with legal licensing for long-form content.',
    rules: 'Usernames allow letters, numbers, and hyphens. Your profile URL uses your username slug.',
    tips: 'Use your DJ or show name consistently. Mixcloud is the go-to for DJ mixes, so your handle should match your DJ identity.',
  },
  'Genius': {
    description: 'Music annotation and lyrics platform where users contribute explanations and context for song lyrics.',
    rules: 'Usernames must be 2-30 characters. Letters, numbers, hyphens, periods, and underscores allowed.',
    tips: 'Genius values knowledgeable contributors. Your username will appear next to annotations, so pick something you are comfortable being associated with publicly.',
  },
  'Discogs': {
    description: 'Music database and marketplace with over 16 million releases, used by collectors and record sellers.',
    rules: 'Usernames allow letters, numbers, underscores, hyphens, and periods. 3-20 characters.',
    tips: 'If you sell records, your username is your seller identity. Collectors often use handles related to their musical taste or collection focus.',
  },
  'MuseScore': {
    description: 'Free sheet music platform and notation software with a community of musicians sharing scores.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Use your musician name or real name, especially if you compose or arrange music that others will play.',
  },
  'Setlist.fm': {
    description: 'Community-driven database of concert setlists, tracking what songs artists play at live shows.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Most users contribute setlists from concerts they attend. Your username is visible on contributions but not heavily featured.',
  },
  'Deezer': {
    description: 'Music streaming service with over 90 million tracks, available in 180 countries.',
    rules: 'Deezer uses display names rather than unique public usernames. Accounts are tied to email.',
    tips: 'Your display name shows up on shared playlists. Use something recognizable if you curate playlists publicly.',
  },
  'Podbean': {
    description: 'Podcast hosting and monetization platform used by independent and professional podcasters.',
    rules: 'Podcast site names become your subdomain (yourshow.podbean.com). Letters, numbers, and hyphens allowed.',
    tips: 'Your subdomain should match your podcast name. Keep it short since listeners may type it directly.',
  },
  'Anchor': {
    description: 'Free podcast creation and hosting platform owned by Spotify, now integrated into Spotify for Podcasters.',
    rules: 'Profile URLs use your podcast name slug. Letters, numbers, and hyphens allowed.',
    tips: 'Anchor URLs mirror your podcast name. Since Spotify acquired Anchor, your handle also appears on Spotify.',
  },
  'Podomatic': {
    description: 'Podcast hosting platform supporting audio and video podcasts with built-in distribution.',
    rules: 'Usernames become your subdomain (yourname.podomatic.com). Letters, numbers, and hyphens allowed.',
    tips: 'Match your podcast branding. The subdomain is what listeners see and share.',
  },
  'Funkwhale': {
    description: 'Federated, self-hosted music streaming platform that is part of the Fediverse.',
    rules: 'Usernames follow Fediverse conventions: letters, numbers, and underscores. Instance-specific registration.',
    tips: 'Since Funkwhale is federated, your full identity includes the instance domain. Pick both your username and instance thoughtfully.',
  },
  'DailyMotion': {
    description: 'French video hosting platform and one of the largest video sites outside of YouTube.',
    rules: 'Usernames must be 3-25 characters. Letters, numbers, and hyphens allowed. Must start with a letter.',
    tips: 'Use your brand or channel name. Dailymotion is strong in Europe and for news/entertainment content.',
  },
  'Rumble': {
    description: 'Video hosting platform positioning itself as a free-speech alternative to YouTube.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Rumble attracts a politically diverse audience. Pick a channel name that reflects your content focus.',
  },
  'Odysee': {
    description: 'Blockchain-based video platform built on the LBRY protocol, popular with creators seeking an alternative to YouTube.',
    rules: 'Channel names must be 1-40 characters. Letters, numbers, hyphens, and underscores allowed. Preceded by @ in URLs.',
    tips: 'Many creators mirror their YouTube channel name here. The @ prefix is automatic, so do not include it in your name.',
  },
  'BitChute': {
    description: 'Peer-to-peer video hosting platform using WebTorrent technology.',
    rules: 'Channel names allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Use your established channel name if you are cross-posting from other video platforms.',
  },
  'Trovo': {
    description: 'Live streaming platform backed by Tencent, focused on gaming content.',
    rules: 'Usernames must be 4-20 characters. Letters, numbers, and underscores allowed.',
    tips: 'Trovo targets gaming streamers. Use your gaming handle for consistency across streaming platforms.',
  },
  'PeerTube': {
    description: 'Decentralized, federated video hosting platform that is part of the Fediverse, offering an open-source YouTube alternative.',
    rules: 'Usernames follow instance-specific rules. Typically letters, numbers, and underscores. 1-50 characters.',
    tips: 'PeerTube is federated, so your full identity includes the instance. Choose an instance that matches your content niche.',
  },
  'Nebula': {
    description: 'Creator-owned streaming platform featuring educational and documentary content from independent video creators.',
    rules: 'Nebula is invite-only for creators. Viewer accounts use email-based login without public usernames.',
    tips: 'If you are a creator on Nebula, your channel name should match your YouTube identity since most Nebula creators cross-post.',
  },
  'Loom': {
    description: 'Video messaging and screen recording platform used primarily in workplace communication.',
    rules: 'Loom uses display names tied to your workspace account. No separate public username system.',
    tips: 'Use your real name since Loom is a professional tool. Your name appears on every video you share.',
  },
  'YouNow': {
    description: 'Live streaming platform focused on real-time broadcasting and audience interaction.',
    rules: 'Usernames must be 3-20 characters. Letters, numbers, underscores, and periods allowed.',
    tips: 'YouNow is about live interaction. A catchy, easy-to-type username helps viewers find you during live streams.',
  },
  'Steam Group': {
    description: 'Community groups on Valve\'s Steam platform, the largest PC gaming distribution service with over 130 million active users.',
    rules: 'Group URLs use custom suffixes. Letters, numbers, and underscores allowed. Group names can include spaces and special characters.',
    tips: 'Group URL abbreviations should be short and recognizable. The display name can be longer and more descriptive.',
  },
  'Kongregate': {
    description: 'Web gaming portal that hosted browser-based games, now focused on mobile gaming publishing.',
    rules: 'Usernames must be 3-20 characters. Letters, numbers, and underscores allowed.',
    tips: 'Kongregate has a legacy community. Many short usernames were claimed years ago.',
  },
  'MyAnimeList': {
    description: 'The largest anime and manga database and community, with over 18 million users tracking their watch lists.',
    rules: 'Usernames must be 2-16 characters. Letters, numbers, underscores, and hyphens allowed. Must start with a letter.',
    tips: 'Anime-related names are common but competitive. Your list is the main feature, not your profile, so pick what you like.',
  },
  'Itch.io': {
    description: 'Independent game distribution platform for indie developers to sell and share their games directly.',
    rules: 'Usernames must be 3-20 characters. Lowercase letters, numbers, and hyphens allowed. Your username becomes yourname.itch.io.',
    tips: 'Use your developer or studio name. Your itch.io subdomain is often the first place players find your games.',
  },
  'Star Citizen': {
    description: 'Crowdfunded space simulation game with a large community of backers and players.',
    rules: 'Handle must be 3-30 characters. Letters, numbers, hyphens, and underscores allowed. A display name can be set separately.',
    tips: 'Your handle is permanent and used in organizations. Your display name (moniker) can be changed later.',
  },
  'Roblox': {
    description: 'Gaming platform with over 70 million daily active users, primarily popular among younger audiences for user-created games.',
    rules: 'Usernames must be 3-20 characters. Letters, numbers, and underscores allowed. Cannot start or end with an underscore.',
    tips: 'Short, creative usernames are highly sought after. Roblox has been around since 2006, so many names are taken.',
  },
  'Minecraft': {
    description: 'The best-selling video game of all time with over 300 million copies sold, owned by Microsoft.',
    rules: 'Java Edition usernames must be 3-16 characters. Letters, numbers, and underscores only. Bedrock uses Xbox Gamertag rules.',
    tips: 'Minecraft usernames can be changed every 30 days on Java Edition. Your old name becomes available to others after that period.',
  },
  'Faceit': {
    description: 'Competitive gaming platform hosting esports tournaments and matchmaking for games like CS2 and Dota 2.',
    rules: 'Nicknames must be 3-12 characters. Letters, numbers, hyphens, and underscores allowed.',
    tips: 'Use your competitive gaming handle. Your FACEIT name shows up in match lobbies and leaderboards.',
  },
  'Crunchyroll': {
    description: 'Anime streaming platform owned by Sony with over 13 million paid subscribers worldwide.',
    rules: 'Usernames must be 4-30 characters. Letters, numbers, underscores, and hyphens allowed.',
    tips: 'Pick an anime-inspired name if that suits you, but keep it something you would be comfortable sharing.',
  },
  'osu!': {
    description: 'Free rhythm game with a competitive community of millions of players and an extensive beatmap library.',
    rules: 'Usernames must be 3-15 characters. Letters, numbers, spaces, hyphens, and underscores allowed. No leading/trailing spaces.',
    tips: 'osu! has a competitive leaderboard culture. Your username is front and center on rankings. Name changes cost in-game currency.',
  },
  'BoardGameGeek': {
    description: 'The largest board game community and database online, tracking collections, reviews, and rankings for tabletop games.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Many users go by their first name or a handle. The community is friendly and your username appears in forum posts and reviews.',
  },
  'PSN Profiles': {
    description: 'Third-party PlayStation Network trophy tracking site that displays trophy statistics and leaderboards.',
    rules: 'Your profile is tied to your PlayStation Network ID. PSN IDs are 3-16 characters: letters, numbers, hyphens, and underscores.',
    tips: 'PSN Profiles mirrors your PSN ID. If you want a specific PSN Profiles page, you need to set the desired PSN ID on PlayStation first.',
  },
  'AniList': {
    description: 'Modern anime and manga tracking platform with social features and a clean interface.',
    rules: 'Usernames must be 2-20 characters. Letters, numbers, and underscores allowed.',
    tips: 'AniList has a design-conscious community. Short, clean usernames are valued. You can change your username in settings.',
  },
  'TETR.IO': {
    description: 'Competitive modern Tetris game with ranked matchmaking and a focus on speed and skill.',
    rules: 'Usernames must be 3-16 characters. Letters, numbers, underscores, and hyphens allowed. Case-insensitive.',
    tips: 'Your name appears on the leaderboard. Short names are popular in the competitive Tetris community.',
  },
  'GOG.com': {
    description: 'Digital game store owned by CD Projekt, focused on DRM-free games and classic game preservation.',
    rules: 'Usernames must be 3-20 characters. Letters, numbers, underscores, and hyphens allowed.',
    tips: 'GOG has a community of PC gaming enthusiasts. Your username appears in reviews and forum posts.',
  },
  'Tabletopia': {
    description: 'Digital tabletop platform for playing board games online with 3D physics-based game pieces.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Use a name your board gaming group will recognize. The platform is used for both casual and playtesting sessions.',
  },
  'Grouvee': {
    description: 'Video game collection tracking site inspired by Goodreads, for logging and rating games you have played.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Grouvee is a niche community. Your gaming handle or real name both work fine here.',
  },
  'Backloggd': {
    description: 'Game logging and review platform with a Letterboxd-style approach to tracking your gaming history.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Backloggd has a growing community of game reviewers. Use a handle consistent with your other gaming profiles.',
  },
  'RAWG': {
    description: 'Video game discovery platform and database aggregating data from multiple game stores and platforms.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'RAWG syncs with your game libraries. Your username is less prominent than your connected accounts.',
  },
  'Nexus Mods': {
    description: 'The largest modding community for PC games, hosting millions of mods for thousands of games.',
    rules: 'Usernames must be 3-20 characters. Letters, numbers, and underscores allowed.',
    tips: 'If you publish mods, your username is your modder identity. Many well-known modders built their reputation here.',
  },
  'Modrinth': {
    description: 'Open-source Minecraft mod hosting platform, growing as a modern alternative to CurseForge.',
    rules: 'Usernames must be 1-39 characters. Letters, numbers, hyphens, and underscores allowed. Cannot start with a hyphen.',
    tips: 'Use your developer or modder handle. Modrinth is developer-friendly and your username appears on all your projects.',
  },
  'CurseForge': {
    description: 'Major mod hosting platform for Minecraft, World of Warcraft, and other games, owned by Overwolf.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Your CurseForge identity matters if you distribute mods. Use the same handle as your other modding accounts.',
  },
  'GameBanana': {
    description: 'Game modding community hosting skins, maps, and mods for a wide range of PC games.',
    rules: 'Usernames must be 3-20 characters. Letters, numbers, underscores, and hyphens allowed.',
    tips: 'GameBanana has a long history in the modding scene. Your username appears on all your submissions and posts.',
  },
  'GGn Profile': {
    description: 'Profile on GazelleGames, a private gaming-focused community and tracker.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'GGn is invite-only. Your username is your identity within the community and cannot be easily changed.',
  },
  'Roblox Group': {
    description: 'Community groups within the Roblox platform, used for organizing players around games, clans, and fan communities.',
    rules: 'Group names can be 3-50 characters. Letters, numbers, spaces, and some special characters allowed. Group URLs use numeric IDs.',
    tips: 'Group names should clearly describe the group purpose. The name costs Robux to create and to change.',
  },
  'Lolchess': {
    description: 'Teamfight Tactics statistics and analytics site for tracking TFT ranked performance and match history.',
    rules: 'Profiles are tied to your Riot Games ID (Game Name + Tagline). No separate username system.',
    tips: 'Your Lolchess profile mirrors your Riot ID. Change your name through Riot Games if you want a different Lolchess URL.',
  },
  'Playstv': {
    description: 'Gaming clip recording and sharing platform, now largely defunct but some profiles remain accessible.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Plays.tv is no longer actively maintained. Claiming a username here has limited practical value.',
  },
  'About.me': {
    description: 'Personal landing page platform for creating a single-page professional profile with links to your other online presences.',
    rules: 'Usernames become your URL (about.me/yourname). Letters, numbers, underscores, and hyphens allowed.',
    tips: 'Use your real name. About.me is designed as a professional landing page, so your name is the brand.',
  },
  'Gumroad': {
    description: 'Creator commerce platform for selling digital products, with over $500 million paid out to creators.',
    rules: 'Usernames become your subdomain (yourname.gumroad.com). Letters, numbers, and hyphens allowed.',
    tips: 'Your Gumroad handle is your storefront. Match it to your creator brand or real name.',
  },
  'SlideShare': {
    description: 'Presentation hosting platform owned by Scribd, used for sharing slides and professional documents.',
    rules: 'Usernames allow letters, numbers, hyphens, and underscores. Profile URLs use your username.',
    tips: 'Use your real name or company name. SlideShare is used in professional contexts for thought leadership.',
  },
  'Academia.edu': {
    description: 'Academic social network for sharing research papers, with over 250 million registered users.',
    rules: 'Profiles are tied to your real name and institutional affiliation. URLs use your name slug.',
    tips: 'Use your full real name as it appears on publications. Academics search by author name.',
  },
  'Houzz': {
    description: 'Home renovation and design platform connecting homeowners with professionals and product sellers.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Professionals should use their business name. Homeowners often use their real name or remain semi-anonymous.',
  },
  'Freelancer': {
    description: 'Freelance marketplace connecting businesses with freelancers across programming, design, writing, and more.',
    rules: 'Usernames must be 3-16 characters. Letters, numbers, and underscores allowed.',
    tips: 'Use your real name or professional handle. Clients look for credibility, and a professional username helps.',
  },
  'Fiverr': {
    description: 'Freelance services marketplace with millions of services offered across hundreds of categories.',
    rules: 'Usernames must be 6-15 characters. Letters, numbers, and underscores allowed. Cannot start with a number.',
    tips: 'Your username appears on all your gigs. Pick something professional and easy to remember.',
  },
  'Toptal': {
    description: 'Exclusive freelance talent network that screens for the top 3% of developers, designers, and finance experts.',
    rules: 'Profiles use your real name. Toptal URLs include your name slug.',
    tips: 'Toptal is strictly professional. Use your legal name as it matches your resume and LinkedIn.',
  },
  'Buy Me a Coffee': {
    description: 'Creator support platform where fans can send one-time or recurring payments to content creators.',
    rules: 'Usernames become your page URL (buymeacoffee.com/yourname). Letters, numbers, and hyphens allowed.',
    tips: 'Match your username to your social media handle. Fans will look for the same name they know you by.',
  },
  'Calendly': {
    description: 'Scheduling automation platform used by professionals to share availability and book meetings.',
    rules: 'Personal URLs use your username (calendly.com/yourname). Letters, numbers, hyphens, and underscores allowed.',
    tips: 'Use your real name since you will share this link professionally. A clean URL like calendly.com/firstname-lastname works well.',
  },
  'Contently': {
    description: 'Content marketing platform connecting freelance writers and journalists with enterprise brands.',
    rules: 'Portfolio URLs use your name slug. Letters, numbers, and hyphens allowed.',
    tips: 'Use your real name. Contently portfolios are professional writing showcases shared with editors and content managers.',
  },
  'eBay': {
    description: 'One of the largest online marketplaces globally with over 130 million active buyers.',
    rules: 'Usernames must be 6-64 characters. Letters, numbers, and some special characters allowed. Cannot contain spaces or consecutive special characters.',
    tips: 'If you sell regularly, your username is your seller reputation. Changing it later resets buyer perception.',
  },
  'SpeakerDeck': {
    description: 'Presentation sharing platform for uploading and viewing slide decks, owned by GitHub.',
    rules: 'Usernames become your profile URL. Letters, numbers, and hyphens allowed.',
    tips: 'Use your real name or Twitter handle. SpeakerDeck is used by conference speakers sharing their talks.',
  },
  'Credly': {
    description: 'Digital credential and badge platform used by organizations to issue verifiable certifications.',
    rules: 'Profile URLs use your name. Accounts are typically tied to your real identity for credential verification.',
    tips: 'Use your real name exactly as it appears on your certifications. Credly badges link back to your profile.',
  },
  'AllMyLinks': {
    description: 'Link-in-bio service for aggregating all your online profiles and links on one page.',
    rules: 'Usernames become your URL (allmylinks.com/yourname). Letters, numbers, and limited special characters allowed.',
    tips: 'Match your link-in-bio username to your primary social media handle for consistency.',
  },
  'Open Collective': {
    description: 'Platform for open source projects and communities to raise and manage funds transparently.',
    rules: 'Slugs must be lowercase, with letters, numbers, and hyphens. Used in your profile URL.',
    tips: 'Use your project name or organization name. Open Collective profiles are public financial records.',
  },
  'Ko-fi': {
    description: 'Creator support platform for receiving donations and selling products, similar to Buy Me a Coffee.',
    rules: 'Usernames become your page URL (ko-fi.com/yourname). Letters, numbers, and underscores allowed.',
    tips: 'Use the same handle as your social accounts. Fans need to find your Ko-fi page easily.',
  },
  'Cameo': {
    description: 'Platform where fans can purchase personalized video messages from celebrities and public figures.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'If you are a public figure, use your known name or stage name. Fans search by the name they recognize.',
  },
  'Beacons': {
    description: 'Link-in-bio platform for creators with built-in analytics, email marketing, and monetization tools.',
    rules: 'Usernames become your URL (beacons.ai/yourname). Letters, numbers, underscores, and periods allowed.',
    tips: 'Match your Beacons handle to your primary social account. This is what goes in your Instagram or TikTok bio.',
  },
  'Carrd': {
    description: 'Simple one-page website builder popular for personal landing pages and link-in-bio sites.',
    rules: 'Site URLs use your chosen name as a subdomain (yourname.carrd.co). Letters, numbers, and hyphens allowed.',
    tips: 'Many people create multiple Carrd sites. Your main one should use your name or primary handle.',
  },
  'Bio.link': {
    description: 'Link-in-bio tool for creating a simple page with links to your content and social profiles.',
    rules: 'Usernames become your URL (bio.link/yourname). Letters, numbers, and limited special characters allowed.',
    tips: 'Keep it short and matching your social handles. This URL goes in your social media bios.',
  },
  'Bento': {
    description: 'Visual link-in-bio platform using a grid layout to showcase links, embeds, and content.',
    rules: 'Usernames become your URL (bento.me/yourname). Letters, numbers, and hyphens allowed.',
    tips: 'Bento stands out with its visual grid format. Use your standard handle for brand consistency.',
  },
  'Wellfound': {
    description: 'Startup job board and networking platform, formerly known as AngelList Talent.',
    rules: 'Profiles use your real name with URL slugs. No separate username system.',
    tips: 'Use your real name. Wellfound is for startup job searching and investing, so professional identity matters.',
  },
  'Contra': {
    description: 'Commission-free freelance platform for independent professionals to find and manage work.',
    rules: 'Profile URLs use your name slug. Letters, numbers, and hyphens allowed.',
    tips: 'Use your real name. Contra portfolios are professional profiles similar to LinkedIn.',
  },
  'Lnk.Bio': {
    description: 'Simple link-in-bio service for sharing multiple links from a single URL.',
    rules: 'Usernames become your URL (lnk.bio/yourname). Letters, numbers, and basic special characters allowed.',
    tips: 'Match your social media handle. The whole point is a single consistent link across platforms.',
  },
  'Taplink': {
    description: 'Link-in-bio and micro-landing page builder popular in Russian-speaking markets and growing globally.',
    rules: 'Page URLs use your chosen name (taplink.cc/yourname). Letters, numbers, and hyphens allowed.',
    tips: 'Use your social media username. Taplink pages are shared in Instagram and TikTok bios.',
  },
  'Notion': {
    description: 'All-in-one workspace for notes, docs, wikis, and project management used by millions of individuals and teams.',
    rules: 'Notion does not have public usernames. Shared pages use generated or custom URLs.',
    tips: 'Notion profiles are internal. Your display name is what collaborators see in shared workspaces.',
  },
  'Peerlist': {
    description: 'Professional network for tech workers to showcase work, connect with peers, and find opportunities.',
    rules: 'Usernames become your profile URL (peerlist.io/yourname). Letters, numbers, and hyphens allowed.',
    tips: 'Use your real name or established developer handle. Peerlist is designed as a professional showcase.',
  },
  'Daily.dev': {
    description: 'Developer news aggregator and community platform personalizing tech content feeds.',
    rules: 'Usernames allow letters, numbers, and underscores. Profile URLs use your username.',
    tips: 'Use your developer handle. Daily.dev profiles show your reading interests and contributions.',
  },
  'Topmate': {
    description: 'Platform for professionals to monetize expertise through paid 1-on-1 sessions, consultations, and mentoring.',
    rules: 'Usernames become your booking URL (topmate.io/yourname). Letters, numbers, and underscores allowed.',
    tips: 'Use your real name or professional brand. Clients will book sessions through this URL.',
  },
  'Superpeer': {
    description: 'Video calling platform for creators and experts to host paid 1-on-1 sessions and group events.',
    rules: 'Usernames become your URL (superpeer.com/yourname). Letters, numbers, and hyphens allowed.',
    tips: 'Use your professional name. Superpeer URLs are shared for booking sessions.',
  },
  'Cal.com': {
    description: 'Open-source scheduling infrastructure, an alternative to Calendly with more customization options.',
    rules: 'Usernames become your booking URL (cal.com/yourname). Letters, numbers, and hyphens allowed.',
    tips: 'Use your real name for professional scheduling. The URL should be easy to share verbally.',
  },
  'Savee': {
    description: 'Visual bookmarking platform for designers to collect and organize design inspiration.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Use your designer handle. Savee is a niche design community where your boards reflect your taste.',
  },
  'Wix': {
    description: 'Website building platform with over 250 million users creating websites with drag-and-drop tools.',
    rules: 'Wix site URLs use your account name as a subdomain or a custom domain. Account names allow letters and numbers.',
    tips: 'If using a free Wix subdomain, pick a clean name. Most serious users connect a custom domain.',
  },
  'Squarespace': {
    description: 'Website building and hosting platform known for polished templates, used by millions of websites.',
    rules: 'Squarespace sites use custom domains or yoursite.squarespace.com subdomains. Letters, numbers, and hyphens allowed.',
    tips: 'The subdomain only matters until you connect a custom domain. Use your brand name in either case.',
  },
  'Snipfeed': {
    description: 'Creator monetization platform combining link-in-bio with digital product sales and tipping.',
    rules: 'Usernames become your URL (snipfeed.co/yourname). Letters, numbers, and basic characters allowed.',
    tips: 'Match your social media handle. Snipfeed links go directly in your social media bios.',
  },
  'Flowpage': {
    description: 'Link-in-bio and digital business card platform for creators and professionals.',
    rules: 'Usernames become your URL (flowpage.com/yourname). Letters, numbers, and limited special characters allowed.',
    tips: 'Use your name or brand handle. Flowpage URLs are designed to be shared from social profiles.',
  },
  'Campsite.bio': {
    description: 'Link-in-bio tool with analytics, scheduling, and customization features for social media creators.',
    rules: 'Usernames become your URL (campsite.bio/yourname). Letters, numbers, and hyphens allowed.',
    tips: 'Match your primary social media handle. Consistency across platforms helps followers find you.',
  },
  'Stan Store': {
    description: 'Creator commerce platform combining link-in-bio with a digital storefront for selling products and services.',
    rules: 'Usernames become your store URL (stan.store/yourname). Letters, numbers, and hyphens allowed.',
    tips: 'Use your creator name. Stan Store links replace traditional link-in-bio tools for monetization.',
  },
  'Gravatar': {
    description: 'Globally recognized avatar service that links your email address to a profile image used across millions of websites.',
    rules: 'Gravatar profiles are tied to email addresses. Display names are freeform. Profile URLs use hashed email addresses.',
    tips: 'Use your primary email address. Your Gravatar image shows up on WordPress sites, GitHub, and many other platforms.',
  },
  'Disqus': {
    description: 'Comment hosting platform used by millions of websites for their comment sections.',
    rules: 'Usernames must be 2-30 characters. Letters, numbers, underscores, and hyphens allowed.',
    tips: 'Your Disqus name appears on every comment you leave across all sites using Disqus. Pick something you want associated with your opinions.',
  },
  'IFTTT': {
    description: 'Automation platform for connecting apps and services through conditional workflows called applets.',
    rules: 'Usernames allow letters, numbers, and underscores. Profile URLs use your username.',
    tips: 'IFTTT profiles are not very public-facing. Pick something simple you will remember for login.',
  },
  'Giphy': {
    description: 'GIF search engine and hosting platform serving over 10 billion GIFs daily across apps and websites.',
    rules: 'Usernames allow letters, numbers, and underscores. Profile URLs use your username.',
    tips: 'If you create GIFs, your channel username is how people find your content. Match it to your brand.',
  },
  'BuzzFeed': {
    description: 'Digital media company known for quizzes, listicles, and viral content, with community-submitted posts.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'BuzzFeed community profiles are tied to content creation. Use a name that works as a byline.',
  },
  'Wikipedia': {
    description: 'The largest free encyclopedia with over 60 million articles across 300+ languages, edited by volunteers.',
    rules: 'Usernames can be up to 85 bytes. Most characters allowed except # < > [ ] | { } and /. Cannot start with a lowercase letter on some wikis.',
    tips: 'Many editors use pseudonyms. Your username appears on every edit you make and is part of your editing history permanently.',
  },
  'Instructables': {
    description: 'DIY project sharing platform owned by Autodesk, where users publish step-by-step guides and tutorials.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Profile URLs use your username.',
    tips: 'Pick a name that reflects your making interests. Your username appears on all your published projects.',
  },
  'Issuu': {
    description: 'Digital publishing platform for creating and distributing digital magazines, catalogs, and brochures.',
    rules: 'Usernames become your profile URL. Letters, numbers, and hyphens allowed.',
    tips: 'Use your publication or brand name if you publish content. Issuu is used professionally for digital publishing.',
  },
  'Imgur': {
    description: 'Image hosting and sharing community with millions of daily visitors, originally built as a Reddit companion.',
    rules: 'Usernames must be 3-20 characters. Letters, numbers, underscores, hyphens, and periods allowed.',
    tips: 'Imgur has a strong meme culture. Casual and funny usernames fit in, but anything goes.',
  },
  '9GAG': {
    description: 'Meme and entertainment content sharing platform with a large global user base.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Humor-oriented names fit the culture. Your username shows on your posts and comments.',
  },
  'Fandom': {
    description: 'Wiki hosting platform for fan communities, home to over 250,000 wikis about games, movies, TV, and more.',
    rules: 'Usernames must be 1-40 characters. Letters, numbers, underscores, hyphens, and periods allowed. Cannot start with a period.',
    tips: 'Your username is shared across all Fandom wikis. Pick something that works whether you edit one wiki or many.',
  },
  'Hive': {
    description: 'Decentralized blockchain-based social network forked from the Steem blockchain.',
    rules: 'Account names must be 3-16 characters. Lowercase letters, numbers, hyphens, and periods allowed. Must start with a letter.',
    tips: 'Hive account names are permanently on the blockchain and cannot be changed. Choose carefully.',
  },
  'Foursquare': {
    description: 'Location-based social network and local search platform for discovering and sharing places.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Foursquare is location-focused. Your username is less important than your check-in history and tips.',
  },
  'Untappd': {
    description: 'Social beer discovery and rating app for logging and reviewing beers at bars, breweries, and at home.',
    rules: 'Usernames allow letters, numbers, and underscores. Profile URLs use your username.',
    tips: 'Keep it simple. Your beer check-ins are the main content, and friends search by name to follow you.',
  },
  'Vivino': {
    description: 'Wine discovery and review app with over 65 million users scanning labels and rating wines.',
    rules: 'Vivino uses your real name as display. No separate public username system for profiles.',
    tips: 'Use your real name since wine reviews are tied to your identity. The app is about personal taste sharing.',
  },
  'Grailed': {
    description: 'Peer-to-peer marketplace for buying and selling high-end and streetwear fashion.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Profile URLs use your username.',
    tips: 'Your username is your seller reputation. Buyers look at username credibility when making purchases.',
  },
  'Wikimedia': {
    description: 'Unified login system across all Wikimedia projects including Wikipedia, Wikidata, Commons, and more.',
    rules: 'Same rules as Wikipedia: up to 85 bytes, most characters allowed except # < > [ ] | { } and /.',
    tips: 'One username works across all Wikimedia projects. Pick something you want associated with your contributions everywhere.',
  },
  'Trello': {
    description: 'Visual project management tool using boards, lists, and cards, owned by Atlassian.',
    rules: 'Usernames must be at least 3 characters. Letters, numbers, underscores, and hyphens allowed.',
    tips: 'Trello usernames appear in shared boards. Use your name or work handle for professional collaboration.',
  },
  'LibraryThing': {
    description: 'Book cataloging and social networking site for readers to track personal libraries and discuss books.',
    rules: 'Usernames allow letters, numbers, and underscores. Must be unique.',
    tips: 'The community is book-focused and literary. Your username shows on reviews and in discussion groups.',
  },
  'Meetup': {
    description: 'Platform for organizing and finding local groups and events around shared interests.',
    rules: 'Meetup uses your display name rather than a unique username. Profile URLs use numeric IDs.',
    tips: 'Use your real name. Meetup is about meeting people in person, so your profile should be recognizable.',
  },
  'Reddit Sub': {
    description: 'Subreddit (community) on Reddit, the front page of the internet with over 50 million daily active users.',
    rules: 'Subreddit names must be 3-21 characters. Letters, numbers, and underscores only. Cannot be changed after creation.',
    tips: 'Subreddit names define a community. Make it descriptive and easy to search for. Short names are better for linking.',
  },
  'Saidit': {
    description: 'Reddit alternative built on open-source Reddit code, focused on free speech.',
    rules: 'Usernames follow Reddit-style rules: letters, numbers, underscores, and hyphens. 3-20 characters.',
    tips: 'Use a familiar handle if you are migrating from Reddit. The interface and culture are similar.',
  },
  'Tildes': {
    description: 'Invite-only, non-profit link aggregator and discussion site focused on quality conversations.',
    rules: 'Usernames must be 3-20 characters. Letters, numbers, and underscores allowed.',
    tips: 'Tildes values thoughtful discussion. Your username appears on all comments and posts in this small community.',
  },
  'Cohost': {
    description: 'Social media platform launched as an alternative to Twitter, focused on anti-commercial principles. Shut down in 2024.',
    rules: 'Handles were 1-40 characters. Letters, numbers, hyphens, and underscores allowed.',
    tips: 'Cohost shut down in late 2024. Claiming a handle is no longer possible.',
  },
  'TradingView': {
    description: 'Financial charting platform and social network for traders, with over 50 million monthly users.',
    rules: 'Usernames must be 4-16 characters. Letters, numbers, and underscores allowed. Cannot start with a number.',
    tips: 'Your username appears on published trading ideas. Many traders use handles that sound professional or trading-related.',
  },
  'Cash App': {
    description: 'Mobile payment service by Block (formerly Square) for peer-to-peer money transfers.',
    rules: '$Cashtags must be 1-20 characters. Letters and numbers only. Prefixed with $.',
    tips: 'Your $cashtag is how people send you money. Keep it short and memorable, matching your real name or brand.',
  },
  'CoinMarketCap': {
    description: 'Leading cryptocurrency market data aggregator tracking prices, market caps, and trading volumes.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Community profiles are for watchlists and discussions. Use your crypto handle or real name.',
  },
  'OpenSea': {
    description: 'The largest NFT marketplace for buying, selling, and creating non-fungible tokens.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Profile URLs use your username.',
    tips: 'Your OpenSea username is your collector/creator identity. Many users match it to their ENS name or Twitter handle.',
  },
  'Venmo': {
    description: 'Mobile payment app owned by PayPal, popular in the United States for peer-to-peer payments.',
    rules: 'Usernames must be 5-16 characters. Letters, numbers, hyphens, and underscores allowed.',
    tips: 'Venmo usernames are how friends find you to send payments. Use your name or something friends recognize.',
  },
  'Coinbase': {
    description: 'Publicly traded cryptocurrency exchange with over 110 million verified users.',
    rules: 'Coinbase uses real names for accounts. No public username system for trading accounts.',
    tips: 'Coinbase requires identity verification. Your profile is tied to your legal name.',
  },
  'Rarible': {
    description: 'NFT marketplace supporting multiple blockchains for creating, buying, and selling digital art and collectibles.',
    rules: 'Usernames become your profile URL. Letters, numbers, and underscores allowed.',
    tips: 'Match your NFT identity across marketplaces. Many collectors use the same handle on Rarible and OpenSea.',
  },
  'Foundation': {
    description: 'Curated NFT marketplace focused on digital art, originally invite-only for creators.',
    rules: 'Usernames allow letters, numbers, and underscores. Profile URLs use your username.',
    tips: 'Foundation leans toward fine art. Your username is your gallery name and should reflect your artistic identity.',
  },
  'Mirror': {
    description: 'Decentralized writing platform built on Ethereum for publishing articles as NFTs.',
    rules: 'Profiles are tied to Ethereum addresses or ENS names. Custom subdomains available for publications.',
    tips: 'Use your ENS name if you have one. Mirror is crypto-native, so wallet-based identity is standard.',
  },
  'Zora': {
    description: 'NFT marketplace and minting platform built on Ethereum and its Layer 2 networks.',
    rules: 'Profiles are wallet-based. Display names are freeform. Profile URLs use wallet addresses.',
    tips: 'Zora profiles are tied to your wallet. Use a recognizable ENS name for discoverability.',
  },
  'LooksRare': {
    description: 'Community-focused NFT marketplace that rewards users with LOOKS tokens for trading.',
    rules: 'Profiles are wallet-based with optional display names. No traditional username system.',
    tips: 'Set a display name that matches your NFT identity across other marketplaces.',
  },
  'Blur': {
    description: 'NFT marketplace designed for professional traders, featuring real-time price feeds and portfolio analytics.',
    rules: 'Profiles are wallet-based. Display names are optional. Identified primarily by wallet address.',
    tips: 'Blur is trader-focused. Your wallet address is your primary identity, but setting a display name helps recognition.',
  },
  'Slack': {
    description: 'Workplace messaging platform used by over 750,000 organizations for team communication.',
    rules: 'Display names can be up to 80 characters. Usernames are workspace-specific and set by admins or users. Lowercase letters, numbers, periods, hyphens, and underscores allowed.',
    tips: 'Use your real name in professional workspaces. Your display name and username can differ across workspaces.',
  },
  'Kik': {
    description: 'Mobile messaging app popular among younger users, with usernames as the primary way to connect.',
    rules: 'Usernames must be 5-20 characters. Letters, numbers, underscores, and periods allowed. Case-insensitive.',
    tips: 'Kik usernames cannot be changed. Pick one you will want long-term since it is the only way people find you.',
  },
  'Telegram': {
    description: 'Cloud-based messaging app with over 900 million monthly active users, known for groups, channels, and bots.',
    rules: 'Usernames must be 5-32 characters. Letters, numbers, and underscores allowed. Must start with a letter. Case-insensitive.',
    tips: 'Your Telegram username creates a t.me/username link. Short handles are valuable for sharing.',
  },
  'Signal': {
    description: 'Privacy-focused encrypted messaging app recommended by security professionals and journalists.',
    rules: 'Signal usernames must be 3-32 characters plus a numeric discriminator. Letters, numbers, underscores, and periods allowed.',
    tips: 'Signal usernames are a recent feature. They let people contact you without sharing your phone number.',
  },
  'Discord': {
    description: 'Communication platform with over 200 million monthly active users, popular for gaming and community servers.',
    rules: 'Usernames must be 2-32 characters. Lowercase letters, numbers, underscores, and periods allowed. Unique globally since the 2023 username update.',
    tips: 'Short Discord usernames are scarce since the migration to unique handles. Claim yours early if you have a preferred name.',
  },
  'Matrix': {
    description: 'Open-source, decentralized communication protocol used by governments and organizations for secure messaging.',
    rules: 'Matrix IDs follow the format @username:server.tld. Usernames allow lowercase letters, numbers, and some special characters.',
    tips: 'Your full identity includes the server domain. Choose both your username and homeserver carefully.',
  },
  'Khan Academy': {
    description: 'Free educational platform with courses in math, science, computing, and more, used by millions of students.',
    rules: 'Usernames must be 3-70 characters. Letters, numbers, and common characters allowed. Profile URLs use a unique identifier.',
    tips: 'Many users are students. Your username shows on discussion posts and your public profile.',
  },
  'Coursera': {
    description: 'Online learning platform partnering with universities and companies, offering courses and degrees to over 130 million learners.',
    rules: 'Coursera uses your real name. No traditional public username system. Profile URLs use slugs or numeric IDs.',
    tips: 'Use your real name since certificates display it. Coursera is a professional learning platform.',
  },
  'Codecademy': {
    description: 'Interactive coding education platform teaching programming languages through hands-on exercises.',
    rules: 'Usernames allow letters, numbers, and underscores. Profile URLs use your username.',
    tips: 'Use your developer handle. Codecademy profiles can showcase completed courses and projects.',
  },
  'Udemy': {
    description: 'Online course marketplace with over 200,000 courses and 70 million students.',
    rules: 'Udemy uses display names rather than unique usernames. Instructor URLs use name slugs.',
    tips: 'If you are an instructor, your display name is your brand. Students see it on course listings.',
  },
  'Scratch': {
    description: 'MIT-developed visual programming language and online community for children to learn coding, with over 100 million projects shared.',
    rules: 'Usernames must be 3-20 characters. Letters, numbers, hyphens, and underscores allowed. Cannot have consecutive special characters.',
    tips: 'Scratch is designed for young people. Usernames cannot be changed, so pick something age-appropriate and lasting.',
  },
  'freeCodeCamp': {
    description: 'Non-profit coding education platform with a full curriculum and active forum community.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Use your developer handle. Your freeCodeCamp portfolio shows certifications and projects.',
  },
  'Memrise': {
    description: 'Language learning platform using spaced repetition and community-created courses.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Your username shows on leaderboards if you compete. Pick something motivating or fun.',
  },
  'Skillshare': {
    description: 'Creative education platform with thousands of classes in design, illustration, photography, and business.',
    rules: 'Skillshare uses display names rather than unique usernames. Profile URLs use name slugs or numeric IDs.',
    tips: 'If you teach on Skillshare, your display name is your instructor brand. Match it to your creative identity.',
  },
  'Brilliant': {
    description: 'STEM learning platform focused on interactive problem-solving in math, science, and computer science.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Brilliant profiles are relatively private. Pick a username you will remember for login purposes.',
  },
  'Brainly': {
    description: 'Peer-to-peer homework help platform where students ask and answer academic questions.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Many Brainly users are students. Your username appears on questions and answers you post.',
  },
  'Quizlet': {
    description: 'Study tool platform with user-created flashcard sets and learning games, used by over 60 million students.',
    rules: 'Usernames must be 3-20 characters. Letters, numbers, underscores, and hyphens allowed.',
    tips: 'Your username shows on flashcard sets you share. Keep it school-appropriate if you share study materials.',
  },
  'Pluralsight': {
    description: 'Technology skills platform for IT professionals with courses in software development, cloud, and security.',
    rules: 'Pluralsight uses display names tied to your account. Profile URLs use numeric IDs or name slugs.',
    tips: 'Use your real professional name. Pluralsight profiles can be shared as proof of skill development.',
  },
  'Treehouse': {
    description: 'Online coding education platform focused on web development, mobile, and design courses.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Use your developer handle. Treehouse profiles show your completed tracks and achievements.',
  },
  'DataCamp': {
    description: 'Data science and analytics learning platform with interactive coding exercises in Python, R, and SQL.',
    rules: 'DataCamp uses display names rather than unique usernames. Profile URLs use name slugs.',
    tips: 'Use your real name or professional identity. DataCamp profiles can be shared with employers.',
  },
  'Edx': {
    description: 'Online learning platform founded by Harvard and MIT, offering university-level courses and credentials.',
    rules: 'Usernames must be 2-30 characters. Letters, numbers, underscores, and hyphens allowed. Must start with a letter.',
    tips: 'Use your real name. EdX certificates display your profile name, and employers may verify credentials.',
  },
  'Flickr': {
    description: 'Photo sharing and hosting platform with a large community of photographers, operating since 2004.',
    rules: 'Screen names can be up to 30 characters. Your Flickr URL uses an alias: letters, numbers, and some special characters.',
    tips: 'Your Flickr URL alias is permanent. Many photographers use their real name or photography brand.',
  },
  'YouPic': {
    description: 'Photography community and portfolio platform where photographers share work and receive feedback.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Use your photographer name or studio brand. YouPic is portfolio-oriented.',
  },
  'ImageShack': {
    description: 'Image hosting service that has been operating since 2003, used for uploading and sharing images.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'ImageShack is primarily an image hosting tool. Your username is less important than on social photography platforms.',
  },
  '500px': {
    description: 'Photography community and licensing marketplace connecting photographers with buyers.',
    rules: 'Usernames allow letters, numbers, underscores, and hyphens. Profile URLs use your username.',
    tips: 'Use your photographer name. 500px is used by professionals, and your username appears on licensed images.',
  },
  'EyeEm': {
    description: 'Photography platform combining a community with AI-powered image licensing and marketplace.',
    rules: 'Usernames allow letters, numbers, and underscores. Profile URLs use your username.',
    tips: 'Use your photographer name or brand. EyeEm is both community and marketplace.',
  },
  'ViewBug': {
    description: 'Photography community hosting photo contests and providing exposure for photographers.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Use your photographer identity. Your username appears on contest entries and in the community.',
  },
  'SmugMug': {
    description: 'Paid photo hosting and portfolio platform for photographers, also the parent company of Flickr.',
    rules: 'Site names become your subdomain (yourname.smugmug.com). Letters, numbers, and hyphens allowed.',
    tips: 'Your SmugMug subdomain is your photography portfolio URL. Use your name or studio brand.',
  },
  'Photobucket': {
    description: 'Image and video hosting service that has operated since 2003, known for personal photo storage.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Photobucket is mainly for hosting. Your username matters less than on community photography platforms.',
  },
  'Glass': {
    description: 'Subscription-based photography community focused on high-quality images without ads, algorithms, or likes.',
    rules: 'Usernames allow letters, numbers, and underscores. Profile URLs use your username.',
    tips: 'Glass has a curated, thoughtful photography community. Use your photographer name for professional consistency.',
  },
  'Vero': {
    description: 'Ad-free social network for sharing photos, music, movies, and other media in a chronological feed.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Vero attracts creatives who dislike algorithm-driven platforms. Use your creative handle.',
  },
  'GuruShots': {
    description: 'Photography game platform where users compete in photo challenges judged by the community.',
    rules: 'Usernames typically allow letters, numbers, and common special characters. Check the platform for exact limits.',
    tips: 'Your username appears in competition rankings. Use your photographer name for recognition.',
  },
  'Depop': {
    description: 'Social shopping app for secondhand fashion, popular among Gen Z buyers and sellers.',
    rules: 'Usernames must be 3-29 characters. Letters, numbers, underscores, and periods allowed. No spaces.',
    tips: 'Your username is your shop brand. Many successful Depop sellers use catchy, fashion-forward names.',
  },
  'Shopify': {
    description: 'E-commerce platform powering over 4 million online stores worldwide for businesses of all sizes.',
    rules: 'Store URLs use your chosen name as a subdomain (yourstore.myshopify.com). Letters, numbers, and hyphens allowed.',
    tips: 'Your myshopify.com subdomain matters until you connect a custom domain. Use your brand name.',
  },
  'Poshmark': {
    description: 'Social marketplace for buying and selling new and secondhand fashion, home goods, and beauty products.',
    rules: 'Usernames must be 3-30 characters. Letters, numbers, and underscores allowed.',
    tips: 'Your username is your closet name. Fashion-related or memorable names help build your seller brand.',
  },
  'Envato': {
    description: 'Digital marketplace ecosystem including ThemeForest, CodeCanyon, and other creative asset stores.',
    rules: 'Usernames must be 3-20 characters. Letters, numbers, and underscores allowed. Must start with a letter.',
    tips: 'Your Envato username is shared across all Envato marketplaces. If you sell themes or plugins, it is your author identity.',
  },
  'Society6': {
    description: 'Print-on-demand marketplace where artists sell their designs on wall art, home decor, and apparel.',
    rules: 'Usernames become your shop URL. Letters, numbers, and hyphens allowed.',
    tips: 'Your username is your artist storefront. Use your artist name or brand for consistency.',
  },
  'Zazzle': {
    description: 'Print-on-demand marketplace for customizable products including cards, clothing, and home goods.',
    rules: 'Usernames become your store URL. Letters, numbers, and underscores allowed.',
    tips: 'Your store name is your brand on Zazzle. Pick something that reflects the type of products you design.',
  },
  'Teespring': {
    description: 'Print-on-demand platform (now Spring) for creators to design and sell custom merchandise.',
    rules: 'Store URLs use your chosen name. Letters, numbers, and hyphens allowed.',
    tips: 'Match your store name to your social media presence. Most Teespring sellers drive traffic from YouTube or TikTok.',
  },
  'Storenvy': {
    description: 'Social marketplace for independent brands and small businesses to set up free online stores.',
    rules: 'Store URLs use your chosen name as a subdomain. Letters, numbers, and hyphens allowed.',
    tips: 'Use your brand name. Storenvy stores are often found through the marketplace discovery features.',
  },
  'BigCartel': {
    description: 'E-commerce platform designed for artists and makers to run small online shops with up to 500 products.',
    rules: 'Store URLs use your name as a subdomain (yourstore.bigcartel.com). Letters, numbers, and hyphens allowed.',
    tips: 'Big Cartel is popular with independent artists and bands. Your subdomain is your shop identity.',
  },
  'Gumroad Store': {
    description: 'Creator storefront on Gumroad for selling digital products, courses, and memberships directly to customers.',
    rules: 'Store URLs use your Gumroad username (yourname.gumroad.com). Letters, numbers, and hyphens allowed.',
    tips: 'Same handle as your Gumroad account. Consistency between your store URL and social presence drives sales.',
  },
  'Sellfy': {
    description: 'E-commerce platform for creators selling digital products, physical goods, and subscriptions.',
    rules: 'Store URLs use your chosen name (yourstore.sellfy.store). Letters, numbers, and hyphens allowed.',
    tips: 'Use your creator brand name. Most Sellfy sellers promote their store through social media.',
  },
  'LemonSqueezy': {
    description: 'Digital commerce platform for selling software, digital downloads, and SaaS subscriptions with built-in tax handling.',
    rules: 'Store slugs allow letters, numbers, and hyphens. Used in your store URL.',
    tips: 'Use your product or brand name. Lemon Squeezy is popular with indie developers and SaaS founders.',
  },
  'Strava': {
    description: 'Social fitness network for runners and cyclists with over 120 million athletes tracking activities via GPS.',
    rules: 'Strava uses your real name as your display. Profile URLs use numeric IDs. No public username system.',
    tips: 'Use your real name. Strava is about connecting with athletes you know and competing on segment leaderboards.',
  },
  'Komoot': {
    description: 'Outdoor recreation platform for planning and navigating hiking, cycling, and running routes.',
    rules: 'Komoot uses display names rather than unique usernames. Profile URLs use numeric IDs.',
    tips: 'Use your real name. Komoot is about sharing outdoor adventures with friends and the community.',
  },
  'TrainingPeaks': {
    description: 'Training and nutrition planning platform used by endurance athletes and their coaches.',
    rules: 'TrainingPeaks uses real names tied to your account. No public username system.',
    tips: 'Use your real name. TrainingPeaks is a professional training tool where coaches and athletes connect.',
  },
  'Peloton': {
    description: 'Connected fitness platform known for its bikes and treadmills, with a community of millions taking live and on-demand classes.',
    rules: 'Leaderboard names must be 3-16 characters. Letters, numbers, and underscores allowed.',
    tips: 'Your leaderboard name is how the community knows you. Many users pick motivational or fun names. It can be changed.',
  },
};

const platformIcons: Record<string, LucideIcon> = {
  Instagram,
  Facebook,
  Twitter,
  YouTube: Youtube,
  Twitch,
  LinkedIn: Linkedin,
  GitHub: Github,
  GitLab: Gitlab,
  Dribbble,
  Figma,
  CodePen: Codepen,
  Slack,
  Trello,
};

const categoryIcons: Record<string, LucideIcon> = {
  'Social Media': AtSign,
  Developer: Code,
  'Content & Blogging': Pencil,
  'Creative & Design': Palette,
  'Music & Audio': Music,
  'Video & Streaming': Video,
  Gaming: Gamepad2,
  Professional: Linkedin,
  Community: MessageCircle,
  'Finance & Crypto': Bitcoin,
  Messaging: MessageCircle,
  'Education & Learning': GraduationCap,
  Photography: Camera,
  Marketplace: ShoppingBag,
  'Fitness & Sports': Dumbbell,
  'Domain Names': Globe,
};

export function getPlatformIcon(name: string, category: string): LucideIcon {
  return platformIcons[name] ?? categoryIcons[category] ?? Globe;
}

export function getCategoryIcon(category: string): LucideIcon {
  return categoryIcons[category] ?? Globe;
}

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
