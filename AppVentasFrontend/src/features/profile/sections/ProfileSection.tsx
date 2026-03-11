"use client";

import { useState, useCallback } from "react";
import Navbar from "../../home/sections/Navbar/Navbar";

console.log("✅ ProfileSection module loaded");

// ─── Types ────────────────────────────────────────────────────────────────────
type ProfileTab = "general" | "orders" | "addresses" | "security" | "notifications";

interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  country: string;
  isDefault: boolean;
}

// ─── Static data ──────────────────────────────────────────────────────────────
const TABS: { id: ProfileTab; label: string; icon: string }[] = [
  { id: "general",       label: "Información general", icon: "👤" },
  { id: "orders",        label: "Mis pedidos",          icon: "📦" },
  { id: "addresses",     label: "Direcciones",          icon: "📍" },
  { id: "security",      label: "Seguridad",            icon: "🔒" },
  { id: "notifications", label: "Notificaciones",       icon: "🔔" },
];

const ORDERS = [
  {
    id: "ORD-20241", date: "28 feb 2025", status: "completed" as const, total: 1649.0,
    products: [{ name: "Laptop ThinkPad X1", emoji: "💻" }, { name: "Teclado Keychron Q1", emoji: "⌨️" }],
  },
  {
    id: "ORD-20198", date: "14 feb 2025", status: "shipped" as const, total: 849.0,
    products: [{ name: 'Monitor UltraWide 34"', emoji: "🖥️" }],
  },
  {
    id: "ORD-20154", date: "02 ene 2025", status: "completed" as const, total: 299.0,
    products: [{ name: "Soporte IT Premium", emoji: "🛠️" }],
  },
  {
    id: "ORD-20102", date: "18 dic 2024", status: "completed" as const, total: 189.0,
    products: [{ name: "Kaspersky Business", emoji: "📦" }],
  },
  {
    id: "ORD-20087", date: "05 nov 2024", status: "cancelled" as const, total: 589.0,
    products: [{ name: "NAS Synology DS923+", emoji: "🖧" }],
  },
];

const STATUS_MAP = {
  completed:  { label: "Completado", cls: "status-completed", cta: "Ver detalle" },
  shipped:    { label: "En camino",  cls: "status-shipped",   cta: "Rastrear"    },
  processing: { label: "Procesando", cls: "status-processing",cta: "Ver detalle" },
  cancelled:  { label: "Cancelado",  cls: "status-cancelled", cta: "Ver detalle" },
};

function fmt(n: number) {
  return n.toLocaleString("es-DO", { minimumFractionDigits: 2 });
}

