/* ═══════════════════════════════════════════════════════
   TYPES
   Location: src/features/qr-landing/types/index.ts
═══════════════════════════════════════════════════════ */

export interface Promoter {
  name: string;
  initials: string;
  role: string;
  company: string;
  phone: string;
  email: string;
  photo: string;
  badge: string;
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
}

export interface Campaign {
  code: string;
  discount: number;
  validUntil: string;
}

export interface QRData {
  promoter: Promoter;
  category: Category;
  campaign: Campaign;
  qrId: string;
  scannedAt: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  img: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  badge: string | null;
  highlighted: boolean;
  desc: string;
}