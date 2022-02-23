import { sanityClient, getClient } from '@/lib/sanity';
import type { TArchive } from '@/types/archive';

const projectFields = `
title,
content,
'slug':slug.current,
date,
`;

export async function getAllArchives() {
  return await sanityClient.fetch<TArchive[]>(
    `*[_type == "archive"] 
      | order(date desc)
      {${projectFields}}
     `
  );
}

export async function getSingleArchive(slug: string, preview: boolean) {
  const currClient = getClient(preview);

  const data = await currClient
    .fetch<TArchive>(
      `*[_type== "archive" && slug.current == $slug]
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

  return data as TArchive;
}
