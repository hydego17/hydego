import { config } from '@/config';
import Pocketbase from 'pocketbase';

export const pb = new Pocketbase(config.CMS_URL);
