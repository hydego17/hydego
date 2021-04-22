import useSWR from 'swr';
import { TApiProject } from 'types/project';

type THooksProps = {
  offset: number;
  initialData: TApiProject;
};

const fetcher = url => fetch(url).then(res => res.json());

export const useGetProjects = ({ offset, initialData }: THooksProps) => {
  const { data, error, mutate } = useSWR<TApiProject>(`/api/projects?page=${offset || 0}`, fetcher, {
    initialData,
  });

  return {
    data,
    error,
    loading: !data && !error,
    mutate,
  };
};
