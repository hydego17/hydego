import styled from '@emotion/styled';

type PaginationProps = {
  isDisabled: boolean;
  currentPage: number;
  pagesQuantity?: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ isDisabled, currentPage, pagesQuantity, onPageChange }: PaginationProps) => {
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
      <button type="button" className="paginate-btn" disabled={isFirst || isDisabled} onClick={handlePreviousClick}>
        Prev
      </button>
      <button type="button" className="paginate-btn" disabled={isLast || isDisabled} onClick={handleNextClick}>
        Next
      </button>
    </PaginationStyled>
  );
};

const PaginationStyled = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  .paginate-btn {
    padding: 0.3rem 0.5rem;
    border-radius: 3px;
    font-weight: 500;
  }
`;

export default Pagination;
