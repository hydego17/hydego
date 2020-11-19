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

export async function getAllProjects() {
  // => Learn how to GROQ
  const result = await client.fetch(`*[_type== "projects"]{${projectFields}}`);
  return result;
}

export async function getSingleProject(slug) {
  const result = await client.fetch(
    `*[_type== "projects" && slug.current == $slug]
    { ${projectFields}
      content[]{..., "asset": asset->}
    }`,
    { slug }
  );
  return result[0];
}
