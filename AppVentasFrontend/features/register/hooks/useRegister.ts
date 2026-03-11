"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { registerApi } from "../data/api";
import { validateRegisterForm } from "../data/validators";
import type { RegisterPayload, RegisterFormState } from "../types/register.types";

const INITIAL_VALUES: RegisterPayload = {
  name: "", login: "", password: "", email: "", phone: "", address: "",
};

const INITIAL_STATE: RegisterFormState = {
  values: INITIAL_VALUES, errors: {}, isLoading: false, serverError: null, success: false,
};

export function useRegister() {
  const router = useRouter();
  const [state, setState] = useState<RegisterFormState>(INITIAL_STATE);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: value },
        errors: { ...prev.errors, [name]: undefined },
        serverError: null,
      }));
    }, []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const errors = validateRegisterForm(state.values);
      if (Object.keys(errors).length > 0) {
        setState((prev) => ({ ...prev, errors }));
        return;
      }
      setState((prev) => ({ ...prev, isLoading: true, serverError: null }));
      try {
        const res = await registerApi.register(state.values);
        if (res.ok) {
          setState((prev) => ({ ...prev, isLoading: false, success: true }));
          setTimeout(() => router.push("/login"), 2200);
        } else {
          setState((prev) => ({
            ...prev, isLoading: false,
            serverError: res.error ?? "Error al registrar la cuenta",
          }));
        }
      } catch {
        setState((prev) => ({
          ...prev, isLoading: false,
          serverError: "No se pudo conectar con el servidor.",
        }));
      }
    }, [state.values, router]
  );

  return { state, handleChange, handleSubmit };
}