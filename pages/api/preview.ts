import type { NextApiRequest, NextApiResponse } from 'next';

import { getSingleProject } from '@/data/projects';
import { getSingleArchive } from '@/data/archive';

export default async function PreviewReadOnly(req: NextApiRequest, res: NextApiResponse) {
  const noSlugFound = !req.query.slug;
  const secretNotMatch = req.query.secret !== process.env.SANITY_PREVIEW_SECRET;

  if (secretNotMatch || noSlugFound) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  const slug = req.query.slug as string;

  const project = await getSingleProject(slug, true);
  const archive = await getSingleArchive(slug, true);

  if (!project && !archive) {
    return res.status(401).json({ message: 'Invalid Slug' });
  }

  res.setPreviewData({ message: 'Success get preview' });

  if (project) {
    res.writeHead(307, { Location: `/projects/${project.slug}` });
  }
  if (archive) {
    res.writeHead(307, { Location: `/archive/${archive.slug}` });
  }

  res.end();
}
