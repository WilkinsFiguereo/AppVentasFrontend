// app/src/features/product-detail/types/product-detail.types.ts
export type ProductSpec = { label: string; value: string };

export type ProductDetail = {
  id: number;
  name: string;
  tagline: string;
  category: string;
  badge: string;
  rating: number;
  totalReviews: number;
  price: number;
  oldPrice: number;
  annualPrice: number;
  images: string[];
  features: string[];
  specs: ProductSpec[];
  ratingBreakdown: Record<1 | 2 | 3 | 4 | 5, number>;
};

export type Review = {
  id: number;
  author: string;
  role: string;
  avatar: string; // initials
  rating: number;
  date: string;
  title: string;
  body: string;
  helpful: number;
  verified: boolean;
};

export type RelatedProduct = {
  id: number;
  name: string;
  cat: string;
  price: number;
  rating: number;
  img: string;
};

export type ToastState = null | { msg: string; type?: "success" | "info" };
