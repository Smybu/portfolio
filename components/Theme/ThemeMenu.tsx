"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { getDictionary } from "@/lib/i18n";
import { useI18n } from "@/lib/i18nProvider";
import { CheckIcon, CloseIcon, PaletteIcon } from "@/utils/icons";
import { useEffect, useState } from "react";

const ThemeMenu = () => {
  const [theme, setTheme] = useState("dark");
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const menuRef = useOutsideClick(() => setShowThemeMenu(false));
  const { lang } = useI18n();
  const t = getDictionary(lang);

  const closeLabel = lang === "fr" ? "Fermer" : "Close";

  const themeOptions = [
    {
      key: "light",
      name: t.theme_light,
      colors: ["#fff", "#250635", "#b288cc", "#7e3a9d", "#0f0115"],
    },
    {
      key: "dark",
      name: t.theme_dark,
      colors: ["#0f0115", "#fff", "#a64ca6", "#d9c2e9", "#320a46"],
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") setTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  const changeTheme = (key: string) => {
    if (typeof window !== "undefined") {
      setTheme(key);
      localStorage.setItem("theme", key);
    }
  };

  return (
    <div
      ref={menuRef}
      className="fixed right-6 bottom-4 z-50 md:right-11 md:bottom-11"
    >
      <button
        type="button"
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        aria-label={t.theme_choice}
        aria-expanded={showThemeMenu}
        className={`group bg-neutral text-primary focus-visible:ring-accent flex size-12 cursor-pointer items-center justify-center rounded-full shadow-lg shadow-black/30 transition-all duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:outline-none md:size-14 ${
          showThemeMenu ? "ring-accent ring-2" : ""
        }`}
      >
        <PaletteIcon />
      </button>

      {showThemeMenu && (
        <div className="bg-secondary animate-fade-in border-border absolute right-0 bottom-full mb-5 space-y-3 rounded-xl border p-3 md:space-y-4 md:p-5">
          <div className="text-primary-content border-border flex items-center justify-between border-b pb-3 md:pb-4">
            <span className="text-sm md:text-base">{t.theme_choice}</span>
            <button
              type="button"
              onClick={() => setShowThemeMenu(false)}
              aria-label={closeLabel}
              className="focus-visible:ring-accent hover:text-neutral cursor-pointer rounded p-1 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <CloseIcon className="h-3 w-3 md:h-4 md:w-4" />
            </button>
          </div>

          {themeOptions.map(({ key, name, colors }) => (
            <button
              type="button"
              key={key}
              onClick={() => changeTheme(key)}
              aria-pressed={key === theme}
              style={{ background: colors[0], color: colors[1] }}
              className="focus-visible:ring-accent flex w-full min-w-48 cursor-pointer items-center justify-between rounded-lg p-2 text-left focus-visible:ring-2 focus-visible:outline-none md:min-w-60 md:rounded-xl md:p-4"
            >
              <span className="flex items-end gap-1.5">
                <CheckIcon className={key === theme ? "block" : "hidden"} />
                <span className="text-sm md:text-base">{name}</span>
              </span>
              <span className="flex items-center gap-1.5">
                {colors.slice(1).map((color, idx) => (
                  <span
                    key={color + idx}
                    style={{ background: color }}
                    className="size-2 rounded-full md:size-3"
                  ></span>
                ))}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeMenu;
