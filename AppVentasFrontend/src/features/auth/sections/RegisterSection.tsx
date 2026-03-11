"use client";

import { useRegister } from "../hooks/useRegister";
import { AuthCard } from "../ui/AuthCard";
import { InputField, SubmitButton, ErrorBanner, CheckboxField } from "../ui/AuthFields";
import { AUTH_ROUTES } from "../data/constants";

const REGISTER_BRANDING = {
  headline: (
    <>
      Crea tu cuenta<br />
      <span>y empieza hoy</span>
    </>
  ),
  subtext:
    "Administra tu catalogo y ventas desde un solo panel. Registro rapido y acceso inmediato.",
  stats: [
    { value: "14 dias", label: "Prueba gratis" },
    { value: "+1k", label: "Negocios activos" },
    { value: "24/7", label: "Soporte" },
  ],
  testimonial: {
    quote: "Con el registro pude publicar mis productos en minutos y empezar a vender el mismo dia.",
    name: "Carlos M.",
    role: "Comerciante",
    initials: "CM",
  },
};

export function RegisterSection() {
  const { form, errors, authState, handleChange, handleSubmit } = useRegister();

  return (
    <AuthCard
      title="Crear cuenta"
      subtitle="Empieza tu prueba gratuita"
      footerText="Ya tienes cuenta?"
      footerLinkLabel="Inicia sesion"
      footerLinkHref={AUTH_ROUTES.login}
      branding={REGISTER_BRANDING}
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {authState.error && <ErrorBanner message={authState.error} />}

        <InputField
          label="Nombre completo"
          name="fullName"
          placeholder="Juan Garcia"
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
          autoComplete="name"
        />

        <InputField
          label="Correo electronico"
          name="email"
          type="email"
          placeholder="nombre@empresa.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />

        <InputField
          label="Contrasena"
          name="password"
          type="password"
          placeholder="Minimo 8 caracteres"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
        />

        <InputField
          label="Confirmar contrasena"
          name="confirmPassword"
          type="password"
          placeholder="Repite tu contrasena"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <CheckboxField
          name="acceptTerms"
          checked={form.acceptTerms}
          onChange={handleChange}
          error={errors.acceptTerms}
        >
          Acepto los terminos y condiciones
        </CheckboxField>

        <SubmitButton label="Crear cuenta" isLoading={authState.isLoading} />
      </form>
    </AuthCard>
  );
}

export default RegisterSection;