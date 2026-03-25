"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/useLogin";
import { AuthCard } from "../ui/AuthCard";
import { InputField, SubmitButton, ErrorBanner, RememberRow } from "../ui/AuthFields";
import { AUTH_ROUTES } from "../data/constants";

const LOGIN_BRANDING = {
  headline: (
    <>
      Todo lo que<br />
      <span>necesitas, en un solo lugar</span>
    </>
  ),
  subtext:
    "Encuentra productos y servicios de las mejores marcas. Rápido, seguro y con soporte en cada paso.",
  stats: [
    { value: "50k+", label: "Productos disponibles" },
    { value: "4.9★", label: "Calificación" },
    { value: "24/7", label: "Soporte" },
  ],
  testimonial: {
    quote:
      "Encontré exactamente lo que buscaba en minutos. La experiencia de compra es increíblemente fluida.",
    name: "María Rodríguez",
    role: "Cliente verificada",
    initials: "MR",
  },
};

export function LoginSection() {
  const router = useRouter();
  const { form, errors, authState, handleChange, handleSubmit } = useLogin();

  function handleGoogleLogin() {
    // Implement Google OAuth — e.g. signIn("google") from next-auth
    console.log("Google login");
  }

  return (
    <AuthCard
      title="Bienvenido de nuevo"
      subtitle="Ingresa tus credenciales para acceder"
      googleLabel="Continuar con Google"
      onGoogleClick={handleGoogleLogin}
      dividerLabel="o continúa con email"
      footerText="¿No tienes cuenta?"
      footerLinkLabel="Regístrate gratis"
      footerLinkHref={AUTH_ROUTES.register}
      branding={LOGIN_BRANDING}
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {authState.error && <ErrorBanner message={authState.error} />}

        <InputField
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="nombre@empresa.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />

        <InputField
          label="Contraseña"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />

        <RememberRow
          checked={form.rememberMe ?? false}
          onChange={handleChange}
          forgotHref={AUTH_ROUTES.forgotPassword}
        />

        <SubmitButton label="Iniciar sesión" isLoading={authState.isLoading} />
        <button
          type="button"
          className="auth-btn-secondary"
          onClick={() => router.push("/navigation/home")}
        >
          Volver al inicio
        </button>
      </form>
    </AuthCard>
  );
}
