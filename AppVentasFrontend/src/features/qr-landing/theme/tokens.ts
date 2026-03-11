/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
   Location: src/features/qr-landing/theme/tokens.ts
═══════════════════════════════════════════════════════ */

export const tokens = {
  bg:         "#F8FAFC",
  surface:    "#FFFFFF",
  border:     "#E8EDF2",
  borderMid:  "#CBD5E1",
  text:       "#0F172A",
  sub:        "#64748B",
  accent:     "#1E3A8A",
  accentMid:  "#3B82F6",
  accentSoft: "#EFF6FF",
  success:    "#10B981",
  successBg:  "#D1FAE5",
  warn:       "#F59E0B",
} as const;

export type Tokens = typeof tokens;