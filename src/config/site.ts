export const siteConfig = {
  name: 'NickCheckr',
  title: 'Is your nick available?',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nickcheckr.stosiu.dev',
  social: {
    github: 'https://github.com/Stosiu',
  },
} as const;
