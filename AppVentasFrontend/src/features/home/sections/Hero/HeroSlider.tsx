"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { fetchSlidesFromApi, SLIDES } from "../../data/slides";
import { T } from "../../theme/tokens";
import type { Slide } from "../../types/home.types";
import Button from "../../ui/Button";

function Arrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: "absolute",
        top: "50%",
        [dir === "left" ? "left" : "right"]: 14,
        transform: "translateY(-50%)",
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.18)",
        background: h ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background .18s",
      }}
    >
      {dir === "left" ? (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M8.5 2 3.5 6.5l5 4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M4.5 2 9.5 6.5l-5 4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>(SLIDES);
  const [cur, setCur] = useState(0);
  const [tx, setTx] = useState("0px");
  const [op, setOp] = useState(1);
  const [paused, setPaused] = useState(false);
  const lockRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const loadSlides = async () => {
      try {
        const apiSlides = await fetchSlidesFromApi(10);
        if (!cancelled && apiSlides.length > 0) {
          setSlides(apiSlides);
          setCur(0);
        }
      } catch {
        if (!cancelled) {
          setSlides(SLIDES);
        }
      }
    };

    loadSlides();

    return () => {
      cancelled = true;
    };
  }, []);

  const slideCount = useMemo(() => (slides.length > 0 ? slides.length : 1), [slides.length]);

  const animate = useCallback((nextIdx: number, d: number) => {
    if (lockRef.current) return;
    lockRef.current = true;

    setOp(0);
    setTx(d > 0 ? "-28px" : "28px");

    setTimeout(() => {
      setCur(nextIdx);
      setTx(d > 0 ? "28px" : "-28px");
      setOp(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTx("0px");
          setOp(1);
          setTimeout(() => {
            lockRef.current = false;
          }, 480);
        });
      });
    }, 280);
  }, []);

  const next = useCallback(() => animate((cur + 1) % slideCount, 1), [cur, slideCount, animate]);
  const back = useCallback(() => animate((cur - 1 + slideCount) % slideCount, -1), [cur, slideCount, animate]);
  const goTo = useCallback((i: number) => animate(i, i > cur ? 1 : -1), [cur, animate]);

  useEffect(() => {
    if (paused || slideCount <= 1) return;
    const id = setInterval(next, 5200);
    return () => clearInterval(id);
  }, [paused, next, slideCount]);

  const s = slides[cur] || SLIDES[0];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        height: "clamp(300px,42vw,460px)",
        background: "#0a1020",
        boxShadow: T.shadowHero,
      }}
    >
      {slides.map((sl, i) => (
        <div
          key={sl.id}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${sl.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === cur ? 1 : 0,
            transition: "opacity .75s ease",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(100deg, rgba(8,14,30,0.85) 0%, rgba(8,14,30,0.52) 48%, rgba(8,14,30,0.08) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(24px,4.5vw,52px)",
          maxWidth: 580,
        }}
      >
        <div
          style={{
            transition: "transform .44s cubic-bezier(.4,0,.2,1), opacity .44s ease",
            transform: `translateX(${tx})`,
            opacity: op,
          }}
        >
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "2.4px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>
            {s.eyebrow}
          </p>

          <h1 style={{ fontSize: "clamp(20px,3.6vw,38px)", fontWeight: 700, color: "#fff", lineHeight: 1.18, marginBottom: 14, letterSpacing: "-0.5px", whiteSpace: "pre-line" }}>
            {s.title}
          </h1>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.62)", lineHeight: 1.72, marginBottom: 26, maxWidth: 400 }}>{s.body}</p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button variant="white">{s.cta}</Button>
            <Button variant="ghost">{s.ctaSecondary}</Button>
          </div>
        </div>
      </div>

      {slideCount > 1 ? (
        <>
          <Arrow dir="left" onClick={back} />
          <Arrow dir="right" onClick={next} />

          <div style={{ position: "absolute", bottom: 20, right: 24, display: "flex", gap: 5, alignItems: "center" }}>
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                style={{
                  width: i === cur ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background: i === cur ? "#fff" : "rgba(255,255,255,0.3)",
                  transition: "all .3s ease",
                }}
              />
            ))}
          </div>
        </>
      ) : null}

      <div style={{ position: "absolute", bottom: 24, left: "clamp(24px,4.5vw,52px)", fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", letterSpacing: "1px" }}>
        {String(cur + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
      </div>
    </div>
  );
}
