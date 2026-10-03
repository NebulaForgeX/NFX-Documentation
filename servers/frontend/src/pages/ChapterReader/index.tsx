import { memo } from "react";
import { Button, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import Markdown, { type Components } from "react-markdown";
import { Link, Navigate, useParams } from "react-router";
import remarkGfm from "remark-gfm";

import { ArrowLeft, ArrowRight } from "@/assets/icons/lucide";
import type { BookLocale } from "@/books/types";
import { useBooksManifest, useChapterMarkdown } from "@/hooks/books";
import { ROUTES, chapterPath } from "@/navigations";
import { chapterLocale } from "@/utils/i18nContent";

import styles from "./s.module.css";

function isBookLocale(value: string | undefined): value is BookLocale {
  return value === "zh" || value === "en";
}

function assetUrl(src: string | undefined): string | undefined {
  if (!src) return undefined;
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${src.replace(/^\//, "")}`;
}

function ChapterImage({ src, alt }: { src?: string; alt?: string }) {
  const href = assetUrl(src);
  if (!href) return null;
  return (
    <figure className={styles.figure}>
      <img src={href} alt={alt ?? ""} />
      {alt ? <figcaption>{alt}</figcaption> : null}
    </figure>
  );
}

const markdownComponents: Components = {
  img: ({ src, alt }) => <ChapterImage src={typeof src === "string" ? src : undefined} alt={alt} />,
};


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
    <Section size="2" py="6" className={styles.page}>
      <Container px="6" className={styles.measure}>
        <Flex direction="column" gap="5">
          <Flex direction="column" gap="3">
            <Button variant="ghost" asChild>
              <Link to={ROUTES.HOME}>
                <ArrowLeft size={16} />
                {t("backToHome")}
              </Link>
            </Button>
            <Text size="2" color="gray">
              {t("chapterLabel", { n: index + 1 })}
            </Text>
            <Heading size="8" className={styles.display}>
              {title}
            </Heading>
          </Flex>
          {markdownQuery.isLoading ? (
            <Text color="gray">{t("loading")}</Text>
          ) : markdownQuery.isError ? (
            <Text color="red">{t("chapterLoadError")}</Text>
          ) : (
            <article className={styles.article}>
              <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {markdownQuery.data ?? ""}
              </Markdown>
            </article>
          )}
          <Flex justify="between" wrap="wrap" gap="3">
              {previous ? (
                <Button variant="outline" asChild>
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
    </Section>
  );
});

ChapterReader.displayName = "ChapterReader";
export default ChapterReader;
