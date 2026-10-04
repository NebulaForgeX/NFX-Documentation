import type { NodeProps } from "@xyflow/react";
import type { PointerEvent } from "react";
import type { TopologyLink } from "@/constants";
import type { BlockNode } from "../layout";

import { memo, useContext, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Box, Checkbox, Container, Flex, HoverCard, Section, Separator, Text } from "@radix-ui/themes";
import { Handle, Position } from "@xyflow/react";
import clsx from "clsx";
import gsap from "gsap";
import { AnimatedIcon, DockerIcon, GlobeIcon, RouterIcon } from "nfx-ui/icons";
import { useTranslation } from "react-i18next";

import { FocusContext, useNodeFocus } from "../focus";
import { linksFrom, linksTo } from "../layout";
import styles from "./s.module.css";

gsap.registerPlugin(useGSAP);

function BlockIcon({ id, docker }: { id: string; docker: boolean }) {
  if (docker) return <AnimatedIcon icon={DockerIcon} size={14} />;
  if (id === "internet") return <AnimatedIcon icon={GlobeIcon} size={14} />;
  return <AnimatedIcon icon={RouterIcon} size={14} />;
}

function LinkList({ title, links, end }: { title: string; links: TopologyLink[]; end: "source" | "target" }) {
  const { t } = useTranslation("architecture");
  if (!links.length) return null;
  return (
    <Flex direction="column" gap="1">
      <Text size="1" className={styles.caption}>
        {title}
      </Text>
      {links.map((link) => (
        <Flex key={link.id} justify="between" gap="4">
          <Text size="1" color="gray" truncate>
            {t(`containers.${link[end]}.title`)}
          </Text>
          <Text size="1" className={styles.mono}>
            {t(`kinds.${link.protocol}`)}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}

function BlockDetail({ data }: { data: BlockNode["data"] }) {
  const { t } = useTranslation("architecture");
  return (
    <Flex direction="column" gap="3">
      <Flex direction="column" gap="1">
        <Text size="3" weight="bold">
          {t(`containers.${data.id}.title`)}
        </Text>
        {data.names.length ? (
          data.names.map((name) => (
            <Text key={name} size="1" className={styles.mono}>
              {name}
            </Text>
          ))
        ) : (
          <Text size="1" className={styles.mono}>
            {t("notDocker")}
          </Text>
        )}
      </Flex>
      <Text size="2" color="gray">
        {t(`containers.${data.id}.body`)}
      </Text>
      {data.listen ? (
        <Text size="1" color="gray">
          {t("listenNote", { listen: data.listen })}
        </Text>
      ) : null}
      {data.ports.length ? (
        <>
          <Separator size="4" />
          <Flex direction="column" gap="1">
            <Text size="1" className={styles.caption}>
              {t("portsTitle")}
            </Text>
            {data.ports.map((port) => (
              <Flex key={`${port.name}-${port.dev}`} justify="between" gap="4">
                <Text size="1" color="gray">
                  {port.name}
                </Text>
                <Text size="1" className={styles.mono}>
                  {port.dev}
                  {port.secure ? ` / ${port.secure}` : ""}
                </Text>
              </Flex>
            ))}
          </Flex>
        </>
      ) : null}
      <LinkList title={t("dialsOut")} links={linksFrom(data.id)} end="target" />
      <LinkList title={t("dialsIn")} links={linksTo(data.id)} end="source" />
    </Flex>
  );
}

const ArchBlock = memo(({ id, data }: NodeProps<BlockNode>) => {
  const { t } = useTranslation("architecture");
  const { hoverNode, selected } = useContext(FocusContext);
  const level = useNodeFocus(id);
  const ref = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: ref });
  const [port] = data.ports;

  const lift = contextSafe((target: HTMLElement, up: boolean) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(target, { y: up ? -3 : 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
  });

  return (
    <>
      <Handle type="target" position={Position.Left} className={styles.handle} />
      <HoverCard.Root openDelay={160} closeDelay={80}>
        <HoverCard.Trigger>
          <Box
            ref={ref}
            data-block
            data-level={level}
            className={clsx(styles.block, !data.docker && styles.plain, selected.has(id) && styles.selected)}
            onPointerEnter={(event: PointerEvent<HTMLDivElement>) => {
              hoverNode(id);
              lift(event.currentTarget, true);
            }}
            onPointerLeave={(event: PointerEvent<HTMLDivElement>) => {
              hoverNode(null);
              lift(event.currentTarget, false);
            }}
          >
            <Section size="1" py="3">
              <Container size="4" width="100%" maxWidth="100%" px="3">
                <Flex direction="column" gap="1">
                  <Flex align="center" justify="between" gap="2">
                    <Flex align="center" gap="2" minWidth="0" className={styles.kicker}>
                      <BlockIcon id={id} docker={data.docker} />
                      <Text as="span" size="1" truncate>
                        {data.docker ? data.service : t("notDocker")}
                      </Text>
                    </Flex>
                    <Checkbox size="1" checked={selected.has(id)} tabIndex={-1} className={styles.check} aria-hidden />
                  </Flex>
                  <Text as="span" size="2" weight="bold" truncate>
                    {t(`containers.${id}.title`)}
                  </Text>
                  <Flex align="center" justify="between" gap="2">
                    <Text as="span" size="1" className={styles.range} truncate>
                      {port ? `${port.dev}${port.secure ? ` / ${port.secure}` : ""}` : "—"}
                    </Text>
                    {data.ports.length ? (
                      <Text as="span" size="1" className={styles.count}>
                        {data.ports.length}P
                      </Text>
                    ) : null}
                  </Flex>
                </Flex>
              </Container>
            </Section>
          </Box>
        </HoverCard.Trigger>
        <HoverCard.Content side="right" align="start" sideOffset={12} maxWidth="360px" className={styles.card}>
          <BlockDetail data={data} />
        </HoverCard.Content>
      </HoverCard.Root>
      <Handle type="source" position={Position.Right} className={styles.handle} />
    </>
  );
});

ArchBlock.displayName = "ArchBlock";
export default ArchBlock;
