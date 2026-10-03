import type { Node } from "@xyflow/react";
import type { Focus, FocusState } from "./focus";
import type { CheckState, LayerKeyEnum } from "./layout";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Section,
  SegmentedControl,
  Tabs,
  Text,
} from "@radix-ui/themes";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useNodesInitialized,
  useReactFlow,
} from "@xyflow/react";
import { useResolvedAppearance } from "nfx-ui/hooks";
import { AnimatedIcon, ArrowBackUpIcon } from "nfx-ui/icons";
import { useTranslation } from "react-i18next";

import { Eyebrow } from "@/components";
import { COMPOSE_COUNT, CONTAINER_COUNT, TOPOLOGY_LINKS } from "@/constants";
import { PageFrame } from "@/layouts";

import ArchBlock from "./ArchBlock";
import ComposeFrame from "./ComposeFrame";
import { FocusContext, RelayoutContext } from "./focus";
import { COMPOSE_EDGES, FLOW_NODES, focusEdges, traceEdges } from "./grid";
import {
  CONTAINER_BY_ID,
  frameFocus,
  layerFocus,
  LayerKey,
  linkFocus,
  neighbours,
  selectionFocus,
  unitsOf,
} from "./layout";
import PortLink from "./PortLink";
import RangeGrid from "./RangeGrid";
import ServiceList from "./ServiceList";
import TierLabel from "./TierLabel";
import { useFlowTimeline } from "./timeline";

import "@xyflow/react/dist/style.css";

import styles from "./s.module.css";

const nodeTypes = { block: ArchBlock, frame: ComposeFrame, tier: TierLabel };
const edgeTypes = { link: PortLink };
const LAYERS = Object.values(LayerKey);
const FIT_PADDING = 0.04;

