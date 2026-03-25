"use client";

import { useState, useEffect } from "react";
import { ProfileData, UpdateProfilePayload } from "../api/profileApi";

interface GeneralTabProps {
  profile: ProfileData | null;
  loading: boolean;
  isSaving: boolean;
  saveSuccess: boolean;
  saveError: string | null;
  onSave: (data: UpdateProfilePayload) => void;
}

export function GeneralTab({ profile, loading, isSaving, saveSuccess, saveError, onSave }: GeneralTabProps) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    company: "",
  });
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        company: profile.company,
      });
      setDirty(false);
    }
  }, [profile]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setDirty(true);
  }

  function handleCancel() {
    if (profile) {
      setForm({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        company: profile.company,
      });
      setDirty(false);
    }
  }

  if (loading) return <TabSkeleton rows={4} />;

  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <p className="section-title">Información general</p>
          <p className="section-sub">Actualiza tus datos personales y de contacto</p>
        </div>
      </div>

      <div className="section-body">
        {saveSuccess && <div className="success-banner">✅ Cambios guardados correctamente</div>}
        {saveError  && <div className="error-banner">⚠️ {saveError}</div>}

        <div className="form-grid">
          <div className="field">
            <label htmlFor="first_name">Nombre</label>
            <input
              id="first_name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="Tu nombre"
            />
          </div>

          <div className="field">
            <label htmlFor="last_name">Apellido</label>
            <input
              id="last_name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Tu apellido"
            />
          </div>

          <div className="field">
            <label htmlFor="email">
              Correo electrónico
              <span className="label-opt"> (no editable)</span>
            </label>
            <input
              id="email"
              type="email"
              value={profile?.email ?? ""}
              disabled
              className="input-disabled"
            />
          </div>

          <div className="field">
            <label htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (809) 555-0000"
            />
          </div>

          
        </div>

        <div className="form-actions">
          <button className="btn-cancel" onClick={handleCancel} disabled={!dirty || isSaving}>
            Cancelar
          </button>
          <button
            className="btn-save"
            disabled={isSaving || !dirty}
            onClick={() => onSave(form)}
          >
            {isSaving ? (
              <>
                <span className="btn-spinner" /> Guardando…
              </>
            ) : (
              "Guardar cambios"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function TabSkeleton({ rows }: { rows: number }) {
  return (
    <div className="section-card">
      <div className="section-header">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-sub" />
      </div>
      <div className="section-body">
        <div className="form-grid">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="field">
              <div className="skeleton skeleton-label" />
              <div className="skeleton skeleton-input" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}