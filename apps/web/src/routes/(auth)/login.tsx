import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { isAxiosError } from 'axios'

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import BaseLoginTemplate from '@/components/common/auth/base-login'

import { authApi } from '@/lib/api'
import { showToastError, showToastSuccess } from '@/utils/toast'
import type { iMsgError, iSuccessLogin } from '@/types/api'


export const Route = createFileRoute('/(auth)/login')({
  component: AuthLogin,
})

export function AuthLogin() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleChangeInput(setData: Dispatch<SetStateAction<string>>, text: string) {
    setData(text)
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault()

    try {
      const requestBody = { email, password }
      const response = await authApi.post('/login', requestBody)

      if (response.status === 201) {
        const dataLogin = response.data as iSuccessLogin

        localStorage.setItem('user_data', JSON.stringify(dataLogin.user))

        showToastSuccess("Login feito com sucesso!", `Seja bem vindo de volta ${dataLogin.user.username}`)

        setTimeout(() => {
          navigate({ to: "/home", replace: true })
        }, 5000)
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const msgBackend = error.response?.data as iMsgError

        if (typeof (msgBackend?.message) === 'string') {
          showToastError("Login invalido", msgBackend.message)
        }
      }

      console.error(error);
    }
  }

  return (
    <BaseLoginTemplate handleSubmitForm={handleLogin}>
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
            required
            autoComplete='email'
            value={email}
            onChange={e => handleChangeInput(setEmail, e.currentTarget.value)}
          />
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
            required
            autoComplete='current-password'
            value={password}
            onChange={e => handleChangeInput(setPassword, e.currentTarget.value)}
          />
        </Field>
        <Field>
          <Button type="submit" className='cursor-pointer hover:opacity-75'>Entrar</Button>
        </Field>
        <FieldDescription className="text-center">
          Não tem conta? <Link to="/register">Criar</Link>
        </FieldDescription>
      </FieldGroup>
    </BaseLoginTemplate>
  )
}
