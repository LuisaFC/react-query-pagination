import { ClientsService } from '@/services/ClientsService';
import { useQuery } from '@tanstack/react-query';
import { usePagiantion } from './usePagination';

export function useClients(perPage = 20) {
  const pagination = usePagiantion(perPage);

  const { data, isLoading } = useQuery({
    queryKey: ['clients', {page: pagination.currentPage, perPage}],
    queryFn: async () => {
      const response = await ClientsService.getAll(pagination.currentPage, perPage);

      pagination.setTotalItems(response.items);

      return response;
    },
  });

  return {
    clients: data?.data ?? [],
    isLoading,
    pagination
  };
}
