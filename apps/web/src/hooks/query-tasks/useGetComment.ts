import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { tasksApi } from '@/lib/api';
import { showToastError } from '@/utils/toast';
import type { iMsgError } from '@/types/api';
import type { iComment } from '@/types/tasks';

interface iParamsGetRequest {
    id: string;
    page?: number;
    size?: number;
}

export default function useGetComments(params: iParamsGetRequest) {
    return useQuery<iComment[], Error>({
        queryKey: ['comments', params],
        //@ts-ignore
        queryFn: async ({ queryKey }) => {
            const [, { id, page, size }] = queryKey as [
                string,
                iParamsGetRequest
            ];

            try {
                if (!id) return;

                const response = await tasksApi.get(`/${id}/comments`, {
                    params: {
                        page,
                        size,
                    },
                });

                return response.data;
            } catch (error) {
                if (isAxiosError(error)) {
                    const msgBackend = error.response?.data as iMsgError;

                    if (msgBackend?.statusCode === 404) return

                    if (typeof msgBackend?.statusCode !== 'string') {
                        showToastError('Erro ao carregar tasks!', msgBackend.message);
                    }
                }

                console.error(error);

                throw new Error('Falha ao carregar tasks');
            }
        },
        staleTime: 1000 * 60,
        retry: 1,
    });
}
