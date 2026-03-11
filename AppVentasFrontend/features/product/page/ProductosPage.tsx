"use client";

import React, { useState } from "react";
import { useProductos } from "../hooks/useProductos";
import { productosTheme as t, globalStyles } from "../theme/productos.theme";
import { Toast } from "../ui/ProductoCard";
import { ProductosHeaderSection } from "../sections/ProductosHeaderSection";
import { ProductosStatsSection } from "../sections/ProductosStatsSection";
import { ProductosTableSection } from "../sections/ProductosTableSection";
import { Modal } from "../../admin/users/ui/Modal";
import type { Producto, ProductCategory } from "../types/productos.types";

// Reutilizamos el Sidebar y los nav items del dashboard
import { Sidebar }   from "../../dashboard/dashboards";
import { NAV_ITEMS } from "../../dashboard/data/chart.data";

const defaultForm: Partial<Producto> = {
  nombre: "",
  sku: "",
  categoria: "Electrónica" as ProductCategory,
  stock: 0,
  precio: 0,
  costo: 0,
  proveedor: "",
};

export default function ProductosPage() {
  const {
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
    productosFiltrados,
    setSearch,
    setCategoriaActiva,
    setVistaMode,
    toggleOrden,
    showToast,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    refreshProductos,
  } = useProductos();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [formValues, setFormValues] = useState<Partial<Producto>>(defaultForm);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedProduct(null);
    setFormValues(defaultForm);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Producto) => {
    setModalMode("edit");
    setSelectedProduct(p);
    setFormValues({
      nombre: p.nombre,
      sku: p.sku,
      categoria: p.categoria,
      stock: p.stock,
      precio: p.precio,
      costo: p.costo,
      proveedor: p.proveedor,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setFormValues(defaultForm);
  };

  const exportCSV = () => {
    const headers = ["ID", "Nombre", "SKU", "Categoría", "Stock", "Precio", "Costo", "Margen", "Proveedor", "Última actualización"];
    const rows = productosFiltrados.map((p) => {
      const margen = p.precio !== 0 ? ((p.precio - p.costo) / p.precio) * 100 : 0;
      return [
        p.id,
        p.nombre,
        p.sku,
        p.categoria,
        String(p.stock),
        p.precio.toFixed(2),
        p.costo.toFixed(2),
        `${margen.toFixed(2)}%`,
        p.proveedor,
        p.ultimaActualizacion,
      ];
    });

    const content = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "productos.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const guardaryCerrar = async () => {
    if (!formValues.nombre?.trim()) {
      showToast("El nombre del producto es obligatorio");
      return;
    }

    const payload = {
      nombre: formValues.nombre,
      sku: formValues.sku || "",
      precio: Number(formValues.precio ?? 0),
      costo: Number(formValues.costo ?? 0),
      stock: Number(formValues.stock ?? 0),
      categoria: (formValues.categoria as ProductCategory) || "Electrónica",
      proveedor: formValues.proveedor || "",
    };

    try {
      if (modalMode === "create") {
        await crearProducto(payload);
        showToast("Producto creado correctamente");
      } else if (modalMode === "edit" && selectedProduct) {
        await actualizarProducto(selectedProduct.id, payload);
        showToast("Producto actualizado correctamente");
      }
      await refreshProductos();
      closeModal();
    } catch (error: any) {
      showToast(error?.message ?? "Error al guardar el producto");
    }
  };

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: t.bgMain, color: t.textPrimary,
    }}>
      <style>{globalStyles(t)}</style>

      {/* Sidebar compartido — pathname detecta automáticamente que estamos en /productos */}
      <Sidebar navItems={NAV_ITEMS} />

      <main style={{ flex: 1, overflow: "auto", padding: "32px" }}>
        <ProductosHeaderSection
          totalFiltrados={productosFiltrados.length}
          onAgregar={openCreateModal}
          onExportar={exportCSV}
        />
        <ProductosStatsSection productos={productos} />
        <ProductosTableSection
          productos={productosFiltrados}
          search={search}
          categoriaActiva={categoriaActiva}
          vistaMode={vistaMode}
          ordenCampo={ordenCampo}
          ordenDir={ordenDir}
          totalCount={productos.length}
          onSearchChange={setSearch}
          onCategoriaChange={setCategoriaActiva}
          onVistaModeChange={setVistaMode}
          onToggleOrden={toggleOrden}
          onView={(p) => showToast(`Viendo ${p.nombre}`)}
          onEdit={(p) => openEditModal(p)}
          onDelete={async (p) => {
            if (confirm(`Eliminar ${p.nombre}?`)) {
              await eliminarProducto(p.id);
            }
          }}
        />
        {loading && <p>Cargando productos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Modal
          open={isModalOpen}
          onClose={closeModal}
          title={modalMode === "create" ? "Agregar producto" : "Editar producto"}
          width={560}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              Nombre
              <input
                value={formValues.nombre ?? ""}
                onChange={(e) => setFormValues((s) => ({ ...s, nombre: e.target.value }))}
                type="text"
                autoFocus
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              SKU
              <input
                value={formValues.sku ?? ""}
                onChange={(e) => setFormValues((s) => ({ ...s, sku: e.target.value }))}
                type="text"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              Categoría
              <input
                value={formValues.categoria ?? "Electrónica"}
                onChange={(e) => setFormValues((s) => ({ ...s, categoria: e.target.value as ProductCategory }))}
                type="text"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              Proveedor
              <input
                value={formValues.proveedor ?? ""}
                onChange={(e) => setFormValues((s) => ({ ...s, proveedor: e.target.value }))}
                type="text"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              Precio
              <input
                value={formValues.precio ?? 0}
                onChange={(e) => setFormValues((s) => ({ ...s, precio: Number(e.target.value) || 0 }))}
                type="number"
                min={0}
                step="0.01"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              Costo
              <input
                value={formValues.costo ?? 0}
                onChange={(e) => setFormValues((s) => ({ ...s, costo: Number(e.target.value) || 0 }))}
                type="number"
                min={0}
                step="0.01"
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, gridColumn: "span 2" }}>
              Stock
              <input
                value={formValues.stock ?? 0}
                onChange={(e) => setFormValues((s) => ({ ...s, stock: Number(e.target.value) || 0 }))}
                type="number"
                min={0}
                step="1"
              />
            </label>
          </div>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" onClick={closeModal} className="btn-secondary">Cancelar</button>
            <button type="button" onClick={guardaryCerrar} className="btn-primary">
              {modalMode === "create" ? "Crear" : "Actualizar"}
            </button>
          </div>
        </Modal>
      </main>

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
}