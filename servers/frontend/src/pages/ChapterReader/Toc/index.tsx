import type { RefObject } from "react";

import { useEffect, useRef, useState } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Eyebrow } from "@/components";

import styles from "./s.module.css";

export type TocItem = {
  id: string;
  text: string;
  depth: 2 | 3;
};

type TocProps = {
  items: TocItem[];
  articleRef: RefObject<HTMLElement | null>;
};

export default function Toc({ items, articleRef }: TocProps) {
  const { t } = useTranslation("chapter");
  const [active, setActive] = useState<string | undefined>(items[0]?.id);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -65% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const root = articleRef.current?.closest<HTMLElement>("[data-scroll-root]");
    if (!root) return;
    const update = () => {
      const max = root.scrollHeight - root.clientHeight;
      const ratio = max > 0 ? root.scrollTop / max : 0;
      if (progress.current) progress.current.style.transform = `scaleY(${ratio})`;
    };
    update();
    root.addEventListener("scroll", update, { passive: true });
    return () => root.removeEventListener("scroll", update);
  }, [articleRef, items]);

  if (!items.length) return null;

  const jump = (id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setActive(id);
  };

  return (
    <Flex direction="column" gap="4" className={styles.toc}>
      <Eyebrow>{t("toc")}</Eyebrow>
      <Flex gap="3">
        <Box className={styles.track} aria-hidden>
          <Box ref={progress} className={styles.progress} />
        </Box>
        <Flex direction="column" gap="1" minWidth="0" asChild>
          <nav aria-label={t("toc")}>
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={clsx(styles.link, item.depth === 3 && styles.nested, active === item.id && styles.active)}
                onClick={(event) => {
                  event.preventDefault();
                  jump(item.id);
                }}
              >
                <Text as="span" size="1">
                  {item.text}
                </Text>
              </a>
            ))}
          </nav>
        </Flex>
      </Flex>
    </Flex>
  );
}
