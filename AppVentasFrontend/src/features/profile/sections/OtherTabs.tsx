"use client";

import { useState } from "react";
import { Address, AddressPayload } from "../api/profileApi";

interface AddressesTabProps {
  addresses: Address[] | null;
  loading: boolean;
  isSaving: boolean;
  saveError: string | null;
  onAdd: (payload: AddressPayload) => Promise<void>;
  onEdit: (id: number, payload: Partial<AddressPayload>) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
  onSetDefault: (id: number) => Promise<void>;
}

const EMPTY_FORM: AddressPayload = {
  name: "",
  street: "",
  street2: "",
  city: "",
  zip: "",
  label: "",
  is_default: false,
};

export function AddressesTab({
  addresses,
  loading,
  isSaving,
  saveError,
  onAdd,
  onEdit,
  onRemove,
  onSetDefault,
}: AddressesTabProps) {
  const [modalOpen, setModalOpen]   = useState(false);
  const [editTarget, setEditTarget] = useState<Address | null>(null);
  const [form, setForm]             = useState<AddressPayload>(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  function openNew() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(addr: Address) {
    setEditTarget(addr);
    setForm({
      name:       addr.name,
      street:     addr.line1,
      street2:    addr.line2,
      city:       addr.city,
      zip:        addr.zip,
      label:      addr.label,
      is_default: addr.is_default,
    });
    setModalOpen(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit() {
    if (editTarget) {
      await onEdit(editTarget.id, form);
    } else {
      await onAdd(form);
    }
    if (!saveError) setModalOpen(false);
  }

  async function handleDelete(id: number) {
    await onRemove(id);
    setDeleteConfirm(null);
  }

  const list = addresses ?? [];

  return (
    <>
      <div className="section-card">
        <div className="section-header">
          <div>
            <p className="section-title">Direcciones</p>
            <p className="section-sub">Administra tus direcciones de envío</p>
          </div>
        </div>

        <div className="section-body">
          {saveError && <div className="error-banner">⚠️ {saveError}</div>}

          {loading && list.length === 0 && (
            <div className="addresses-grid">
              {[1, 2].map((i) => (
                <div key={i} className="address-card">
                  <div className="skeleton skeleton-label" />
                  <div className="skeleton skeleton-input" />
                  <div className="skeleton skeleton-sub" />
                </div>
              ))}
            </div>
          )}

          <div className="addresses-grid">
            {list.map((addr) => (
              <div key={addr.id} className={`address-card${addr.is_default ? " default" : ""}`}>
                <div className="address-label-row">
                  <span className="address-label">{addr.label}</span>
                  {addr.is_default && <span className="default-badge">Principal</span>}
                </div>
                <div className="address-name">{addr.name}</div>
                <div className="address-lines">
                  {addr.line1}
                  {addr.line2 && <><br />{addr.line2}</>}
                  <br />
                  {addr.city}{addr.zip ? ` ${addr.zip}` : ""}, {addr.country}
                </div>
                <div className="address-actions">
                  <button className="btn-addr" onClick={() => openEdit(addr)}>
                    Editar
                  </button>
                  {!addr.is_default && (
                    <button className="btn-addr" onClick={() => onSetDefault(addr.id)}>
                      Hacer principal
                    </button>
                  )}
                  {deleteConfirm === addr.id ? (
                    <>
                      <span className="delete-confirm-text">¿Eliminar?</span>
                      <button className="btn-addr danger" onClick={() => handleDelete(addr.id)}>
                        Sí
                      </button>
                      <button className="btn-addr" onClick={() => setDeleteConfirm(null)}>
                        No
                      </button>
                    </>
                  ) : (
                    <button className="btn-addr danger" onClick={() => setDeleteConfirm(addr.id)}>
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button className="btn-add-addr" onClick={openNew}>
              + Agregar nueva dirección
            </button>
          </div>
        </div>
      </div>

      {/* ── Address Modal ── */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">
                {editTarget ? "Editar dirección" : "Nueva dirección"}
              </span>
              <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            {saveError && <div className="error-banner">⚠️ {saveError}</div>}

            <div className="form-grid">
              <div className="field span2">
                <label htmlFor="addr-label">Etiqueta</label>
                <input
                  id="addr-label"
                  name="label"
                  value={form.label ?? ""}
                  onChange={handleChange}
                  placeholder="Ej: 🏢 Oficina"
                />
              </div>

              <div className="field span2">
                <label htmlFor="addr-name">Nombre del destinatario</label>
                <input
                  id="addr-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                />
              </div>

              <div className="field span2">
                <label htmlFor="addr-street">Dirección línea 1 *</label>
                <input
                  id="addr-street"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  placeholder="Calle y número"
                />
              </div>

              <div className="field span2">
                <label htmlFor="addr-street2">
                  Dirección línea 2 <span className="label-opt">(opcional)</span>
                </label>
                <input
                  id="addr-street2"
                  name="street2"
                  value={form.street2 ?? ""}
                  onChange={handleChange}
                  placeholder="Apto, piso, suite…"
                />
              </div>

              <div className="field">
                <label htmlFor="addr-city">Ciudad</label>
                <input
                  id="addr-city"
                  name="city"
                  value={form.city ?? ""}
                  onChange={handleChange}
                  placeholder="Ciudad"
                />
              </div>

              <div className="field">
                <label htmlFor="addr-zip">Código postal</label>
                <input
                  id="addr-zip"
                  name="zip"
                  value={form.zip ?? ""}
                  onChange={handleChange}
                  placeholder="00000"
                />
              </div>

              <div className="field span2">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_default"
                    checked={form.is_default ?? false}
                    onChange={handleChange}
                  />
                  Establecer como dirección principal
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-cancel" onClick={() => setModalOpen(false)}>
                Cancelar
              </button>
              <button className="btn-save" disabled={isSaving || !form.street || !form.name} onClick={handleSubmit}>
                {isSaving ? (
                  <><span className="btn-spinner" /> Guardando…</>
                ) : (
                  editTarget ? "Guardar cambios" : "Agregar dirección"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}