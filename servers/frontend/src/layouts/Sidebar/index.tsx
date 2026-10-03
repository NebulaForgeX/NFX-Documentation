import type { AnimatedIconComponent } from "nfx-ui/icons";
import type { ReactNode } from "react";

import { useEffect, useRef, useState } from "react";
import { Box, Container, Flex, IconButton, Section, Text } from "@radix-ui/themes";
import { LayoutGroup, MotionConfig } from "motion/react";
import {
  AnimatedIcon,
  ArrowNarrowLeftIcon,
  ArrowNarrowUpIcon,
  BookIcon,
  DownChevron,
  InfoCircleIcon,
  LayersIcon,
  LayoutDashboardIcon,
  RightChevron,
  StackIcon,
} from "nfx-ui/icons";
import { useTranslation } from "react-i18next";
import { Menu, Sidebar as ProSidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router";

import { Logo } from "@/components";
import { useBooksManifest } from "@/hooks/books";
import { useLanguagePathSync } from "@/hooks/languagePath";
import Header from "@/layouts/Header";
import { chapterPath, ROUTES } from "@/navigations";
import { chapterLocale, chapterNumber, chapterShortTitle } from "@/utils";

import { MenuItem, SidebarMenuState, SubMenu } from "./Menu";
import styles from "./s.module.css";

const SIDEBAR_WIDTH = "256px";
const SIDEBAR_COLLAPSED_WIDTH = "88px";
const CHAPTER_PATH = /^\/(zh|en)\/chapter-/;

function MenuLabel({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <Text as="span" size="2" weight={active ? "bold" : "medium"}>
      {children}
    </Text>
  );
}

function SectionTitle({ label, icon, collapsed }: { label: string; icon: AnimatedIconComponent; collapsed: boolean }) {
  if (collapsed) {
    return <Section size="1" mt="3" pt="3" pb="0" className={styles.sectionRule} />;
  }
  return (
    <Section size="1" mt="4" pt="4" pb="2" className={styles.sectionRule}>
      <Flex align="center" justify="between" gap="2">
        <Text as="span" size="1" className={styles.sectionLabel}>
          {label}
        </Text>
        <Box className={styles.sectionIcon}>
          <AnimatedIcon icon={icon} size={14} />
        </Box>
      </Flex>
    </Section>
  );
}

type NavProps = {
  onNavigate: () => void;
};

function NavigateSection({ onNavigate }: NavProps) {
  const { t, i18n } = useTranslation("language");
  const location = useLocation();
  const locale = chapterLocale(i18n.language);
  const chapters = useBooksManifest().data?.chapters ?? [];
  const onChapter = CHAPTER_PATH.test(location.pathname);
  const [chaptersOpen, setChaptersOpen] = useState(onChapter);
  const [wasOnChapter, setWasOnChapter] = useState(onChapter);
  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(`${to}/`);

  if (onChapter !== wasOnChapter) {
    setWasOnChapter(onChapter);
    if (onChapter) setChaptersOpen(true);
  }

  return (
    <Menu
      renderExpandIcon={({ open }) => <AnimatedIcon icon={open ? ArrowNarrowUpIcon : DownChevron} size={14} />}
      closeOnClick
    >
      <MenuItem
        component={<Link to={ROUTES.HOME} />}
        icon={<AnimatedIcon icon={LayoutDashboardIcon} size={18} />}
        active={location.pathname === ROUTES.HOME}
        onClick={onNavigate}
      >
        <MenuLabel active={location.pathname === ROUTES.HOME}>{t("sidebar.home")}</MenuLabel>
      </MenuItem>
      <MenuItem
        component={<Link to={ROUTES.ARCHITECTURE} />}
        icon={<AnimatedIcon icon={LayersIcon} size={18} />}
        active={isActive(ROUTES.ARCHITECTURE)}
        onClick={onNavigate}
      >
        <MenuLabel active={isActive(ROUTES.ARCHITECTURE)}>{t("sidebar.architecture")}</MenuLabel>
      </MenuItem>
      <SubMenu
        label={t("sidebar.chapters")}
        icon={<AnimatedIcon icon={BookIcon} size={18} />}
        open={chaptersOpen}
        onOpenChange={setChaptersOpen}
        active={onChapter}
      >
        {chapters.map((chapter) => {
          const to = chapterPath(locale, chapter.slug);
          const active = location.pathname === to;
          return (
            <MenuItem key={chapter.slug} component={<Link to={to} />} active={active} onClick={onNavigate}>
              <MenuLabel active={active}>
                <Text as="span" className={styles.chapterNo}>
                  {chapterNumber(chapter.slug)}
                </Text>
                {chapterShortTitle(chapter.title[locale] ?? chapter.title.en)}
              </MenuLabel>
            </MenuItem>
          );
        })}
      </SubMenu>
    </Menu>
  );
}

function ReferenceSection({ collapsed, onNavigate }: NavProps & { collapsed: boolean }) {
  const { t } = useTranslation("language");
  const location = useLocation();
  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Menu closeOnClick>
      <SectionTitle label={t("sidebar.reference")} icon={StackIcon} collapsed={collapsed} />
      <MenuItem
        component={<Link to={ROUTES.REPO} />}
        icon={<AnimatedIcon icon={StackIcon} size={18} />}
        active={isActive(ROUTES.REPO)}
        onClick={onNavigate}
      >
        <MenuLabel active={isActive(ROUTES.REPO)}>{t("sidebar.repo")}</MenuLabel>
      </MenuItem>
      <MenuItem
        component={<Link to={ROUTES.ABOUT} />}
        icon={<AnimatedIcon icon={InfoCircleIcon} size={18} />}
        active={isActive(ROUTES.ABOUT)}
        onClick={onNavigate}
      >
        <MenuLabel active={isActive(ROUTES.ABOUT)}>{t("sidebar.about")}</MenuLabel>
      </MenuItem>
    </Menu>
  );
}

