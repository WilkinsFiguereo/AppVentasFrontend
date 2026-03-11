import type { Slide } from "../types/home.types";

type ApiAdItem = {
  id: number;
  name?: string;
  description?: string;
  image?: string;
};

type ApiAdResponse = {
  success?: boolean;
  message?: string;
  data?: {
    items?: ApiAdItem[];
  };
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8009").replace(/\/$/, "");

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80&fit=crop",
];

export const SLIDES: Slide[] = [
  {
    id: 1,
    img: FALLBACK_IMAGES[0],
    eyebrow: "Nuevo lanzamiento",
    title: "Analitica Empresarial\nen tiempo real",
    body: "Toma decisiones basadas en datos con paneles configurables y reportes automatizados.",
    cta: "Ver producto",
    ctaSecondary: "Demo gratuita",
  },
  {
    id: 2,
    img: FALLBACK_IMAGES[1],
    eyebrow: "Oferta Enterprise",
    title: "ERP Completo\npara tu organizacion",
    body: "Finanzas, logistica, RRHH y ventas integrados. Hasta 40 % de descuento en licencias anuales.",
    cta: "Explorar planes",
    ctaSecondary: "Hablar con ventas",
  },
  {
    id: 3,
    img: FALLBACK_IMAGES[2],
    eyebrow: "Colaboracion remota",
    title: "Tu equipo sincronizado\ndonde sea que este",
    body: "Gestion de proyectos, comunicacion y seguimiento de tareas en una sola plataforma.",
    cta: "Comenzar gratis",
    ctaSecondary: "Ver caracteristicas",
  },
  {
    id: 4,
    img: FALLBACK_IMAGES[3],
    eyebrow: "Infraestructura Cloud",
    title: "Escala sin limites\ncon nuestra nube",
    body: "Servidores dedicados, backups automaticos y 99.9 % de uptime garantizado por contrato.",
    cta: "Ver servidores",
    ctaSecondary: "Calcular costo",
  },
];

function mapAdToSlide(item: ApiAdItem, index: number): Slide {
  const title = (item.name || "Promocion").trim();
  const body = (item.description || "Descubre nuestras ultimas ofertas").trim();

  return {
    id: item.id,
    img: item.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    eyebrow: "Anuncio",
    title,
    body,
    cta: "Ver mas",
    ctaSecondary: "Contactar",
  };
}

export async function fetchSlidesFromApi(limit = 10): Promise<Slide[]> {
  const response = await fetch(`${API_BASE_URL}/api/ads/list?limit=${limit}&offset=0`, {
    method: "GET",
    cache: "no-store",
  });

  const body = (await response.json()) as ApiAdResponse;

  if (!response.ok || !body.success) {
    throw new Error(body.message || `Error al cargar anuncios (${response.status})`);
  }

  const items = Array.isArray(body.data?.items) ? body.data.items : [];
  return items.map(mapAdToSlide);
}
