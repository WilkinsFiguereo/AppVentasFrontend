// src/app/services/page.tsx
import type { Metadata } from "next";
import { ServicesSection } from "../../../src/features/services/sections/ServicesSection";

export const metadata: Metadata = {
  title: "Servicios | Acme",
  description: "Catálogo de servicios empresariales. Soporte IT, Cloud, Software, Consultoría y más.",
};

export default function ServicesPage() {
  return <ServicesSection />;
}