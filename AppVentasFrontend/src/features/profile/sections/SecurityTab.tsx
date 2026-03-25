"use client";

import { useState } from "react";
import { ChangePasswordPayload } from "../api/profileApi";

interface SecurityTabProps {
  isSaving: boolean;
  saveSuccess: boolean;
  saveError: string | null;
  onSavePassword: (data: ChangePasswordPayload) => void;
}

const EMPTY_PWD: ChangePasswordPayload = {
  current_password: "",
  new_password: "",
  confirm_password: "",
};

export function SecurityTab({ isSaving, saveSuccess, saveError, onSavePassword }: SecurityTabProps) {
  const [pwd, setPwd]               = useState<ChangePasswordPayload>(EMPTY_PWD);
  const [pwdErrors, setPwdErrors]   = useState<Partial<Record<keyof ChangePasswordPayload, string>>>({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPwd((p) => ({ ...p, [e.target.name]: e.target.value }));
    setPwdErrors((p) => ({ ...p, [e.target.name]: undefined }));
  }

  function validate(): boolean {
    const errs: typeof pwdErrors = {};
    if (!pwd.current_password) errs.current_password = "Requerido";
    if (!pwd.new_password)     errs.new_password = "Requerido";
    else if (pwd.new_password.length < 8) errs.new_password = "Mínimo 8 caracteres";
    if (!pwd.confirm_password) errs.confirm_password = "Requerido";
    else if (pwd.new_password !== pwd.confirm_password) errs.confirm_password = "Las contraseñas no coinciden";
    setPwdErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSavePassword(pwd);
  }

  // Reset form when save succeeds
  if (saveSuccess && pwd.current_password) {
    setPwd(EMPTY_PWD);
  }

  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <p className="section-title">Seguridad</p>
          <p className="section-sub">Controla el acceso y la seguridad de tu cuenta</p>
        </div>
      </div>

      <div className="section-body">
        {saveSuccess && <div className="success-banner">✅ Contraseña actualizada correctamente</div>}
        {saveError   && <div className="error-banner">⚠️ {saveError}</div>}

        {/* Security items */}
        <div className="security-item">
          <div className="security-left">
            <div className="security-icon si-blue">🔑</div>
            <div>
              <div className="security-label">Contraseña</div>
              <div className="security-desc">Usa una contraseña segura y única</div>
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
              <div className="security-desc">Administra los dispositivos conectados</div>
            </div>
          </div>
          <button className="btn-security">Ver sesiones</button>
        </div>

        {/* Change password form */}
        <div className="pwd-form">
          <div className="pwd-form-title">Cambiar contraseña</div>
          <div className="form-grid">
            <div className="field span2">
              <label htmlFor="current_password">Contraseña actual</label>
              <input
                id="current_password"
                name="current_password"
                type="password"
                placeholder="••••••••"
                value={pwd.current_password}
                onChange={handleChange}
                className={pwdErrors.current_password ? "input-error" : ""}
              />
              {pwdErrors.current_password && (
                <span className="field-error">{pwdErrors.current_password}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="new_password">Nueva contraseña</label>
              <input
                id="new_password"
                name="new_password"
                type="password"
                placeholder="Mín. 8 caracteres"
                value={pwd.new_password}
                onChange={handleChange}
                className={pwdErrors.new_password ? "input-error" : ""}
              />
              {pwdErrors.new_password && (
                <span className="field-error">{pwdErrors.new_password}</span>
              )}
              {/* Password strength bar */}
              {pwd.new_password && (
                <PasswordStrength password={pwd.new_password} />
              )}
            </div>

            <div className="field">
              <label htmlFor="confirm_password">Confirmar contraseña</label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="••••••••"
                value={pwd.confirm_password}
                onChange={handleChange}
                className={pwdErrors.confirm_password ? "input-error" : ""}
              />
              {pwdErrors.confirm_password && (
                <span className="field-error">{pwdErrors.confirm_password}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              className="btn-cancel"
              onClick={() => { setPwd(EMPTY_PWD); setPwdErrors({}); }}
            >
              Cancelar
            </button>
            <button className="btn-save" disabled={isSaving} onClick={handleSubmit}>
              {isSaving ? (
                <><span className="btn-spinner" /> Actualizando…</>
              ) : (
                "Actualizar contraseña"
              )}
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <p className="section-divider">Zona de peligro</p>
        <div className="danger-zone">
          <div>
            <div className="danger-title">Eliminar cuenta</div>
            <div className="danger-desc">
              Esta acción es permanente e irreversible. Se borrarán todos tus datos.
            </div>
          </div>
          <button className="btn-danger" onClick={() => setDeleteModal(true)}>
            Eliminar mi cuenta
          </button>
        </div>
      </div>

      {/* Delete account modal */}
      {deleteModal && (
        <div className="modal-overlay" onClick={() => setDeleteModal(false)}>
          <div className="modal-box modal-danger" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title danger-modal-title">⚠️ Eliminar cuenta</span>
              <button className="modal-close" onClick={() => setDeleteModal(false)}>✕</button>
            </div>
            <p className="modal-desc">
              Esta acción es <strong>permanente</strong> e irreversible. Ingresa tu contraseña para confirmar.
            </p>
            <div className="field">
              <label htmlFor="del-password">Contraseña</label>
              <input
                id="del-password"
                type="password"
                placeholder="••••••••"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
              />
            </div>
            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setDeleteModal(false)}>
                Cancelar
              </button>
              <button
                className="btn-danger"
                disabled={!deletePassword}
                onClick={() => {
                  // Parent page / router handles the actual delete call
                  window.dispatchEvent(new CustomEvent("profile:delete-account", { detail: { password: deletePassword } }));
                  setDeleteModal(false);
                }}
              >
                Confirmar eliminación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Password strength indicator ───────────────────────────────────────────────
function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["", "Muy débil", "Débil", "Regular", "Buena", "Excelente"];
  const colors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#16a34a"];

  return (
    <div className="pwd-strength">
      <div className="pwd-strength-bars">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="pwd-strength-bar"
            style={{ background: i <= score ? colors[score] : "var(--border)" }}
          />
        ))}
      </div>
      <span className="pwd-strength-label" style={{ color: colors[score] }}>
        {labels[score]}
      </span>
    </div>
  );
}