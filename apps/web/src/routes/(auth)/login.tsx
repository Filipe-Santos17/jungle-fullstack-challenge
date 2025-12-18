import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import usePostAuthLogin from '@/hooks/query-auth/useLogin'

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import BaseLoginTemplate from '@/components/common/auth/base-login'
import { Spinner } from '@/components/ui/spinner'

import { useAuthStore } from '@/stores/auth.store'
import { showToastSuccess } from '@/utils/toast'
import { userSchema, loginSchema } from "@/validators/auth.validators"
import type { tLoginFormData } from '@/validators/auth.validators'

export const Route = createFileRoute('/(auth)/login')({
  component: AuthLogin,
})

export function AuthLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tLoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { mutateAsync: loginUser, isPending } = usePostAuthLogin()

  const navigate = useNavigate()
  const { setUser } = useAuthStore()

  async function handleSubmitLogin(data: tLoginFormData) {
    const userData = await loginUser(data)

    if (userSchema.safeParse(userData.user)) {
      setUser(userData.user)

      showToastSuccess(
        "Login feito com sucesso!",
        `Seja bem vindo de volta ${userData.user.username}`
      )

      setTimeout(() => {
        navigate({ to: "/home", replace: true })
      }, 3000)
    }
  }

  return (
    <BaseLoginTemplate handleSubmitForm={handleSubmit(handleSubmitLogin)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Bem vindo de volta</h1>
          <p className="text-muted-foreground text-balance">
            Prencha seu email e senha para entrar na sua conta
          </p>
        </div>

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
          <Button type="submit" className='cursor-pointer hover:opacity-75' disabled={isPending}>
            {isPending ? <Spinner /> : "Entrar"}
          </Button>
        </Field>
        <FieldDescription className="text-center">
          Não tem conta? <Link to="/register">Criar</Link>
        </FieldDescription>
      </FieldGroup>
    </BaseLoginTemplate>
  )
}
