import type { Components } from "react-markdown";
import type { BookChapter, BookLocale } from "@/books/types";
import type { TocItem } from "./Toc";

import { memo, useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { AnimatedIcon, ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "nfx-ui/icons";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import { Link, Navigate, useParams } from "react-router";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { Eyebrow, Panel } from "@/components";
import { useBooksManifest, useChapterMarkdown } from "@/hooks/books";
import { PageFrame } from "@/layouts";
import { chapterPath, ROUTES } from "@/navigations";
import { chapterLocale, chapterNumber, chapterShortTitle } from "@/utils";

import CodeBlock from "./CodeBlock";
import styles from "./s.module.css";
import Toc from "./Toc";

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
      <img src={href} alt={alt ?? ""} loading="lazy" />
      {alt ? <figcaption>{alt}</figcaption> : null}
    </figure>
  );
}

const markdownComponents: Components = {
  img: ({ src, alt }) => <ChapterImage src={typeof src === "string" ? src : undefined} alt={alt} />,
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  table: ({ children }) => (
    <Box className={styles.tableWrap}>
      <table>{children}</table>
    </Box>
  ),
};

function readMinutes(markdown: string, locale: BookLocale): number {
  const size = locale === "zh" ? markdown.replace(/\s/g, "").length / 450 : markdown.split(/\s+/).length / 220;
  return Math.max(1, Math.round(size));
}

function NeighbourLink({
  chapter,
  locale,
  direction,
}: {
  chapter?: BookChapter;
  locale: BookLocale;
  direction: "previous" | "next";
}) {
  const { t } = useTranslation("chapter");
  if (!chapter) return <Box />;
  const next = direction === "next";
  return (
    <Link to={chapterPath(locale, chapter.slug)} className={styles.neighbour}>
      <Panel py="4" px="4" interactive reveal={false}>
        <Flex direction="column" align={next ? "end" : "start"} gap="2">
          <Flex align="center" gap="2" className={styles.neighbourLabel}>
            {next ? null : <AnimatedIcon icon={ArrowNarrowLeftIcon} size={14} />}
            <Text as="span" size="1">
              {t(direction)} · {chapterNumber(chapter.slug)}
            </Text>
            {next ? <AnimatedIcon icon={ArrowNarrowRightIcon} size={14} /> : null}
          </Flex>
          <Text as="span" size="3" weight="medium" align={next ? "right" : "left"}>
            {chapterShortTitle(chapter.title[locale])}
          </Text>
        </Flex>
      </Panel>
    </Link>
  );
}

const ChapterReader = memo(() => {
  const { t, i18n } = useTranslation("chapter");
  const params = useParams<{ locale: string; slug: string }>();
  const uiLocale = chapterLocale(i18n.language);
  const locale = isBookLocale(params.locale) ? params.locale : undefined;
  const slug = params.slug ?? "";
  const articleRef = useRef<HTMLElement>(null);
  const [headings, setHeadings] = useState<TocItem[]>([]);

  const manifestQuery = useBooksManifest();
  const chapters = manifestQuery.data?.chapters ?? [];
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  const known = index >= 0;
  const markdownQuery = useChapterMarkdown(locale ?? "zh", slug, Boolean(locale) && known);
  const markdown = markdownQuery.data ?? "";

  useEffect(() => {
    const root = articleRef.current;
    const nodes = root ? Array.from(root.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]")) : [];
    setHeadings(
      nodes.map((node) => ({ id: node.id, text: node.textContent ?? "", depth: node.tagName === "H2" ? 2 : 3 })),
    );
  }, [markdown]);

  useEffect(() => {
    articleRef.current?.closest("[data-scroll-root]")?.scrollTo({ top: 0 });
  }, [slug]);

  if (locale && locale !== uiLocale) {
    return <Navigate to={chapterPath(uiLocale, slug)} replace />;
  }

  if (!locale || (manifestQuery.data && !known)) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  const previous = index > 0 ? chapters[index - 1] : undefined;
  const next = known && index < chapters.length - 1 ? chapters[index + 1] : undefined;
  const title = known ? chapterShortTitle(chapters[index].title[locale]) : slug;
  const sections = headings.filter((item) => item.depth === 2).length;

  return (
    <PageFrame maxWidth="1280px" revealKey={`${slug}:${markdown.length}`}>
      <Grid columns={{ initial: "1", lg: "minmax(0, 1fr) 15rem" }} gapX="8" gapY="6">
        <Flex direction="column" gap="6" minWidth="0">
          <Flex direction="column" gap="4" data-reveal>
            <Box>
              <Button variant="ghost" color="gray" asChild>
                <Link to={ROUTES.HOME}>
                  <AnimatedIcon icon={ArrowNarrowLeftIcon} size={14} />
                  {t("back")}
                </Link>
              </Button>
            </Box>
            <Eyebrow>{t("eyebrow", { n: chapterNumber(slug) })}</Eyebrow>
            <Heading as="h1" size={{ initial: "8", md: "9" }} className={styles.display}>
              {title}
            </Heading>
            {markdown ? (
              <Flex align="center" gap="3" wrap="wrap" className={styles.meta}>
                <Text as="span" size="1">
                  {t("readTime", { minutes: readMinutes(markdown, locale) })}
                </Text>
                <Box className={styles.metaDot} aria-hidden />
                <Text as="span" size="1">
                  {t("sections", { count: sections })}
                </Text>
                <Box className={styles.metaDot} aria-hidden />
                <Text as="span" size="1" truncate>
                  {t("sourceNote", { locale, slug })}
                </Text>
              </Flex>
            ) : null}
          </Flex>

          {markdownQuery.isLoading ? (
            <Text color="gray">{t("loading")}</Text>
          ) : markdownQuery.isError ? (
            <Text color="red">{t("loadError")}</Text>
          ) : (
            <article ref={articleRef} className={styles.article} data-reveal>
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={markdownComponents}>
                {markdown}
              </Markdown>
            </article>
          )}

          <Grid columns={{ initial: "1", sm: "2" }} gap="4" data-reveal>
            <NeighbourLink chapter={previous} locale={locale} direction="previous" />
            <NeighbourLink chapter={next} locale={locale} direction="next" />
          </Grid>
        </Flex>

        <Box display={{ initial: "none", lg: "block" }}>
          <Toc items={headings} articleRef={articleRef} />
        </Box>
      </Grid>
    </PageFrame>
  );
});

ChapterReader.displayName = "ChapterReader";
export default ChapterReader;
