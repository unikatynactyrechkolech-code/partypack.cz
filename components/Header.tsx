"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Img } from "@/components/Img";
import { nav, site } from "@/lib/site";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribe,
    () => window.scrollY > 40,
    () => false,
  );
  const solid = scrolled || open;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkBase = solid ? "text-ink-soft hover:text-ink" : "text-white/80 hover:text-white";
  const linkActive = solid ? "text-ink font-medium" : "text-white font-medium";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-white/90 text-ink backdrop-blur" : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center"
          aria-label="PARTYPACK – domů"
        >
          <Img
            k="2022/01/cropped-cropped-logo-znak-png-male"
            alt="PARTYPACK"
            className="h-7 w-auto"
            sizes="96px"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Hlavní navigace">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${active ? linkActive : linkBase}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className={`hidden text-sm font-medium lg:block xl:hidden 2xl:block ${
              solid ? "text-ink" : "text-white"
            }`}
          >
            {site.phone}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border xl:hidden ${
              solid ? "border-line text-ink" : "border-white/40 text-white"
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-px w-5 bg-current transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-px w-5 bg-current transition-transform ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`xl:hidden ${open ? "block" : "hidden"} border-t border-line bg-white text-ink`}
      >
        <nav
          className="mx-auto flex max-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col overflow-y-auto px-5 py-4 sm:px-8"
          aria-label="Mobilní navigace"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3 text-base text-ink last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-1 text-sm text-ink-soft">
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
