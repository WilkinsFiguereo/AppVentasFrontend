// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "NexusStore",
  description: "Home de ventas / SaaS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
