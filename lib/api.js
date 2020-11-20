import client from "./sanity";
import imgUrlBuilder from "@sanity/image-url";

const projectFields = `
title,
subtitle,
content,
techStacks,
coverImage,
link,
'slug':slug.current,
`;

const builder = imgUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllProjects(offset) {
  // => Learn how to GROQ
  // For pagination, take only 3 first data
  // Descending order (newest first)
  const results = await client.fetch(
    `*[_type == "projects"] 
    | order(_createdAt desc)
    {${projectFields}}[${offset}...${offset + 3}]
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
