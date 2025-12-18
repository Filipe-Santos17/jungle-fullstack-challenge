import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from '@/components/ui/spinner'
import BaseLoginTemplate from '@/components/common/auth/base-login'

import usePostAuthRegister from '@/hooks/query-auth/useRegister'

import { showToastSuccess } from '@/utils/toast'

import { registerSchema } from "@/validators/auth.validators"
import type { tRegisterFormData } from '@/validators/auth.validators'

export const Route = createFileRoute('/(auth)/register')({
  component: AuthRegister,
})

export function AuthRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tRegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const { mutateAsync: registerUser, isPending } = usePostAuthRegister()

  const navigate = useNavigate()

  async function handleSubmitRegister(data: tRegisterFormData) {
    const userData = await registerUser(data)
    
    if (typeof userData.message === 'string') {//userData
      showToastSuccess("Conta criada com sucesso", userData.message)

      setTimeout(() => {
        navigate({ to: "/login", replace: true })
      }, 3000)
    }
  }

  return (
    <BaseLoginTemplate handleSubmitForm={handleSubmit(handleSubmitRegister)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Bem vindo</h1>
          <p className="text-muted-foreground text-balance">
            Preencha o formulário para criar sua conta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Nome</FieldLabel>
          <Input
            id="username"
            type="text"
            placeholder="Nome"
            autoComplete='username'
            {...register('username')}
          />
          {errors.username && (
            <p className="text-sm text-destructive">
              {errors.username.message}
            </p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            autoComplete='email'
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete='current-password'
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </Field>
        <Field>
          <Button type="submit" className="cursor-pointer hover:opacity-75" disabled={isPending}>
            {isPending ? <Spinner /> : "Criar conta"}
          </Button>
        </Field>
        <FieldDescription className="text-center">
          Já possui uma conta? <Link to="/login">Faça Login</Link>
        </FieldDescription>
      </FieldGroup>
    </BaseLoginTemplate>
  )
}
