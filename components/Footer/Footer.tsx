"use client"
import { footerLinks } from '@/appData'
import { socials } from '@/appData/personal'
import useParallaxTilt from '@/hooks/useParallaxTilt'
import { getDictionary } from '@/lib/i18n'
import { useI18n } from '@/lib/i18nProvider'
import { useEffect, useRef, useState } from 'react'
import LanguageSelector from './LanguageSelector'
import { MailIcon } from '@/utils/icons'

const getSocialLabel = (href: string) => {
  try {
    return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    return href
  }
}

const Footer = () => {
  const { lang } = useI18n()
  const t = getDictionary(lang)

  const footerRef = useParallaxTilt<HTMLElement>()
  const contentRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="bg-secondary border-border relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden border-t px-4 py-14 md:p-14"
    >
      <div
        ref={contentRef}
        className={`relative z-20 grid w-full max-w-3xl grid-cols-1 items-start justify-items-center gap-12 md:grid-cols-2 motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
          revealed
            ? 'translate-y-0 opacity-100'
            : 'motion-safe:translate-y-6 motion-safe:opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-10 text-center">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
            {footerLinks.map((link) => (
              <a
                href={link.href}
                key={link.href}
                className="text-tertiary-content hover:text-neutral focus-visible:ring-accent relative rounded transition-colors duration-300 after:bg-accent after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:ring-2 focus-visible:outline-none"
              >
                #{link.title[lang]}
              </a>
            ))}
          </div>

          <ul className="flex flex-row flex-wrap justify-center gap-3">
            {socials.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={getSocialLabel(item.href)}
                  className="text-neutral border-border hover:bg-accent hover:border-accent hover:shadow-accent/30 focus-visible:ring-accent flex size-10 items-center justify-center rounded-full border bg-black/10 transition-all duration-200 hover:-translate-y-1 hover:text-white hover:shadow-lg focus-visible:ring-2 focus-visible:outline-none [&>svg]:size-5"
                >
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-tertiary-content text-center text-sm">
            <span>© {new Date().getFullYear()} — Waeles Swann</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center">
            <h5 className="text-neutral mb-3 text-lg font-semibold tracking-tight">
              {t.footer_contact}
            </h5>
            <a
              href="mailto:swaeles59@gmail.com"
              className="group text-tertiary-content hover:text-neutral focus-visible:ring-accent inline-flex items-center gap-3 rounded text-lg font-light transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none"
            >
              <MailIcon/>
              <span className="group-hover:underline group-hover:decoration-accent group-hover:underline-offset-4">
                swaeles59@gmail.com
              </span>
            </a>
          </div>

          <div className="flex flex-col items-center">
            <h5 className="text-neutral mb-3 text-lg font-semibold tracking-tight">
              {t.footer_languages}
            </h5>
            <div className="w-52 max-w-full text-left">
              <LanguageSelector current={lang} />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          transform:
            'translate3d(calc(var(--px, 0) * -24px), calc(var(--py, 0) * -24px), 0)',
        }}
      >
        <div className="bg-neutral/4 absolute top-1/2 -right-[40%] z-0 h-[120dvw] w-[120dvw] -translate-y-1/2 rounded-full p-14 md:top-0 md:-right-[255px] md:-bottom-[450px] md:size-[1030px] md:translate-y-0 md:p-20">
          <div className="bg-neutral/4 size-full rounded-full p-14 md:p-20">
            <div className="bg-neutral/5 size-full rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
