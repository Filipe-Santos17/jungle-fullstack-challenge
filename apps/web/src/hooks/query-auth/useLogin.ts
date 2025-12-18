import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { authApi } from '@/lib/api';
import { showToastError } from '@/utils/toast';

import type { iMsgError } from '@/types/api';
import type { iLoginUser } from '@/types/auth';

export default function usePostAuthLogin() {
    return useMutation({
        mutationFn: async (data: iLoginUser) => {
            try {
                const response = await authApi.post('/login', data);

                return response.data;
            } catch (error) {
                if (isAxiosError(error)) {
                    const msgBackend = error.response?.data as iMsgError

                    if (typeof (msgBackend?.message) === 'string') {
                        showToastError("Login invalido", msgBackend.message)
                    }
                }

                console.error(error);

                throw new Error('Falha ao fazer login');
            }
        },
    });
}
