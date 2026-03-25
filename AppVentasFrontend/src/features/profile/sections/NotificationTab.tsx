"use client";

import { NotificationPrefs } from "../api/profileApi";

interface NotificationsTabProps {
  prefs: NotificationPrefs | null;
  loading: boolean;
  error: string | null;
  onToggle: (key: keyof NotificationPrefs) => void;
}

const NOTIF_CONFIG: {
  key: keyof NotificationPrefs;
  label: string;
  desc: string;
  icon: string;
}[] = [
  {
    key:   "orders",
    icon:  "📦",
    label: "Actualizaciones de pedidos",
    desc:  "Recibe alertas cuando tu pedido cambie de estado, sea enviado o entregado.",
  },
  {
    key:   "promotions",
    icon:  "🏷️",
    label: "Ofertas y promociones",
    desc:  "Descuentos exclusivos, ofertas flash y productos destacados.",
  },
  {
    key:   "security",
    icon:  "🔒",
    label: "Alertas de seguridad",
    desc:  "Notificaciones sobre inicios de sesión y cambios en tu cuenta.",
  },
  {
    key:   "newsletter",
    icon:  "📰",
    label: "Newsletter semanal",
    desc:  "Resumen semanal con novedades, tendencias y contenido de valor.",
  },
];

export function NotificationsTab({ prefs, loading, error, onToggle }: NotificationsTabProps) {
  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <p className="section-title">Notificaciones</p>
          <p className="section-sub">Elige qué comunicaciones deseas recibir</p>
        </div>
      </div>

      <div className="section-body">
        {error && <div className="error-banner">⚠️ {error}</div>}

        {NOTIF_CONFIG.map((item) => {
          const checked = prefs?.[item.key] ?? false;
          const isLoading = loading && !prefs;

          return (
            <div key={item.key} className="notif-item">
              <div className="notif-icon-wrap">{item.icon}</div>
              <div className="notif-info">
                <div className="notif-label">{item.label}</div>
                <div className="notif-desc">{item.desc}</div>
              </div>
              {isLoading ? (
                <div className="skeleton skeleton-toggle" />
              ) : (
                <button
                  role="switch"
                  aria-checked={checked}
                  className={`toggle ${checked ? "on" : "off"}`}
                  onClick={() => onToggle(item.key)}
                  aria-label={item.label}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}