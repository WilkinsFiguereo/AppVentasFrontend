// src/features/home/sections/Footer/Footer.tsx
import { T } from "../../theme/tokens";

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        paddingTop: 24,
        borderTop: `1px solid ${T.border}`,
        fontSize: 11,
        color: T.border,
      }}
    >
      © 2025 NexusStore · Plataforma empresarial de software y servicios
    </footer>
  );
}
