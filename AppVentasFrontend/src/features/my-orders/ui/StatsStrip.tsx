// src/features/my-orders/ui/StatsStrip.tsx

interface Props {
  total: number;
  pending: number;
  inTransit: number;
  delivered: number;
  spent: number;
}

const fmt = (n: number) => `$${(n / 1000).toFixed(1)}k`;

export function StatsStrip({ total, pending, inTransit, delivered, spent }: Props) {
  return (
    <div className="stats-strip">
      <div className="stat-item">
        <div className="stat-icon" style={{ background: "#eff6ff" }}>📦</div>
        <div>
          <p className="stat-num">{total}</p>
          <p className="stat-lbl">pedidos</p>
        </div>
      </div>
      <div className="stat-sep" />
      <div className="stat-item">
        <div className="stat-icon" style={{ background: "#fffbeb" }}>⏳</div>
        <div>
          <p className="stat-num">{pending}</p>
          <p className="stat-lbl">pendientes</p>
        </div>
      </div>
      <div className="stat-sep" />
      <div className="stat-item">
        <div className="stat-icon" style={{ background: "#eff6ff" }}>🚚</div>
        <div>
          <p className="stat-num">{inTransit}</p>
          <p className="stat-lbl">en camino</p>
        </div>
      </div>
      <div className="stat-sep" />
      <div className="stat-item">
        <div className="stat-icon" style={{ background: "#f0fdf4" }}>✅</div>
        <div>
          <p className="stat-num">{delivered}</p>
          <p className="stat-lbl">entregados</p>
        </div>
      </div>
      <div className="stat-sep" />
      <div className="stat-item">
        <div className="stat-icon" style={{ background: "#eff6ff" }}>💳</div>
        <div>
          <p className="stat-num">{fmt(spent)}</p>
          <p className="stat-lbl">gastado</p>
        </div>
      </div>
    </div>
  );
}