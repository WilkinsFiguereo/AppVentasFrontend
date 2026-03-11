/* ─────────────────────────────────────────
   REGISTER FEATURE — Theme
   Tokens de diseño centralizados
───────────────────────────────────────── */

export const registerTheme = {
  colors: {
    bg:           "#080b12",
    surface:      "#0d1117",
    surfaceBorder:"#1a2235",
    accent:       "#4f8ef7",
    accentHover:  "#6ba3ff",
    accentMuted:  "rgba(79,142,247,0.12)",
    textPrimary:  "#e4ebf5",
    textSecondary:"#7a8fa8",
    textMuted:    "#3d5166",
    error:        "#f47c7c",
    errorBg:      "rgba(244,124,124,0.08)",
    success:      "#4fbe8e",
    successBg:    "rgba(79,190,142,0.08)",
    inputBorder:  "#1e2d42",
    inputFocus:   "#4f8ef7",
  },
  spacing: {
    cardPadding: "clamp(1.5rem, 4vw, 2.5rem)",
  },
  radius: {
    card:   "2px",
    input:  "2px",
    button: "2px",
    badge:  "9999px",
  },
  strength: {
    colors: ["#3d5166", "#f47c7c", "#f0a050", "#e8d44d", "#4fbe8e"],
    labels: ["", "Débil", "Regular", "Buena", "Fuerte"],
  },
} as const;

/** Clases Tailwind base para inputs */
export const inputBase =
  "w-full bg-transparent text-[#e4ebf5] placeholder:text-[#3d5166] " +
  "text-sm border border-[#1e2d42] rounded-[2px] " +
  "py-3 pl-10 pr-4 outline-none transition-all duration-200 " +
  "focus:border-[#4f8ef7] focus:ring-1 focus:ring-[#4f8ef7]/20 resize-none";

export const labelBase =
  "block text-[10px] font-semibold tracking-[0.2em] text-[#7a8fa8] uppercase mb-1.5";