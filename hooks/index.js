import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetProjects = ({ pageNum }) => {
  const { data, error } = useSWR(`/api/projects?page=${pageNum}`, fetcher);

  return {
    data,
    error,
    loading: !data && !error,
  };
};
