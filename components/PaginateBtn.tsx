import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

export default function PaginateBtn({ initialData, fetchedProjects, setOffset, offset, mutate }) {
  // // State for disabled buttons
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const [pos, setPos] = useState(1);

  // Disable Pagination Button
  const projects = fetchedProjects.data;

  const { firstData, lastData, maxPage } = initialData;

  useEffect(() => {
    if (projects) {
      const firstDisplayed = projects[0].slug;
      const lastDisplayed = projects[projects.length - 1].slug;

      setIsFirst(firstDisplayed === firstData ? true : false);
      setIsLast(lastDisplayed === lastData ? true : false);
    }
  }, [projects]);

  const updateProjects = async () => {
    if (pos < maxPage) {
      setPos(prev => prev + 1);
      await setOffset(prev => prev + 1);
      mutate(fetchedProjects);
      mutate(`api/projects?page=${offset}`);
    } else {
      await setOffset(prev => prev + 1);
    }
    return null;
  };

  return (
    <PaginateBtnStyled>
      <button
        className="paginate-btn"
        disabled={isFirst}
        onClick={() => {
          setOffset(prev => prev - 1);
        }}
      >
        Prev
      </button>
      <button className="paginate-btn" disabled={isLast} onClick={updateProjects}>
        Next
      </button>
    </PaginateBtnStyled>
  );
}

const PaginateBtnStyled = styled.div`
  float: right;
  padding: 2rem 0;

  .paginate-btn {
    padding: 0.3rem 0.4rem;
    margin-left: 0.5rem;
    border-radius: 2px;
    border: 0;
    outline: 0;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;

    &:disabled {
      color: #858585;
    }
  }
`;