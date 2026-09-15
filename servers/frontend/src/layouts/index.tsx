import type { SidebarMenuItem } from "nfx-ui/layouts";
import type { ReactNode } from "react";

import { memo, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router";
import { Flex, Link as RadixLink, Logo, PreferencesPopover, Text } from "nfx-ui/components";
import { LayoutFrame } from "nfx-ui/layouts";
import { PreferenceStore } from "nfx-ui/stores";

import { FileText, Folders, GraduationCap, Home, Info } from "@/assets/icons/lucide";
import { routerEventEmitter } from "@/events/router";
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

function RightContainer() {
  return (
    <Flex align="center" justify="end" width="100%">
      <PreferencesPopover />
    </Flex>
  );
}

function FooterContent() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <Flex justify="between" align="center" wrap="wrap" gap="3" width="100%">
      <Text size="2" color="gray">
        © {year} {t("footer.copyright")}
      </Text>
      <Flex gap="4" align="center">
        <RadixLink asChild size="2">
          <Link to={ROUTES.ABOUT}>{t("footer.about")}</Link>
        </RadixLink>
        <RadixLink size="2" href="https://github.com/NebulaForgeX/NFX-Documentation" target="_blank" rel="noopener noreferrer">
          {t("footer.github")}
        </RadixLink>
      </Flex>
    </Flex>
  );
}

function useSidebarItems(): SidebarMenuItem[] {
  const { t, i18n } = useTranslation("common");
  const locale = chapterLocale(i18n.language);

  return useMemo(() => {
    const chapters = [
      { id: t("chapterList.chapter01.id"), title: t("chapterList.chapter01.title") },
      { id: t("chapterList.chapter02.id"), title: t("chapterList.chapter02.title") },
      { id: t("chapterList.chapter03.id"), title: t("chapterList.chapter03.title") },
      { id: t("chapterList.chapter04.id"), title: t("chapterList.chapter04.title") },
      { id: t("chapterList.chapter05.id"), title: t("chapterList.chapter05.title") },
    ];

    return [
      { label: t("nav.home"), path: ROUTES.HOME, icon: <Home size={20} /> },
      {
        label: t("nav.chapters"),
        path: chapterPath(locale, chapters[0].id),
        icon: <GraduationCap size={20} />,
        children: chapters.map((chapter) => ({
          label: chapter.title,
          path: chapterPath(locale, chapter.id),
          icon: <FileText size={18} />,
        })),
      },
      { label: t("nav.repo"), path: ROUTES.REPO, icon: <Folders size={20} /> },
      { label: t("nav.about"), path: ROUTES.ABOUT, icon: <Info size={20} /> },
    ];
  }, [t, locale]);
}

export const DocsLayout = memo(({ children }: DocsLayoutProps) => {
  const location = useLocation();
  const sidebarItems = useSidebarItems();

  const onSidebarNavigate = useCallback((path: string) => {
    routerEventEmitter.navigate({ to: path });
  }, []);

  return (
    <>
      <LanguagePathSync />
      <LayoutFrame
        headerLeft={
          <Logo
            src="/logo.ico"
            title="NFX"
            subtitle="Documentation"
            alt="NFX"
            onClick={() => routerEventEmitter.navigateToHome()}
          />
        }
        headerRight={<RightContainer />}
        footerContent={<FooterContent />}
        sidebarItems={sidebarItems}
        sidebarCurrentPathname={location.pathname}
        onSidebarNavigate={onSidebarNavigate}
      >
        {children}
      </LayoutFrame>
    </>
  );
});

DocsLayout.displayName = "DocsLayout";
export default DocsLayout;
