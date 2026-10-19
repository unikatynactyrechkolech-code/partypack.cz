"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Img } from "@/components/Img";
import { CloseIcon, MenuIcon, SocialLinks } from "@/components/icons";
import { primaryNav, secondaryNav, site } from "@/lib/site";

const LOGO = "2022/01/cropped-cropped-logo-znak-png-male";

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
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const trigger = openButton.current;
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "border-b border-line bg-white/90 text-ink backdrop-blur" : "bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
          <Link href="/" className="flex items-center" aria-label="PARTYPACK – domů">
            <Img k={LOGO} alt="PARTYPACK" className="h-7 w-auto sm:h-8" sizes="120px" priority />
          </Link>
          <button
            ref={openButton}
            type="button"
            onClick={() => setOpen(true)}
            className="group -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Otevřít menu"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-0 z-[60] flex flex-col bg-white text-ink transition-[opacity,visibility] duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl shrink-0 items-center justify-between px-5 sm:h-20 sm:px-8">
          <Link href="/" onClick={close} className="flex items-center" aria-label="PARTYPACK – domů">
            <Img k={LOGO} alt="PARTYPACK" className="h-7 w-auto sm:h-8" sizes="120px" />
          </Link>
          <button
            ref={closeButton}
            type="button"
            onClick={close}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Zavřít menu"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-12 pt-6 sm:px-8 lg:min-h-full lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-12">
            <nav aria-label="Služby" className="lg:col-span-7">
              <ul className="space-y-1 sm:space-y-2">
                {primaryNav.map((item, i) => (
                  <li
                    key={item.href}
                    style={{ transitionDelay: open ? `${60 + i * 50}ms` : "0ms" }}
                    className={`transition-[opacity,transform] duration-500 ${
                      open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="group inline-flex items-center gap-4 py-1 text-[2rem] font-semibold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                    >
                      <span
                        aria-hidden
                        className={`h-[3px] rounded-full bg-accent transition-[width] duration-300 ${
                          isActive(item.href) ? "w-8" : "w-0 group-hover:w-8"
                        }`}
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              style={{ transitionDelay: open ? "320ms" : "0ms" }}
              className={`transition-[opacity,transform] duration-500 lg:col-span-5 lg:border-l lg:border-line lg:pl-16 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <nav aria-label="Další stránky">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-4 lg:grid-cols-1">
                  {secondaryNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`text-xl font-medium sm:text-2xl ${
                          isActive(item.href) ? "underline decoration-accent decoration-2 underline-offset-8" : "hover:underline hover:underline-offset-8"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-10 border-t border-line pt-8 text-base">
                <ul className="space-y-2">
                  <li>
                    <a href={site.phoneHref} className="font-medium hover:underline hover:underline-offset-4">
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.email}`} className="font-medium hover:underline hover:underline-offset-4">
                      {site.email}
                    </a>
                  </li>
                  <li>{site.address}</li>
                </ul>
                <SocialLinks facebook={site.facebook} instagram={site.instagram} className="mt-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
