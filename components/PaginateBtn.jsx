import styled from "@emotion/styled";

export default function PaginateBtn({ isFirst, isLast, setOffset }) {
  return (
    <PaginateBtnStyled>
      <button disabled={isFirst} onClick={() => setOffset((prev) => prev - 1)}>
        Prev
      </button>
      <button disabled={isLast} onClick={() => setOffset((prev) => prev + 1)}>
        Next
      </button>
    </PaginateBtnStyled>
  );
}

const PaginateBtnStyled = styled.div`
  float: right;
  padding: 2rem 0;

  button {
    padding: 0.3rem 0.4rem;
    margin-left: 0.5rem;
    border-radius: 2px;
    border: 0;
    outline: 0;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;

    &:hover {
      background: #d4d4d4;
    }

    &:disabled {
      color: #797979;
    }
  }
`;