function StatusPanel({ collapsed }: { collapsed: boolean }) {
  const { t } = useTranslation("language");
  if (collapsed) {
    return (
      <Flex justify="center">
        <Box className={styles.pulse} aria-label={t("sidebar.online")} />
      </Flex>
    );
  }
  return (
    <Section size="1" py="3" className={styles.status}>
      <Container px="3">
        <Flex direction="column" gap="2">
          <Flex align="center" gap="2">
            <Box className={styles.pulse} aria-hidden />
            <Text as="span" size="1" className={styles.statusLabel}>
              {t("sidebar.online")}
            </Text>
          </Flex>
          <Flex align="center" justify="between" gap="2">
            <Text as="span" size="1" color="gray">
              {t("sidebar.hostPort")}
            </Text>
            <Text as="span" size="1" className={styles.statusValue}>
              :10120
            </Text>
          </Flex>
          <Flex align="center" justify="between" gap="2">
            <Text as="span" size="1" color="gray">
              {t("sidebar.basePath")}
            </Text>
            <Text as="span" size="1" className={styles.statusValue} truncate>
              {import.meta.env.BASE_URL}
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
}

type SidebarProps = {
  children: ReactNode;
};

function Sidebar({ children }: SidebarProps) {
  const { t } = useTranslation("language");
  const [desktopCollapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const collapsed = !broken && desktopCollapsed;
  const drawerRef = useRef<HTMLHtmlElement>(null);

  useLanguagePathSync();

  useEffect(() => {
    if (!broken || !toggled) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const focusable = () =>
      Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], [tabindex='0']") ?? [],
      ).filter((node) => node.getClientRects().length && getComputedStyle(node).visibility !== "hidden");
    focusable()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setToggled(false);
      }
      if (event.key !== "Tab") return;
      const nodes = focusable();
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [broken, toggled]);

  const closeMobile = () => {
    if (broken) setToggled(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      <Flex className={styles.shell} width="100%">
        <SidebarMenuState collapsed={collapsed}>
          <Box className={styles.proSidebar}>
            <ProSidebar
              ref={drawerRef}
              inert={broken && !toggled ? true : undefined}
              aria-hidden={broken && !toggled ? true : undefined}
              collapsed={collapsed}
              toggled={toggled}
              onBackdropClick={() => setToggled(false)}
              onBreakPoint={setBroken}
              breakPoint="md"
              width={SIDEBAR_WIDTH}
              collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
            >
              <Flex direction="column" className={styles.sidebar} height="100%" minHeight="0">
                <Container size="4" width="100%" maxWidth="100%" px="4">
                  <Box position="relative">
                    <Section size="1" py="5" className={styles.headerRule}>
                      <Flex justify={collapsed ? "center" : "start"}>
                        <Logo
                          title={collapsed ? undefined : "NFX"}
                          subtitle={collapsed ? undefined : "Documentation"}
                        />
                      </Flex>
                    </Section>
                    <IconButton
                      variant="outline"
                      size="1"
                      className={styles.toggle}
                      aria-label={collapsed ? t("sidebar.expand") : t("sidebar.collapse")}
                      aria-expanded={!collapsed}
                      onClick={() => (broken ? setToggled(false) : setCollapsed((value) => !value))}
                    >
                      <AnimatedIcon icon={collapsed ? RightChevron : ArrowNarrowLeftIcon} size={14} />
                    </IconButton>
                  </Box>
                </Container>

                <Box
                  minHeight="0"
                  flexGrow="1"
                  className={styles.menuArea}
                  data-collapsed={collapsed ? "true" : "false"}
                >
                  <Section size="1" py="2">
                    <Container size="4" width="100%" maxWidth="100%" px="4">
                      <LayoutGroup id="docs-sidebar">
                        <SectionTitle label={t("sidebar.navigate")} icon={LayoutDashboardIcon} collapsed={collapsed} />
                        <NavigateSection onNavigate={closeMobile} />
                        <ReferenceSection collapsed={collapsed} onNavigate={closeMobile} />
                      </LayoutGroup>
                    </Container>
                  </Section>
                </Box>

                <Section size="1" pt="3" pb="5">
                  <Container size="4" width="100%" maxWidth="100%" px="4">
                    <StatusPanel collapsed={collapsed} />
                  </Container>
                </Section>
              </Flex>
            </ProSidebar>
          </Box>
        </SidebarMenuState>

        <Flex
          className={styles.content}
          direction="column"
          flexGrow="1"
          minWidth="0"
          minHeight="0"
          position="relative"
          inert={broken && toggled ? true : undefined}
        >
          <Box className={styles.ambient} aria-hidden />
          <Header broken={broken} onOpenMenu={() => setToggled(true)} />
          <Flex direction="column" className={styles.main}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </MotionConfig>
  );
}

export default Sidebar;
