import { getSingleProject } from "lib/api";

export default async function previewReadOnly(req, res) {
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  const project = await getSingleProject(req.query.slug);

  if (!project) {
    return res.status(401).json({ message: "Invalid Slug" });
  }

  res.setPreviewData({ message: "ok" });
  res.writeHead(307, { Location: `/projects/${project.slug}` });

  res.end();
}
