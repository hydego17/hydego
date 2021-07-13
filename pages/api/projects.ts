import { NextApiRequest, NextApiResponse } from 'next';
import { getPaginatedProjects } from 'lib/api';

export default async function getProjects(req: NextApiRequest, res: NextApiResponse) {
  const offset = Number(req.query.offset) as number;
  const limit = Number(req.query.limit) as number;

  try {
    const data = await getPaginatedProjects({ offset, limit });

    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(404).end();
  }
}
