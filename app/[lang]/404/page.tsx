"use client";

import { getDictionary } from "@/lib/i18n";
import { useI18n } from "@/lib/i18nProvider";
import Link from "next/link";

export default function NotFoundPage() {
  const { lang } = useI18n();
  const t = getDictionary(lang)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold">{t.error_404}</h1>
        <p className="text-2xl font-medium">
          {t.error_description}
        </p>
        <Link
          href={`/${lang}`}
          className="inline-block px-6 py-3 bg-secondary-content text-primary font-medium text-lg rounded-lg transition-colors"
        >
          {t.error_home}
        </Link>
      </div>
    </div>
  );
}
