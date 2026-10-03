import { memo } from "react";
import { Container, Flex, Grid, Heading, Section, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { useBooksManifest } from "@/hooks/books";
import { chapterPath } from "@/navigations";
import { chapterLocale } from "@/utils/i18nContent";

import styles from "./s.module.css";

const HomePage = memo(() => {
  const { t, i18n } = useTranslation("common");
  const locale = chapterLocale(i18n.language);
  const { data, isLoading, isError } = useBooksManifest();
  const chapters = data?.chapters ?? [];

  return (
    <Grid columns={{ initial: "1", md: "minmax(16rem, 24rem) minmax(0, 1fr)" }} className={styles.page}>
      <Section size="2" py="6" className={styles.mast}>
        <Container px="5">
          <Flex direction="column" gap="4">
            <Text size="1" className={styles.kicker}>
              {t("chapters.title")}
            </Text>
            <Heading className={styles.display}>{t("title")}</Heading>
            <Text as="p" size="3" color="gray" className={styles.lead}>
              {t("subtitle")}
            </Text>
          </Flex>
        </Container>
      </Section>
      <Section size="1" className={styles.index}>
        <Flex direction="column" className={styles.list}>
          {isLoading ? (
            <Container px="4">
              <Section size="1" py="4">
                <Text color="gray">{t("loading")}</Text>
              </Section>
            </Container>
          ) : null}
          {isError ? (
            <Container px="4">
              <Section size="1" py="4">
                <Text color="red">{t("chapterLoadError")}</Text>
              </Section>
            </Container>
          ) : null}
          {chapters.map((chapter, index) => (
            <Link key={chapter.slug} to={chapterPath(locale, chapter.slug)} className={styles.row}>
              <Section size="1" py="4" className={styles.rowFace}>
                <Container px="5">
                  <Flex align="center" gap="4">
                    <Text className={styles.num}>{String(index + 1).padStart(2, "0")}</Text>
                    <Text size="3" weight="medium">
                      {chapter.title[locale]}
                    </Text>
                  </Flex>
                </Container>
              </Section>
            </Link>
          ))}
        </Flex>
      </Section>
    </Grid>
  );
});

HomePage.displayName = "HomePage";
export default HomePage;
