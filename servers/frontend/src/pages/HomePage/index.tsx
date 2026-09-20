import { memo } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Container, Flex, Heading, Text } from "@radix-ui/themes";

import { useBooksManifest } from "@/hooks/books";
import { chapterPath } from "@/navigations";
import { chapterLocale } from "@/utils/i18nContent";

const HomePage = memo(() => {
  const { t, i18n } = useTranslation("common");
  const locale = chapterLocale(i18n.language);
  const { data, isLoading, isError } = useBooksManifest();
  const chapters = data?.chapters ?? [];

  return (
    <Container size="3" py="6">
      <Flex direction="column" gap="6">
        <Flex direction="column" gap="2" className="docs-masthead">
          <Heading size="8">{t("title")}</Heading>
          <Text as="p" size="4" color="gray">
            {t("subtitle")}
          </Text>
        </Flex>
        <Flex direction="column">
          <Heading size="5">{t("chapters.title")}</Heading>
          {isLoading ? <Text color="gray">{t("loading")}</Text> : null}
          {isError ? <Text color="red">{t("chapterLoadError")}</Text> : null}
          {chapters.map((chapter, index) => (
            <Link key={chapter.slug} to={chapterPath(locale, chapter.slug)} className="docs-ledger-row">
              <Text size="2" color="gray" className="docs-ledger-index">
                {String(index + 1).padStart(2, "0")}
              </Text>
              <Text size="3">{chapter.title[locale]}</Text>
            </Link>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
});

HomePage.displayName = "HomePage";
export default HomePage;
