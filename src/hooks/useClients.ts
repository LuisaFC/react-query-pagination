import { ClientsService } from '@/services/ClientsService';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function useClients(perPage = 20) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['clients', currentPage],
    queryFn: () => ClientsService.getAll(currentPage, perPage),
  });

  function handleNextPage() {
    setCurrentPage(prevState => prevState + 1);
  }

  function handlePreviousPage() {
    setCurrentPage(prevState => prevState - 1);
  }

  return {
    clients: data?.data ?? [],
    isLoading,
    pagination: {
      handleNextPage,
      handlePreviousPage
    }
  };
}
