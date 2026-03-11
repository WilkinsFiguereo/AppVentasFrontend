// app/src/features/product-detail/data/related.mock.ts
import type { RelatedProduct } from "../types/product-detail.types";

export const RELATED: RelatedProduct[] = [
  { id: 2, name: "ERP Starter",  cat: "Software",  price: 199, rating: 4.9, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=70&fit=crop" },
  { id: 3, name: "BI Dashboard", cat: "Analytics", price: 59,  rating: 4.7, img: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=300&q=70&fit=crop" },
  { id: 7, name: "API Gateway",  cat: "Software",  price: 49,  rating: 4.7, img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&q=70&fit=crop" },
  { id: 5, name: "Office Suite", cat: "Licencias", price: 129, rating: 4.5, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=70&fit=crop" },
];
