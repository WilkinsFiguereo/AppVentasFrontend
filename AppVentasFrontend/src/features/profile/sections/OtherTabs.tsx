"use client";

import { useState } from "react";
import { Address, NotificationPrefs, PasswordFormData } from "../types/profile.types";
import { MOCK_ADDRESSES } from "../data/mockProfile";

/* ── ADDRESSES ─────────────────────────────────────── */
export function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);

  function setDefault(id: string) {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }
  function remove(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <div className="section-title">Direcciones</div>
          <div className="section-sub">Administra tus direcciones de envío</div>
        </div>
      </div>
      <div className="section-body">
        <div className="addresses-grid">
          {addresses.map((addr) => (
            <div key={addr.id} className={`address-card${addr.isDefault ? " default" : ""}`}>
              <div className="address-label-row">
                <span className="address-label">{addr.label}</span>
                {addr.isDefault && <span className="default-badge">Principal</span>}
              </div>
              <div className="address-name">{addr.name}</div>
              <div className="address-lines">
                {addr.line1}<br />
                {addr.line2 && <>{addr.line2}<br /></>}
                {addr.city}, {addr.country}
              </div>
              <div className="address-actions">
                <button className="btn-addr">Editar</button>
                {!addr.isDefault && (
                  <button className="btn-addr" onClick={() => setDefault(addr.id)}>
                    Hacer principal
                  </button>
                )}
                <button className="btn-addr danger" onClick={() => remove(addr.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <button className="btn-add-addr">+ Agregar nueva dirección</button>
        </div>
      </div>
    </div>
  );
}

/* ── SECURITY ──────────────────────────────────────── */
interface SecurityTabProps {
  isSaving: boolean;
  saveSuccess: boolean;
  onSavePassword: (data: PasswordFormData) => void;
}

export function SecurityTab({ isSaving, saveSuccess, onSavePassword }: SecurityTabProps) {
  const [pwd, setPwd] = useState<PasswordFormData>({ currentPassword: "", newPassword: "", confirmPassword: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPwd((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <div className="section-title">Seguridad</div>
          <div className="section-sub">Controla el acceso y la seguridad de tu cuenta</div>
        </div>
      </div>
      <div className="section-body">
        {saveSuccess && <div className="success-banner">✅ Contraseña actualizada correctamente</div>}

        <div className="security-item">
          <div className="security-left">
            <div className="security-icon si-blue">🔑</div>
            <div>
              <div className="security-label">Contraseña</div>
              <div className="security-desc">Última actualización hace 3 meses</div>
            </div>
          </div>
        </div>

        <div className="security-item">
          <div className="security-left">
            <div className="security-icon si-green">📱</div>
            <div>
              <div className="security-label">Autenticación de dos factores</div>
              <div className="security-desc">Protege tu cuenta con un código adicional</div>
            </div>
          </div>
          <span className="security-tag tag-inactive">No activado</span>
        </div>

        <div className="security-item">
          <div className="security-left">
            <div className="security-icon si-blue">🌐</div>
            <div>
              <div className="security-label">Sesiones activas</div>
              <div className="security-desc">2 dispositivos conectados actualmente</div>
            </div>
          </div>
          <button className="btn-security">Ver sesiones</button>
        </div>

        {/* Password form */}
        <div className="pwd-form">
          <div className="pwd-form-title">Cambiar contraseña</div>
          <div className="form-grid">
            <div className="field span2">
              <label htmlFor="currentPassword">Contraseña actual</label>
              <input id="currentPassword" name="currentPassword" type="password" placeholder="••••••••" value={pwd.currentPassword} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="newPassword">Nueva contraseña</label>
              <input id="newPassword" name="newPassword" type="password" placeholder="Mín. 8 caracteres" value={pwd.newPassword} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={pwd.confirmPassword} onChange={handleChange} />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-cancel">Cancelar</button>
            <button className="btn-save" disabled={isSaving} onClick={() => onSavePassword(pwd)}>
              {isSaving ? "Actualizando…" : "Actualizar contraseña"}
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <p className="section-divider">Zona de peligro</p>
        <div className="danger-zone">
          <div>
            <div className="danger-title">Eliminar cuenta</div>
            <div className="danger-desc">Esta acción es permanente e irreversible. Se borrarán todos tus datos.</div>
          </div>
          <button className="btn-danger">Eliminar mi cuenta</button>
        </div>
      </div>
    </div>
  );
}

/* ── NOTIFICATIONS ─────────────────────────────────── */
interface NotificationsTabProps {
  prefs: NotificationPrefs;
  onToggle: (key: keyof NotificationPrefs) => void;
}

const NOTIF_CONFIG: { key: keyof NotificationPrefs; label: string; desc: string }[] = [
  { key: "orders",        label: "Actualizaciones de pedidos",  desc: "Recibe alertas cuando tu pedido cambie de estado, sea enviado o entregado." },
  { key: "promotions",    label: "Ofertas y promociones",       desc: "Descuentos exclusivos, ofertas flash y productos destacados." },
  { key: "security",      label: "Alertas de seguridad",        desc: "Notificaciones sobre inicios de sesión y cambios en tu cuenta." },
  { key: "newsletter",    label: "Newsletter semanal",          desc: "Resumen semanal con novedades, tendencias y contenido de valor." },
];

export function NotificationsTab({ prefs, onToggle }: NotificationsTabProps) {
  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <div className="section-title">Notificaciones</div>
          <div className="section-sub">Elige qué comunicaciones deseas recibir</div>
        </div>
      </div>
      <div className="section-body">
        {NOTIF_CONFIG.map((item) => (
          <div key={item.key} className="notif-item">
            <div className="notif-info">
              <div className="notif-label">{item.label}</div>
              <div className="notif-desc">{item.desc}</div>
            </div>
            <button
              role="switch"
              aria-checked={prefs[item.key]}
              className={`toggle ${prefs[item.key] ? "on" : "off"}`}
              onClick={() => onToggle(item.key)}
              aria-label={item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
}