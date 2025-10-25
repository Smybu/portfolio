'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BurgerIcon, CloseIcon } from '../../utils/icons'
import Logo from './Logo'
import { langType } from '@/app/[lang]/layout'
import { getDictionary } from '@/lib/i18n'
import { useI18n } from '@/lib/i18nProvider'

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname();
  const { lang } = useI18n()
    const t = getDictionary(lang)

  const navItems = [
  {
    label: t.navbar_home,
    href: `/${lang}`,
  },
  {
    label: t.navbar_projects,
    href: `/${lang}#projects`,
  },
  {
    label: t.navbar_services,
    href: `/${lang}#services`,
  },
]

  const toggleMenu = () => {
    setIsVisible(!isVisible)
  }

  return (
    <nav className="bg-primary border-border h-16 overflow-hidden border-b">
      <div className="mx-auto flex h-full w-dvw max-w-[1200px] items-center justify-between px-4 py-1">
        {isVisible ? (
          <div className="text-primary-content md:hidden">Menu</div>
        ) : (
          <Link href={`/${lang}`}>
            <div className="animate-fade-up text-primary-content relative flex items-center gap-3 transition-all duration-300 md:static">
              <Logo />
              <span className="text-primary-content">Swann Waeles</span>
            </div>
          </Link>
        )}

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isVisible ? (
              <CloseIcon className="text-primary-content" />
            ) : (
              <BurgerIcon className="text-primary-content" />
            )}
          </button>
        </div>

        <ul
          className={`${isVisible ? 'flex' : 'hidden'} animate-fade-in bg-primary absolute top-16 left-0 z-10 h-dvh w-dvw flex-col md:static md:top-0 md:flex md:h-full md:w-[72%] md:flex-row lg:w-[70%]`}>
          {navItems.map(({ label, href }) => (
            <li
              key={href}
              onClick={() => setIsVisible(false)}
              className="border-border flex items-center border-b px-4 text-2xl md:border-y-0 md:border-e md:text-base md:first:border-s lg:px-8">
              <Link
                href={href}
                className={`text-primary-content hover:text-neutral w-full py-7 transition-all duration-150 md:py-0`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
