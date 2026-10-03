import type { EdgeProps } from "@xyflow/react";
import type { LinkSideEnum, TopologyLink } from "@/constants";
import type { LinkEdge } from "../layout";

import { memo, useContext } from "react";
import { Flex, HoverCard, Separator, Text } from "@radix-ui/themes";
import { EdgeLabelRenderer } from "@xyflow/react";
import { useTranslation } from "react-i18next";

import { LinkSide } from "@/constants";

import { FocusContext, useLinkFocus } from "../focus";
import styles from "./s.module.css";

type Route = { d: string; x: number; y: number };

function route(side: LinkSideEnum, sx: number, sy: number, tx: number, ty: number): Route {
  if (side === LinkSide.OVERPASS) {
    const lift = Math.min(sy, ty) - 200;
    return {
      d: `M ${sx},${sy} C ${sx},${lift} ${tx},${lift} ${tx},${ty}`,
      x: (sx + tx) / 2,
      y: 0.125 * sy + 0.75 * lift + 0.125 * ty,
    };
  }
  if (side === LinkSide.BOTTOM_TOP) {
    const bend = Math.max(24, (ty - sy) / 2);
    return {
      d: `M ${sx},${sy} C ${sx},${sy + bend} ${tx},${ty - bend} ${tx},${ty}`,
      x: (sx + tx) / 2,
      y: (sy + ty) / 2,
    };
  }
  const bend = Math.max(40, (tx - sx) / 2);
  return { d: `M ${sx},${sy} C ${sx + bend},${sy} ${tx - bend},${ty} ${tx},${ty}`, x: (sx + tx) / 2, y: (sy + ty) / 2 };
}

function dialText(link: TopologyLink): string {
  if (link.dials.length > 1) return `×${link.dials.length}`;
  const [dial] = link.dials;
  if (!dial) return "";
  return dial.secure ? `${dial.dev} / ${dial.secure}` : dial.dev;
}

const PortLink = memo(({ id, sourceX, sourceY, targetX, targetY, data }: EdgeProps<LinkEdge>) => {
  const { t } = useTranslation("architecture");
  const { hoverLink } = useContext(FocusContext);
  const level = useLinkFocus(id);
  if (!data) return null;
  const path = route(data.side, sourceX, sourceY, targetX, targetY);

  return (
    <>
      <g className={styles.link} data-link={id} data-protocol={data.protocol} data-level={level}>
        <path d={path.d} className={styles.track} />
        <path d={path.d} className={styles.line} data-draw />
        <circle r={3.5} className={styles.packet} data-packet />
        <path
          d={path.d}
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
              data-link-label
              data-level={level}
              data-protocol={data.protocol}
              style={{ transform: `translate(-50%, -50%) translate(${path.x}px, ${path.y}px)` }}
              onPointerEnter={() => hoverLink(id)}
              onPointerLeave={() => hoverLink(null)}
            >
              <span className={styles.kind}>{t(`kinds.${data.protocol}`)}</span>
              <span className={styles.ports}>{dialText(data)}</span>
            </button>
          </HoverCard.Trigger>
          <HoverCard.Content side="top" sideOffset={10} maxWidth="320px" className={styles.card}>
            <Flex direction="column" gap="2">
              <Text size="2" weight="bold">
                {t(`blocks.${data.source}.title`)} → {t(`blocks.${data.target}.title`)}
              </Text>
              <Text size="1" className={styles.caption}>
                {t(`kinds.${data.protocol}`)} · {t("dialsTitle")}
              </Text>
              <Separator size="4" />
              {data.dials.map((dial) => (
                <Flex key={`${dial.service ?? "port"}-${dial.dev}`} justify="between" gap="4">
                  <Text size="1" color="gray">
                    {dial.service ?? t(`kinds.${data.protocol}`)}
                  </Text>
                  <Text size="1" className={styles.mono}>
                    {t("dev")} {dial.dev}
                    {dial.secure ? ` · ${t("secure")} ${dial.secure}` : ""}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </HoverCard.Content>
        </HoverCard.Root>
      </EdgeLabelRenderer>
    </>
  );
});

PortLink.displayName = "PortLink";
export default PortLink;
