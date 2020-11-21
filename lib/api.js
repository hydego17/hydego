import axios from "axios";
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

// For index.js SSR
export async function getInitialProjects(page) {
  // Fetch the first page as default

  let projectsData = null;
  // Fetch data from API
  try {
    const { data } = await axios.get(
      `${process.env.FETCH_URL}/api/projects?page=${page}`
    );
    projectsData = data;
  } catch (err) {
    projectsData = { error: { message: err.message } };
  }

  return projectsData;
}

export async function getPaginatedProjects({ offset = 0 } = { offset: 0 }) {
  const data = await client.fetch(
    `*[_type == "projects"] 
    | order(_createdAt desc)
    {${projectFields}}[${offset}...${offset + 3}]
   `
  );

  return data;
}

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
