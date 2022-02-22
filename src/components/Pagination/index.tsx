import styled from '@emotion/styled';

type PaginationProps = {
  isDisabled: boolean;
  currentPage: number;
  pagesQuantity?: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ isDisabled, currentPage, pagesQuantity, onPageChange }) => {
  // state
  const isFirst = currentPage === 1;
  const isLast = pagesQuantity ? currentPage > pagesQuantity - 1 : true;

  // handlers
  const handlePreviousClick = () => {
    if (!isFirst) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (!isLast) onPageChange(currentPage + 1);
  };

  return (
    <PaginationStyled>
      <button className="paginate-btn" disabled={isFirst || isDisabled} onClick={handlePreviousClick}>
        Prev
      </button>
      <button className="paginate-btn" disabled={isLast || isDisabled} onClick={handleNextClick}>
        Next
      </button>
    </PaginationStyled>
  );
};

const PaginationStyled = styled.div`
  /* float: right; */
  /* text-align: center; */
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  .paginate-btn {
    padding: 0.3rem 0.5rem;
    border-radius: 2px;
    border: 0;
    outline: 0;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;

    &:hover {
      background: #919191;
    }

    &:disabled {
      color: #858585;
      background: none;
    }
  }
`;

export default Pagination;
