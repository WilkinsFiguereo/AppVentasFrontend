// ✅ Este archivo es .ts puro — sin JSX
// Los iconos se guardan como referencia (LucideIcon) y se renderizan en la UI
import {
  Package,
  AlertTriangle,
  FileText,
  DollarSign,
  LayoutDashboard,
  BarChart2,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { dashboardTheme as t } from "../theme/dashboard.theme";

// ── Tipo de StatCard con icono como referencia ────────────────────────
export interface StatCardData {
  label: string;
  value: string;
  Icon: LucideIcon;   // referencia al componente, no JSX
  delta: string;
  color: string;
  bg: string;
}

export const STATS_DATA: StatCardData[] = [
  {
    label: "Total Productos",
    value: "248",
    Icon: Package,
    delta: "+12 este mes",
    color: t.brand400,
    bg: t.brand100,
  },
  {
    label: "Stock Crítico",
    value: "9",
    Icon: AlertTriangle,
    delta: "3 agotados",
    color: t.warning,
    bg: t.warningBg,
  },
  {
    label: "Facturas Emitidas",
    value: "134",
    Icon: FileText,
    delta: "+8 hoy",
    color: t.success,
    bg: t.successBg,
  },
  {
    label: "Cobros Pendientes",
    value: "$24.8K",
    Icon: DollarSign,
    delta: "18 facturas",
    color: t.error,
    bg: t.errorBg,
  },
];

// ── Datos para mini-gráficas ─────────────────────────────────────────
export const CHART_SERIES = {
  ventas:     [40, 55, 45, 60, 52, 70, 68],
  cobros:     [30, 42, 38, 55, 60, 58, 72],
  pendientes: [20, 18, 25, 22, 30, 28, 35],
  vencidas:   [5,  8,  6,  9,  7,  10, 8 ],
};

// ── Nav items ────────────────────────────────────────────────────────
export interface NavItemData {
  id: string;
  Icon: LucideIcon;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItemData[] = [
  { id: "dashboard", Icon: LayoutDashboard, label: "Dashboard",     href: "/navigation/seller/dashboard"  },
  { id: "productos", Icon: Package,         label: "Productos",     href: "/navigation/seller/product"  },
  { id: "facturas",  Icon: FileText,        label: "Facturas",      href: "/navigation/seller/bill"   },
  { id: "reportes",  Icon: BarChart2,       label: "Reportes",      href: "/navigation/seller/reports"   },
  { id: "config",    Icon: Settings,        label: "Configuración", href: "/navigation/seller/config"     },
];