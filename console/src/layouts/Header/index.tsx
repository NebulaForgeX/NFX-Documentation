import { Box, Container, Flex, IconButton, Section, Text } from "@radix-ui/themes";
import { AnimatedIcon, UnorderedListIcon } from "nfx-ui/icons";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

import { PreferencesPopover } from "@/components";
import { ROUTES } from "@/navigations";
import { chapterNumber } from "@/utils";

import styles from "./s.module.css";

type HeaderProps = {
  broken: boolean;
  onOpenMenu: () => void;
};

function useCrumb(): string {
  const { t } = useTranslation("language");
  const { pathname } = useLocation();
  if (pathname === ROUTES.HOME) return t("sidebar.home");
  if (pathname.startsWith(ROUTES.ARCHITECTURE)) return t("sidebar.architecture");
  if (pathname.startsWith(ROUTES.REPO)) return t("sidebar.repo");
  if (pathname.startsWith(ROUTES.ABOUT)) return t("sidebar.about");
  const chapter = pathname.match(/^\/(?:zh|en)\/(chapter-[^/]+)/);
  if (chapter) return t("sidebar.chapterCrumb", { n: chapterNumber(chapter[1]) });
  return "404";
}

export default function Header({ broken, onOpenMenu }: HeaderProps) {
  const { t } = useTranslation("language");
  const crumb = useCrumb();

  return (
    <Section size="1" py="3" className={styles.bar}>
      <Container size="4" width="100%" maxWidth="100%" px="5">
        <Flex align="center" justify="between" gap="3">
          <Flex align="center" gap="3" minWidth="0">
            {broken ? (
              <IconButton
                variant="outline"
                color="gray"
                size="2"
                onClick={onOpenMenu}
                aria-label={t("sidebar.openMenu")}
              >
                <AnimatedIcon icon={UnorderedListIcon} size={16} />
              </IconButton>
            ) : null}
            <Flex align="center" gap="2" minWidth="0" className={styles.crumb}>
              <Text as="span" size="1" className={styles.root}>
                nfx://docs
              </Text>
              <Box className={styles.sep} aria-hidden />
              <Text as="span" size="1" className={styles.leaf} truncate>
                {crumb}
              </Text>
            </Flex>
          </Flex>
          <Flex align="center" gap="3">
            <Text as="span" size="1" className={styles.tag}>
              {t("sidebar.handbook")}
            </Text>
            <PreferencesPopover />
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
}
