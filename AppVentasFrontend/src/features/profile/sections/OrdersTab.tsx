"use client";

import { Order, OrdersResponse } from "../api/profileApi";

const STATUS_MAP: Record<
  Order["status"],
  { label: string; cls: string; cta: string }
> = {
  completed:  { label: "Completado", cls: "status-completed",  cta: "Ver detalle" },
  shipped:    { label: "En camino",  cls: "status-shipped",    cta: "Rastrear"    },
  processing: { label: "Procesando", cls: "status-processing", cta: "Ver detalle" },
  cancelled:  { label: "Cancelado",  cls: "status-cancelled",  cta: "Ver detalle" },
};

interface OrdersTabProps {
  data: OrdersResponse | null;
  loading: boolean;
  error: string | null;
  onLoadMore: (limit: number, offset: number) => void;
}

export function OrdersTab({ data, loading, error, onLoadMore }: OrdersTabProps) {
  const orders = data?.orders ?? [];
  const hasMore = data ? data.offset + data.limit < data.total : false;

  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <p className="section-title">Mis pedidos</p>
          <p className="section-sub">Historial de compras y estado de envíos</p>
        </div>
        {data && (
          <span className="orders-count">{data.total} pedidos</span>
        )}
      </div>

      {loading && orders.length === 0 && <OrdersSkeleton />}

      {error && (
        <div className="section-body">
          <div className="error-banner">⚠️ {error}</div>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="section-body empty-state">
          <span className="empty-icon">📦</span>
          <p>Aún no tienes pedidos</p>
        </div>
      )}

      {orders.length > 0 && (
        <>
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
              {orders.map((order) => {
                const s = STATUS_MAP[order.status] ?? STATUS_MAP.processing;
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
                    <td className="order-price">
                      {order.currency}
                      {order.total.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                      <button className="btn-view">{s.cta}</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {hasMore && (
            <div className="load-more-wrap">
              <button
                className="btn-load-more"
                disabled={loading}
                onClick={() => onLoadMore(data!.limit, data!.offset + data!.limit)}
              >
                {loading ? "Cargando…" : "Ver más pedidos"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function OrdersSkeleton() {
  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Pedido</th><th>Fecha</th><th>Estado</th><th>Total</th><th />
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 4 }).map((_, i) => (
          <tr key={i}>
            <td><div className="skeleton skeleton-order-id" /><div className="skeleton skeleton-chip" /></td>
            <td><div className="skeleton skeleton-date" /></td>
            <td><div className="skeleton skeleton-badge" /></td>
            <td><div className="skeleton skeleton-price" /></td>
            <td><div className="skeleton skeleton-btn" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}