// ─── Root component ───────────────────────────────────────────────────────────
export function ProfileSection() {
  console.log("✅ ProfileSection component rendering");

  // ── Navigation ──────────────────────────────────────
  const [activeTab, setActiveTab] = useState<ProfileTab>("general");

  console.log("🔵 Current activeTab:", activeTab);

  // ── General tab state ────────────────────────────────
  const [firstName,  setFirstName]  = useState("Juan");
  const [lastName,   setLastName]   = useState("García");
  const [email,      setEmail]      = useState("juan.garcia@empresa.com");
  const [phone,      setPhone]      = useState("+1 (809) 555-0192");
  const [company,    setCompany]    = useState("TechCorp S.A.");
  const [isSavingGeneral, setIsSavingGeneral] = useState(false);
  const [generalSuccess,  setGeneralSuccess]  = useState(false);

  // ── Addresses tab state ──────────────────────────────
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "addr_1", label: "🏢 Oficina", name: "Juan García", line1: "Av. Winston Churchill 1099", line2: "Piso 8, Of. 801", city: "Santo Domingo", country: "República Dominicana", isDefault: true  },
    { id: "addr_2", label: "🏠 Casa",    name: "Juan García", line1: "Calle El Conde 55",          city: "Santo Domingo", country: "República Dominicana", isDefault: false },
  ]);

  // ── Security tab state ───────────────────────────────
  const [pwdCurrent, setPwdCurrent] = useState("");
  const [pwdNext,    setPwdNext]    = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [isSavingPwd, setIsSavingPwd] = useState(false);
  const [pwdSuccess,  setPwdSuccess]  = useState(false);

  // ── Notifications tab state ──────────────────────────
  const [notifOrders,     setNotifOrders]     = useState(true);
  const [notifPromotions, setNotifPromotions] = useState(true);
  const [notifSecurity,   setNotifSecurity]   = useState(true);
  const [notifNewsletter, setNotifNewsletter] = useState(false);

  // ── Handlers ─────────────────────────────────────────
  async function saveGeneral() {
    setIsSavingGeneral(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsSavingGeneral(false);
    setGeneralSuccess(true);
    setTimeout(() => setGeneralSuccess(false), 2500);
  }

  async function savePassword() {
    if (!pwdCurrent || !pwdNext) return;
    setIsSavingPwd(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsSavingPwd(false);
    setPwdCurrent(""); setPwdNext(""); setPwdConfirm("");
    setPwdSuccess(true);
    setTimeout(() => setPwdSuccess(false), 2500);
  }

  const makeDefault = useCallback((id: string) => {
    setAddresses((p) => p.map((a) => ({ ...a, isDefault: a.id === id })));
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((p) => p.filter((a) => a.id !== id));
  }, []);

  function handleTabChange(tab: ProfileTab) {
    console.log("🟡 Tab clicked:", tab);
    setActiveTab(tab);
    console.log("🟢 setActiveTab called with:", tab);
  }

  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  // ─── Render ──────────────────────────────────────────────────────────────────
  console.log("🔵 Rendering tab content for:", activeTab);
  console.log("🔵 Should render orders?", activeTab === "orders");
  console.log("🔵 Should render addresses?", activeTab === "addresses");
  console.log("🔵 Should render security?", activeTab === "security");
  console.log("🔵 Should render notifications?", activeTab === "notifications");

  return (
    <>
      <Navbar cart={3} />
      <div className="profile-page">

        {/* ── SIDEBAR ── */}
        <aside className="profile-sidebar">
          <div className="avatar-card">
            <div className="avatar-card-top" />
            <div className="avatar-wrap">
              <div className="avatar">{initials}</div>
              <button className="avatar-edit" aria-label="Cambiar foto">✏️</button>
            </div>
            <div className="avatar-info">
              <p className="avatar-name">{firstName} {lastName}</p>
              <p className="avatar-email">{email}</p>
              <div className="avatar-stats">
                <div className="a-stat">
                  <div className="a-stat-num">24</div>
                  <div className="a-stat-label">pedidos</div>
                </div>
                <div className="a-stat">
                  <div className="a-stat-num">$8.4k</div>
                  <div className="a-stat-label">gastado</div>
                </div>
                <div className="a-stat">
                  <div className="a-stat-num">7</div>
                  <div className="a-stat-label">guardados</div>
                </div>
              </div>
            </div>
          </div>

          <nav className="profile-nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`pnav-item${activeTab === tab.id ? " active" : ""}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <span className="pnav-icon">{tab.icon}</span>
                {tab.label}
                <span className="pnav-arrow">›</span>
              </button>
            ))}
          </nav>

          <div className="member-card">
            <div className="member-icon">🗓️</div>
            <div>
              <div className="member-label">Miembro desde</div>
              <div className="member-value">Marzo 2023</div>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="profile-main">

          {/* DEBUG: always visible indicator */}
          <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "8px", padding: "6px 12px", background: "#f1f5f9", borderRadius: "6px", fontFamily: "monospace" }}>
            activeTab: <strong>{activeTab}</strong>
          </div>

          {/* ── TAB: GENERAL ── */}
          {activeTab === "general" && (
            <div className="section-card">
              <div className="section-header">
                <div>
                  <p className="section-title">Información general</p>
                  <p className="section-sub">Actualiza tus datos personales y de contacto</p>
                </div>
              </div>
              <div className="section-body">
                {generalSuccess && (
                  <div className="success-banner">✅ Cambios guardados correctamente</div>
                )}
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="firstName">Nombre</label>
                    <input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="field">
                    <label htmlFor="lastName">Apellido</label>
                    <input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Teléfono</label>
                    <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="field span2">
                    <label htmlFor="company">
                      Empresa <span className="label-opt">(opcional)</span>
                    </label>
                    <input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn-cancel">Cancelar</button>
                  <button className="btn-save" disabled={isSavingGeneral} onClick={saveGeneral}>
                    {isSavingGeneral ? "Guardando…" : "Guardar cambios"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: ORDERS ── */}
          {activeTab === "orders" && (
            <div className="section-card">
              <div className="section-header">
                <div>
                  <p className="section-title">Mis pedidos</p>
                  <p className="section-sub">Historial de compras y estado de envíos</p>
                </div>
              </div>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Total</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {ORDERS.map((order) => {
                    const s = STATUS_MAP[order.status];
                    return (
                      <tr key={order.id}>
                        <td>
                          <div className="order-id">{order.id}</div>
                          <div className="order-products">
                            {order.products.map((p) => (
                              <span key={p.name} className="order-product-chip">
                                {p.emoji} {p.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>{order.date}</td>
                        <td>
                          <span className={`status-badge ${s.cls}`}>
                            <span className="status-dot" /> {s.label}
                          </span>
                        </td>
                        <td className="order-price">${fmt(order.total)}</td>
                        <td>
                          <button className="btn-view">{s.cta}</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── TAB: ADDRESSES ── */}
          {activeTab === "addresses" && (
            <div className="section-card">
              <div className="section-header">
                <div>
                  <p className="section-title">Direcciones</p>
                  <p className="section-sub">Administra tus direcciones de envío</p>
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
                        {addr.line1}
                        {addr.line2 && <><br />{addr.line2}</>}
                        <br />{addr.city}, {addr.country}
                      </div>
                      <div className="address-actions">
                        <button className="btn-addr">Editar</button>
                        {!addr.isDefault && (
                          <button className="btn-addr" onClick={() => makeDefault(addr.id)}>
                            Hacer principal
                          </button>
                        )}
                        <button className="btn-addr danger" onClick={() => removeAddress(addr.id)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="btn-add-addr">+ Agregar nueva dirección</button>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: SECURITY ── */}
          {activeTab === "security" && (
            <div className="section-card">
              <div className="section-header">
                <div>
                  <p className="section-title">Seguridad</p>
                  <p className="section-sub">Controla el acceso y la seguridad de tu cuenta</p>
                </div>
              </div>
              <div className="section-body">
                {pwdSuccess && (
                  <div className="success-banner">✅ Contraseña actualizada correctamente</div>
                )}
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
                <div className="pwd-form">
                  <div className="pwd-form-title">Cambiar contraseña</div>
                  <div className="form-grid">
                    <div className="field span2">
                      <label htmlFor="pwdCurrent">Contraseña actual</label>
                      <input id="pwdCurrent" type="password" placeholder="••••••••" value={pwdCurrent} onChange={(e) => setPwdCurrent(e.target.value)} />
                    </div>
                    <div className="field">
                      <label htmlFor="pwdNext">Nueva contraseña</label>
                      <input id="pwdNext" type="password" placeholder="Mín. 8 caracteres" value={pwdNext} onChange={(e) => setPwdNext(e.target.value)} />
                    </div>
                    <div className="field">
                      <label htmlFor="pwdConfirm">Confirmar contraseña</label>
                      <input id="pwdConfirm" type="password" placeholder="••••••••" value={pwdConfirm} onChange={(e) => setPwdConfirm(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="btn-cancel" onClick={() => { setPwdCurrent(""); setPwdNext(""); setPwdConfirm(""); }}>
                      Cancelar
                    </button>
                    <button className="btn-save" disabled={isSavingPwd} onClick={savePassword}>
                      {isSavingPwd ? "Guardando…" : "Actualizar contraseña"}
                    </button>
                  </div>
                </div>
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
          )}

          {/* ── TAB: NOTIFICATIONS ── */}
          {activeTab === "notifications" && (
            <div className="section-card">
              <div className="section-header">
                <div>
                  <p className="section-title">Notificaciones</p>
                  <p className="section-sub">Elige qué comunicaciones deseas recibir</p>
                </div>
              </div>
              <div className="section-body">
                <div className="notif-item">
                  <div className="notif-info">
                    <div className="notif-label">Actualizaciones de pedidos</div>
                    <div className="notif-desc">Recibe alertas cuando tu pedido cambie de estado, sea enviado o entregado.</div>
                  </div>
                  <button role="switch" aria-checked={notifOrders} aria-label="Actualizaciones de pedidos"
                    className={`toggle ${notifOrders ? "on" : "off"}`}
                    onClick={() => setNotifOrders((p) => !p)} />
                </div>
                <div className="notif-item">
                  <div className="notif-info">
                    <div className="notif-label">Ofertas y promociones</div>
                    <div className="notif-desc">Descuentos exclusivos, ofertas flash y productos destacados.</div>
                  </div>
                  <button role="switch" aria-checked={notifPromotions} aria-label="Ofertas y promociones"
                    className={`toggle ${notifPromotions ? "on" : "off"}`}
                    onClick={() => setNotifPromotions((p) => !p)} />
                </div>
                <div className="notif-item">
                  <div className="notif-info">
                    <div className="notif-label">Alertas de seguridad</div>
                    <div className="notif-desc">Notificaciones sobre inicios de sesión y cambios en tu cuenta.</div>
                  </div>
                  <button role="switch" aria-checked={notifSecurity} aria-label="Alertas de seguridad"
                    className={`toggle ${notifSecurity ? "on" : "off"}`}
                    onClick={() => setNotifSecurity((p) => !p)} />
                </div>
                <div className="notif-item">
                  <div className="notif-info">
                    <div className="notif-label">Newsletter semanal</div>
                    <div className="notif-desc">Resumen semanal con novedades, tendencias y contenido de valor.</div>
                  </div>
                  <button role="switch" aria-checked={notifNewsletter} aria-label="Newsletter semanal"
                    className={`toggle ${notifNewsletter ? "on" : "off"}`}
                    onClick={() => setNotifNewsletter((p) => !p)} />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}