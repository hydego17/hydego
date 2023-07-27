import { type MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { getArchives, getProjects } from '@/services/cms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // main routes
  const routes = ['', '/about', '/archives'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  // projects
  const projects = await getProjects();
  const projectRoutes = projects.items.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  // archives
  const archives = await getArchives();
  const archivesRoutes = archives.items.map((a) => ({
    url: `${siteConfig.url}/archives/${a.slug}`,
    lastModified: new Date(),
  }));

  return [...routes].concat(projectRoutes).concat(archivesRoutes);
}
