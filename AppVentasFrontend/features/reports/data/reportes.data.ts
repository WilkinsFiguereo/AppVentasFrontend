import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
} from "lucide-react";
import {
  ReporteStatCard,
  PuntoGrafica,
  ProductoTop,
  ClienteTop,
  DistribucionCategoria,
} from "../types/reportes.types";
import { reportesTheme as t } from "../theme/reportes.theme";

// ── Stat Cards ────────────────────────────────────────────────────────
export const REPORTE_STATS: ReporteStatCard[] = [
  {
    label: "Ingresos Totales",
    value: "$84.2K",
    Icon: DollarSign,
    delta: "+22% vs periodo anterior",
    deltaPositivo: true,
    color: t.brand400,
    bg: t.brand100,
  },
  {
    label: "Unidades Vendidas",
    value: "1,340",
    Icon: ShoppingCart,
    delta: "+8% vs periodo anterior",
    deltaPositivo: true,
    color: t.success,
    bg: t.successBg,
  },
  {
    label: "Clientes Activos",
    value: "48",
    Icon: Users,
    delta: "+5 nuevos este mes",
    deltaPositivo: true,
    color: t.warning,
    bg: t.warningBg,
  },
  {
    label: "Margen Promedio",
    value: "34%",
    Icon: TrendingUp,
    delta: "-2% vs periodo anterior",
    deltaPositivo: false,
    color: t.error,
    bg: t.errorBg,
  },
];

// ── Datos de gráfica de barras por periodo ────────────────────────────
export const DATOS_GRAFICA: Record<string, PuntoGrafica[]> = {
  "7d": [
    { label: "Lun", ventas: 3200, cobros: 2800, gastos: 1200 },
    { label: "Mar", ventas: 4100, cobros: 3500, gastos: 1400 },
    { label: "Mié", ventas: 2900, cobros: 2600, gastos: 1100 },
    { label: "Jue", ventas: 5200, cobros: 4800, gastos: 1800 },
    { label: "Vie", ventas: 6100, cobros: 5200, gastos: 2000 },
    { label: "Sáb", ventas: 3800, cobros: 3200, gastos: 900  },
    { label: "Dom", ventas: 2100, cobros: 1800, gastos: 600  },
  ],
  "30d": [
    { label: "Sem 1", ventas: 18200, cobros: 15800, gastos: 6200 },
    { label: "Sem 2", ventas: 22400, cobros: 19200, gastos: 7100 },
    { label: "Sem 3", ventas: 19800, cobros: 17400, gastos: 6800 },
    { label: "Sem 4", ventas: 24100, cobros: 21600, gastos: 7900 },
  ],
  "90d": [
    { label: "Ene", ventas: 68000, cobros: 59000, gastos: 23000 },
    { label: "Feb", ventas: 74000, cobros: 65000, gastos: 25000 },
    { label: "Mar", ventas: 81000, cobros: 71000, gastos: 27000 },
  ],
  "12m": [
    { label: "Ene", ventas: 68000,  cobros: 59000,  gastos: 23000 },
    { label: "Feb", ventas: 74000,  cobros: 65000,  gastos: 25000 },
    { label: "Mar", ventas: 81000,  cobros: 71000,  gastos: 27000 },
    { label: "Abr", ventas: 76000,  cobros: 68000,  gastos: 26000 },
    { label: "May", ventas: 89000,  cobros: 79000,  gastos: 29000 },
    { label: "Jun", ventas: 95000,  cobros: 85000,  gastos: 31000 },
    { label: "Jul", ventas: 88000,  cobros: 78000,  gastos: 28000 },
    { label: "Ago", ventas: 92000,  cobros: 82000,  gastos: 30000 },
    { label: "Sep", ventas: 101000, cobros: 91000,  gastos: 33000 },
    { label: "Oct", ventas: 97000,  cobros: 87000,  gastos: 32000 },
    { label: "Nov", ventas: 108000, cobros: 96000,  gastos: 35000 },
    { label: "Dic", ventas: 115000, cobros: 104000, gastos: 38000 },
  ],
};

// ── Productos más vendidos ─────────────────────────────────────────────
export const PRODUCTOS_TOP: ProductoTop[] = [
  { nombre: 'Laptop Pro 15"',       categoria: "Electrónica", unidades: 48,  ingresos: 62352, porcentaje: 28 },
  { nombre: "Monitor 4K UltraWide", categoria: "Electrónica", unidades: 65,  ingresos: 35685, porcentaje: 22 },
  { nombre: "Silla Ergonómica Plus", categoria: "Mobiliario", unidades: 92,  ingresos: 36708, porcentaje: 18 },
  { nombre: "Auriculares NC 500",   categoria: "Audio",       unidades: 110, ingresos: 32890, porcentaje: 14 },
  { nombre: "Webcam HD 1080p",      categoria: "Periféricos", unidades: 180, ingresos: 23220, porcentaje: 10 },
];

// ── Clientes top ──────────────────────────────────────────────────────
export const CLIENTES_TOP: ClienteTop[] = [
  { nombre: "Constructora Omega",    email: "obra@omega.cl",            facturas: 8,  total: 84016, status: "activo"   },
  { nombre: "Grupo Comercial Norte", email: "admin@gcnorte.mx",         facturas: 12, total: 73632, status: "activo"   },
  { nombre: "Tech Solutions LLC",    email: "finance@techsol.io",       facturas: 6,  total: 41052, status: "activo"   },
  { nombre: "Empresa Alfa S.A.",     email: "pagos@alfa.com",           facturas: 9,  total: 35400, status: "activo"   },
  { nombre: "Retail Express Co.",    email: "bills@retailexpress.com",  facturas: 4,  total: 12724, status: "inactivo" },
];

// ── Distribución por categoría ─────────────────────────────────────────
export const DISTRIBUCION: DistribucionCategoria[] = [
  { label: "Electrónica", valor: 45, color: t.brand400   },
  { label: "Mobiliario",  valor: 20, color: t.success     },
  { label: "Audio",       valor: 15, color: t.warning     },
  { label: "Periféricos", valor: 12, color: t.error       },
  { label: "Accesorios",  valor: 8,  color: t.textDisabled },
];

export const PERIODOS = [
  { key: "7d",  label: "7 días"   },
  { key: "30d", label: "30 días"  },
  { key: "90d", label: "90 días"  },
  { key: "12m", label: "12 meses" },
] as const;