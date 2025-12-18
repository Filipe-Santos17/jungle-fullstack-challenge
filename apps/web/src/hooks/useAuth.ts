import { useState, useEffect } from "react";
import type { iSuccessLogin } from '@/types/api'
import router from "@/router"

type tMyUser = iSuccessLogin['user']

export default function useAuth() {
    const keyUserData = 'user_data'

    const [user, setUser] = useState<tMyUser | null>(() => {
        const dataUser = localStorage.getItem(keyUserData)

        if (!dataUser) {
            return null
        }

        return JSON.parse(dataUser)
    })

    function saveUser(myUser: tMyUser) {
        setUser(myUser)
    }

    useEffect(() => {
        if (!user) {
            router.navigate({ to: "/login", replace: true })
        }
    }, [user]);

    return { user, saveUser }
}
