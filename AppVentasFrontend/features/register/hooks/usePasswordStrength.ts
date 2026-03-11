 "use client";

/* ─────────────────────────────────────────
   REGISTER FEATURE — Hooks / usePasswordStrength
   Calcula fortaleza de la contraseña en tiempo real
───────────────────────────────────────── */

import { useMemo } from "react";
import { getPasswordStrength } from "../data/validators";
import { registerTheme } from "../theme/register.theme";
import type { PasswordStrength } from "../types/register.types";

interface UsePasswordStrengthReturn {
  strength: PasswordStrength;
  color: string;
  label: string;
  percentage: number;
}

export function usePasswordStrength(password: string): UsePasswordStrengthReturn {
  return useMemo(() => {
    const strength = getPasswordStrength(password);
    return {
      strength,
      color:      registerTheme.strength.colors[strength],
      label:      registerTheme.strength.labels[strength],
      percentage: (strength / 4) * 100,
    };
  }, [password]);
}