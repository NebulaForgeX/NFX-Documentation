import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Flex, Grid, Text } from "@radix-ui/themes";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

import { Panel } from "@/components";

import styles from "./s.module.css";

gsap.registerPlugin(useGSAP);

type StatsProps = {
  chapters: number;
  blocks: number;
  compose: number;
};

export default function Stats({ chapters, blocks, compose }: StatsProps) {
  const { t } = useTranslation("home");
  const scope = useRef<HTMLDivElement>(null);
  const items = [
    { key: "chapters", value: chapters },
    { key: "blocks", value: blocks },
    { key: "compose", value: compose },
  ];

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const nodes = gsap.utils.toArray<HTMLElement>("[data-count]");
        nodes.forEach((node, index) => {
          const text = node.firstChild;
          const target = Number(node.dataset.count);
          if (!text || !target) return;
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.3,
            delay: 0.2 + index * 0.1,
            ease: "power2.out",
            onUpdate: () => {
              text.nodeValue = String(Math.round(counter.value)).padStart(2, "0");
            },
          });
        });
        return () => {
          nodes.forEach((node) => {
            if (node.firstChild) node.firstChild.nodeValue = String(node.dataset.count).padStart(2, "0");
          });
        };
      });
      return () => media.revert();
    },
    { scope, dependencies: [chapters, blocks, compose] },
  );

  return (
    <Grid ref={scope} columns={{ initial: "1", xs: "3" }} gap="4">
      {items.map((item) => (
        <Panel key={item.key} py="4" px="4">
          <Flex direction="column" gap="1">
            <Text as="span" size="1" className={styles.label}>
              {t(`stats.${item.key}`)}
            </Text>
            <Text as="span" className={styles.value} data-count={item.value}>
              {String(item.value).padStart(2, "0")}
            </Text>
            <Text as="span" size="1" color="gray" truncate>
              {t(`stats.${item.key}Hint`)}
            </Text>
          </Flex>
        </Panel>
      ))}
    </Grid>
  );
}
