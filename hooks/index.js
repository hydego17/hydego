import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetProjects = ({ pageNum, initialData }) => {
  // initialData = testData
  const { data, error } = useSWR(`/api/projects?page=${pageNum}`, fetcher, {
    initialData,
  });

  return {
    data,
    error,
    loading: !data && !error,
  };
};
