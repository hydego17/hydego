import { getAllProjects, projectFields } from "lib/api";
import client from "lib/sanity";

export default async function getProjects(req, res) {
  try {
    const page = req.query.page;
    const data = await client.fetch(
      `*[_type == "projects"] 
      | order(_createdAt desc)
      {${projectFields}}[${page}...${page + 3}]
     `
    );
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(404).end();
  }
}
