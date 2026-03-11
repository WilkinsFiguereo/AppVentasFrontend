// ── BillNova · Paleta "Azul Profesional (Confianza & Finanzas)" ──────────────

export const colors = {
  // ── 1. Primarios (Brand) ────────────────────────────────────────────────
  brand: {
    50:  "#EFF6FF", // fondos muy suaves
    100: "#DBEAFE", // alertas / fondos informativos
    400: "#3B82F6", // links, iconos, gráficas
    600: "#1E3A8A", // botones primarios, navbar, activos  ← main
    700: "#1A2F73", // hover de botones
  },

  // ── 2. Fondos ────────────────────────────────────────────────────────────
  bg: {
    primary:   "#F8FAFC", // pantalla principal
    secondary: "#FFFFFF", // cards, modales
    alt:       "#F1F5F9", // secciones alternativas / hover filas
  },

  // ── 3. Tipografía ────────────────────────────────────────────────────────
  text: {
    primary:   "#1F2937", // títulos
    secondary: "#4B5563", // subtítulos, labels
    disabled:  "#9CA3AF", // placeholders, textos apagados
  },

  // ── 4. Estados del sistema ───────────────────────────────────────────────
  success: {
    DEFAULT: "#10B981",
    soft:    "#D1FAE5",
    text:    "#065F46",
  },
  error: {
    DEFAULT: "#EF4444",
    soft:    "#FEE2E2",
    text:    "#991B1B",
  },
  warning: {
    DEFAULT: "#F59E0B",
    soft:    "#FEF3C7",
    text:    "#92400E",
  },

  // ── Bordes ───────────────────────────────────────────────────────────────
  border:    "#E2E8F0",
  borderSub: "#F1F5F9",

  // ── Sombra ───────────────────────────────────────────────────────────────
  shadow: "rgba(30,58,138,0.07)",
} as const;

// ── Tipografía ───────────────────────────────────────────────────────────────
// Fuente: Plus Jakarta Sans  (moderna, fintech, legible)
export const font = {
  family:  "'Plus Jakarta Sans', 'DM Sans', sans-serif",
  size: {
    xs:   "0.72rem",  // 11.5px — badges, labels superiores
    sm:   "0.8125rem",// 13px   — textos secundarios
    base: "0.875rem", // 14px   — texto corriente
    md:   "1rem",     // 16px   — subtítulos
    lg:   "1.125rem", // 18px   — sección
    xl:   "1.375rem", // 22px   — título de página pequeña
    "2xl":"1.75rem",  // 28px   — títulos H1
  },
  weight: {
    regular:   400,
    medium:    500,
    semibold:  600,
    bold:      700,
    extrabold: 800,
  },
} as const;

// ── Radios ───────────────────────────────────────────────────────────────────
export const radius = {
  sm:   "6px",
  md:   "10px",
  lg:   "14px",
  xl:   "18px",
  full: "9999px",
} as const;