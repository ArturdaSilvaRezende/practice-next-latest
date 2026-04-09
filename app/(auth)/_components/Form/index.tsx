"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { Eye, EyeOff, Building2, Mail, Lock } from "lucide-react";
import { useAuth } from "../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import debounce from "lodash/debounce";
import * as yup from "yup";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { api } from "@/src/utils/api";
import { loginAction } from "../actions/auth";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Informe o e-mail ou username")
    .min(4, "No minimo 4 caracteres"),
  password: yup
    .string()
    .required("Informe a senha")
    .min(4, "No minimo 4 caracteres")
    .max(20, "No máximo 20 caracteres"),
  id_unity: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? undefined : value)),
});

export function LoginForm() {
  const { isLoading: isAuthLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [unitOptions, setUnitOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [showUnitSelect, setShowUnitSelect] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { username: "", password: "", id_unity: null },
  });

  const usernameValue = useWatch({ control, name: "username" });
  // const currentUnitId = useWatch({ control, name: "id_unity" });

  const fetchUnits = useCallback(
    async (username: string) => {
      if (!username || username.length < 4) return;

      try {
        const params = new URLSearchParams(
          username.includes("@") ? { email: username } : { username },
        );
        const data = await api(`/auth/user-unity?${params.toString()}`);

        const unitys = data?.unitys || [];

        if (unitys.length === 1) {
          setValue("id_unity", unitys[0]?.id, { shouldValidate: true });
          setShowUnitSelect(false);
        } else if (unitys.length > 1) {
          setUnitOptions(
            unitys.map((unit: any) => ({ value: unit?.id, label: unit?.name })),
          );
          setShowUnitSelect(true);
        } else {
          setValue("id_unity", null);
          setShowUnitSelect(false);
        }
      } catch (error) {
        console.error("Erro ao buscar unidades:", error);
      }
    },
    [setValue],
  );

  const debouncedFetchUnits = useCallback(
    debounce((val) => fetchUnits(val), 400),
    [fetchUnits],
  );

  useEffect(() => {
    debouncedFetchUnits(usernameValue);
  }, [usernameValue, debouncedFetchUnits]);

  const handleLoginClick = async (data: any) => {
    if (!data.id_unity) {
      await fetchUnits(data.username);
    }

    const result = await loginAction(data);

    if (result.success) {
      const redirectUrl = searchParams.get("url_redirect");

      if (redirectUrl && typeof window !== "undefined") {
        window.location.href = redirectUrl;
      } else {
        router.push("/modules");
      }
    }
  };

  return (
    <div className="flex w-full px-10 items-center justify-center flex-col lg:w-115.5">
      <div className="w-full">
        <Image
          src="/images/brand.svg"
          alt="Logo"
          width={220}
          height={60}
          className="mx-auto mb-8"
          priority
        />

        <form onSubmit={handleSubmit(handleLoginClick)} className="space-y-4">
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel>E-mail ou Usuário</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("username")}
                  className="pl-10"
                  placeholder="Digite seu usuário"
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel>Senha</FieldLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </Field>

            {showUnitSelect && (
              <Field>
                <FieldLabel htmlFor="unidade">Unidade</FieldLabel>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />

                  <Select
                    id="unidade"
                    options={unitOptions}
                    placeholder="Nome da Unidade"
                    onChange={(selectedOption) =>
                      setValue("id_unity", selectedOption?.value || null, {
                        shouldValidate: true,
                      })
                    }
                    value={
                      unitOptions.find(
                        (option) =>
                          option.value === control._formValues.id_unity,
                      ) || null
                    }
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        width: "100%",
                        background: "#F7F7F8",
                        borderRadius: 6,
                        height: 47,
                        borderStyle: "none",
                        border: "#BFCDE0 solid 0.5px",
                        cursor: "pointer",
                      }),
                    }}
                  />
                </div>
                {errors.id_unity && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.id_unity.message as string}
                  </p>
                )}
              </Field>
            )}
          </FieldGroup>

          <div className="flex flex-col gap-3 mt-6">
            <Button
              type="submit"
              disabled={isAuthLoading}
              className="w-full bg-[#0149FD] cursor-pointer"
            >
              {isAuthLoading ? "Carregando..." : "Login"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#0149FD] text-[#0149FD]"
            >
              Cadastre-se
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
