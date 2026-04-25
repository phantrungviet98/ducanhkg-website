"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { localizedContent, type Locale } from "@/data/localized";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: (typeof localizedContent)[Locale];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "vi";

    const stored = window.localStorage.getItem("locale");
    return stored === "en" ? "en" : "vi";
  });

  const value = useMemo<LocaleContextValue>(() => {
    return {
      locale,
      setLocale: (nextLocale) => {
        setLocaleState(nextLocale);
        window.localStorage.setItem("locale", nextLocale);
        document.documentElement.lang = nextLocale;
      },
      content: localizedContent[locale]
    };
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }

  return context;
}
