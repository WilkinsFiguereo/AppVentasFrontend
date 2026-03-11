// app/src/features/product-detail/data/reviews.mock.ts
import type { Review } from "../types/product-detail.types";

export const REVIEWS_DATA: Review[] = [
  {
    id: 1,
    author: "Laura Méndez",
    role: "Directora Comercial · TechVentures",
    avatar: "LM",
    rating: 5,
    date: "18 ene 2026",
    title: "Transformó completamente nuestra operación de ventas",
    body:
      "Llevábamos años buscando una herramienta que realmente se adaptara a nuestro proceso. " +
      "Desde que implementamos el CRM nuestra tasa de cierre subió un 34 % en tres meses. " +
      "El onboarding fue impecable y el equipo de soporte responde en minutos.",
    helpful: 42,
    verified: true,
  },
  {
    id: 2,
    author: "Carlos Ruiz",
    role: "Gerente de TI · Grupo Andino",
    avatar: "CR",
    rating: 5,
    date: "2 feb 2026",
    title: "Integración perfecta con nuestro stack",
    body:
      "Lo conectamos a Slack, HubSpot y nuestra base de datos PostgreSQL sin ningún problema. " +
      "La API está muy bien documentada. Llevo 6 meses usando el plan Enterprise y no he necesitado " +
      "contactar soporte ni una vez por errores — solo para configuraciones nuevas.",
    helpful: 31,
    verified: true,
  },
  {
    id: 3,
    author: "Sofía Torres",
    role: "CEO · Impulso Digital",
    avatar: "ST",
    rating: 4,
    date: "10 ene 2026",
    title: "Muy bueno, con un par de detalles por pulir",
    body:
      "El producto es excelente en general. Pipeline, reportes y automatizaciones funcionan a la perfección. " +
      "Le quito una estrella porque el módulo de forecasting aún no tiene granularidad por región. " +
      "El equipo dice que viene en Q2.",
    helpful: 18,
    verified: true,
  },
  {
    id: 4,
    author: "Miguel Ángel Vega",
    role: "VP de Ventas · Finsoluciones",
    avatar: "MV",
    rating: 5,
    date: "28 dic 2025",
    title: "ROI visible desde el primer mes",
    body:
      "En el primer mes ya teníamos visibilidad total del pipeline que antes vivía en hojas de cálculo. " +
      "Ahora el equipo de ventas no puede imaginar trabajar sin él. Fácil de usar, bien diseñado y con actualizaciones constantes.",
    helpful: 56,
    verified: true,
  },
];
