// app/src/features/product-detail/data/product.mock.ts
import type { ProductDetail } from "../types/product-detail.types";

export const PRODUCT: ProductDetail = {
  id: 1,
  name: "CRM Profesional",
  tagline: "La solución de gestión de clientes más completa del mercado",
  category: "Software",
  badge: "Más vendido",
  rating: 4.8,
  totalReviews: 2341,
  price: 89,
  oldPrice: 149,
  annualPrice: 71,
  images: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&fit=crop",
  ],
  features: [
    "Pipeline de ventas ilimitado",
    "Automatización de correos y seguimiento",
    "Reportes en tiempo real con IA",
    "Integración con más de 200 aplicaciones",
    "App móvil incluida (iOS & Android)",
    "Soporte dedicado y onboarding",
  ],
  specs: [
    { label: "Usuarios incluidos", value: "Hasta 25" },
    { label: "Almacenamiento", value: "50 GB" },
    { label: "Integración API", value: "REST + Webhooks" },
    { label: "Disponibilidad", value: "99.9% SLA" },
    { label: "Soporte", value: "Chat, correo y teléfono" },
    { label: "Actualización", value: "Automática · incluida" },
  ],
  ratingBreakdown: { 5: 1540, 4: 580, 3: 150, 2: 47, 1: 24 },
};
