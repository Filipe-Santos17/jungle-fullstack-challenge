import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { authApi } from '@/lib/api';
import { showToastError } from '@/utils/toast';

import type { iMsgError } from '@/types/api';
import type { iCreateUser } from '@/types/auth';

export default function usePostAuthRegister() {
    return useMutation({
        mutationFn: async (data: iCreateUser) => {
            try {
                const response = await authApi.post('/register', data);

                return response.data;
            } catch (error) {
                if (isAxiosError(error)) {
                    const msgBackend = error.response?.data as iMsgError

                    if (typeof (msgBackend?.message) === 'string') {
                        showToastError("Registro invalido", msgBackend.message)
                    }
                }

                console.error(error);

                throw new Error('Falha ao criar usuário');
            }
        },
    });
}
