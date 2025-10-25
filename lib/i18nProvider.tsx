'use client'

import { langType } from '@/app/[lang]/layout'
import { createContext, useContext } from 'react'

const I18nContext = createContext<{ lang: langType }>({ lang: 'fr' })

export const I18nProvider = ({
  lang,
  children,
}: {
  lang: langType
  children: React.ReactNode
}) => {
  return (
    <I18nContext.Provider value={{ lang }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
