import { z } from 'zod'

export const TASK_PRIORITY_OPTIONS = [
  'LOW',
  'MEDIUM',
  'HIGH',
  'URGENT',
] as const

export const TASK_STATUS_OPTIONS = [
  'TODO',
  'IN_PROGRESS',
  'REVIEW',
  'DONE',
] as const

export const taskCreateSchema = z.object({
    titulo: z.string().min(1, 'Título é obrigatório'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    prazo: z.string().refine(
        (value) => !isNaN(Date.parse(value)),
        'Data inválida'
    ),
    prioridade: z.enum(TASK_PRIORITY_OPTIONS, 'Opção invalida'),
    status: z.enum(TASK_STATUS_OPTIONS, 'Opção invalida'),
})

export type tTaskCreateSchema = z.infer<typeof taskCreateSchema>

