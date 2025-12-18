import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { tasksApi } from '@/lib/api';
import { showToastError } from '@/utils/toast';

import type { iMsgError } from '@/types/api';
import type { iTasksCreate } from '@/types/tasks';

export default function usePostTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: iTasksCreate) => {
            try {
                const response = await tasksApi.post('', data);

                return response.data;
            } catch (error) {
                if (isAxiosError(error)) {
                    const msgBackend = error.response?.data as iMsgError

                    if (typeof (msgBackend?.message) === 'string') {
                        showToastError("Erro ao criar tasks!", msgBackend.message)
                    }

                    if (Array.isArray(msgBackend?.message)) {
                        showToastError("Erro ao criar tasks!", msgBackend.message[0])
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
