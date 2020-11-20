import client from "./sanity";
import imgUrlBuilder from "@sanity/image-url";

const builder = imgUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export const projectFields = `
title,
subtitle,
content,
techStacks,
coverImage,
link,
'slug':slug.current,
`;

export async function getAllProjects() {
  // => Learn how to GROQ
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

export async function getSingleProject(slug) {
  const result = await client.fetch(
    `*[_type== "projects" && slug.current == $slug]
    { ${projectFields}
      content[]{..., "asset": asset-> }
    }`,
    { slug }
  );
  return result[0];
}
