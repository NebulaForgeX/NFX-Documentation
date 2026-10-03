import type { BookChapter, BookLocale } from "@/books/types";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Box, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import gsap from "gsap";
import { AnimatedIcon, ArrowNarrowRightIcon } from "nfx-ui/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { Eyebrow, Panel } from "@/components";
import { chapterPath } from "@/navigations";
import { chapterNumber, chapterShortTitle } from "@/utils";

import styles from "./s.module.css";

gsap.registerPlugin(useGSAP);

type PipelineProps = {
  chapters: BookChapter[];
  locale: BookLocale;
};

export default function Pipeline({ chapters, locale }: PipelineProps) {
  const { t } = useTranslation("home");
  const scope = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!chapters.length) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const step = 0.14;
        const tl = gsap.timeline({ delay: 0.3 });
        tl.from("[data-rail-fill]", { scaleY: 0, duration: chapters.length * step + 0.3, ease: "none" }, 0);
        tl.from("[data-step]", { autoAlpha: 0, x: 16, duration: 0.45, ease: "power3.out", stagger: step }, 0);
        tl.from(
          "[data-step-core]",
          { scale: 0, autoAlpha: 0, duration: 0.35, ease: "back.out(2.4)", stagger: step },
          0.12,
        );
        const height = rail.current?.clientHeight ?? 0;
        tl.to("[data-rail-scan]", {
          keyframes: { y: [0, height], opacity: [0, 1, 1, 0] },
          duration: 3.2,
          ease: "none",
          repeat: -1,
          repeatDelay: 0.8,
        });
      });
      return () => media.revert();
    },
    { scope, dependencies: [chapters.length] },
  );

  return (
    <Panel py="6" px="5">
      <Flex ref={scope} direction="column" gap="5">
        <Flex direction="column" gap="2">
          <Eyebrow>PIPELINE · {String(chapters.length).padStart(2, "0")}</Eyebrow>
          <Heading as="h2" size="5">
            {t("pipeline.title")}
          </Heading>
          <Text as="p" size="2" color="gray">
            {t("pipeline.hint")}
          </Text>
        </Flex>
        <Box position="relative">
          <Box ref={rail} className={styles.rail} aria-hidden>
            <Box className={styles.railFill} data-rail-fill />
            <Box className={styles.railScan} data-rail-scan />
          </Box>
          <Flex direction="column" gap="1" asChild>
            <ol className={styles.list}>
              {chapters.map((chapter) => (
                <li key={chapter.slug} data-step>
                  <Link to={chapterPath(locale, chapter.slug)} className={styles.step}>
                    <Section size="1" py="2" className={styles.stepFace}>
                      <Container size="4" width="100%" maxWidth="100%" px="1">
                        <Flex align="center" gap="4">
                          <Box className={styles.dot}>
                            <Box className={styles.core} data-step-core />
                          </Box>
                          <Text as="span" size="1" className={styles.no}>
                            {chapterNumber(chapter.slug)}
                          </Text>
                          <Text as="span" size="2" weight="medium" className={styles.title} truncate>
                            {chapterShortTitle(chapter.title[locale] ?? chapter.title.en)}
                          </Text>
                          <Box className={styles.arrow}>
                            <AnimatedIcon icon={ArrowNarrowRightIcon} size={16} />
                          </Box>
                        </Flex>
                      </Container>
                    </Section>
                  </Link>
                </li>
              ))}
            </ol>
          </Flex>
        </Box>
      </Flex>
    </Panel>
  );
}
