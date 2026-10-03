import type { NodeProps, ReactFlowState } from "@xyflow/react";
import type { Geom } from "polyclip-ts";
import type { FrameNode } from "../layout";

import { memo, useCallback, useContext, useMemo } from "react";
import { Box, Container, Flex, HoverCard, Section, Separator, Text } from "@radix-ui/themes";
import { Handle, NodeResizer, Position, useReactFlow, useStore } from "@xyflow/react";
import clsx from "clsx";
import { AnimatedIcon, DockerIcon } from "nfx-ui/icons";
import { union } from "polyclip-ts";
import { useTranslation } from "react-i18next";

import { FocusContext, RelayoutContext, useAreaFocus } from "../focus";
import { BLOCK_WIDTH, FRAME_DRAG_HANDLE, FRAME_HEADER, FRAME_PAD, reflow } from "../grid";
import { containersIn } from "../layout";
import styles from "./s.module.css";

const rect = (x: number, y: number, width: number, height: number): Geom => [
  [
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height],
    [x, y],
  ],
];

function hullPath(width: number, children: string): string {
  const header = rect(0, 0, width, FRAME_HEADER);
  const cells: Geom[] = children
    ? children.split(";").map((entry) => {
        const [x, y, w, h] = entry.split(",").map(Number);
        return rect(x - FRAME_PAD, y - FRAME_PAD, w + FRAME_PAD * 2, h + FRAME_PAD * 2);
      })
    : [];
  return union(header, ...cells)
    .map((polygon) => polygon.map((ring) => `M ${ring.map(([x, y]) => `${x} ${y}`).join(" L ")} Z`).join(" "))
    .join(" ");
}

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

const ComposeFrame = memo(({ id, data, width = 0, height = 0 }: NodeProps<FrameNode>) => {
  const { t } = useTranslation("architecture");
  const { hoverNode } = useContext(FocusContext);
  const relayout = useContext(RelayoutContext);
  const { setNodes } = useReactFlow();
  const level = useAreaFocus(id);

  const children = useStore(
    useCallback(
      (state: ReactFlowState) => {
        const rows: string[] = [];
        state.nodeLookup.forEach((node) => {
          if (node.parentId !== id) return;
          const w = node.measured.width ?? node.width ?? 0;
          const h = node.measured.height ?? node.height ?? 0;
          rows.push(`${node.position.x},${node.position.y},${w},${h}`);
        });
        return rows.join(";");
      },
      [id],
    ),
  );
  const path = useMemo(() => hullPath(width, children), [width, children]);

  return (
    <Box
      data-group
      data-level={level}
      className={clsx(styles.frame, data.parent && styles.nested, !data.compose && styles.loose)}
    >
      <NodeResizer
        minWidth={BLOCK_WIDTH + FRAME_PAD * 2}
        minHeight={FRAME_HEADER}
        lineClassName={styles.resizeLine}
        handleClassName={styles.resizeHandle}
        onResizeEnd={(_, params) => {
          setNodes((nodes) => reflow(nodes, id, params.width));
          relayout();
        }}
      />
      <Handle type="target" position={Position.Left} className={styles.handle} />
      <svg className={styles.hull} width={width} height={height} aria-hidden>
        <path d={path} className={styles.area} />
      </svg>
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
      <Handle type="source" position={Position.Right} className={styles.handle} />
    </Box>
  );
});

ComposeFrame.displayName = "ComposeFrame";
export default ComposeFrame;
