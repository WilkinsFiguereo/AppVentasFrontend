// src/app/my-orders/page.tsx
import type { Metadata } from "next";
import { MyOrdersSection } from "../../../src/features/my-orders/sections/MyOrdersSection";

export const metadata: Metadata = {
  title: "Mis pedidos | Acme",
  description: "Historial y seguimiento de tus compras.",
};

export default function MyOrdersPage() {
  return <MyOrdersSection />;
}