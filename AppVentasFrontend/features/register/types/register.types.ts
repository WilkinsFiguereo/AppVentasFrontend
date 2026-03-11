/* ─────────────────────────────────────────
   REGISTER FEATURE — Types
   Fuente única de verdad para interfaces
───────────────────────────────────────── */

/** Payload que se envía al endpoint Odoo POST /api/auth/register */
export interface RegisterPayload {
  name: string;
  login: string;
  password: string;
  email: string;
  phone?: string;
  address?: string;
}

/** Respuesta del endpoint de registro */
export interface RegisterResponse {
  ok: boolean;
  user_id?: number;
  error?: string;
}

/** Estado interno del formulario */
export interface RegisterFormState {
  values: RegisterPayload;
  errors: Partial<Record<keyof RegisterPayload, string>>;
  isLoading: boolean;
  serverError: string | null;
  success: boolean;
}

/** Configuración declarativa de cada campo del form */
export interface FieldConfig {
  name: keyof RegisterPayload;
  label: string;
  type: "text" | "email" | "password" | "tel" | "textarea";
  placeholder: string;
  required: boolean;
  colSpan?: "full" | "half";
}

/** Nivel de fortaleza de contraseña */
export type PasswordStrength = 0 | 1 | 2 | 3 | 4;