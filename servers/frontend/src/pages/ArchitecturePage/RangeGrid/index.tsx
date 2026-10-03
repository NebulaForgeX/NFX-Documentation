import type { Focus } from "../focus";

import { Box, Container, Flex, Grid, Heading, Section, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Eyebrow, PortRuler } from "@/components";
import { blockRange, blockReserved, blockUsed, LinkProtocol, PORT_BLOCKS } from "@/constants";

import styles from "./s.module.css";

type RangeGridProps = {
  focus: Focus | null;
  onHover: (groupIds: string[] | null) => void;
  onToggle: (groupIds: string[]) => void;
};

const LEGEND = [LinkProtocol.HTTP, LinkProtocol.GRPC, LinkProtocol.DATA, LinkProtocol.TLS] as const;

export default function RangeGrid({ focus, onHover, onToggle }: RangeGridProps) {
  const { t } = useTranslation("architecture");

  return (
    <Section size="1" py="4">
      <Container size="4" width="100%" maxWidth="100%" px="4">
        <Flex direction="column" gap="5">
          <Flex direction="column" gap="2">
            <Eyebrow>PORT BLOCKS</Eyebrow>
            <Heading as="h2" size="4">
              {t("gridTitle")}
            </Heading>
            <Text as="p" size="1" color="gray">
              {t("gridLead")}
            </Text>
          </Flex>

          <Grid columns="1" gap="3">
            {PORT_BLOCKS.map((block) => {
              const hot = Boolean(focus && block.groupIds.some((id) => focus.nodes.has(id)));
              const interactive = block.groupIds.length > 0;
              const note = block.nfx ? "" : t(`cells.${block.id}.note`);
              return (
                <Box
                  key={block.id}
                  className={clsx(styles.cell, hot && styles.hot, interactive && styles.interactive)}
                  data-cell
                  onPointerEnter={() => interactive && onHover(block.groupIds)}
                  onPointerLeave={() => onHover(null)}
                  onClick={() => interactive && onToggle(block.groupIds)}
                >
                  <Section size="1" py="3">
                    <Container size="4" width="100%" maxWidth="100%" px="3">
                      <Flex direction="column" gap="2">
                        <Flex align="baseline" justify="between" gap="2">
                          <Text as="span" size="2" weight="bold" truncate>
                            {t(`cells.${block.id}.title`)}
                          </Text>
                          <Text as="span" size="1" className={styles.range}>
                            {blockRange(block)}
                          </Text>
                        </Flex>
                        <PortRuler block={block} hot={hot} />
                        <Flex justify="between" gap="2" className={styles.meta}>
                          <Text as="span" size="1">
                            {t("used", { range: blockUsed(block) })}
                          </Text>
                          <Text as="span" size="1">
                            {t("reserved", { range: blockReserved(block) })}
                          </Text>
                        </Flex>
                        {note ? (
                          <Text as="span" size="1" color="gray">
                            {note}
                          </Text>
                        ) : null}
                      </Flex>
                    </Container>
                  </Section>
                </Box>
              );
            })}
          </Grid>

          <Flex direction="column" gap="3">
            <Eyebrow>{t("legendTitle")}</Eyebrow>
            <Grid columns="2" gapX="4" gapY="2">
              {LEGEND.map((protocol) => (
                <Flex key={protocol} align="center" gap="2">
                  <Box className={styles.swatch} data-protocol={protocol} aria-hidden />
                  <Text as="span" size="1" className={styles.legendText}>
                    {t(`kinds.${protocol}`)}
                  </Text>
                </Flex>
              ))}
            </Grid>
            <Text as="p" size="1" color="gray">
              {t("hint")}
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
}
