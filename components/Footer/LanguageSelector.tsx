"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { languages } from "@/appData";

interface LanguageWithFlag {
  code: string;
  label: string;
  flag: string;
}

const languagesWithFlags: LanguageWithFlag[] = languages.map((lang) => {
  if ((lang as any).flag) return lang as LanguageWithFlag;
  if (lang.code === "fr") return { ...lang, flag: "🇫🇷" };
  if (lang.code === "en") return { ...lang, flag: "🇬🇧" };
  return { ...lang, flag: "🏳️" };
});

const getFlagSVG = (code: string) => {
  switch (code) {
    case "fr":
      return (
        <svg
          width="24"
          height="16"
          viewBox="0 0 24 16"
          style={{
            borderRadius: "3px",
            boxShadow: "0 0 1px #aaa",
            flexShrink: 0,
          }}
        >
          <rect width="8" height="16" fill="#0055A4" />
          <rect x="8" width="8" height="16" fill="#fff" />
          <rect x="16" width="8" height="16" fill="#EF4135" />
        </svg>
      );
    case "en":
      return (
        <svg
          width="24"
          height="16"
          viewBox="0 0 24 16"
          style={{
            borderRadius: "3px",
            boxShadow: "0 0 1px #aaa",
            flexShrink: 0,
          }}
        >
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#fff" strokeWidth="3" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.5" />
          <rect x="10" width="4" height="16" fill="#fff" />
          <rect y="6" width="24" height="4" fill="#fff" />
          <rect x="11" width="2" height="16" fill="#C8102E" />
          <rect y="7" width="24" height="2" fill="#C8102E" />
        </svg>
      );
    default:
      return null;
  }
};

type LanguageSelectorProps = {
  current: string;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ current }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const selected = languagesWithFlags.find((l) => l.code === current);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleSelect = (code: string) => {
    setOpen(false);
    if (code !== current) router.push(`/${code}`);
  };

  return (
    <div
      ref={ref}
      style={{ position: "relative", minWidth: 150, maxWidth: 140 }}
    >
      <button
        type="button"
        className="border border-gray-300 rounded px-3 py-1 bg-white flex items-center gap-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
        style={{
          color: "var(--gradient-start)",
        }}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected && getFlagSVG(selected.code)}
        <span>{selected?.label}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <ul
          className="absolute left-0 z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            color: "var(--gradient-start)",
          }}
          role="listbox"
        >
          {languagesWithFlags.map((lang) => (
            <li
              key={lang.code}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-purple-300 ${
                lang.code === current ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSelect(lang.code)}
              role="option"
              aria-selected={lang.code === current}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  handleSelect(lang.code);
              }}
            >
              {getFlagSVG(lang.code)}
              <span>{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
