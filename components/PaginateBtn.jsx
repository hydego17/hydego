import { useState } from "react";
import styled from "@emotion/styled";

export default function PaginateBtn({
  fetchedProjects,
  isFirst,
  isLast,
  setOffset,
  offset,
  mutate,
  maxPage,
}) {
  const [pos, setPos] = useState(1);

  const updateProjects = async () => {
    if (pos < maxPage) {
      setPos((prev) => prev + 1);
      await setOffset((prev) => prev + 1);
      mutate(fetchedProjects);
      mutate(`api/projects?page=${offset}`);
    } else {
      await setOffset((prev) => prev + 1);
    }
    return null;
  };

  return (
    <PaginateBtnStyled>
      <button
        className="paginate-btn"
        disabled={isFirst}
        onClick={() => {
          setOffset((prev) => prev - 1);
        }}
      >
        Prev
      </button>
      <button
        className="paginate-btn"
        disabled={isLast}
        onClick={updateProjects}
      >
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