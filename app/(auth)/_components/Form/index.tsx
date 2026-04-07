"use client";

import { useState } from "react";
import { Eye, EyeOff, Building2, Mail, Lock } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import Image from "next/image";
import Link from "next/link";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen w-full items-center justify-center flex-col bg-card px-6 lg:w-115.5 lg:px-12">
      <div>
        <Image
          src="/images/brand.svg"
          alt="Logo da Signfy"
          width={220}
          height={60}
          className="object-cover mx-auto"
          priority
        />

        <div className="text-center mb-8 mt-3">
          <h1 className="text-2xl font-bold text-[#010647] tracking-tight">
            Seja bem-vindo!
          </h1>
          <p className="mt-1 text-[#7F7F7F]">
            Preencha seus dados para realizar o Login
          </p>
        </div>

        <form>
          <FieldGroup className="space-y-4">
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
              <div className="relative ">
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

          <div className="flex flex-col gap-3 mt-7">
            <Button type="submit" size="lg" className="w-full bg-[#0149FD] hover:bg-[#0131A9] cursor-pointer">
              Login
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full text-[#0149FD] hover:bg-[#0149FD] hover:text-white cursor-pointer border border-[#0149FD]"
            >
              Cadastre-se
            </Button>
          </div>
        </form>

        <div className="text-center mt-3">
          <Link
            href="#"
            className="text-sm text-[#0149FD] transition-colors hover:text-primary hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>
      </div>
    </div>
  );
}
