// app/src/features/home/hooks/useHeroSlider.ts
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Slide } from "../types/home.types";

type UseHeroSliderOptions = {
  intervalMs?: number;
  exitMs?: number;
  enterLockMs?: number;
  shiftPx?: number;
};

export function useHeroSlider(slides: Slide[], opts: UseHeroSliderOptions = {}) {
  const {
    intervalMs = 5200,
    exitMs = 280,
    enterLockMs = 480,
    shiftPx = 28,
  } = opts;

  const [cur, setCur] = useState(0);
  const [tx, setTx] = useState("0px");
  const [op, setOp] = useState(1);
  const [paused, setPaused] = useState(false);

  const lockRef = useRef(false);

  const len = slides.length;

  const clampIndex = useCallback(
    (i: number) => {
      if (len <= 0) return 0;
      return ((i % len) + len) % len;
    },
    [len]
  );

  const animate = useCallback(
    (nextIdx: number, dir: number) => {
      if (len <= 0) return;
      if (lockRef.current) return;

      lockRef.current = true;

      // exit
      setOp(0);
      setTx(dir > 0 ? `-${shiftPx}px` : `${shiftPx}px`);

      const to = window.setTimeout(() => {
        const next = clampIndex(nextIdx);
        setCur(next);

        // pre-position for enter
        setTx(dir > 0 ? `${shiftPx}px` : `-${shiftPx}px`);
        setOp(0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTx("0px");
            setOp(1);

            window.setTimeout(() => {
              lockRef.current = false;
            }, enterLockMs);
          });
        });
      }, exitMs);

      return () => window.clearTimeout(to);
    },
    [clampIndex, enterLockMs, exitMs, len, shiftPx]
  );

  const next = useCallback(() => animate(cur + 1, 1), [animate, cur]);
  const back = useCallback(() => animate(cur - 1, -1), [animate, cur]);

  const goTo = useCallback(
    (i: number) => {
      const target = clampIndex(i);
      if (target === cur) return;
      animate(target, target > cur ? 1 : -1);
    },
    [animate, clampIndex, cur]
  );

  useEffect(() => {
    if (paused) return;
    if (len <= 1) return;

    const id = window.setInterval(() => {
      next();
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, len, next, paused]);

  const currentSlide = useMemo(() => slides[cur], [slides, cur]);

  return {
    cur,
    tx,
    op,
    paused,
    setPaused,
    currentSlide,
    next,
    back,
    goTo,
    total: len,
  };
}
