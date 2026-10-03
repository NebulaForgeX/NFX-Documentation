import { memo } from "react";
import { Button, Flex, Grid, Text } from "@radix-ui/themes";
import { AnimatedIcon, ArrowNarrowRightIcon, LayersIcon } from "nfx-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { PageIntro } from "@/components";
import { COMPOSE_COUNT, NFX_BLOCK_COUNT } from "@/constants";
import { useBooksManifest } from "@/hooks/books";
import { PageFrame } from "@/layouts";
import { chapterPath, ROUTES } from "@/navigations";
import { chapterLocale } from "@/utils";

import Pipeline from "./Pipeline";
import Readout from "./Readout";
import Stats from "./Stats";

const HomePage = memo(() => {
  const { t, i18n } = useTranslation("home");
  const locale = chapterLocale(i18n.language);
  const { data, isLoading, isError } = useBooksManifest();
  const chapters = data?.chapters ?? [];
  const first = chapters[0];

  return (
    <PageFrame maxWidth="1320px" revealKey={chapters.length}>
      <Grid columns={{ initial: "1", lg: "minmax(0, 1.1fr) minmax(0, 0.9fr)" }} gap="7" align="start">
        <Flex direction="column" gap="6" minWidth="0">
          <PageIntro eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")}>
            <Flex gap="3" wrap="wrap">
              <Button size="3" asChild disabled={!first}>
                <Link to={first ? chapterPath(locale, first.slug) : ROUTES.HOME}>
                  {t("start")}
                  <AnimatedIcon icon={ArrowNarrowRightIcon} size={16} />
                </Link>
              </Button>
              <Button size="3" variant="outline" asChild>
                <Link to={ROUTES.ARCHITECTURE}>
                  <AnimatedIcon icon={LayersIcon} size={16} />
                  {t("architecture")}
                </Link>
              </Button>
            </Flex>
          </PageIntro>
          {isLoading ? <Text color="gray">{t("loading")}</Text> : null}
          {isError ? <Text color="red">{t("loadError")}</Text> : null}
          <Stats chapters={chapters.length} blocks={NFX_BLOCK_COUNT} compose={COMPOSE_COUNT} />
          <Readout />
        </Flex>
        <Pipeline chapters={chapters} locale={locale} />
      </Grid>
    </PageFrame>
  );
});

HomePage.displayName = "HomePage";
export default HomePage;
