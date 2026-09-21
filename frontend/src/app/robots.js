export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Hide admin dashboard and APIs from Google
    },
    sitemap: 'https://www.techjaguar.in/sitemap.xml',
  }
}
