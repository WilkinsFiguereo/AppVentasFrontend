import { type LucideIcon } from "lucide-react";

export type PeriodoFiltro = "7d" | "30d" | "90d" | "12m";

export interface ReporteStatCard {
  label: string;
  value: string;
  Icon: LucideIcon;
  delta: string;
  deltaPositivo: boolean;
  color: string;
  bg: string;
}

export interface PuntoGrafica {
  label: string;
  ventas: number;
  cobros: number;
  gastos: number;
}

export interface ProductoTop {
  nombre: string;
  categoria: string;
  unidades: number;
  ingresos: number;
  porcentaje: number;
}

export interface ClienteTop {
  nombre: string;
  email: string;
  facturas: number;
  total: number;
  status: "activo" | "inactivo";
}

export interface DistribucionCategoria {
  label: string;
  valor: number;
  color: string;
}