/* ═══════════════════════════════════════════════════════
   MOCK DATA
   Location: src/features/qr-landing/data/mockData.ts
   
   En producción, esto vendría de:
   - URL params: /qr?promoter=MTZ&category=software&campaign=SCAN25
   - API call con el qrId
═══════════════════════════════════════════════════════ */

import type { QRData, Product } from "../types";

export const QR_DATA: QRData = {
  promoter: {
    name: "María Tania Zapata",
    initials: "MTZ",
    role: "Asesora Comercial Senior",
    company: "NexusStore",
    phone: "+1 (809) 555-1234",
    email: "mtazapata@nexusstore.com",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop",
    badge: "Top Seller 2025",
  },
  category: {
    id: "software",
    name: "Software Empresarial",
    tagline: "Soluciones para impulsar tu productividad",
  },
  campaign: {
    code: "SCAN25",
    discount: 15,
    validUntil: "31 de marzo 2026",
  },
  qrId: "QR-2026-02-MTZ-001",
  scannedAt: new Date().toISOString(),
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "CRM Profesional",
    category: "Software",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80&fit=crop",
    price: 89,
    oldPrice: 149,
    rating: 4.8,
    reviews: 2341,
    badge: "Recomendado",
    highlighted: true,
    desc: "Gestión de clientes y pipeline de ventas avanzado con automatización.",
  },
  {
    id: 2,
    name: "ERP Starter Pack",
    category: "Software",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop",
    price: 199,
    oldPrice: null,
    rating: 4.9,
    reviews: 1876,
    badge: "Nuevo",
    highlighted: false,
    desc: "Suite completa para PYMES: finanzas, inventario y logística integrada.",
  },
  {
    id: 3,
    name: "BI Dashboard Pro",
    category: "Software",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&fit=crop",
    price: 59,
    oldPrice: 99,
    rating: 4.7,
    reviews: 943,
    badge: "Oferta",
    highlighted: false,
    desc: "Visualización de datos en tiempo real con IA predictiva.",
  },
  {
    id: 7,
    name: "API Gateway Pro",
    category: "Software",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80&fit=crop",
    price: 49,
    oldPrice: 89,
    rating: 4.7,
    reviews: 654,
    badge: null,
    highlighted: false,
    desc: "Integra todos tus sistemas empresariales con una sola API REST.",
  },
  {
    id: 5,
    name: "Office Suite Enterprise",
    category: "Licencias",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80&fit=crop",
    price: 129,
    oldPrice: 199,
    rating: 4.5,
    reviews: 3102,
    badge: "Popular",
    highlighted: false,
    desc: "Suite completa de productividad con almacenamiento ilimitado.",
  },
  {
    id: 4,
    name: "Cloud Storage 8TB",
    category: "Hardware",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80&fit=crop",
    price: 349,
    oldPrice: null,
    rating: 4.6,
    reviews: 512,
    badge: null,
    highlighted: false,
    desc: "Almacenamiento empresarial seguro con backup automático diario.",
  },
];