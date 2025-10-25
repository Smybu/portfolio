import './globals.css'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import ThemeMenu from '@/components/Theme/ThemeMenu'
import { Fira_Code } from 'next/font/google'
import { I18nProvider } from '@/lib/i18nProvider'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

export type langType =  "fr" | "en";
const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

const supportedLangs: langType[] = ["en", "fr"];

function isLang(value: string): value is langType {
  return supportedLangs.includes(value as langType);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) {
    notFound()
  }

  return (
        <I18nProvider lang={lang}>
          <header>
            <Navbar/>
          </header>
          {children}
          <ThemeMenu />
          <Footer />
        </I18nProvider>
  )
}
