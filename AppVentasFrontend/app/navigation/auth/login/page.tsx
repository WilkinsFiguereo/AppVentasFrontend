import type { Metadata } from "next";
import { LoginSection } from "../../../../src/features/auth/sections/LoginSection";

export const metadata: Metadata = { 
  title: "Login",
};

export default function LoginPage() {
  return <LoginSection />;
}