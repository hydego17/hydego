import { useContext } from 'react';
import styled from '@emotion/styled';

import { PaginatorContext } from '../components/Pagination/providers';

type PaginateBtnProps = {};

const PaginateBtn: React.FC<PaginateBtnProps> = () => {
  // react hooks
  const { actions, state } = useContext(PaginatorContext);

  // constants
  const { changePage } = actions;
  const { currentPage, pagesQuantity, isDisabled } = state;
  const isFirst = currentPage === 1;
  const isLast = pagesQuantity ? currentPage > pagesQuantity - 1 : true;

  // handlers
  const handlePreviousClick = () => {
    if (!isFirst) changePage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (!isLast) changePage(currentPage + 1);
  };

  return (
    <PaginateBtnStyled>
      <button className="paginate-btn" disabled={isFirst || isDisabled} onClick={handlePreviousClick}>
        Prev
      </button>
      <button className="paginate-btn" disabled={isLast || isDisabled} onClick={handleNextClick}>
        Next
      </button>
    </PaginateBtnStyled>
  );
};

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

export default PaginateBtn;
