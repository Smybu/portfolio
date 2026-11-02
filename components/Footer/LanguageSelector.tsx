"use client";
import { languages } from "@/appData";
import { ArrowIcon, CheckIcon, EnglishIcon, FrenchIcon } from "@/utils/icons";
import { useRouter } from "next/navigation";
import React, {
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

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

const getFlag = (code: string, emoji: string) => {
  switch (code) {
    case "fr":
      return <FrenchIcon />;
    case "en":
      return <EnglishIcon />;
    default:
      return (
        <span aria-hidden="true" className="w-6 text-center leading-none">
          {emoji}
        </span>
      );
  }
};

type LanguageSelectorProps = {
  current: string;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ current }) => {
  const router = useRouter();
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedIndex = Math.max(
    0,
    languagesWithFlags.findIndex((l) => l.code === current),
  );
  const selected = languagesWithFlags[selectedIndex];

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  const optionId = (i: number) => `${listId}-option-${i}`;

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const openMenu = () => {
    setActiveIndex(selectedIndex);
    setOpen(true);
  };

  const handleSelect = (code: string) => {
    setOpen(false);
    buttonRef.current?.focus();
    if (code !== current) router.push(`/${code}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = languagesWithFlags.length - 1;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openMenu();
        else setActiveIndex((i) => (i >= last ? 0 : i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openMenu();
        else setActiveIndex((i) => (i <= 0 ? last : i - 1));
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(last);
        }
        break;
      case "Enter":
      case " ":
        if (open) {
          e.preventDefault();
          handleSelect(languagesWithFlags[activeIndex].code);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-w-40 max-w-52">
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(activeIndex) : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className={`bg-primary text-neutral focus-visible:ring-accent flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none ${
          open ? "border-accent" : "border-border hover:border-accent/60"
        }`}
      >
        {selected && getFlag(selected.code, selected.flag)}
        <span className="flex-1 text-left">{selected?.label}</span>
        <ArrowIcon open={open} />
      </button>

      <ul
        id={listId}
        role="listbox"
        className={`bg-primary border-border absolute left-0 z-30 mt-2 w-full origin-top overflow-hidden rounded-xl border p-1 shadow-xl shadow-black/30 transition-all duration-200 ease-out ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible -translate-y-1 scale-95 opacity-0"
        }`}
      >
        {languagesWithFlags.map((lang, i) => {
          const isSelected = lang.code === current;
          return (
            <li
              key={lang.code}
              id={optionId(i)}
              role="option"
              aria-selected={isSelected}
              tabIndex={-1}
              onClick={() => handleSelect(lang.code)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(lang.code);
                }
              }}
              onMouseEnter={() => setActiveIndex(i)}
              className={`text-neutral flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
                i === activeIndex ? "bg-accent/20" : ""
              } ${isSelected ? "font-semibold" : ""}`}
            >
              {getFlag(lang.code, lang.flag)}
              <span className="flex-1">{lang.label}</span>
              {isSelected && <CheckIcon />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSelector;
