import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { tasksApi } from '@/lib/api';
import { showToastError } from '@/utils/toast';

import type { iMsgError } from '@/types/api';

export default function useDeleteTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            try {
                const response = await tasksApi.delete(`/${id}`);

                return response.data;
            } catch (error) {
                if (isAxiosError(error)) {
                    const msgBackend = error.response?.data as iMsgError

                    if (typeof (msgBackend?.message) === 'string') {
                        showToastError("Erro ao deletar tasks!", msgBackend.message)
                    }
                }

                console.error(error);

                throw new Error('Falha ao deletar task');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
}
