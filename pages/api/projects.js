import { getAllProjects } from "lib/api";

export default async function getProjects(req, res) {
  try {
    const data = await getAllProjects();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(404).end();
  }
}
