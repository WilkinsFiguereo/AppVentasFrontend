"use client";

import { useState, useCallback, useMemo } from "react";
import { FACTURAS_DATA, STATUS_MAP } from "../data/facturas.data";
import { Factura, OrdenCampo, OrdenDir, VistaMode } from "../types/facturas.types";

interface UseFacturasReturn {
  search: string;
  filtroActivo: string;
  vistaMode: VistaMode;
  ordenCampo: OrdenCampo;
  ordenDir: OrdenDir;
  toastVisible: boolean;
  toastMsg: string;
  facturasFiltradas: Factura[];
  setSearch: (v: string) => void;
  setFiltroActivo: (v: string) => void;
  setVistaMode: (v: VistaMode) => void;
  toggleOrden: (campo: OrdenCampo) => void;
  showToast: (msg: string) => void;
}

export function useFacturas(): UseFacturasReturn {
  const [search, setSearch] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("Todas");
  const [vistaMode, setVistaMode] = useState<VistaMode>("tabla");
  const [ordenCampo, setOrdenCampo] = useState<OrdenCampo>("fecha");
  const [ordenDir, setOrdenDir] = useState<OrdenDir>("desc");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  const toggleOrden = useCallback((campo: OrdenCampo) => {
    if (ordenCampo === campo) {
      setOrdenDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setOrdenCampo(campo);
      setOrdenDir("asc");
    }
  }, [ordenCampo]);

  const facturasFiltradas = useMemo(() => {
    let lista = [...FACTURAS_DATA];

    if (search) {
      const q = search.toLowerCase();
      lista = lista.filter(
        (f) =>
          f.numero.toLowerCase().includes(q) ||
          f.cliente.toLowerCase().includes(q) ||
          f.clienteEmail.toLowerCase().includes(q)
      );
    }

    if (filtroActivo !== "Todas") {
      const statusKey = STATUS_MAP[filtroActivo];
      lista = lista.filter((f) => f.status === statusKey);
    }

    lista.sort((a, b) => {
      let valA: string | number = a[ordenCampo];
      let valB: string | number = b[ordenCampo];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return ordenDir === "asc" ? -1 : 1;
      if (valA > valB) return ordenDir === "asc" ? 1 : -1;
      return 0;
    });

    return lista;
  }, [search, filtroActivo, ordenCampo, ordenDir]);

  return {
    search, filtroActivo, vistaMode,
    ordenCampo, ordenDir, toastVisible, toastMsg,
    facturasFiltradas,
    setSearch, setFiltroActivo, setVistaMode,
    toggleOrden, showToast,
  };
}