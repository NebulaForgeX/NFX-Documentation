import { memo } from "react";
import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

import { LedgerLink, PageIntro } from "@/components";
import { useBooksManifest } from "@/hooks/books";
import { chapterPath } from "@/navigations";
import { chapterLocale } from "@/utils/i18nContent";

const HomePage = memo(() => {
  const { t, i18n } = useTranslation("common");
  const locale = chapterLocale(i18n.language);
  const { data, isLoading, isError } = useBooksManifest();
  const chapters = data?.chapters ?? [];

  return (
    <Container size="3">
      <Box py="6">
        <Flex direction="column" gap="6">
          <PageIntro title={t("title")}>
            <Text as="p" size="4" color="gray">
              {t("subtitle")}
            </Text>
          </PageIntro>
          <Flex direction="column" gap="3">
            <Heading size="5">{t("chapters.title")}</Heading>
            {isLoading ? <Text color="gray">{t("loading")}</Text> : null}
            {isError ? <Text color="red">{t("chapterLoadError")}</Text> : null}
            <Flex direction="column">
              {chapters.map((chapter, index) => (
                <LedgerLink key={chapter.slug} to={chapterPath(locale, chapter.slug)}>
                  <Text size="2" color="gray">
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <Text size="3">{chapter.title[locale]}</Text>
                </LedgerLink>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
});

HomePage.displayName = "HomePage";
export default HomePage;
