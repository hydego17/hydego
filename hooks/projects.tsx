import useSWR from 'swr';

import { TProjects } from 'types/project';

type THooksProps = {
  initialData: any;
  params: {
    offset?: number | undefined;
    limit?: number | undefined;
  };
};

const fetcher = url => fetch(url).then(res => res.json());

export const useGetProjects = ({ params, initialData }: THooksProps) => {
  const { data, error, mutate } = useSWR<TProjects>(
    `/api/projects?offset=${params.offset}&limit=${params.limit}`,
    fetcher,
    {
      initialData,
    },
  );

  return {
    data,
    error,
    loading: !data && !error,
    mutate,
  };
};
