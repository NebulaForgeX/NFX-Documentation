import { memo } from "react";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { AnimatedIcon, ArrowNarrowLeftIcon } from "nfx-ui/icons";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

import { Eyebrow, Panel } from "@/components";
import { PageFrame } from "@/layouts";
import { ROUTES } from "@/navigations";

import styles from "./s.module.css";

const NotFoundPage = memo(() => {
  const { t } = useTranslation("notFound");
  const { pathname } = useLocation();

  return (
    <PageFrame maxWidth="720px">
      <Panel py="7" px="6">
        <Flex direction="column" align="start" gap="4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Text as="span" className={styles.code} aria-hidden>
            404
          </Text>
          <Heading as="h1" size="6">
            {t("title")}
          </Heading>
          <Text as="p" size="3" color="gray">
            {t("description")}
          </Text>
          <Flex align="center" gap="2" className={styles.path}>
            <Text as="span" size="1">
              {t("path")}
            </Text>
            <Text as="span" size="1" className={styles.pathValue} truncate>
              {pathname}
            </Text>
          </Flex>
          <Button size="3" asChild>
            <Link to={ROUTES.HOME}>
              <AnimatedIcon icon={ArrowNarrowLeftIcon} size={16} />
              {t("backToHome")}
            </Link>
          </Button>
        </Flex>
      </Panel>
    </PageFrame>
  );
});

NotFoundPage.displayName = "NotFoundPage";
export default NotFoundPage;
