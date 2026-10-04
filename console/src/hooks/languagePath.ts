import { useEffect } from "react";
import { PreferenceStore } from "nfx-ui/stores";
import { useLocation, useNavigate } from "react-router";

import { chapterLocale } from "@/utils/i18nContent";

export function useLanguagePathSync() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const apply = (language: string) => {
      const locale = chapterLocale(language);
      const match = location.pathname.match(/^\/(zh|en)(\/chapter-.*)$/);
      if (match && match[1] !== locale) {
        navigate(`/${locale}${match[2]}`, { replace: true });
      }
    };

    apply(PreferenceStore.getState().language);
    return PreferenceStore.subscribe((state, prev) => {
      if (state.language !== prev.language) apply(state.language);
    });
  }, [location.pathname, navigate]);
}
