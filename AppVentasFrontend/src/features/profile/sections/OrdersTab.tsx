import { Order } from "../types/profile.types";
import { MOCK_ORDERS } from "../data/mockProfile";

const STATUS_MAP = {
  completed:  { label: "Completado", cls: "status-completed",  cta: "Ver detalle" },
  shipped:    { label: "En camino",  cls: "status-shipped",    cta: "Rastrear"    },
  processing: { label: "Procesando", cls: "status-processing", cta: "Ver detalle" },
  cancelled:  { label: "Cancelado",  cls: "status-cancelled",  cta: "Ver detalle" },
};

export function OrdersTab() {
  const orders: Order[] = MOCK_ORDERS;

  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <div className="section-title">Mis pedidos</div>
          <div className="section-sub">Historial de compras y estado de envíos</div>
        </div>
      </div>
      <div className="section-body p-0">
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
                  <td className="order-price">
                    ${order.total.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
                  </td>
                  <td>
                    <button className="btn-view">{s.cta}</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}