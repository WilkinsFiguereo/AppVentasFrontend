// src/features/home/data/products.ts
import type { Product } from "../types/home.types";

export const PRODUCTS: Product[] = [
  { id: 1, name: "CRM Profesional", cat: "Software", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=70&fit=crop", price: 89, rating: 4.8, reviews: 2341, badge: "Más vendido" },
  { id: 2, name: "ERP Starter", cat: "Software", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=70&fit=crop", price: 199, rating: 4.9, reviews: 1876, badge: "Nuevo" },
  { id: 3, name: "BI Dashboard", cat: "Analytics", img: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&q=70&fit=crop", price: 59, rating: 4.7, reviews: 943, badge: "Recomendado" },
  { id: 4, name: "Cloud Storage 8TB", cat: "Hardware", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=70&fit=crop", price: 349, rating: 4.6, reviews: 512, badge: null },
  { id: 5, name: "Office Suite", cat: "Licencias", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=70&fit=crop", price: 129, rating: 4.5, reviews: 3102, badge: "Popular" },
  { id: 6, name: "Soporte 24/7", cat: "Servicios", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=70&fit=crop", price: 79, rating: 5.0, reviews: 789, badge: "Premium" },
  { id: 7, name: "API Gateway", cat: "Software", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=70&fit=crop", price: 49, rating: 4.7, reviews: 654, badge: null },
  { id: 8, name: "Backup Auto", cat: "Servicios", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=70&fit=crop", price: 29, rating: 4.8, reviews: 1230, badge: null },
];

export const CATEGORIES = ["Todo", "Software", "Analytics", "Hardware", "Licencias", "Servicios"] as const;
export type Category = (typeof CATEGORIES)[number];
