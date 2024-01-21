import querystring from 'query-string';

import { config } from '@/config';

export async function getAboutPage() {
  const recordId = 'bb4vas6vjda5e7d';

  const res: AboutMe = await fetch(
    `${config.CMS_URL}/api/collections/about_page/records/${recordId}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  return res;
}

export async function getProjects() {
  const params = querystring.stringify({
    sort: '-date',
    filter: `(published=true)`,
  });

  const res: CmsListResponse<Project[]> = await fetch(
    `${config.CMS_URL}/api/collections/projects/records?${params}`,
    {
      next: { revalidate: 0 },
    }
  ).then((res) => res.json());

  return res;
}

export async function getProjectDetail(slug: string) {
  const params = querystring.stringify({
    filter: `(slug='${slug}')`,
  });

  const res: CmsListResponse<Project[]> = await fetch(
    `${config.CMS_URL}/api/collections/projects/records?${params}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  const post = res.items?.[0];

  return post;
}

export async function getArchives() {
  const params = querystring.stringify({
    sort: '-date',
  });

  const res: CmsListResponse<Archive[]> = await fetch(
    `${config.CMS_URL}/api/collections/archives/records?${params}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  return res;
}

export async function getArchivePost(slug: string) {
  const params = querystring.stringify({
    filter: `(slug='${slug}')`,
  });

  const res: CmsListResponse<Archive[]> = await fetch(
    `${config.CMS_URL}/api/collections/archives/records?${params}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  const post = res.items?.[0];

  return post;
}

export async function getSecretDetail(slug: string) {
  const params = querystring.stringify({
    filter: `(slug='${slug}')`,
  });

  const res: CmsListResponse<Secret[]> = await fetch(
    `${config.CMS_URL}/api/collections/secrets/records?${params}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  const post = res.items?.[0];

  return post;
}
