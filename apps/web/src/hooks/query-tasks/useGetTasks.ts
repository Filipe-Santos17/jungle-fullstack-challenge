import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { tasksApi } from '@/lib/api';
import { showToastError } from '@/utils/toast';
import type { iMsgError } from '@/types/api';
import type { iTasks } from '@/types/tasks';

interface iParamsGetRequest {
    page?: number;
    size?: number;
}

export function useGetTasks(params: iParamsGetRequest = {}) {
    return useQuery<iTasks[], Error>({
        queryKey: ['tasks', params],
        //@ts-ignore
        queryFn: async ({ queryKey }) => {
            const [, { page, size }] = queryKey as [
                string,
                iParamsGetRequest
            ];

            try {
                const response = await tasksApi.get<iTasks[]>('', {
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
        keepPreviousData: true,
        retry: 1,
    });
}
