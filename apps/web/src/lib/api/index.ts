import axios from 'axios';
import env from '@/constants/envs'

import attachUnauthorizedInterceptor from './functions/attach-unauthorized-interceptor';

export const authApi = axios.create({
	baseURL: `${env.VITE_API_ROUTE}/auth`,
    withCredentials: true,
});

export const tasksApi = axios.create({
	baseURL: `${env.VITE_API_ROUTE}/tasks`,
    withCredentials: true,
});

attachUnauthorizedInterceptor(authApi)
attachUnauthorizedInterceptor(tasksApi)