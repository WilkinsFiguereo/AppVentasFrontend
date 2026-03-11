import type { Metadata } from "next";
import RegisterSection from "../../../../src/features/auth/sections/RegisterSection";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return <RegisterSection />;
}