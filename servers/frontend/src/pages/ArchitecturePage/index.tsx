import type { Node } from "@xyflow/react";
import type { Focus, FocusState } from "./focus";
import type { LayerKeyEnum } from "./layout";

import { memo, Suspense, use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Container, Flex, Heading, Section, SegmentedControl, Text } from "@radix-ui/themes";
import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow, useNodesInitialized } from "@xyflow/react";
import { useResolvedAppearance } from "nfx-ui/hooks";
import { useTranslation } from "react-i18next";

import { Eyebrow } from "@/components";
import { COMPOSE_COUNT, CONTAINER_COUNT, TOPOLOGY_LINKS } from "@/constants";
import { PageFrame } from "@/layouts";

import ArchBlock from "./ArchBlock";
import ComposeFrame from "./ComposeFrame";
import { FocusContext } from "./focus";
import { layerFocus, LayerKey, linkFocus, loadFlowLayout, neighbours } from "./layout";
import PortLink from "./PortLink";
import RangeGrid from "./RangeGrid";
import TierLabel from "./TierLabel";
import { useFlowTimeline } from "./timeline";

import "@xyflow/react/dist/style.css";

import styles from "./s.module.css";

const nodeTypes = { block: ArchBlock, frame: ComposeFrame, tier: TierLabel };
const edgeTypes = { link: PortLink };
const LAYERS = Object.values(LayerKey);

type Hover = { kind: "nodes"; ids: string[] } | { kind: "link"; id: string } | null;

function Arm({ onArm }: { onArm: () => void }) {
  const ready = useNodesInitialized();
  useEffect(() => {
    if (!ready) return;
    const frame = requestAnimationFrame(onArm);
    return () => cancelAnimationFrame(frame);
  }, [ready, onArm]);
  return null;
}

const miniColor = (node: Node) => (node.type === "frame" ? "transparent" : "var(--accent-a7)");
const miniStroke = (node: Node) => (node.type === "frame" ? "var(--accent-a6)" : "transparent");

function Topology({
  appearance,
  onArm,
  onPin,
}: {
  appearance: string;
  onArm: () => void;
  onPin: (id: string | null) => void;
}) {
  const { nodes, edges } = use(loadFlowLayout());
  return (
    <ReactFlow
      defaultNodes={nodes}
      defaultEdges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      className={styles.flow}
      colorMode={appearance === "light" ? "light" : "dark"}
      onNodeClick={(_, node) => {
        if (node.type === "block" || node.type === "frame") onPin(node.id);
      }}
      onPaneClick={() => onPin(null)}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      fitView
      fitViewOptions={{ padding: 0.04 }}
      minZoom={0.1}
      maxZoom={1.6}
    >
      <Arm onArm={onArm} />
      <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} />
      <Controls showInteractive={false} position="bottom-left" />
      <MiniMap
        pannable
        zoomable
        position="bottom-right"
        nodeColor={miniColor}
        nodeStrokeColor={miniStroke}
        nodeStrokeWidth={8}
      />
    </ReactFlow>
  );
}

const ArchitecturePage = memo(() => {
  const { t } = useTranslation("architecture");
  const appearance = useResolvedAppearance();
  const stage = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [hover, setHover] = useState<Hover>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [layer, setLayer] = useState<LayerKeyEnum>(LayerKey.ALL);

  useFlowTimeline(stage, armed);

  const focus = useMemo<Focus | null>(() => {
    if (hover?.kind === "link") return linkFocus(hover.id);
    if (hover?.kind === "nodes") return neighbours(hover.ids);
    if (pinned) return neighbours([pinned]);
    if (layer !== LayerKey.ALL) return layerFocus(layer);
    return null;
  }, [hover, pinned, layer]);

  const hoverNode = useCallback((id: string | null) => setHover(id ? { kind: "nodes", ids: [id] } : null), []);
  const hoverLink = useCallback((id: string | null) => setHover(id ? { kind: "link", id } : null), []);
  const arm = useCallback(() => setArmed(true), []);
  const pin = useCallback(
    (id: string | null) => setPinned((current) => (id === null || current === id ? null : id)),
    [],
  );

  const context = useMemo<FocusState>(
    () => ({ focus, pinned, hoverNode, hoverLink }),
    [focus, pinned, hoverNode, hoverLink],
  );

  return (
    <PageFrame fullHeight>
      <FocusContext.Provider value={context}>
        <Section size="1" py="4" className={styles.hud} data-reveal>
          <Container size="4" width="100%" maxWidth="100%" px="5">
            <Flex align="end" justify="between" gap="5" wrap="wrap">
              <Flex direction="column" gap="2" minWidth="0">
                <Eyebrow>{t("eyebrow")}</Eyebrow>
                <Heading as="h1" size="7" className={styles.title}>
                  {t("title")}
                </Heading>
                <Text as="p" size="2" color="gray" className={styles.lead}>
                  {t("lead")}
                </Text>
              </Flex>
              <Flex direction="column" align="end" gap="3">
                <SegmentedControl.Root
                  size="1"
                  value={layer}
                  onValueChange={(value: string) => setLayer(value as LayerKeyEnum)}
                  aria-label={t("layerLabel")}
                >
                  {LAYERS.map((key) => (
                    <SegmentedControl.Item key={key} value={key}>
                      {t(`layers.${key}`)}
                    </SegmentedControl.Item>
                  ))}
                </SegmentedControl.Root>
                <Flex align="center" gap="4" wrap="wrap" className={styles.readout}>
                  <Text as="span" size="1">
                    {t("composeCount", { count: COMPOSE_COUNT })}
                  </Text>
                  <Box className={styles.dot} aria-hidden />
                  <Text as="span" size="1">
                    {t("containerCount", { count: CONTAINER_COUNT })}
                  </Text>
                  <Box className={styles.dot} aria-hidden />
                  <Text as="span" size="1">
                    {t("linkCount", { count: TOPOLOGY_LINKS.length })}
                  </Text>
                  <Box className={styles.dot} aria-hidden />
                  <Text as="span" size="1">
                    {t("clickHint")}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Container>
        </Section>

        <Flex direction={{ initial: "column", md: "row" }} className={styles.body}>
          <Box ref={stage} className={styles.stage} data-armed={armed ? "true" : "false"}>
            <Suspense fallback={null}>
              <Topology appearance={appearance} onArm={arm} onPin={pin} />
            </Suspense>
          </Box>
          <Box className={styles.side}>
            <RangeGrid focus={focus} onHover={(ids) => setHover(ids ? { kind: "nodes", ids } : null)} onPin={pin} />
          </Box>
        </Flex>
      </FocusContext.Provider>
    </PageFrame>
  );
});

ArchitecturePage.displayName = "ArchitecturePage";
export default ArchitecturePage;
