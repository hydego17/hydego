import { config } from '@/config';

export async function getAboutPage() {
  const res = await fetch(`${config.CMS_URL}/api/collections/about_page/records/bb4vas6vjda5e7d`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return res as AboutMe;
}

export async function getArchives() {
  const res = await fetch(`${config.CMS_URL}/api/collections/archives/records?sort=-date`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return res as CmsListResponse<Archive[]>;
}

export async function getArchivePost(slug: string) {
  const res: CmsListResponse<Archive[]> = await fetch(
    `${config.CMS_URL}/api/collections/archives/records?filter=(slug='${slug}')`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  const post = res.items?.[0];

  return post;
}
