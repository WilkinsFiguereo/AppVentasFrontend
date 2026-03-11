"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { T } from "../../theme/tokens";
import IconButton from "../../ui/IconButton";

const TOKEN_KEYS = ["access_token", "token", "auth_token"];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "6px 12px",
        borderRadius: 7,
        fontSize: 13,
        color: hovered ? T.text : T.sub,
        fontWeight: 500,
        textDecoration: "none",
        background: hovered ? T.bg : "transparent",
        transition: "all .15s",
      }}
    >
      {children}
    </Link>
  );
}

function hasSessionToken() {
  if (typeof window === "undefined") return false;
  return TOKEN_KEYS.some((key) => Boolean(localStorage.getItem(key)));
}

export default function Navbar({ cart }: { cart: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(() => hasSessionToken());
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(() => searchParams.get("q") ?? "");

  useEffect(() => {
    const syncSession = () => setIsLoggedIn(hasSessionToken());
    window.addEventListener("storage", syncSession);
    return () => window.removeEventListener("storage", syncSession);
  }, []);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const logout = () => {
    ["access_token", "auth_token", "token", "refresh_token", "user_id"].forEach((key) =>
      localStorage.removeItem(key),
    );

    setIsLoggedIn(false);
    setMenuOpen(false);
    router.push("/navigation/auth/login");
  };

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchValue.trim();
    router.push(query ? `/navigation/search?q=${encodeURIComponent(query)}` : "/navigation/search");
  }

  /* ───────────────── ICONS ───────────────── */

  const UserIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="7"
        r="4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );

  const CartIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="17" cy="20" r="1.5" fill="currentColor" />
      <path
        d="M3 4H5L7 16H19L21 8H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 200,
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <div
        style={{
          maxWidth: T.container,
          margin: "0 auto",
          padding: `0 ${T.padX}`,
          height: 60,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* LOGO */}
        <Link
          href="/navigation/home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            textDecoration: "none",
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>
            Nexus<span style={{ color: T.accentMid, fontWeight: 400 }}>Store</span>
          </span>
        </Link>

        {/* NAV */}
        <nav style={{ display: "flex", gap: 2, marginLeft: 8 }}>
          <NavLink href="/navigation/home">Inicio</NavLink>
          <NavLink href="/navigation/search">Productos</NavLink>
          <NavLink href="/navigation/offers">Ofertas</NavLink>
        </nav>

        {/* SEARCH */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            flex: 1,
            maxWidth: 320,
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: T.bg,
            border: `1px solid ${T.border}`,
            borderRadius: 9,
            padding: "0 12px",
          }}
        >
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Buscar productos..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 13,
              color: T.text,
              padding: "9px 0",
            }}
          />
        </form>

        {/* PROFILE + CART */}
        <div ref={menuRef} style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
          {isLoggedIn ? (
            <IconButton
              title="Perfil"
              onClick={() => setMenuOpen((prev) => !prev)}
              icon={UserIcon}
            />
          ) : (
            <button
              onClick={() => router.push("/navigation/auth/login")}
              style={{
                border: "none",
                background: "transparent",
                color: T.accentMid,
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Inicia sesión
            </button>
          )}

          <IconButton
            badge={cart}
            title="Carrito"
            onClick={() => router.push("/navigation/cart")}
            icon={CartIcon}
          />

          {isLoggedIn && menuOpen && (
            <div
              style={{
                position: "absolute",
                top: 42,
                right: 0,
                minWidth: 180,
                background: "#fff",
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                boxShadow: "0 10px 25px rgba(15,23,42,0.1)",
                padding: 6,
                zIndex: 30,
              }}
            >
              <button
                style={{
                  width: "100%",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "10px 12px",
                  fontSize: 13,
                  borderRadius: 8,
                }}
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/navigation/account");
                }}
              >
                Mi cuenta
              </button>

              <button
                style={{
                  width: "100%",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "10px 12px",
                  fontSize: 13,
                  borderRadius: 8,
                }}
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/navigation/orders");
                }}
              >
                Mis pedidos
              </button>

              <div style={{ height: 1, background: T.border, margin: "6px 0" }} />

              <button
                style={{
                  width: "100%",
                  textAlign: "left",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "10px 12px",
                  fontSize: 13,
                  borderRadius: 8,
                  color: "#B91C1C",
                }}
                onClick={logout}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}