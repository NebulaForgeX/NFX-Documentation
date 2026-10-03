import type { Focus, FocusState } from "./focus";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow, useNodesInitialized } from "@xyflow/react";
import { useResolvedAppearance } from "nfx-ui/hooks";
import { useTranslation } from "react-i18next";

import { Eyebrow } from "@/components";
import { COMPOSE_COUNT, TOPOLOGY_LINKS } from "@/constants";
import { PageFrame } from "@/layouts";

import ArchBlock from "./ArchBlock";
import { FocusContext } from "./focus";
import { FLOW_EDGES, FLOW_NODES, linkFocus, neighbours } from "./layout";
import PortLink from "./PortLink";
import RangeGrid from "./RangeGrid";
import TierLabel from "./TierLabel";
import { useFlowTimeline } from "./timeline";

import "@xyflow/react/dist/style.css";

import styles from "./s.module.css";

const nodeTypes = { block: ArchBlock, tier: TierLabel };
const edgeTypes = { link: PortLink };

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

const ArchitecturePage = memo(() => {
  const { t } = useTranslation("architecture");
  const appearance = useResolvedAppearance();
  const stage = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [hover, setHover] = useState<Hover>(null);
  const [pinned, setPinned] = useState<string | null>(null);

  useFlowTimeline(stage, armed);

  const focus = useMemo<Focus | null>(() => {
    if (hover?.kind === "link") return linkFocus(hover.id);
    if (hover?.kind === "nodes") return neighbours(hover.ids);
    if (pinned) return neighbours([pinned]);
    return null;
  }, [hover, pinned]);

  const hoverNode = useCallback((id: string | null) => setHover(id ? { kind: "nodes", ids: [id] } : null), []);
  const hoverLink = useCallback((id: string | null) => setHover(id ? { kind: "link", id } : null), []);
  const arm = useCallback(() => setArmed(true), []);

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
              <Flex align="center" gap="4" className={styles.readout}>
                <Text as="span" size="1">
                  {t("composeCount", { count: COMPOSE_COUNT })}
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
          </Container>
        </Section>

        <Flex direction={{ initial: "column", md: "row" }} className={styles.body}>
          <Box ref={stage} className={styles.stage} data-armed={armed ? "true" : "false"}>
            <ReactFlow
              defaultNodes={FLOW_NODES}
              defaultEdges={FLOW_EDGES}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              className={styles.flow}
              colorMode={appearance === "light" ? "light" : "dark"}
              onNodeClick={(_, node) => {
                if (node.type !== "block") return;
                setPinned((current) => (current === node.id ? null : node.id));
              }}
              onPaneClick={() => setPinned(null)}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              fitView
              fitViewOptions={{ padding: 0.08 }}
              minZoom={0.3}
              maxZoom={1.6}
            >
              <Arm onArm={arm} />
              <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} />
              <Controls showInteractive={false} position="bottom-left" />
              <MiniMap pannable zoomable position="bottom-right" />
            </ReactFlow>
          </Box>
          <Box className={styles.side}>
            <RangeGrid
              focus={focus}
              onHover={(ids) => setHover(ids ? { kind: "nodes", ids } : null)}
              onPin={(id) => setPinned((current) => (current === id ? null : id))}
            />
          </Box>
        </Flex>
      </FocusContext.Provider>
    </PageFrame>
  );
});

ArchitecturePage.displayName = "ArchitecturePage";
export default ArchitecturePage;
