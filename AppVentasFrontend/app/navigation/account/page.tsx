import type { Metadata } from "next";
import { ProfileSection } from "../../../src/features/profile/sections/ProfileSection";

export const metadata: Metadata = {
  title: "Mi perfil | Acme",
  description: "Gestiona tu información personal, pedidos, direcciones y seguridad.",
};

export default function ProfilePage() {
  return <ProfileSection />;
}