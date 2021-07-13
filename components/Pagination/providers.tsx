import React, { useState, createContext, Dispatch, SetStateAction, useEffect, useMemo } from 'react';

import { INITIAL_VALUES } from './constants';

const isDecimalNumber = (number: number): boolean => {
  return number - Math.floor(number) !== 0;
};

export type PaginatorContextValues = {
  state: {
    currentPage: number;
    pagesQuantity?: number;
    isDisabled: boolean;
  };
  actions: {
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setIsDisabled: Dispatch<SetStateAction<boolean>>;
    changePage: (page: number) => void;
  };
};

export const PaginatorContext = createContext<PaginatorContextValues>({
  state: {
    currentPage: INITIAL_VALUES.currentPage,
    pagesQuantity: INITIAL_VALUES.pagesQuantity,
    isDisabled: INITIAL_VALUES.isDisabled,
  },
  actions: {
    setCurrentPage: () => null,
    setIsDisabled: () => null,
    changePage: () => null,
  },
});

type PaginatorProviderProps = {
  pagesQuantity?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isDisabled: boolean;
};

export const PaginatorProvider: React.FC<PaginatorProviderProps> = ({
  children,
  pagesQuantity: pagesQuantityProp,
  currentPage: currentPageProp,
  onPageChange,
  isDisabled: isDisabledProp,
}) => {
  // react hooks
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_VALUES.currentPage);
  const [isDisabled, setIsDisabled] = useState<boolean>(INITIAL_VALUES.isDisabled);

  const pagesQuantity = useMemo(() => pagesQuantityProp, [pagesQuantityProp]);

  // effects
  useEffect(() => {
    setIsDisabled(isDisabledProp);
  }, [isDisabledProp]);

  useEffect(() => {
    if (isDecimalNumber(currentPageProp)) {
      console.error(`paginator -> passed down currentPage has to be a whole number`);

      return;
    }

    if (!pagesQuantity) {
      return;
    }

    if (currentPageProp > pagesQuantity) {
      console.error(`paginator -> passed down currentPage can't be higher than pagesQuantity`);

      return;
    }

    if (currentPageProp < 1) {
      console.error(`paginator -> passed down currentPage can't be lower than 1`);

      return;
    }

    if (currentPageProp && currentPageProp !== currentPage) {
      setCurrentPage(currentPageProp);
    }
  }, [currentPageProp]);

  // handlers
  const changePage = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const state = {
    currentPage,
    pagesQuantity,
    isDisabled,
  };

  const actions = {
    setCurrentPage,
    setIsDisabled,
    changePage,
  };

  return <PaginatorContext.Provider value={{ state, actions }}>{children}</PaginatorContext.Provider>;
};