const SideTab = {
  SERVICES: "services",
  PORTS: "ports",
} as const;

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
  showCompose,
  selected,
  focused,
  onArm,
  onToggle,
  onRelayout,
  onFocus,
}: {
  appearance: string;
  showCompose: boolean;
  selected: Set<string>;
  focused: string | null;
  onArm: () => void;
  onToggle: (ids: string[]) => void;
  onRelayout: () => void;
  onFocus: (id: string | null) => void;
}) {
  const { fitBounds, getInternalNode, getNodes, getNodesBounds } = useReactFlow();

  const zoomTo = useCallback(
    (id: string | null) => {
      const node = id ? getInternalNode(id) : undefined;
      const bounds = node
        ? {
            ...node.internals.positionAbsolute,
            width: node.measured.width ?? node.width ?? 0,
            height: node.measured.height ?? node.height ?? 0,
          }
        : getNodesBounds(getNodes());
      void fitBounds(bounds, { duration: 600, padding: node ? 0.12 : FIT_PADDING });
    },
    [fitBounds, getInternalNode, getNodes, getNodesBounds],
  );
  const edges = useMemo(() => {
    const base = focused ? focusEdges(focused) : showCompose ? COMPOSE_EDGES : [];
    const shown = new Set(base.map((edge) => edge.id));
    return [...base, ...traceEdges(selected).filter((edge) => !shown.has(edge.id))];
  }, [focused, showCompose, selected]);
  const edgesShown = useRef(false);
  const focusShown = useRef(focused);

  useEffect(() => {
    if (!edgesShown.current) {
      edgesShown.current = true;
      return;
    }
    const frame = requestAnimationFrame(onRelayout);
    return () => cancelAnimationFrame(frame);
  }, [edges, onRelayout]);

  useEffect(() => {
    if (focusShown.current === focused) return;
    focusShown.current = focused;
    zoomTo(focused);
  }, [focused, zoomTo]);

  return (
    <ReactFlow
      defaultNodes={FLOW_NODES}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      className={styles.flow}
      colorMode={appearance === "light" ? "light" : "dark"}
      onNodeClick={(_, node) => {
        if (node.type === "block") onToggle([node.id]);
      }}
      onNodeDoubleClick={(_, node) => {
        if (node.type === "tier") return;
        const frame = node.type === "frame" ? node.id : CONTAINER_BY_ID.get(node.id)?.group;
        if (frame) onFocus(focused === frame ? null : frame);
        else zoomTo(node.id);
      }}
      onNodeDragStop={onRelayout}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnDoubleClick={false}
      fitView
      fitViewOptions={{ padding: FIT_PADDING }}
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
  const [version, setVersion] = useState(0);
  const [hover, setHover] = useState<Hover>(null);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [layer, setLayer] = useState<LayerKeyEnum>(LayerKey.ALL);
  const [showCompose, setShowCompose] = useState(true);
  const [focused, setFocused] = useState<string | null>(null);

  useFlowTimeline(stage, armed, version);

  useEffect(() => {
    if (!focused) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFocused(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused]);

  const focus = useMemo<Focus | null>(() => {
    if (selected.size) return selectionFocus(selected);
    if (hover?.kind === "link") return linkFocus(hover.id);
    if (hover?.kind === "nodes") return neighbours(hover.ids);
    if (focused) return frameFocus(focused);
    if (layer !== LayerKey.ALL) return layerFocus(layer);
    return null;
  }, [hover, selected, focused, layer]);

  const hoverNode = useCallback((id: string | null) => setHover(id ? { kind: "nodes", ids: [id] } : null), []);
  const hoverNodes = useCallback((ids: string[] | null) => setHover(ids ? { kind: "nodes", ids } : null), []);
  const hoverLink = useCallback((id: string | null) => setHover(id ? { kind: "link", id } : null), []);
  const arm = useCallback(() => setArmed(true), []);
  const relayout = useCallback(() => setVersion((current) => current + 1), []);
  const toggle = useCallback(
    (ids: string[]) =>
      setSelected((current) => {
        const units = ids.flatMap(unitsOf);
        const on = !units.every((unit) => current.has(unit));
        const next = new Set(current);
        units.forEach((unit) => (on ? next.add(unit) : next.delete(unit)));
        return next;
      }),
    [],
  );
  const clear = useCallback(() => setSelected(new Set()), []);

  const context = useMemo<FocusState>(
    () => ({ focus, selected, toggle, hoverNode, hoverLink, focused, focusFrame: setFocused }),
    [focus, selected, toggle, hoverNode, hoverLink, focused],
  );

  return (
    <PageFrame fullHeight>
      <FocusContext.Provider value={context}>
        <RelayoutContext.Provider value={relayout}>
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
                  {focused ? (
                    <Flex align="center" gap="3">
                      <Text as="span" size="1" className={styles.focusing}>
                        {t("focusing", { name: t(`groups.${focused}.title`) })}
                      </Text>
                      <Button size="1" variant="outline" onClick={() => setFocused(null)}>
                        <AnimatedIcon icon={ArrowBackUpIcon} size={14} />
                        {t("focusExit")}
                      </Button>
                    </Flex>
                  ) : (
                    <Text as="label" size="1" className={styles.toggle}>
                      <Flex align="center" gap="2">
                        <Checkbox
                          size="1"
                          checked={showCompose}
                          onCheckedChange={(checked: CheckState) => setShowCompose(checked === true)}
                        />
                        {t("showCompose")}
                      </Flex>
                    </Text>
                  )}
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
              <ReactFlowProvider>
                <Topology
                  appearance={appearance}
                  showCompose={showCompose}
                  selected={selected}
                  focused={focused}
                  onArm={arm}
                  onToggle={toggle}
                  onRelayout={relayout}
                  onFocus={setFocused}
                />
              </ReactFlowProvider>
            </Box>
            <Box className={styles.side}>
              <Tabs.Root defaultValue={SideTab.SERVICES}>
                <Box className={styles.tabs}>
                  <Container size="4" width="100%" maxWidth="100%" px="2">
                    <Tabs.List size="1">
                      <Tabs.Trigger value={SideTab.SERVICES}>{t("tabs.services")}</Tabs.Trigger>
                      <Tabs.Trigger value={SideTab.PORTS}>{t("tabs.ports")}</Tabs.Trigger>
                    </Tabs.List>
                  </Container>
                </Box>
                <Tabs.Content value={SideTab.SERVICES}>
                  <ServiceList
                    focus={focus}
                    selected={selected}
                    onHover={hoverNodes}
                    onToggle={toggle}
                    onClear={clear}
                  />
                </Tabs.Content>
                <Tabs.Content value={SideTab.PORTS}>
                  <RangeGrid focus={focus} onHover={hoverNodes} onToggle={toggle} />
                </Tabs.Content>
              </Tabs.Root>
            </Box>
          </Flex>
        </RelayoutContext.Provider>
      </FocusContext.Provider>
    </PageFrame>
  );
});

ArchitecturePage.displayName = "ArchitecturePage";
export default ArchitecturePage;
