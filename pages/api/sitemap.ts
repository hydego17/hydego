import type { NextApiRequest, NextApiResponse } from 'next';

import { getAllProjects } from '@/data/projects';
import { getAllArchives } from '@/data/archive';

export default async function GenerateSitemap(req: NextApiRequest, res: NextApiResponse) {
  // Fetch data from a Sanity
  const Projects = await getAllProjects();
  const Archives = await getAllArchives();

  const projectRoutes = Projects.map((project) => `/projects/${project.slug}`);
  const archiveRoutes = Archives.map((archive) => `/archive/${archive.slug}`);
  const localRoutes = ['/index', '/about', '/archive'];

  const pages = [...localRoutes, ...projectRoutes, ...archiveRoutes];

  const urlSet = pages
    .map((page) => {
      // Remove the word index from route
      const route = page === '/index' ? '' : page;
      // Build url portion of sitemap.xml
      return `<url><loc>https://hydego.me${route}</loc></url>`;
    })
    .join('');

  // Add urlSet to entire sitemap string
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;

  // set response content header to xml
  res.setHeader('Content-Type', 'text/xml');

  // write the sitemap
  res.write(sitemap);
  res.end();
}
