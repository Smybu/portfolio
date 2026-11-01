import './globals.css'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import ThemeMenu from '@/components/Theme/ThemeMenu'
import { I18nProvider } from '@/lib/i18nProvider'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import type { Metadata } from 'next'

export type langType =  "fr" | "en";

const supportedLangs: Set<langType> = new Set(["en", "fr"]);

function isLang(value: string): value is langType {
  return supportedLangs.has(value as langType);
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: string }>;
}>) {
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

const translations = {
  fr: {
    title: 'Mon portfolio - WAELES Swann',
    description: 'Bienvenue sur mon portfolio en français.',
  },
  en: {
    title: 'My portfolio - WAELES Swann',
    description: 'Welcome to my English portfolio.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const data = translations[lang as 'fr' | 'en']
  if (!data) notFound()

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
    },
  }
}

