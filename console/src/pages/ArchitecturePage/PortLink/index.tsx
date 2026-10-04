import type { EdgeProps, InternalNode } from "@xyflow/react";
import type { RefObject } from "react";
import type { Dial, OverviewLink, TopologyLink } from "@/constants";
import type { LinkEdge } from "../layout";
import type { DrawOrigin } from "../timeline";

import { memo, useContext, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Flex, HoverCard, Separator, Text } from "@radix-ui/themes";
import { EdgeLabelRenderer, useInternalNode } from "@xyflow/react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

import { TOPOLOGY_LINKS } from "@/constants";

import { FocusContext, useLinkFocus } from "../focus";
import { isFrame, isOverview } from "../layout";
import { anchorOn, curvePath, sideBetween, useLane } from "../route";
import { drawStrokes, REDUCED, TRACE_SECONDS } from "../timeline";
import styles from "./s.module.css";

const LINK_BY_ID = new Map(TOPOLOGY_LINKS.map((link) => [link.id, link]));

function dialPorts(dial: Dial): string {
  return dial.address ?? [dial.dev, dial.secure].filter(Boolean).join(" / ");
}

function dialText(link: TopologyLink | OverviewLink): string {
  if (isOverview(link)) return `×${link.members.length}`;
  if (link.dials.length > 1) return `×${link.dials.length}`;
  const [dial] = link.dials;
  return dial ? dialPorts(dial) : "";
}

function DialRows({ link }: { link: TopologyLink }) {
  const { t } = useTranslation("architecture");
  return link.dials.map((dial) => (
    <Flex key={`${dial.service ?? "port"}-${dialPorts(dial)}`} justify="between" gap="4">
      <Text size="1" color="gray">
        {dial.service ?? t(`kinds.${link.protocol}`)}
      </Text>
      <Text size="1" className={styles.mono}>
        {dial.address ?? ""}
        {dial.dev ? `${t("dev")} ${dial.dev}` : ""}
        {dial.dev && dial.secure ? " · " : ""}
        {dial.secure ? `${t("secure")} ${dial.secure}` : ""}
      </Text>
    </Flex>
  ));
}

function MemberRows({ link }: { link: OverviewLink }) {
  const { t } = useTranslation("architecture");
  return link.members.map((id) => {
    const member = LINK_BY_ID.get(id);
    if (!member) return null;
    return (
      <Flex key={id} direction="column" gap="1">
        <Flex justify="between" gap="4">
          <Text size="1" weight="medium" truncate>
            {t(`containers.${member.source}.title`)} → {t(`containers.${member.target}.title`)}
          </Text>
          <Text size="1" className={styles.kindText}>
            {t(`kinds.${member.protocol}`)}
          </Text>
        </Flex>
        <DialRows link={member} />
      </Flex>
    );
  });
}

function rectOf(node: InternalNode | undefined) {
  if (!node) return null;
  const { x, y } = node.internals.positionAbsolute;
  return { x, y, width: node.measured.width ?? node.width ?? 0, height: node.measured.height ?? node.height ?? 0 };
}

function useTrace(scope: RefObject<SVGGElement | null>, origin: DrawOrigin | null) {
  useGSAP(
    () => {
      const group = scope.current;
      const line = group?.querySelector<SVGPathElement>("[data-draw]");
      const glow = group?.querySelector<SVGPathElement>("[data-glow]");
      if (!origin || !line || !glow) return;
      const media = gsap.matchMedia();
      media.add(REDUCED, () => {
        gsap
          .timeline()
          .set(glow, { opacity: 1 })
          .add(drawStrokes([line, glow], origin, { duration: TRACE_SECONDS, ease: "power2.out" }))
          .to(glow, { opacity: 0.3, duration: 0.6, ease: "power1.out", clearProps: "opacity" });
      });
      return () => media.revert();
    },
    { scope, dependencies: [origin] },
  );
}

const PortLink = memo(
  ({
    id,
    data,
    source,
    target,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  }: EdgeProps<LinkEdge>) => {
    const { t } = useTranslation("architecture");
    const { hoverLink, selected } = useContext(FocusContext);
    const level = useLinkFocus(id);
    const lane = useLane(id);
    const scope = useRef<SVGGElement>(null);
    const traced = Boolean(data && !isOverview(data));
    const origin: DrawOrigin | null = !traced
      ? null
      : selected.has(source)
        ? "source"
        : selected.has(target)
          ? "target"
          : null;
    useTrace(scope, origin);
    const sourceRect = rectOf(useInternalNode(source));
    const targetRect = rectOf(useInternalNode(target));
    if (!data) return null;
    const overview = isOverview(data);
    const [from, to] =
      sourceRect && targetRect
        ? [
            anchorOn(sourceRect, sideBetween(sourceRect, targetRect), lane.sourceT),
            anchorOn(targetRect, sideBetween(targetRect, sourceRect), lane.targetT),
          ]
        : [
            { x: sourceX, y: sourceY, position: sourcePosition },
            { x: targetX, y: targetY, position: targetPosition },
          ];
    const [path, labelX, labelY] = curvePath(from, to, lane.bend);
    const unitTitle = (unit: string) => t(isFrame(unit) ? `groups.${unit}.title` : `containers.${unit}.title`);

    return (
      <>
        <g
          ref={scope}
          className={styles.link}
          data-link={id}
          data-protocol={data.protocol}
          data-level={level}
          data-overview={overview ? "true" : "false"}
          data-traced={origin ? "true" : "false"}
        >
          <path d={path} className={styles.track} data-stroke />
          <path d={path} className={styles.glow} data-glow />
          <path d={path} className={styles.line} data-draw data-stroke />
          <circle r={overview ? 4.5 : 3} className={styles.packet} data-packet />
          <path
            d={path}
            className={styles.hit}
            onPointerEnter={() => hoverLink(id)}
            onPointerLeave={() => hoverLink(null)}
          />
        </g>
        <EdgeLabelRenderer>
          <HoverCard.Root openDelay={120} closeDelay={60}>
            <HoverCard.Trigger>
              <button
                type="button"
                className={`${styles.label} nodrag nopan`}
                data-edge-label={id}
                data-level={level}
                data-protocol={data.protocol}
                data-overview={overview ? "true" : "false"}
                style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
                onPointerEnter={() => hoverLink(id)}
                onPointerLeave={() => hoverLink(null)}
              >
                <span className={styles.kind}>{t(`kinds.${data.protocol}`)}</span>
                <span className={styles.ports}>{dialText(data)}</span>
              </button>
            </HoverCard.Trigger>
            <HoverCard.Content side="top" sideOffset={10} maxWidth="380px" className={styles.card}>
              <Flex direction="column" gap="2">
                <Text size="2" weight="bold">
                  {unitTitle(data.source)} → {unitTitle(data.target)}
                </Text>
                <Text size="1" className={styles.caption}>
                  {t(`kinds.${data.protocol}`)} ·{" "}
                  {overview ? t("linkCount", { count: data.members.length }) : t("dialsTitle")}
                </Text>
                <Separator size="4" />
                {overview ? <MemberRows link={data} /> : <DialRows link={data} />}
              </Flex>
            </HoverCard.Content>
          </HoverCard.Root>
        </EdgeLabelRenderer>
      </>
    );
  },
);

PortLink.displayName = "PortLink";
export default PortLink;
