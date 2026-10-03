import type { NodeProps } from "@xyflow/react";
import type { FrameNode } from "../layout";

import { memo, useContext } from "react";
import { Box, Container, Flex, HoverCard, Section, Separator, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { AnimatedIcon, DockerIcon } from "nfx-ui/icons";
import { useTranslation } from "react-i18next";

import { FocusContext, useNodeFocus } from "../focus";
import { containersIn } from "../layout";
import styles from "./s.module.css";

function FrameDetail({ data }: { data: FrameNode["data"] }) {
  const { t } = useTranslation("architecture");
  return (
    <Flex direction="column" gap="3">
      <Flex direction="column" gap="1">
        <Text size="3" weight="bold">
          {t(`groups.${data.id}.title`)}
        </Text>
        <Text size="1" className={styles.mono}>
          {data.repo} · {data.compose ?? t("notCompose")}
        </Text>
      </Flex>
      <Text size="2" color="gray">
        {t(`groups.${data.id}.body`)}
      </Text>
      <Separator size="4" />
      <Flex direction="column" gap="1">
        <Text size="1" className={styles.caption}>
          {t("containersTitle")}
        </Text>
        <Flex wrap="wrap" gap="2">
          {containersIn(data.id).map((id) => (
            <Text key={id} size="1" className={styles.mono}>
              {t(`containers.${id}.title`)}
            </Text>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

const ComposeFrame = memo(({ id, data }: NodeProps<FrameNode>) => {
  const { t } = useTranslation("architecture");
  const { hoverNode, pinned } = useContext(FocusContext);
  const level = useNodeFocus(id);

  return (
    <Box
      data-group
      data-level={level}
      className={clsx(
        styles.frame,
        data.parent && styles.nested,
        !data.compose && styles.loose,
        pinned === id && styles.pinned,
      )}
    >
      <HoverCard.Root openDelay={200} closeDelay={80}>
        <HoverCard.Trigger>
          <Box className={styles.header} onPointerEnter={() => hoverNode(id)} onPointerLeave={() => hoverNode(null)}>
            <Section size="1" py="3">
              <Container size="4" width="100%" maxWidth="100%" px="4">
                <Flex direction="column" gap="1">
                  <Flex align="center" justify="between" gap="3">
                    <Flex align="center" gap="2" minWidth="0">
                      <AnimatedIcon icon={DockerIcon} size={14} />
                      <Text as="span" size="2" weight="bold" truncate>
                        {t(`groups.${id}.title`)}
                      </Text>
                    </Flex>
                    <Text as="span" size="1" className={styles.count}>
                      {t("containerCount", { count: data.members })}
                    </Text>
                  </Flex>
                  <Flex align="center" justify="between" gap="3" className={styles.kicker}>
                    <Text as="span" size="1" truncate>
                      {data.compose ?? t("notCompose")}
                    </Text>
                    <Text as="span" size="1" className={styles.range}>
                      {data.range ?? "—"}
                    </Text>
                  </Flex>
                </Flex>
              </Container>
            </Section>
          </Box>
        </HoverCard.Trigger>
        <HoverCard.Content side="top" align="start" sideOffset={10} maxWidth="360px" className={styles.card}>
          <FrameDetail data={data} />
        </HoverCard.Content>
      </HoverCard.Root>
    </Box>
  );
});

ComposeFrame.displayName = "ComposeFrame";
export default ComposeFrame;
