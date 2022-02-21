import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllArchives } from 'lib/archive';

export default async function GetArchives(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getAllArchives();

    res.status(200).json(data);
  } catch (err) {
    res.status(404).end();
  }
}
