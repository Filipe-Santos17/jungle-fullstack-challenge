import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { tasksApi } from '@/lib/api';
import { showToastError } from '@/utils/toast';

import type { iMsgError } from '@/types/api';
import type { iTasksCreate } from '@/types/tasks';

interface UpdateTaskVariables {
    id: string;
    data: iTasksCreate;
}

export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: UpdateTaskVariables) => {
            try {
                const response = await tasksApi.put(`/${id}`, data);

                return response.data;
            } catch (error) {
                if (isAxiosError(error)) {
                    const msgBackend = error.response?.data as iMsgError;

                    if (msgBackend?.statusCode === 404) return;

                    if (typeof msgBackend?.message === 'string') {
                        showToastError('Erro ao criar task!', msgBackend.message);
                    }
                }

                console.error(error);

                throw new Error('Falha ao criar task');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
}
