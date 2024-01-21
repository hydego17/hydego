interface CmsListResponse<T extends any = null> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T;
}

interface CmsRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
}

interface Project extends CmsRecord {
  published: boolean;
  title: string;
  slug: string;
  date: string;
  subtitle: string;
  cover_image: string;
  description: string;
  techs: string;
  link: string;
  repo: string;
  images: string[];
}

interface AboutMe extends CmsRecord {
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

interface Archive extends CmsRecord {
  title: string;
  slug: string;
  date: string;
  image: string;
  content: string;
}

interface Secret extends CmsRecord {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
}
