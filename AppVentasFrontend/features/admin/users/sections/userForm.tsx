"use client";
import React from "react";
import { User, Mail, Lock, Phone, MapPin } from "lucide-react";
import { colors, font, radius } from "../theme/tokens";
import { Input, Toggle } from "../ui/Input";
import { Button } from "../ui/Button";
import { useUserForm } from "../hooks/useUserForm";
import type { UserModalMode } from "../types/user.types";

interface UserFormProps {
  mode:      UserModalMode;
  userId?:   number;
  onSuccess: () => void;
  onCancel:  () => void;
}

function Divider({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0 12px" }}>
      <span style={{
        fontSize:      font.size.xs,
        fontWeight:    font.weight.bold,
        color:         colors.brand[600],
        letterSpacing: ".08em",
        textTransform: "uppercase",
        whiteSpace:    "nowrap",
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: colors.border }} />
    </div>
  );
}

export function UserForm({ mode, userId, onSuccess, onCancel }: UserFormProps) {
  const { form, loading, submitting, error, setField, handleSubmit } =
    useUserForm(mode, userId);

  const isView = mode === "view";

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 48, color: colors.text.disabled }}>
        <div style={{
          width:        28,
          height:       28,
          border:       `2.5px solid ${colors.brand[100]}`,
          borderTop:    `2.5px solid ${colors.brand[600]}`,
          borderRadius: "50%",
          margin:       "0 auto 12px",
          animation:    "bn-spin .7s linear infinite",
        }} />
        Cargando datos...
      </div>
    );
  }

  return (
    <div>
      {/* ── Cuenta de acceso ── */}
      <Divider label="Cuenta de acceso" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input
          label="Nombre completo"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="Juan Pérez"
          icon={<User size={13} />}
          disabled={isView}
        />
        <Input
          label="Login"
          value={form.login}
          onChange={(e) => setField("login", e.target.value)}
          placeholder="jperez"
          icon={<User size={13} />}
          disabled={isView}
        />
        <div style={{ gridColumn: "1 / -1" }}>
          <Input
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="juan@empresa.com"
            icon={<Mail size={13} />}
            disabled={isView}
          />
        </div>
        {!isView && (
          <div style={{ gridColumn: "1 / -1" }}>
            <Input
              label={mode === "edit"
                ? "Nueva contraseña (dejar vacío para mantener)"
                : "Contraseña"}
              type="password"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              placeholder="••••••••"
              icon={<Lock size={13} />}
            />
          </div>
        )}
      </div>

      {/* ── Perfil adicional ── */}
      <Divider label="Perfil adicional" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input
          label="Teléfono"
          type="tel"
          value={form.phone}
          onChange={(e) => setField("phone", e.target.value)}
          placeholder="+1 809 000 0000"
          icon={<Phone size={13} />}
          disabled={isView}
        />
        <Input
          label="Dirección"
          value={form.address}
          onChange={(e) => setField("address", e.target.value)}
          placeholder="Ciudad, país"
          icon={<MapPin size={13} />}
          disabled={isView}
        />
        {!isView && (
          <div style={{ gridColumn: "1 / -1" }}>
            <Toggle
              label="Usuario móvil habilitado"
              checked={form.is_mobile_user}
              onChange={(v) => setField("is_mobile_user", v)}
            />
          </div>
        )}
      </div>

      {/* ── Error ── */}
      {error && (
        <div style={{
          marginTop:    16,
          padding:      "10px 14px",
          background:   colors.error.soft,
          borderRadius: radius.md,
          color:        colors.error.text,
          fontSize:     font.size.sm,
        }}>
          {error}
        </div>
      )}

      {/* ── Acciones ── */}
      {!isView && (
        <div style={{
          display:        "flex",
          gap:            8,
          justifyContent: "flex-end",
          marginTop:      22,
          paddingTop:     18,
          borderTop:      `1px solid ${colors.border}`,
        }}>
          <Button variant="ghost" size="sm" onClick={onCancel} disabled={submitting}>
            Cancelar
          </Button>
          <Button
            size="sm"
            loading={submitting}
            onClick={() => handleSubmit(onSuccess)}
          >
            {mode === "create" ? "Crear usuario" : "Guardar cambios"}
          </Button>
        </div>
      )}
    </div>
  );
}