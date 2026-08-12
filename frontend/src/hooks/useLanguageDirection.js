import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * useLanguageDirection
 * Sets document.documentElement.dir and document.documentElement.lang
 * based on the current i18n language. Call once at the root App level
 * so RTL/LTR applies globally to every route.
 */
export function useLanguageDirection() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language || "en";
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [i18n.language]);
}
