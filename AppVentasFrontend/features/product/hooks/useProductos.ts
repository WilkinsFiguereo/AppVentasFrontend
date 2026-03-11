"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { Producto, VistaMode, OrdenCampo, OrdenDir } from "../types/productos.types";
import * as productApi from "../data/productApi";

interface UseProductosReturn {
  // State
  productos: Producto[];
  loading: boolean;
  error: string | null;
  search: string;
  categoriaActiva: string;
  vistaMode: VistaMode;
  ordenCampo: OrdenCampo;
  ordenDir: OrdenDir;
  toastVisible: boolean;
  toastMsg: string;
  productoSeleccionado: Producto | null;

  // Computed
  productosFiltrados: Producto[];

  // Actions
  setSearch: (v: string) => void;
  setCategoriaActiva: (v: string) => void;
  setVistaMode: (v: VistaMode) => void;
  toggleOrden: (campo: OrdenCampo) => void;
  showToast: (msg: string) => void;
  seleccionarProducto: (p: Producto | null) => void;

  // API helpers
  refreshProductos: () => Promise<void>;
  crearProducto: (p: Partial<Producto>) => Promise<void>;
  actualizarProducto: (id: string, p: Partial<Producto>) => Promise<void>;
  eliminarProducto: (id: string) => Promise<void>;
}

export function useProductos(): UseProductosReturn {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [vistaMode, setVistaMode] = useState<VistaMode>("tabla");
  const [ordenCampo, setOrdenCampo] = useState<OrdenCampo>("nombre");
  const [ordenDir, setOrdenDir] = useState<OrdenDir>("asc");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  const toggleOrden = useCallback(
    (campo: OrdenCampo) => {
      if (ordenCampo === campo) {
        setOrdenDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setOrdenCampo(campo);
        setOrdenDir("asc");
      }
    },
    [ordenCampo]
  );

  const refreshProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productApi.apiListProductos();
      setProductos(data);
    } catch (e: any) {
      const msg = e?.message ?? "Error al cargar productos";
      setError(msg);
      showToast(msg);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    refreshProductos();
  }, [refreshProductos]);

  const crearProducto = useCallback(
    async (p: Partial<Producto>) => {
      try {
        await productApi.apiCreateProducto(p);
        showToast("Producto creado");
        await refreshProductos();
      } catch (e: any) {
        showToast(e?.message ?? "Error al crear producto");
      }
    },
    [refreshProductos, showToast]
  );

  const actualizarProducto = useCallback(
    async (id: string, p: Partial<Producto>) => {
      try {
        await productApi.apiUpdateProducto(Number(id), p);
        showToast("Producto actualizado");
        await refreshProductos();
      } catch (e: any) {
        showToast(e?.message ?? "Error al actualizar producto");
      }
    },
    [refreshProductos, showToast]
  );

  const eliminarProducto = useCallback(
    async (id: string) => {
      try {
        await productApi.apiDeleteProducto(Number(id));
        showToast("Producto eliminado");
        await refreshProductos();
      } catch (e: any) {
        showToast(e?.message ?? "Error al eliminar producto");
      }
    },
    [refreshProductos, showToast]
  );

  const productosFiltrados = useMemo(() => {
    let lista = [...productos];

    // Filtro por búsqueda
    if (search) {
      const q = search.toLowerCase();
      lista = lista.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.proveedor.toLowerCase().includes(q)
      );
    }

    // Filtro por categoría
    if (categoriaActiva !== "Todas") {
      lista = lista.filter((p) => p.categoria === categoriaActiva);
    }

    // Ordenamiento
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
  }, [productos, search, categoriaActiva, ordenCampo, ordenDir]);

  return {
    productos,
    loading,
    error,
    search,
    categoriaActiva,
    vistaMode,
    ordenCampo,
    ordenDir,
    toastVisible,
    toastMsg,
    productoSeleccionado,
    productosFiltrados,
    setSearch,
    setCategoriaActiva,
    setVistaMode,
    toggleOrden,
    showToast,
    seleccionarProducto: setProductoSeleccionado,
    refreshProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
  };
}
