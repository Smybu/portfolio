"use client";

import { getDictionary } from "@/lib/i18n";
import { useI18n } from "@/lib/i18nProvider";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const progressRef = useRef<HTMLDivElement>(null);

  const { lang } = useI18n();
  const t = getDictionary(lang);

  const navItems = [
    { id: "experiences", label: t.navbar_experiences },
    { id: "skills", label: t.navbar_skills },
    { id: "studies", label: t.navbar_studies },
    { id: "projects", label: t.navbar_projects },
  ].map((item) => ({ ...item, href: `/${lang}#${item.id}` }));

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(y > 8);
      if (y < 100) setActiveId("");

      if (progressRef.current) {
        const ratio = max > 0 ? Math.min(1, y / max) : 0;
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const sections = ["experiences", "skills", "studies", "projects"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) closeMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onBreakpoint);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onBreakpoint);
    };
  }, [isOpen]);

  const menuLabel =
    lang === "fr"
      ? isOpen
        ? "Fermer le menu"
        : "Ouvrir le menu"
      : isOpen
        ? "Close menu"
        : "Open menu";

  return (
    <nav className="border-border sticky top-0 isolate z-40 h-16 border-b">
      <div
        aria-hidden="true"
        className={`bg-primary/80 absolute inset-0 -z-10 backdrop-blur-md transition-shadow duration-300 ${
          scrolled || isOpen ? "shadow-lg shadow-black/20" : "shadow-none"
        }`}
      />

      <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-4 py-1">
        <Link
          href={`/${lang}`}
          onClick={closeMenu}
          className="group text-primary-content hover:text-neutral focus-visible:ring-accent flex items-center gap-3 rounded-lg transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none"
        >
          <Logo aria-hidden="true" />
          <span className="after:bg-accent relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100">
            Swann Waeles
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={menuLabel}
          aria-expanded={isOpen}
          aria-controls="main-menu"
          className="text-primary-content hover:text-neutral focus-visible:ring-accent relative size-10 cursor-pointer rounded-lg transition-colors focus-visible:ring-2 focus-visible:outline-none md:hidden"
        >
          <span
            className={`absolute right-2 left-2 block h-0.5 rounded-full bg-current transition-all duration-300 ${
              isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-3"
            }`}
          />
          <span
            className={`absolute top-1/2 right-2 left-2 block h-0.5 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ${
              isOpen ? "scale-x-0 opacity-0" : ""
            }`}
          />
          <span
            className={`absolute right-2 left-2 block h-0.5 rounded-full bg-current transition-all duration-300 ${
              isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-3"
            }`}
          />
        </button>

        <ul
          id="main-menu"
          className={`bg-primary/95 fixed inset-x-0 top-16 bottom-0 z-30 flex flex-col overflow-y-auto backdrop-blur-lg transition-all duration-300 ease-out md:pointer-events-auto md:visible md:static md:z-auto md:h-full md:w-[72%] md:translate-y-0 md:flex-row md:overflow-visible md:bg-transparent md:opacity-100 md:backdrop-blur-none lg:w-[70%] ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-2 opacity-0"
          }`}
        >
          {navItems.map(({ id, label, href }, i) => {
            const isActive = activeId === id;
            return (
              <li
                key={id}
                onClick={closeMenu}
                style={{ transitionDelay: isOpen ? `${80 + i * 60}ms` : "0ms" }}
                className={`border-border flex items-center border-b px-4 text-2xl transition-all duration-300 md:translate-x-0 md:border-y-0 md:border-e md:text-base md:opacity-100 md:first:border-s lg:px-8 ${
                  isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                }`}
              >
                <Link
                  href={href}
                  aria-current={isActive ? "location" : undefined}
                  className={`after:bg-accent focus-visible:ring-accent relative flex h-full w-full items-center py-7 transition-colors duration-200 hover:text-neutral focus-visible:ring-2 focus-visible:outline-none md:py-0 md:after:absolute md:after:bottom-0 md:after:left-0 md:after:h-0.5 md:after:w-full md:after:origin-left md:after:transition-transform md:after:duration-300 md:hover:after:scale-x-100 ${
                    isActive
                      ? "text-accent md:text-neutral md:after:scale-x-100"
                      : "text-primary-content md:after:scale-x-0"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        ref={progressRef}
        aria-hidden="true"
        className="bg-accent absolute inset-x-0 bottom-0 h-0.5 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </nav>
  );
};

export default Navbar;
