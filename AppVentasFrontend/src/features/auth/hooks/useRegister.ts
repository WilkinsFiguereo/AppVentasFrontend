"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterFormData, AuthState } from "../types/auth.types";
import { REGISTER_INITIAL_VALUES, ERROR_MESSAGES, AUTH_ROUTES, PASSWORD_MIN_LENGTH, AUTH_API, TOKEN_KEYS } from "../data/constants";

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

function splitFullName(fullName: string) {
  const clean = fullName.trim().replace(/\s+/g, " ");
  const parts = clean.split(" ");

  if (parts.length <= 1) {
    return {
      firstName: clean || "Usuario",
      lastName: "Web",
    };
  }

  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1],
  };
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

export function useRegister() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterFormData>(REGISTER_INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
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
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};
    if (!form.fullName) newErrors.fullName = ERROR_MESSAGES.required;
    if (!form.email) newErrors.email = ERROR_MESSAGES.required;
    else if (!validateEmail(form.email)) newErrors.email = ERROR_MESSAGES.invalidEmail;
    if (!form.password) newErrors.password = ERROR_MESSAGES.required;
    else if (form.password.length < PASSWORD_MIN_LENGTH) newErrors.password = ERROR_MESSAGES.passwordTooShort;
    if (!form.confirmPassword) newErrors.confirmPassword = ERROR_MESSAGES.required;
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = ERROR_MESSAGES.passwordMismatch;
    if (!form.acceptTerms) newErrors.acceptTerms = ERROR_MESSAGES.termsRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setAuthState({ isLoading: true, error: null, success: false });

    try {
      const { firstName, lastName } = splitFullName(form.fullName);

      const response = await fetch(`${AUTH_API.baseUrl}${AUTH_API.registerPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: form.email.trim().toLowerCase(),
          password: form.password,
          is_web_user: true,
          is_web: true,
        }),
      });

      const payload = (await response.json()) as AuthApiResponse;

      if (!response.ok || !payload.success || !payload.data?.access_token) {
        throw new Error(payload.message || "Error al crear la cuenta");
      }

      persistSession(payload.data);

      setAuthState({ isLoading: false, error: null, success: true });
      router.push(AUTH_ROUTES.dashboard);
    } catch (error) {
      setAuthState({
        isLoading: false,
        error: error instanceof Error ? error.message : "Error al crear la cuenta",
        success: false,
      });
    }
  }

  return { form, errors, authState, handleChange, handleSubmit };
}