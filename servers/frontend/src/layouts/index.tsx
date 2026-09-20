import type { ReactNode } from "react";

import { memo, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { Button, Flex, Text } from "@radix-ui/themes";
import { Appearance, AppearanceEnum, Language, LanguageEnum } from "nfx-ui/enums";
import { useSyncPreference } from "nfx-ui/hooks";
import { PreferenceStore, usePreferenceStore } from "nfx-ui/stores";

import { FileText, Folders, GraduationCap, Home, Info } from "@/assets/icons/lucide";
import { routerEventEmitter } from "@/events/router";
import { useBooksManifest } from "@/hooks/books";
import { ROUTES, chapterPath } from "@/navigations";
import { chapterLocale } from "@/utils/i18nContent";

interface DocsLayoutProps {
  children: ReactNode;
}

function LanguagePathSync() {
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
      if (state.language !== prev.language) {
        apply(state.language);
      }
    });
  }, [location.pathname, navigate]);

  return null;
}

function ChromeControls() {
  const { t } = useTranslation("common");
  const { syncPreference } = useSyncPreference();
  const language = usePreferenceStore((s) => s.language);
  const appearance = usePreferenceStore((s) => s.theme.appearance);
  const nextAppearance =
    appearance === AppearanceEnum.DARK ? AppearanceEnum.LIGHT : AppearanceEnum.DARK;

  return (
    <Flex align="center" gap="2">
      <Button
        size="1"
        variant="ghost"
        onClick={() =>
          syncPreference({
            language: Language(language === LanguageEnum.ZH ? LanguageEnum.EN : LanguageEnum.ZH),
          })
        }
      >
        {language === LanguageEnum.ZH ? "EN" : "中文"}
      </Button>
      <Button
        size="1"
        variant="ghost"
        onClick={() => syncPreference({ theme: { appearance: Appearance(nextAppearance) } })}
      >
        {t("theme.toggle")}
      </Button>
    </Flex>
  );
}

export const DocsLayout = memo(({ children }: DocsLayoutProps) => {
  const { t, i18n } = useTranslation("common");
  const locale = chapterLocale(i18n.language);
  const location = useLocation();
  const { data } = useBooksManifest();
  const chapters = data?.chapters ?? [];
  const year = new Date().getFullYear();

  const onHome = useCallback(() => {
    routerEventEmitter.navigateToHome();
  }, []);

  const chapterLinks = useMemo(
    () =>
      chapters.map((chapter) => ({
        to: chapterPath(locale, chapter.slug),
        label: chapter.title[locale],
      })),
    [chapters, locale],
  );

  return (
    <>
      <LanguagePathSync />
      <div className="docs-shell">
        <header className="docs-header">
          <button type="button" className="docs-brand" onClick={onHome}>
            <img src="/logo.ico" alt="NFX" width={28} height={28} />
            <span>
              <strong>NFX</strong>
              <em>Documentation</em>
            </span>
          </button>
          <ChromeControls />
        </header>
        <div className="docs-body">
          <nav className="docs-nav" aria-label="docs">
            <NavLink to={ROUTES.HOME} className="docs-nav-link" end>
              <Home size={16} />
              {t("nav.home")}
            </NavLink>
            <div className="docs-nav-group">
              <span className="docs-nav-label">
                <GraduationCap size={16} />
                {t("nav.chapters")}
              </span>
              {chapterLinks.map((item) => (
                <NavLink key={item.to} to={item.to} className="docs-nav-link docs-nav-link-child">
                  <FileText size={14} />
                  {item.label}
                </NavLink>
              ))}
            </div>
            <NavLink to={ROUTES.REPO} className="docs-nav-link">
              <Folders size={16} />
              {t("nav.repo")}
            </NavLink>
            <NavLink to={ROUTES.ABOUT} className="docs-nav-link">
              <Info size={16} />
              {t("nav.about")}
            </NavLink>
          </nav>
          <main className="docs-main" data-path={location.pathname}>
            {children}
          </main>
        </div>
        <footer className="docs-footer">
          <Text size="2" color="gray">
            © {year} {t("footer.copyright")}
          </Text>
          <Flex gap="4">
            <Link to={ROUTES.ABOUT}>{t("footer.about")}</Link>
            <a href="https://github.com/NebulaForgeX/NFX-Documentation" target="_blank" rel="noopener noreferrer">
              {t("footer.github")}
            </a>
          </Flex>
        </footer>
      </div>
    </>
  );
});

DocsLayout.displayName = "DocsLayout";
export default DocsLayout;
