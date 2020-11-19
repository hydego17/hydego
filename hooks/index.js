import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetProjects = ({ initialData }) => {
  const { data, error } = useSWR(`/api/projects`, fetcher, {
    initialData,
  });

  return {
    data,
    error,
    loading: !data && !error,
  };
};