import type { NextApiRequest, NextApiResponse } from 'next';

export default function ExitPreview(req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.writeHead(307, { Location: '/' });
  res.end();
}
