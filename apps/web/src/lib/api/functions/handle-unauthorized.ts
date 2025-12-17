import axios from "axios"
import router from '@/router'

import env from '@/constants/envs'

export default async function handleUnauthorized() {
  try { //TODO:Tentar de novo a mesma request
    await axios.post(`${env.VITE_API_ROUTE}/auth/refresh`, null, { withCredentials: true })
  } catch (e) {
    if (axios.isAxiosError(e)) {
      router.navigate({ to: "/login", replace: true })
    }
  }
}