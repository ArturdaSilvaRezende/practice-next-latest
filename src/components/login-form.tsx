"use client"

import { useState } from "react"
import { Eye, EyeOff, Building2, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-card px-6 py-8 lg:w-1/2 lg:px-16 lg:py-12">
      <div className="mx-auto w-full max-w-md">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">H</span>
            </div>
            <span className="text-xl font-semibold text-foreground">HMO Tecnologia</span>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Seja bem-vindo!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Preencha seus dados para realizar o Login
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">E-mail ou Usuário</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="text"
                  placeholder="Digite seu e-mail ou usuário"
                  className="pl-10"
                />
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="unidade">Unidade</FieldLabel>
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
                <Select>
                  <SelectTrigger id="unidade" className="w-full pl-10">
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Nome da Unidade</SelectItem>
                    <SelectItem value="2">2 - Unidade Central</SelectItem>
                    <SelectItem value="3">3 - Filial Norte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Field>
          </FieldGroup>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Button type="submit" size="lg" className="w-full">
              Login
            </Button>
            <Button type="button" variant="outline" size="lg" className="w-full">
              Cadastre-se
            </Button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline"
            >
              Esqueceu a senha?
            </a>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          © Copyright 2024 HMO Tecnologia
        </p>
      </div>
    </div>
  )
}
