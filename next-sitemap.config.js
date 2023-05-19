/** @type {import('next-sitemap').IConfig} */
const config = {
  changefreq: 'daily',
  generateRobotsTxt: true,
  priority: 0.7,
  siteUrl: process.env.SITE_URL || 'https://www.nickcheckr.com',
};

module.exports = config;
