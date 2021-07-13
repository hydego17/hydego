import { PaginatorProvider } from './providers';
import { INITIAL_VALUES } from './constants';

export type PaginatorProps = {
  isDisabled?: boolean;
  currentPage?: number;
  pagesQuantity?: number;
  onPageChange: (page: number) => void;
};

export const Paginator: React.FC<PaginatorProps> = ({
  children,
  isDisabled = INITIAL_VALUES.isDisabled,
  currentPage = INITIAL_VALUES.currentPage,
  pagesQuantity = INITIAL_VALUES.pagesQuantity,
  onPageChange,
}) => (
  <PaginatorProvider
    currentPage={currentPage}
    isDisabled={isDisabled}
    onPageChange={onPageChange}
    pagesQuantity={pagesQuantity}
  >
    {children}
  </PaginatorProvider>
);
