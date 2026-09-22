"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: "en", setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bk_lang") as Lang | null;
      if (stored === "en" || stored === "hy" || stored === "ru") setLangState(stored);
    } catch {
      // localStorage unavailable (private browsing, etc.) — default stands.
    }
  }, []);

  function setLang(next: Lang) {
    setLangState(next);
    try {
      localStorage.setItem("bk_lang", next);
    } catch {
      // best-effort persistence only
    }
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
