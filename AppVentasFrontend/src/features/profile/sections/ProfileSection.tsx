"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../home/sections/Navbar/Navbar";
import { useProfile, ProfileTab } from "../hooks/useProfile";
import { GeneralTab }       from "./GeneralTab";
import { OrdersTab }        from "./OrdersTab";
import { AddressesTab }     from "./OtherTabs";
import { SecurityTab }      from "./SecurityTab";
import { NotificationsTab } from "./NotificationTab";
import { deleteAccount }    from "../api/profileApi";
import { TOKEN_KEYS, AUTH_ROUTES } from "../../auth/data/constants";

const TABS: { id: ProfileTab; label: string; icon: string }[] = [
  { id: "general",       label: "Información general", icon: "👤" },
  { id: "orders",        label: "Mis pedidos",          icon: "📦" },
  { id: "addresses",     label: "Direcciones",          icon: "📍" },
  { id: "security",      label: "Seguridad",            icon: "🔒" },
  { id: "notifications", label: "Notificaciones",       icon: "🔔" },
];

export function ProfileSection() {
  const router = useRouter();
  const {
    activeTab, setActiveTab,
    profile, profileMut, saveProfile,
    passwordMut, savePassword,
    addresses, addressMut, addAddress, editAddress, removeAddress, makeDefaultAddress,
    notifications, notifMut, toggleNotification,
    orders, loadOrders,
  } = useProfile();

  // ── Listen for delete-account event from SecurityTab modal ────────────────
  useEffect(() => {
    async function handleDelete(e: Event) {
      const password = (e as CustomEvent<{ password: string }>).detail.password;
      try {
        await deleteAccount(password);
        Object.values(TOKEN_KEYS).forEach((k) => localStorage.removeItem(k));
        router.push(AUTH_ROUTES.login);
      } catch (err) {
        alert((err as Error).message);
      }
    }
    window.addEventListener("profile:delete-account", handleDelete);
    return () => window.removeEventListener("profile:delete-account", handleDelete);
  }, [router]);

  // ── Derived sidebar data ──────────────────────────────────────────────────
  const p = profile.data;
  const initials   = p?.avatar_initials ?? "??";
  const fullName   = p ? `${p.first_name} ${p.last_name}` : "Cargando…";
  const email      = p?.email ?? "";
  const memberSince = p?.member_since ?? "";

  const totalOrders = orders.data?.total ?? "—";

  return (
    <>
      <Navbar cart={0} />
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
              <p className="avatar-name">{fullName}</p>
              <p className="avatar-email">{email}</p>
              <div className="avatar-stats">
                <div className="a-stat">
                  <div className="a-stat-num">{totalOrders}</div>
                  <div className="a-stat-label">pedidos</div>
                </div>
                <div className="a-stat">
                  <div className="a-stat-num">
                    {orders.data
                      ? `$${orders.data.orders
                          .reduce((s, o) => s + o.total, 0)
                          .toLocaleString("es-DO", { maximumFractionDigits: 0 })}`
                      : "—"}
                  </div>
                  <div className="a-stat-label">gastado</div>
                </div>
                <div className="a-stat">
                  <div className="a-stat-num">{addresses.data?.length ?? "—"}</div>
                  <div className="a-stat-label">direcciones</div>
                </div>
              </div>
            </div>
          </div>

          <nav className="profile-nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`pnav-item${activeTab === tab.id ? " active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="pnav-icon">{tab.icon}</span>
                {tab.label}
                <span className="pnav-arrow">›</span>
              </button>
            ))}
          </nav>

          {memberSince && (
            <div className="member-card">
              <div className="member-icon">🗓️</div>
              <div>
                <div className="member-label">Miembro desde</div>
                <div className="member-value">{memberSince}</div>
              </div>
            </div>
          )}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div className="profile-main">

          {activeTab === "general" && (
            <GeneralTab
              profile={profile.data}
              loading={profile.loading}
              isSaving={profileMut.saving}
              saveSuccess={profileMut.success}
              saveError={profileMut.error}
              onSave={saveProfile}
            />
          )}

          {activeTab === "orders" && (
            <OrdersTab
              data={orders.data}
              loading={orders.loading}
              error={orders.error}
              onLoadMore={loadOrders}
            />
          )}

          {activeTab === "addresses" && (
            <AddressesTab
              addresses={addresses.data}
              loading={addresses.loading}
              isSaving={addressMut.saving}
              saveError={addressMut.error}
              onAdd={addAddress}
              onEdit={editAddress}
              onRemove={removeAddress}
              onSetDefault={makeDefaultAddress}
            />
          )}

          {activeTab === "security" && (
            <SecurityTab
              isSaving={passwordMut.saving}
              saveSuccess={passwordMut.success}
              saveError={passwordMut.error}
              onSavePassword={savePassword}
            />
          )}

          {activeTab === "notifications" && (
            <NotificationsTab
              prefs={notifications.data}
              loading={notifications.loading}
              error={notifications.error}
              onToggle={toggleNotification}
            />
          )}

        </div>
      </div>
    </>
  );
}