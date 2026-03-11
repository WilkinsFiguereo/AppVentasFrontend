import type { Metadata } from "next";
import { DealsSection } from "../../../src/features/deals/sections/DealsSection";

export const metadata: Metadata = {
  title: "Ofertas del día | Acme",
  description: "Descuentos exclusivos en productos y servicios. Ofertas flash, top ventas y mucho más.",
};

export default function DealsPage() {
  return <DealsSection />;
}