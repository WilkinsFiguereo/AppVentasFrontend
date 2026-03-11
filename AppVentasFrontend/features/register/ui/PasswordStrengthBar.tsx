"use client";

import React from "react";
import { usePasswordStrength } from "../hooks/usePasswordStrength";

interface PasswordStrengthBarProps {
  password: string;
}

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const { color, percentage, label } = usePasswordStrength(password);
  if (!password) return null;
  return (
    <div className="mt-2 space-y-1.5">
      <div className="h-0.5 w-full bg-[#1a2235] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%`, backgroundColor: color }} />
      </div>
      {label && <p className="text-[10px] font-medium tracking-wide" style={{ color }}>{label}</p>}
    </div>
  );
}