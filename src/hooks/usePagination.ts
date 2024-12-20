import { useCallback, useEffect, useState } from 'react';


export function usePagiantion(perPage: number, initialPage = 1) {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = searchParams.get('page');

    console.log('page', page);

    if(!page) {
      console.log('entrou');
      return initialPage;
    }

    return Number(page);
  });

  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  useEffect(() => {
    const url =  new URL(window.location.href);

    url.searchParams.set('page', String(currentPage));
    const newURL = url.origin + url.pathname + '?' + url.searchParams.toString();

    window.history.replaceState({}, '', newURL);
  }, [currentPage]);

  const nextPage = useCallback(() => {
    setCurrentPage(prevState => prevState + 1);
  }, []);

  const previousPage = useCallback(() => {
    setCurrentPage(prevState => prevState - 1);
  }, []);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    currentPage,
    nextPage,
    previousPage,
    setPage,
    setTotalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
}
