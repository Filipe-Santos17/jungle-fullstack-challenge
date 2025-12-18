import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { tasksApi } from '@/lib/api';
import { showToastError } from '@/utils/toast';

import type { iMsgError } from '@/types/api';

interface iPostCommentParam {
    id: string;
    comment: string;
}

export default function usePostComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: iPostCommentParam) => {
            try {
                const { id, comment: comment_text } = data

                const response = await tasksApi.post(`/${id}/comments`, { comment_text });

                return response.data;
            } catch (error) {
                if (isAxiosError(error)) {
                    const msgBackend = error.response?.data as iMsgError

                    if (typeof (msgBackend?.message) === 'string') {
                        showToastError("Erro ao criar comentário!", msgBackend.message)
                    }

                    if (Array.isArray(msgBackend?.message)) {
                        showToastError("Erro ao criar comentário!", msgBackend.message[0])
                    }
                }

                console.error(error);

                throw new Error('Falha ao criar comentário');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        },
    });
}
