import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

import { Eyebrow, Panel, PortRuler } from "@/components";
import { blockRange, PORT_BLOCKS } from "@/constants";

import styles from "./s.module.css";

gsap.registerPlugin(useGSAP);

export default function Readout() {
  const { t } = useTranslation("home");
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-ruler-fill]", { scaleX: 0, duration: 0.9, ease: "power3.out", stagger: 0.07, delay: 0.35 });
      });
      return () => media.revert();
    },
    { scope },
  );

  return (
    <Panel py="5" px="5">
      <Flex ref={scope} direction="column" gap="4">
        <Flex align="end" justify="between" gap="3" wrap="wrap">
          <Flex direction="column" gap="2">
            <Eyebrow>{t("readout.lan")}</Eyebrow>
            <Heading as="h2" size="4">
              {t("readout.title")}
            </Heading>
          </Flex>
          <Text as="span" size="1" className={styles.mono}>
            NAS_IP:10000–10405
          </Text>
        </Flex>
        <Grid columns="minmax(0, 10rem) minmax(0, 1fr) minmax(0, 7.5rem)" gapX="4" gapY="3" align="center">
          {PORT_BLOCKS.map((block) => (
            <Fragment key={block.id}>
              <Text as="span" size="2" weight="medium" truncate className={block.nfx ? undefined : styles.muted}>
                {block.name ?? t(`readout.cells.${block.id}`)}
              </Text>
              <PortRuler block={block} />
              <Text as="span" size="1" align="right" className={styles.mono}>
                {blockRange(block)}
              </Text>
            </Fragment>
          ))}
        </Grid>
      </Flex>
    </Panel>
  );
}
