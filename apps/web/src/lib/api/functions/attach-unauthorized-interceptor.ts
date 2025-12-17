import type { AxiosInstance } from "axios";
import handleUnauthorized from "./handle-unauthorized";

export default function attachUnauthorizedInterceptor(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            const status = error?.response?.status

            if (status === 401) {
                handleUnauthorized()
            }

            return Promise.reject(error)
        }
    )
}
