"use client";

import { useState } from "react";
import { UserProfile, ProfileFormData } from "../types/profile.types";

interface GeneralTabProps {
  user: UserProfile;
  isSaving: boolean;
  saveSuccess: boolean;
  onSave: (data: ProfileFormData) => void;
}

export function GeneralTab({ user, isSaving, saveSuccess, onSave }: GeneralTabProps) {
  const [form, setForm] = useState<ProfileFormData>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    company: user.company ?? "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <div className="section-title">Información general</div>
          <div className="section-sub">Actualiza tus datos personales y de contacto</div>
        </div>
      </div>
      <div className="section-body">
        {saveSuccess && (
          <div className="success-banner">✅ Cambios guardados correctamente</div>
        )}
        <div className="form-grid">
          <div className="field">
            <label htmlFor="firstName">Nombre</label>
            <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="lastName">Apellido</label>
            <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="phone">Teléfono</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
          </div>
        </div>
        <div className="form-actions">
          <button className="btn-cancel" onClick={() => setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, company: user.company ?? "" })}>
            Cancelar
          </button>
          <button className="btn-save" disabled={isSaving} onClick={() => onSave(form)}>
            {isSaving ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}