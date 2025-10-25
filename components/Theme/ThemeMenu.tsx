'use client'

import useOutsideClick from '@/hooks/useOutsideClick'
import { getDictionary } from '@/lib/i18n'
import { useI18n } from '@/lib/i18nProvider'
import { CheckIcon, CloseIcon } from '@/utils/icons'
import { useEffect, useState } from 'react'

const ThemeMenu = () => {
  const [theme, setTheme] = useState('dark')
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const menuRef = useOutsideClick(() => setShowThemeMenu(false))
  const { lang } = useI18n()
  const t = getDictionary(lang)

  // Mapping clé <-> nom affiché
  const themeOptions = [
    {
      key: 'light',
      name: t.theme_light,
      colors: ['#fff', '#250635', '#b288cc', '#7e3a9d', '#0f0115'],
    },
    {
      key: 'dark',
      name: t.theme_dark,
      colors: ['#0f0115', '#fff', '#a64ca6', '#d9c2e9', '#320a46'],
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') setTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const changeTheme = (key: string) => {
    if (typeof window !== 'undefined') {
      setTheme(key);
      localStorage.setItem('theme', key);
    }
  }

  return (
    <div ref={menuRef} className="fixed right-6 bottom-4 z-50 md:right-11 md:bottom-11">
      <div
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        className="bg-neutral cursor-pointer rounded-full p-1.5 md:p-2">
        <div className="bg-primary grid grid-cols-2 place-content-center gap-0.5 rounded-full p-1.5 md:p-2">
          <div className="size-[7px] rounded-t-full rounded-bl-full bg-[#fff] md:size-[10px]"></div>
          <div className="size-[7px] rounded-t-full rounded-br-full bg-[#0f0115] md:size-[10px]"></div>
          <div className="size-[7px] rounded-tl-full rounded-b-full bg-[#0f0115] md:size-[10px]"></div>
          <div className="size-[7px] rounded-tr-full rounded-b-full bg-[#FFF] md:size-[10px]"></div>
        </div>
      </div>

      {showThemeMenu && (
        <div className="bg-secondary animate-fade-in border-border absolute right-0 bottom-full mb-5 space-y-3 rounded-xl border p-3 md:space-y-4 md:p-5">
          <div className="text-primary-content border-border flex items-center justify-between border-b pb-3 md:pb-4">
            <span className="text-sm md:text-base">{t.theme_choice}</span>
            <CloseIcon
              onClick={() => setShowThemeMenu(false)}
              className="h-3 w-3 cursor-pointer md:h-4 md:w-4"
            />
          </div>

          {themeOptions.map(({ key, name, colors }) => (
            <div
              key={key}
              onClick={() => changeTheme(key)}
              style={{ background: colors[0], color: colors[1] }}
              className="flex min-w-48 cursor-pointer items-center justify-between rounded-lg p-2 md:min-w-60 md:rounded-xl md:p-4">
              <div className="flex items-end gap-1.5">
                <CheckIcon className={key === theme ? 'block' : 'hidden'} />
                <span className="text-sm md:text-base">{name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {colors.slice(1).map((color, idx) => (
                  <div
                    key={color + idx}
                    style={{ background: color }}
                    className="size-2 rounded-full md:size-3"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemeMenu
