import client, { previewClient } from './sanity';
import { TProjects } from 'types/project';

export const getClient = (preview) => (preview ? previewClient : client);

export const projectFields = `
_id,
title,
subtitle,
content,
techStacks,
'coverImage': coverImage.asset -> url,
link,
code,
'slug':slug.current,
`;

export async function getAllProjects() {
  // For pagination, take only 3 first data
  // Descending order (newest first)
  const results = await client.fetch(
    `*[_type == "projects"] 
    | order(_createdAt desc)
    {${projectFields}}
   `
  );

  return results;
}

export async function getInitialProjects({ limit }: { limit: number }) {
  const totalData = await client.fetch<number>(`count(*[_type == "projects"])`);

  const initialData = await client.fetch<TProjects>(
    `*[_type == "projects"] 
    | order(_createdAt desc)
    {${projectFields}}[0...${limit || 1}]
   `
  );

  return { initialData, totalData };
}

export async function getSingleProject(slug, preview) {
  const currClient = getClient(preview);
  const result = await currClient
    .fetch(
      `*[_type== "projects" && slug.current == $slug]
    { ${projectFields}
      content[]{..., "asset": asset-> }
    }`,
      { slug }
    )
    .then((res) => (preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]));

  return result;
}

type PaginatedProps = {
  offset: number;
  limit: number;
};

export async function getPaginatedProjects({ offset, limit }: PaginatedProps = { offset: 0, limit: 1 }) {
  const data = await client.fetch<TProjects>(
    `*[_type == "projects"] 
    | order(_createdAt desc)
    {${projectFields}}[${offset}...${offset + limit}]
   `
  );

  return data;
}

export async function getAboutMePage() {
  const result = await client.fetch(
    `*[_type == "about"]
      |{title, subtitle,content,image, description}[0]`
  );

  return result;
}
