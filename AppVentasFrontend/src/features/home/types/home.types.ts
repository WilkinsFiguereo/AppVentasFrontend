// src/features/home/types/home.types.ts
export type Slide = {
  id: number;
  img: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  ctaSecondary: string;
};

export type Product = {
  id: number;
  name: string;
  cat: string;
  img: string;
  price: number;
  old: number | null;
  rating: number;
  reviews: number;
  badge: string | null;
};

export type Service = {
  id: number;
  title: string;
  desc: string;
  img: string;
  badge?: string | null;
};
