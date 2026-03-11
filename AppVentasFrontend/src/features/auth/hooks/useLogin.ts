"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData, AuthState } from "../types/auth.types";
import { LOGIN_INITIAL_VALUES, ERROR_MESSAGES, AUTH_ROUTES, AUTH_API, TOKEN_KEYS } from "../data/constants";

type AuthApiResponse = {
  success?: boolean;
  message?: string;
  data?: {
    user_id?: number;
    access_token?: string;
    refresh_token?: string;
  };
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function persistSession(payload: AuthApiResponse["data"]) {
  if (!payload) return;

  if (payload.access_token) {
    localStorage.setItem(TOKEN_KEYS.access, payload.access_token);
    localStorage.setItem(TOKEN_KEYS.legacy, payload.access_token);
  }

  if (payload.refresh_token) {
    localStorage.setItem(TOKEN_KEYS.refresh, payload.refresh_token);
  }

  if (payload.user_id !== undefined) {
    localStorage.setItem(TOKEN_KEYS.userId, String(payload.user_id));
  }
}

export function useLogin() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>(LOGIN_INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    error: null,
    success: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};
    if (!form.email) newErrors.email = ERROR_MESSAGES.required;
    else if (!validateEmail(form.email)) newErrors.email = ERROR_MESSAGES.invalidEmail;
    if (!form.password) newErrors.password = ERROR_MESSAGES.required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setAuthState({ isLoading: true, error: null, success: false });

    try {
      const response = await fetch(`${AUTH_API.baseUrl}${AUTH_API.loginPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      const payload = (await response.json()) as AuthApiResponse;

      if (!response.ok || !payload.success || !payload.data?.access_token) {
        throw new Error(payload.message || "Credenciales incorrectas");
      }

      persistSession(payload.data);

      setAuthState({ isLoading: false, error: null, success: true });
      router.push(AUTH_ROUTES.dashboard);
    } catch (error) {
      setAuthState({
        isLoading: false,
        error: error instanceof Error ? error.message : "Credenciales incorrectas",
        success: false,
      });
    }
  }

  return { form, errors, authState, handleChange, handleSubmit };
}