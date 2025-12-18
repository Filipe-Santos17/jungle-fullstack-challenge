import { z } from 'zod'

export const loginSchema = z.object({
    email: z.email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export const registerSchema = z.object({
    username: z.string('Nome necessário').min(3, 'Nome com no mínimo 3 caracteres'),
    email: z.email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres').max(20, 'A senha deve ter no máximo 20 caracteres'),
})

export const userSchema = z.object({
    id: z.uuid(),
    email: z.email(),
    username: z.string(),
})

export type tLoginFormData = z.infer<typeof loginSchema>

export type tRegisterFormData = z.infer<typeof registerSchema>