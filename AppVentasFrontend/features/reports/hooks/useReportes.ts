"use client";

import { useState } from "react";
import { PeriodoFiltro } from "../types/reportes.types";
import { DATOS_GRAFICA } from "../data/reportes.data";
import { PuntoGrafica } from "../types/reportes.types";

interface UseReportesReturn {
  periodo: PeriodoFiltro;
  toastVisible: boolean;
  toastMsg: string;
  datosGrafica: PuntoGrafica[];
  setPeriodo: (p: PeriodoFiltro) => void;
  showToast: (msg: string) => void;
}

export function useReportes(): UseReportesReturn {
  const [periodo, setPeriodo] = useState<PeriodoFiltro>("30d");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return {
    periodo,
    toastVisible,
    toastMsg,
    datosGrafica: DATOS_GRAFICA[periodo],
    setPeriodo,
    showToast,
  };
}