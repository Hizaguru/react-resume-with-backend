/* eslint-env node */
module.exports = {
  siteUrl: 'https://www.jukkis.eu/',
  exclude: ['/404*', '/500*'],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === '/' ? 1 : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/404', '/500'],
      },
      // Explicitly welcome AI crawlers
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
    ],
  },
};
