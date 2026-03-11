"use client";

import Link from "next/link";
import { FormField } from "../ui/FormField";
import { SubmitButton } from "../ui/SubmitButton";
import { ServerErrorAlert } from "../ui/ServerErrorAlert";
import { REGISTER_FIELDS } from "../data/constants";
import type { RegisterFormState } from "../types/register.types";

interface RegisterFormSectionProps {
  state: RegisterFormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function RegisterFormSection({ state, onChange, onSubmit }: RegisterFormSectionProps) {
  const { values, errors, isLoading, serverError } = state;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {REGISTER_FIELDS.map((field) => (
          <div key={field.name} className={field.colSpan === "full" ? "sm:col-span-2" : ""}>
            <FormField
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={values[field.name] ?? ""}
              error={errors[field.name]}
              onChange={onChange}
            />
          </div>
        ))}
      </div>

      {serverError && <ServerErrorAlert message={serverError} />}

      <div className="pt-1">
        <SubmitButton isLoading={isLoading} />
      </div>

      <p className="text-center text-xs text-[#3d5166]">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="text-[#4f8ef7] underline underline-offset-2 transition-colors hover:text-[#6ba3ff]"
        >
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
