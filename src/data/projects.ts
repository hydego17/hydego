import { sanityClient, getClient } from '@/lib/sanity';
import { TProject } from '@/types/project';

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
  return await sanityClient.fetch<TProject[]>(
    `*[_type == "projects"] 
    | order(_createdAt desc)
    {${projectFields}}
   `
  );
}

export async function getTotalProjects() {
  return await sanityClient.fetch<number>(`count(*[_type == "projects"])`);
}

type PaginatedProps = {
  offset: number;
  limit: number;
};

export async function getPaginatedProjects({ offset, limit }: PaginatedProps = { offset: 0, limit: 1 }) {
  return await sanityClient.fetch<TProject[]>(
    `*[_type == "projects"] 
      | order(_createdAt desc)
      {${projectFields}}[${offset}...${offset + limit}]
     `
  );
}

export async function getSingleProject(slug: string, preview: boolean) {
  const currClient = getClient(preview);

  const result = await currClient
    .fetch(
      `*[_type== "projects" && slug.current == $slug]
    { ${projectFields}
      content[]{..., "asset": asset-> }
    }`,
      { slug }
    )
    .then((res) => {
      // return preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]

      let result = res?.[0];

      if (preview) {
        result = res?.[1] || res?.[0];
      }

      return result;
    });

  return result as TProject;
}
