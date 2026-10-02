import type { ArchNode, PortKind } from "./graph";
import type { NodeProps } from "@xyflow/react";

import { memo, useCallback, useMemo, useState } from "react";
import { Background, Controls, Handle, MarkerType, MiniMap, Position, ReactFlow, useNodesState } from "@xyflow/react";
import { Box, Container, Flex, Section, Text } from "@radix-ui/themes";
import { AppearanceEnum } from "nfx-ui/enums";
import { usePreferenceStore } from "nfx-ui/stores";
import { useTranslation } from "react-i18next";

import { PageIntro } from "@/components";

import { ARCH_NODES, toFlowEdges } from "./graph";

import "@xyflow/react/dist/style.css";

import styles from "./s.module.css";

const KIND_CLASS: Record<PortKind, string> = {
  ingress: styles.kindIngress,
  http: styles.kindHttp,
  grpc: styles.kindGrpc,
  console: styles.kindConsole,
  data: styles.kindData,
};

const ArchBlock = memo(({ id, data, selected }: NodeProps<ArchNode>) => {
  const { t } = useTranslation("architecture");

  return (
    <Box className={`${styles.node} ${selected ? styles.nodeSelected : ""}`}>
      <Handle type="target" position={Position.Left} />
      <Section size="1" py="2">
        <Container px="3">
          <Flex direction="column" gap="2" className="arch-drag">
            <Text size="2" weight="bold">
              {t(`nodes.${id}.title`)}
            </Text>
            <Text size="1" color="gray">
              {t(`nodes.${id}.body`)}
            </Text>
            {data.ports.map((port) => (
              <Flex key={`${port.name}-${port.dev}`} align="center" gap="2">
                <Box className={`${styles.kind} ${KIND_CLASS[port.kind]}`} />
                <Text size="1">
                  {port.name} {port.dev}
                  {port.secure ? ` / ${port.secure}` : ""}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Container>
      </Section>
      <Handle type="source" position={Position.Right} />
    </Box>
  );
});

ArchBlock.displayName = "ArchBlock";

const nodeTypes = { arch: ArchBlock };

const ArchitecturePage = memo(() => {
  const { t } = useTranslation("architecture");
  const appearance = usePreferenceStore((state) => state.theme.appearance);
  const colorMode = appearance === AppearanceEnum.DARK ? "dark" : appearance === AppearanceEnum.LIGHT ? "light" : "system";
  const [nodes, , onNodesChange] = useNodesState(ARCH_NODES);
  const [activeId, setActiveId] = useState<string | null>("traefik");
  const edges = useMemo(
    () =>
      toFlowEdges((key) => t(`edges.${key}`)).map((edge) => ({
        ...edge,
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { opacity: activeId == null || edge.source === activeId || edge.target === activeId ? 1 : 0.15 },
      })),
    [activeId, t],
  );
  const active = ARCH_NODES.find((item) => item.id === activeId);

  const onNodeClick = useCallback((_: unknown, node: { id: string }) => {
    setActiveId(node.id);
  }, []);

  return (
    <Section size="2" py="6">
      <Container size="4" px="4">
        <Flex direction="column" gap="4">
          <PageIntro title={t("title")}>
            <Text as="p" size="3" color="gray">
              {t("lead")}
            </Text>
          </PageIntro>
          <Text size="2" color="gray">
            {t("hint")}
          </Text>
          <Box className={styles.stage}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              colorMode={colorMode}
              fitView
              minZoom={0.35}
              proOptions={{ hideAttribution: false }}
            >
              <Background />
              <Controls showInteractive={false} />
              <MiniMap pannable zoomable />
            </ReactFlow>
          </Box>
          <Section size="1" py="3">
            <Flex direction="column" gap="2">
              <Text size="3" weight="medium">
                {active ? t(`nodes.${active.id}.title`) : t("empty")}
              </Text>
              {active ? (
                <Text size="2" color="gray">
                  {t(`nodes.${active.id}.body`)}
                </Text>
              ) : null}
              {active?.data.ports.map((port) => (
                <Text key={`${active.id}-${port.name}`} size="2">
                  {t(`kinds.${port.kind}`)} · {port.name} · dev {port.dev}
                  {port.secure ? ` · secure ${port.secure}` : ""}
                </Text>
              ))}
            </Flex>
          </Section>
        </Flex>
      </Container>
    </Section>
  );
});

ArchitecturePage.displayName = "ArchitecturePage";
export default ArchitecturePage;
