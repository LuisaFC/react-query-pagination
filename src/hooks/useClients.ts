import { ClientsService } from '@/services/ClientsService';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function useClients(perPage = 20) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['clients', {page: currentPage, perPage}],
    queryFn: () => ClientsService.getAll(currentPage, perPage),
  });

  const totalItem = data?.items ?? 0;
  const totalPages = Math.ceil(totalItem / perPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  function handleNextPage() {
    setCurrentPage(prevState => prevState + 1);
  }

  function handlePreviousPage() {
    setCurrentPage(prevState => prevState - 1);
  }

  function handleSetPage(page: number) {
    setCurrentPage(page);
  }

  return {
    clients: data?.data ?? [],
    isLoading,
    pagination: {
      handleNextPage,
      handlePreviousPage,
      handleSetPage,
      totalPages,
      currentPage,
      hasPreviousPage,
      hasNextPage,
    }
  };
}
