import { sanityClient } from '@/lib/sanity';
import { TAboutPage } from '@/types/pages';

export async function getAboutMePage() {
  const result = await sanityClient.fetch<TAboutPage>(
    `*[_type == "about"]
        |{title, subtitle,content,image, description}[0]`
  );
  return result;
}
