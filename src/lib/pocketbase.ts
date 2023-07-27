import Pocketbase from 'pocketbase';

import { config } from '@/config';

const pb = new Pocketbase(config.CMS_URL);

function generateImageUrl(record: CmsRecord, fileName: string) {
  return pb.files.getUrl(record, fileName);
}

export { pb, generateImageUrl };
