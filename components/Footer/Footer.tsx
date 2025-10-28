"use client"
import { footerLinks, languages } from '@/appData'
import { socials } from '@/appData/personal'
import LanguageSelector from './LanguageSelector'
import { useI18n } from '@/lib/i18nProvider'
import { getDictionary } from '@/lib/i18n'


const Footer = () => {
  const { lang } = useI18n()
  const t = getDictionary(lang)
  return (
    <footer className="bg-secondary relative flex min-h-[400px] flex-col justify-between gap-20 overflow-hidden px-4 py-14 md:p-14">
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 items-start gap-12 pl-4 md:pl-0">
        <div className="flex flex-col gap-8 text-left">

          <div className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <a
                href={link.href}
                key={link.href}
                className="text-tertiary-content hover:text-neutral transition-colors duration-300 hover:underline">
                #{link.title[lang]}
              </a>
            ))}
          </div>
          <ul className="flex flex-row gap-4 mb-4 mt-4">
            {socials.map((item, index) => (
              <li key={index} className="cursor-pointer bg-transparent">
                <a
                  href={item.href} target="_blank" rel="noopener noreferrer"
                  className="text-neutral transition-color hover:text-neutral/50 h-full w-full duration-300">
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-tertiary-content text-s text-left">
            <span>© 2025 — Waeles Swann</span>  
          </p>
        </div>
        <div className="flex flex-col gap-6 pl-0 md:pl-12 text-left">
          <div>
            <h5 className="text-neutral mb-2 text-lg font-medium">{t.footer_contact}</h5>
            <a
              href="mailto:swaeles59@gmail.com"
              className="text-tertiary-content hover:text-neutral text-sm font-light transition-colors duration-300">
              swaeles59@gmail.com
            </a>
          </div>
          <div>
          </div>
          <div>
            <h5 className="text-neutral mb-2 text-lg font-medium">{t.footer_languages}</h5>
            <LanguageSelector current={lang} />
          </div>
        </div>
      </div>
      <div className="bg-neutral/4 absolute top-1/2 -right-[40%] z-0 h-[120dvw] w-[120dvw] -translate-y-1/2 rounded-full p-14 md:top-0 md:-right-[255px] md:-bottom-[450px] md:size-[1030px] md:-translate-y-0 md:p-20">
        <div className="bg-neutral/4 size-full rounded-full p-14 md:p-20">
          <div className="bg-neutral/5 size-full rounded-full" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
