// src/features/services/data/constants.ts

import type { Service } from "../types/services.types";

export const ODOO_URL = process.env.NEXT_PUBLIC_ODOO_URL ?? "http://localhost:8009";

export const CATEGORIES = [
  "Todos",
  "Soporte & IT",
  "Cloud & Hosting",
  "Software",
  "Consultoría",
  "Seguridad",
  "Comunicación",
];

export const SORT_OPTIONS = [
  { id: "popular",    label: "Más populares"  },
  { id: "name_asc",  label: "Nombre A–Z"      },
  { id: "price_asc", label: "Precio: menor"   },
  { id: "price_desc",label: "Precio: mayor"   },
] as const;

// ─── Mock services (filter from product list: type=service) ──────────────────
export const MOCK_SERVICES: Service[] = [
  {
    id: 101, name: "Soporte IT Premium 24/7",      default_code: "SRV-IT-001",
    description: "Soporte técnico ilimitado para toda tu infraestructura. Respuesta garantizada en menos de 1 hora.",
    list_price: 299, cost_price: 120,
    category: "Soporte & IT", billing: "monthly", emoji: "🛠️", featured: true, popular: true,
  },
  {
    id: 102, name: "Consultoría Cloud AWS",         default_code: "SRV-CLD-001",
    description: "Diseño, migración y optimización de tu arquitectura en AWS. Incluye revisión mensual de costos.",
    list_price: 799, cost_price: 350,
    category: "Cloud & Hosting", billing: "one-time", emoji: "☁️", featured: true,
  },
  {
    id: 103, name: "Hosting VPS Pro",               default_code: "SRV-CLD-002",
    description: "Servidor privado virtual con 8 vCPU, 16 GB RAM, 500 GB SSD NVMe y ancho de banda ilimitado.",
    list_price: 89, cost_price: 30,
    category: "Cloud & Hosting", billing: "monthly", emoji: "🖥️", popular: true,
  },
  {
    id: 104, name: "Adobe Creative Cloud",          default_code: "SRV-SW-001",
    description: "Licencia completa de Adobe Creative Cloud para 1 usuario. Acceso a todas las apps creativas.",
    list_price: 54.99, cost_price: 40,
    category: "Software", billing: "monthly", emoji: "🎨", popular: true,
  },
  {
    id: 105, name: "Microsoft 365 Business",        default_code: "SRV-SW-002",
    description: "Suite completa de productividad: Word, Excel, Teams, SharePoint, Exchange y 1 TB en OneDrive.",
    list_price: 12.50, cost_price: 8,
    category: "Software", billing: "monthly", emoji: "📊",
  },
  {
    id: 106, name: "Kaspersky Business Security",   default_code: "SRV-SEC-001",
    description: "Protección endpoint para hasta 25 dispositivos. Antivirus, firewall, control web y soporte.",
    list_price: 189, cost_price: 95,
    category: "Seguridad", billing: "annual", emoji: "🔒", popular: true,
  },
  {
    id: 107, name: "Slack Business+",               default_code: "SRV-COM-001",
    description: "Comunicación empresarial sin límites: historial completo, integraciones ilimitadas y soporte.",
    list_price: 7.25, cost_price: 4,
    category: "Comunicación", billing: "monthly", emoji: "💬",
  },
  {
    id: 108, name: "Auditoría de Seguridad IT",     default_code: "SRV-SEC-002",
    description: "Revisión completa de vulnerabilidades, pruebas de penetración y reporte ejecutivo de riesgos.",
    list_price: 1200, cost_price: 500,
    category: "Seguridad", billing: "one-time", emoji: "🔍", featured: true,
  },
  {
    id: 109, name: "Implementación Odoo ERP",       default_code: "SRV-CON-001",
    description: "Instalación, configuración y personalización de Odoo para tu empresa. Incluye 10 horas de capacitación.",
    list_price: 2500, cost_price: 1200,
    category: "Consultoría", billing: "one-time", emoji: "⚙️",
  },
  {
    id: 110, name: "Backup Cloud Automatizado",     default_code: "SRV-CLD-003",
    description: "Respaldos automáticos diarios cifrados en la nube. Retención de 90 días y restauración en 1 clic.",
    list_price: 29, cost_price: 10,
    category: "Cloud & Hosting", billing: "monthly", emoji: "💾", popular: true,
  },
  {
    id: 111, name: "Monitoreo de Infraestructura",  default_code: "SRV-IT-002",
    description: "Supervisión 24/7 de servidores, redes y aplicaciones con alertas en tiempo real y dashboard.",
    list_price: 149, cost_price: 60,
    category: "Soporte & IT", billing: "monthly", emoji: "📡",
  },
  {
    id: 112, name: "Videoconferencia Zoom Business",default_code: "SRV-COM-002",
    description: "Licencias Zoom Business para reuniones de hasta 300 participantes, grabación en nube y reportes.",
    list_price: 19.99, cost_price: 12,
    category: "Comunicación", billing: "monthly", emoji: "📹",
  },
  {
    id: 113, name: "Consultoría Transformación Digital",default_code:"SRV-CON-002",
    description: "Diagnóstico, hoja de ruta y acompañamiento en tu proceso de transformación digital.",
    list_price: 4500, cost_price: 2000,
    category: "Consultoría", billing: "one-time", emoji: "🚀", featured: true,
  },
  {
    id: 114, name: "Soporte IT Básico",             default_code: "SRV-IT-003",
    description: "Soporte técnico en horario laboral (L–V 8am–6pm). Ideal para pequeñas empresas.",
    list_price: 99, cost_price: 40,
    category: "Soporte & IT", billing: "monthly", emoji: "🔧",
  },
];

export const BILLING_LABELS: Record<string, string> = {
  monthly:  "/mes",
  annual:   "/año",
  "one-time": "único",
  hourly:   "/hora",
};