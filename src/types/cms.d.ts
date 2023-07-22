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
