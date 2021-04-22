import useSWR from 'swr';
import { TArchives } from 'types/archive';

const fetcher = url => fetch(url).then(res => res.json());

export const useGetArchive = ({ initialData }) => {
  const { data, error } = useSWR<TArchives>(`/api/archive`, fetcher, {
    initialData,
  });

  return {
    data,
    error,
    loading: !data && !error,
  };
};
