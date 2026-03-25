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

export const SLIDES_FALLBACK: Slide[] = [
  {
    id: 0,
    img: FALLBACK_IMAGES[0],
    eyebrow: "Cargando...",
    title: "Cargando anuncios",
    body: "Espera un momento",
    cta: "",
    ctaSecondary: "",
  },
];

/* ────────────────────────────────────────────────
   Mapper
──────────────────────────────────────────────── */
function mapAdToSlide(item: ApiAdItem, index: number): Slide {
  return {
    id: item.id,
    img: item.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    eyebrow: "Anuncio",
    title: item.name || "Promocion",
    body: item.description || "",
    cta: "Ver mas",
    ctaSecondary: "Contactar",
  };
}

/* ────────────────────────────────────────────────
   FETCH REAL (DEBUG)
──────────────────────────────────────────────── */
export async function fetchSlidesFromApi(): Promise<Slide[]> {
  const url = `${API_BASE_URL}/api/ads/list?limit=10&offset=0`;

  console.log("🔥 Fetching ads from:", url);

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const json = await res.json();

  console.log("📦 API RESPONSE:", json);

  if (!res.ok) {
    throw new Error("HTTP ERROR");
  }

  if (!json.success) {
    throw new Error("API respondió success=false");
  }

  const items = json.data?.items || [];

  if (!items.length) {
    console.warn("⚠️ No hay anuncios en Odoo");
  }

  return items.map(mapAdToSlide);
}

/* ────────────────────────────────────────────────
   LOADER REAL
──────────────────────────────────────────────── */
export async function getSlides(): Promise<Slide[]> {
  try {
    const slides = await fetchSlidesFromApi();

    // ✅ AQUÍ ESTÁ LO IMPORTANTE
    // Si hay datos → SIEMPRE usar API
    if (slides.length > 0) {
      return slides;
    }

    // Solo fallback si NO hay nada
    return SLIDES_FALLBACK;

  } catch (error) {
    console.error("❌ ERROR API:", error);

    // fallback SOLO si rompe
    return SLIDES_FALLBACK;
  }
}