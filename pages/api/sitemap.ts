import { getAllProjects } from 'lib/api';
import { getAllArchives } from 'lib/archive';
import { TArchives } from 'types/archive';
import { TProjects } from 'types/project';

export default async (req, res) => {
  // Fetch data from a CMS.
  const Projects: TProjects = await getAllProjects();
  const Archives: TArchives = await getAllArchives();

  const projectRoutes = Projects.map(project => `/projects/${project.slug}`);
  const archiveRoutes = Archives.map(archive => `/archive/${archive.slug}`);
  const localRoutes = ['/index', '/about', '/archive'];

  const pages = [...localRoutes, ...projectRoutes, ...archiveRoutes];

  const urlSet = pages
    .map(page => {
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
};
