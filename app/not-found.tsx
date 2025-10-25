'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    
    if (segments.length > 0 && (segments[0] === 'fr' || segments[0] === 'en')) {
      router.push(`/${segments[0]}/404`);
    } else {
      const savedLang = localStorage.getItem('NEXT_LOCALE');
      const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
      const defaultLang = savedLang || browserLang;
      
      router.push(`/${defaultLang}/404`);
    }
  }, [pathname, router]);

  return null;
}
