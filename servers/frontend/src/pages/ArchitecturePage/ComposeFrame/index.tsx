import type { NodeProps } from "@xyflow/react";
import type { MouseEvent } from "react";
import type { FrameNode } from "../layout";

import { memo, useContext } from "react";
import { Box, Container, Flex, HoverCard, IconButton, Section, Separator, Text } from "@radix-ui/themes";
import { Handle, NodeResizer, Position, useReactFlow } from "@xyflow/react";
import clsx from "clsx";
import { AnimatedIcon, DockerIcon, FocusIcon } from "nfx-ui/icons";
import { useTranslation } from "react-i18next";

import { FocusContext, RelayoutContext, useAreaFocus } from "../focus";
import { FRAME_DRAG_HANDLE, minSizeOf, reflow } from "../grid";
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
  const { hoverNode, focused, focusFrame } = useContext(FocusContext);
  const relayout = useContext(RelayoutContext);
  const { setNodes } = useReactFlow();
  const level = useAreaFocus(id);
  const min = minSizeOf(id);

  return (
    <Flex
      direction="column"
      data-group
      data-level={level}
      className={clsx(styles.frame, data.parent && styles.nested, !data.compose && styles.loose)}
    >
      <NodeResizer
        minWidth={min.width}
        minHeight={min.height}
        lineClassName={styles.resizeLine}
        handleClassName={styles.resizeHandle}
        onResizeEnd={(_, params) => {
          setNodes((nodes) => reflow(nodes, id, { width: params.width, height: params.height }));
          relayout();
        }}
      />
      <Handle type="target" position={Position.Left} className={styles.handle} />
      <HoverCard.Root openDelay={200} closeDelay={80}>
        <HoverCard.Trigger>
          <Box
            className={clsx(styles.header, FRAME_DRAG_HANDLE)}
            onPointerEnter={() => hoverNode(id)}
            onPointerLeave={() => hoverNode(null)}
          >
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
                    <Flex align="center" gap="2">
                      <Text as="span" size="1" className={styles.count}>
                        {t("containerCount", { count: data.members })}
                      </Text>
                      <IconButton
                        size="1"
                        variant={focused === id ? "solid" : "ghost"}
                        className={clsx(styles.focus, "nodrag")}
                        aria-label={focused === id ? t("focusExit") : t("focusAction")}
                        aria-pressed={focused === id}
                        onClick={(event: MouseEvent) => {
                          event.stopPropagation();
                          focusFrame(focused === id ? null : id);
                        }}
                        onDoubleClick={(event: MouseEvent) => event.stopPropagation()}
                      >
                        <AnimatedIcon icon={FocusIcon} size={14} />
                      </IconButton>
                    </Flex>
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
      <Box flexGrow="1" className={styles.body} />
      <Handle type="source" position={Position.Right} className={styles.handle} />
    </Flex>
  );
});

ComposeFrame.displayName = "ComposeFrame";
export default ComposeFrame;
