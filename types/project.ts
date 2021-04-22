export type TProject = {
  title: string;
  subtitle: string;
  slug: string;
  coverImage: any;
  content: any[];
  link: string;
  code: string;
  techStacks: string;
};

export type TProjects = TProject[];

export type TApiProject = {
  message?: string;
  data: TProjects;
  dataCount?: number;
  firstData?: string;
  lastData?: string;
  maxPage?: number;
};
