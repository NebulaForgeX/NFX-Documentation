import type { ReactNode } from "react";

import { memo, useCallback, useEffect, useMemo } from "react";
import { Button, Container, Flex, Section, Text } from "@radix-ui/themes";
import { Appearance, AppearanceEnum, Language, LanguageEnum } from "nfx-ui/enums";
import { useResolvedAppearance, useSyncPreference } from "nfx-ui/hooks";
import { PreferenceStore, usePreferenceStore } from "nfx-ui/stores";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useNavigate } from "react-router";

import { FileText, Folders, Home, Info, Network } from "@/assets/icons/lucide";
import { getLogoSrc } from "@/constants";
import { routerEventEmitter } from "@/events/router";
import { useBooksManifest } from "@/hooks/books";
import { ROUTES, chapterPath } from "@/navigations";
import { chapterLocale } from "@/utils/i18nContent";

import styles from "./s.module.css";

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
  const nextAppearance = appearance === AppearanceEnum.DARK ? AppearanceEnum.LIGHT : AppearanceEnum.DARK;

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
      <Button size="1" variant="ghost" onClick={() => syncPreference({ theme: { appearance: Appearance(nextAppearance) } })}>
        {t("theme.toggle")}
      </Button>
    </Flex>
  );
}

function NavItem({ to, end, icon, children, inset = false }: { to: string; end?: boolean; icon: ReactNode; children: ReactNode; inset?: boolean }) {
  return (
    <NavLink to={to} end={end} className={styles.link}>
      {({ isActive }) => (
        <Section size="1" py="2" className={isActive ? styles.active : undefined}>
          <Container px={inset ? "5" : "3"}>
            <Flex align="center" gap="2">
              {icon}
              <Text size="2">{children}</Text>
            </Flex>
          </Container>
        </Section>
      )}
    </NavLink>
  );
}

export const DocsLayout = memo(({ children }: DocsLayoutProps) => {
  const { t, i18n } = useTranslation("common");
  const appearance = useResolvedAppearance();
  const locale = chapterLocale(i18n.language);
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
      <Flex direction="column" className={styles.frame}>
        <a className={styles.skip} href="#docs-main">
          {t("skip")}
        </a>
        <Section size="1" py="3" className={styles.bar}>
          <Container size="4" px="4">
            <Flex align="center" justify="between" gap="3">
              <Button variant="ghost" onClick={onHome}>
                <Flex align="center" gap="3">
                  <Flex align="center" justify="center" className={styles.mark}>
                    <img src={getLogoSrc(appearance)} alt="NFX" />
                  </Flex>
                  <Flex direction="column" align="start" gap="0">
                    <Text weight="bold">NFX</Text>
                    <Text size="1" color="gray">
                      Documentation
                    </Text>
                  </Flex>
                </Flex>
              </Button>
              <ChromeControls />
            </Flex>
          </Container>
        </Section>
        <Flex direction={{ initial: "column", md: "row" }} className={styles.body}>
          <Flex direction="column" className={styles.nav}>
            <Flex direction="column" className={styles.navScroll}>
              <Section size="1" py="3">
                <Flex direction="column" gap="1">
                  <NavItem to={ROUTES.HOME} end icon={<Home size={16} />}>
                    {t("nav.home")}
                  </NavItem>
                  <NavItem to={ROUTES.ARCHITECTURE} icon={<Network size={16} />}>
                    {t("nav.architecture")}
                  </NavItem>
                  <Section size="1" py="2">
                    <Container px="3">
                      <Text size="1" weight="bold" color="gray">
                        {t("nav.chapters")}
                      </Text>
                    </Container>
                  </Section>
                  {chapterLinks.map((item) => (
                    <NavItem key={item.to} to={item.to} inset icon={<FileText size={14} />}>
                      {item.label}
                    </NavItem>
                  ))}
                  <NavItem to={ROUTES.REPO} icon={<Folders size={16} />}>
                    {t("nav.repo")}
                  </NavItem>
                  <NavItem to={ROUTES.ABOUT} icon={<Info size={16} />}>
                    {t("nav.about")}
                  </NavItem>
                </Flex>
              </Section>
            </Flex>
            <Section size="1" py="3" className={styles.foot}>
              <Container px="3">
                <Flex direction="column" gap="2">
                  <Text size="1" color="gray">
                    © {year} {t("footer.copyright")}
                  </Text>
                  <Flex gap="3">
                    <Link to={ROUTES.ABOUT} className={styles.flat}>
                      {t("footer.about")}
                    </Link>
                    <a href="https://github.com/NebulaForgeX/NFX-Documentation" target="_blank" rel="noopener noreferrer" className={styles.flat}>
                      {t("footer.github")}
                    </a>
                  </Flex>
                </Flex>
              </Container>
            </Section>
          </Flex>
          <Flex id="docs-main" direction="column" className={styles.main}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
});

DocsLayout.displayName = "DocsLayout";
export default DocsLayout;
