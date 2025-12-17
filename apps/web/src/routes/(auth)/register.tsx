import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react'
import axios from "axios"

import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import BaseLoginTemplate from '@/components/common/auth/base-login'

import env from '@/constants/envs'
import { showToastError, showToastSuccess } from '@/utils/toast'

import type { iMsgError } from '@/types/api'

export const Route = createFileRoute('/(auth)/register')({
  component: AuthRegister,
})

export function AuthRegister() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleChangeInput(setData: Dispatch<SetStateAction<string>>, text: string) {
    setData(text)
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault()

    try {
      const pathBack = env.VITE_API_ROUTE
      const requestBody = { email, password, username }
      const response = await axios.post(`${pathBack}/auth/register`, requestBody)

      if (response.status === 201) {
        showToastSuccess("Conta criada com sucesso", "Por favor faça login agora!")

        setTimeout(() => {
          navigate({ to: "/login", replace: true })
        }, 5000)
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msgBackend = error.response?.data as iMsgError

        if (typeof (msgBackend?.message) === 'string') {
          showToastError("Falha ao criar conta", msgBackend.message)
        }
      }
      
      console.error(error);
    }
  }

  return (
    <BaseLoginTemplate handleSubmitForm={handleLogin}>
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
            required
            value={username}
            onChange={e => handleChangeInput(setUsername, e.currentTarget.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
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
            value={password}
            onChange={e => handleChangeInput(setPassword, e.currentTarget.value)}
          />
        </Field>
        <Field>
          <Button type="submit">Criar conta</Button>
        </Field>
        <FieldDescription className="text-center">
          Já possui uma conta? <Link to="/login">Faça Login</Link>
        </FieldDescription>
      </FieldGroup>
    </BaseLoginTemplate>
  )
}
