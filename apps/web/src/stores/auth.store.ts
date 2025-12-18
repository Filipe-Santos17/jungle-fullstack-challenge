import { create } from 'zustand'
import type { iSuccessLogin } from '@/types/api'

type User = iSuccessLogin['user']

type AuthState = {
    user: User | null
    isAuthenticated: boolean
    setUser: (user: User) => void
    clearUser: () => void
}

const STORAGE_KEY = 'user_data'

export const useAuthStore = create<AuthState>((set) => ({
    user: (() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : null
    })(),

    isAuthenticated: !!localStorage.getItem(STORAGE_KEY),

    setUser: (user) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        set({ user, isAuthenticated: true })
    },

    clearUser: () => {
        localStorage.removeItem(STORAGE_KEY)
        set({ user: null, isAuthenticated: false })
    },
}))
