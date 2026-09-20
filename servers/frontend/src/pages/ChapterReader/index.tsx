import { memo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, Navigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Button, Container, Flex, Heading, Separator, Text } from "@radix-ui/themes";

import { ArrowLeft, ArrowRight } from "@/assets/icons/lucide";
import type { BookLocale } from "@/books/types";
import { useBooksManifest, useChapterMarkdown } from "@/hooks/books";
import { ROUTES, chapterPath } from "@/navigations";
import { chapterLocale } from "@/utils/i18nContent";

function isBookLocale(value: string | undefined): value is BookLocale {
  return value === "zh" || value === "en";
}

const ChapterReader = memo(() => {
  const { t, i18n } = useTranslation("common");
  const params = useParams<{ locale: string; slug: string }>();
  const uiLocale = chapterLocale(i18n.language);
  const locale = isBookLocale(params.locale) ? params.locale : undefined;
  const slug = params.slug ?? "";

  const manifestQuery = useBooksManifest();
  const chapters = manifestQuery.data?.chapters ?? [];
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  const known = index >= 0;
  const markdownQuery = useChapterMarkdown(locale ?? "zh", slug, Boolean(locale) && known);

  if (locale && locale !== uiLocale) {
    return <Navigate to={chapterPath(uiLocale, slug)} replace />;
  }

  if (!locale || (manifestQuery.data && !known)) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  const previous = index > 0 ? chapters[index - 1] : undefined;
  const next = index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : undefined;
  const title = known ? chapters[index].title[locale] : slug;

  return (
    <Container size="3" py="5">
      <Flex direction="column" gap="5">
        <Flex direction="column" gap="3" className="docs-masthead">
          <Button variant="ghost" asChild>
            <Link to={ROUTES.HOME}>
              <ArrowLeft size={16} />
              {t("backToHome")}
            </Link>
          </Button>
          <Text size="2" color="gray">
            {t("chapterLabel", { n: index + 1 })}
          </Text>
          <Heading size="8">{title}</Heading>
        </Flex>
        {markdownQuery.isLoading ? (
          <Text color="gray">{t("loading")}</Text>
        ) : markdownQuery.isError ? (
          <Text color="red">{t("chapterLoadError")}</Text>
        ) : (
          <article className="docs-article">
            <Markdown remarkPlugins={[remarkGfm]}>{markdownQuery.data ?? ""}</Markdown>
          </article>
        )}
        <Separator size="4" />
        <Flex justify="between" wrap="wrap" gap="3">
          {previous ? (
            <Button variant="soft" asChild>
              <Link to={chapterPath(locale, previous.slug)}>
                <ArrowLeft size={16} />
                {previous.title[locale]}
              </Link>
            </Button>
          ) : (
            <span />
          )}
          {next ? (
            <Button asChild>
              <Link to={chapterPath(locale, next.slug)}>
                {next.title[locale]}
                <ArrowRight size={16} />
              </Link>
            </Button>
          ) : null}
        </Flex>
      </Flex>
    </Container>
  );
});

ChapterReader.displayName = "ChapterReader";
export default ChapterReader;
