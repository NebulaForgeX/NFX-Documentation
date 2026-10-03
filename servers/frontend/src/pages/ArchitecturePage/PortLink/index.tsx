import type { EdgeProps } from "@xyflow/react";
import type { Dial, TopologyLink } from "@/constants";
import type { LinkEdge } from "../layout";

import { memo, useContext } from "react";
import { Flex, HoverCard, Separator, Text } from "@radix-ui/themes";
import { EdgeLabelRenderer } from "@xyflow/react";
import { useTranslation } from "react-i18next";

import { FocusContext, useLinkFocus } from "../focus";
import styles from "./s.module.css";

function dialPorts(dial: Dial): string {
  return dial.address ?? [dial.dev, dial.secure].filter(Boolean).join(" / ");
}

function dialText(link: TopologyLink): string {
  if (link.dials.length > 1) return `×${link.dials.length}`;
  const [dial] = link.dials;
  return dial ? dialPorts(dial) : "";
}

const PortLink = memo(({ id, data }: EdgeProps<LinkEdge>) => {
  const { t } = useTranslation("architecture");
  const { hoverLink } = useContext(FocusContext);
  const level = useLinkFocus(id);
  if (!data?.path) return null;

  return (
    <>
      <g className={styles.link} data-link={id} data-protocol={data.protocol} data-level={level}>
        <path d={data.path} className={styles.track} />
        <path d={data.path} className={styles.line} data-draw />
        <circle r={3} className={styles.packet} data-packet />
        <path
          d={data.path}
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
              data-level={level}
              data-protocol={data.protocol}
              style={{ transform: `translate(-50%, -50%) translate(${data.labelX}px, ${data.labelY}px)` }}
              onPointerEnter={() => hoverLink(id)}
              onPointerLeave={() => hoverLink(null)}
            >
              <span className={styles.kind}>{t(`kinds.${data.protocol}`)}</span>
              <span className={styles.ports}>{dialText(data)}</span>
            </button>
          </HoverCard.Trigger>
          <HoverCard.Content side="top" sideOffset={10} maxWidth="340px" className={styles.card}>
            <Flex direction="column" gap="2">
              <Text size="2" weight="bold">
                {t(`containers.${data.source}.title`)} → {t(`containers.${data.target}.title`)}
              </Text>
              <Text size="1" className={styles.caption}>
                {t(`kinds.${data.protocol}`)} · {t("dialsTitle")}
              </Text>
              <Separator size="4" />
              {data.dials.map((dial) => (
                <Flex key={`${dial.service ?? "port"}-${dialPorts(dial)}`} justify="between" gap="4">
                  <Text size="1" color="gray">
                    {dial.service ?? t(`kinds.${data.protocol}`)}
                  </Text>
                  <Text size="1" className={styles.mono}>
                    {dial.address ?? ""}
                    {dial.dev ? `${t("dev")} ${dial.dev}` : ""}
                    {dial.dev && dial.secure ? " · " : ""}
                    {dial.secure ? `${t("secure")} ${dial.secure}` : ""}
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
