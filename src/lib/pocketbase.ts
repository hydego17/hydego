import { config } from '@/config';
import Pocketbase, { Record } from 'pocketbase';

export const pb = new Pocketbase(config.CMS_URL);

export function generateImageUrl(record: CmsRecord, fileName: string) {
  return pb.files.getUrl(record, fileName);
}
