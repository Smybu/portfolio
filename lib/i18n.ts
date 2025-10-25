import { langType } from '@/app/[lang]/layout'
import en from '@/i18n/en.json'
import fr from '@/i18n/fr.json'

const dictionaries = {
  fr,
  en,
}

export const getDictionary = (lang: langType) => {
  return dictionaries[lang]
}
