import { MetadataRoute } from 'next';

const locales = ['ro', 'ru', 'en'];
const serviceIds = [
  'hydrafacial', 'kobido', 'fotona-4d', 'soprano-ice', 'peeling-biorepeel',
  'curatare-ultrasunete', 'curatare-mecanica', 'curatare-combinata',
  'hydradermie-lift', 'is-clinical-spa', 'vivace-rf', 'injectabile', 'piercing'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.afrodita.md';

  const routes = ['', '/about', '/contact'];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });

    serviceIds.forEach((id) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/services/${id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    });
  });

  return sitemapEntries;
}
