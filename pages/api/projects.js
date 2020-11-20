import { getAllProjects, projectFields } from "lib/api";
import client from "lib/sanity";

export default async function getProjects(req, res) {
  const page = Number(req.query.page * 3);
  const perPage = 3;
  try {
    const data = await client.fetch(
      `*[_type == "projects"] 
      | order(_createdAt desc)
      {${projectFields}}[${page}...${page + 3}]
     `
    );
    const totalProjects = await client.fetch(
      `*[_type == "projects"] | order(_createdAt desc)`
    );
    res.status(200).json({
      message: "Fetched Projects",
      data,
      firstData: totalProjects[0].slug,
      lastData: totalProjects[totalProjects.length - 1].slug,
      dataCount: data.length,
      currPage: page,
      maxPage: Math.ceil(totalProjects.length / perPage),
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).end();
  }
}
