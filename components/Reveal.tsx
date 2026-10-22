"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Prvek, který při scrollu dolů přiletí ze strany (`from` left/right) nebo jen zespodu (`up`)
 * a zůstane mírně nakloněný (`rotate` ve stupních). `delay` posune začátek (postupné odkrývání
 * v mřížce). Co je při načtení už vidět, se neanimuje; bez JS a při omezení animací je prvek
 * vidět rovnou.
 */
export function Reveal({
  children,
  rotate = 0,
  from = "left",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  rotate?: number;
  from?: "left" | "right" | "up";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.dataset.reveal = "hidden";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        el.dataset.reveal = "shown";
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      delete el.dataset.reveal;
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`pp-reveal ${className}`}
      style={
        {
          "--rot": `${rotate}deg`,
          "--dx": from === "up" ? "0px" : from === "left" ? "-70px" : "70px",
          "--dy": from === "up" ? "36px" : "90px",
          transitionDelay: delay ? `${delay}ms` : undefined,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
