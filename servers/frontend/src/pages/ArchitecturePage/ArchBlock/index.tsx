import type { NodeProps } from "@xyflow/react";
import type { PointerEvent } from "react";
import type { BlockNode } from "../layout";

import { memo, useContext, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Box, Container, Flex, HoverCard, Section, Separator, Text } from "@radix-ui/themes";
import { Handle, Position } from "@xyflow/react";
import clsx from "clsx";
import gsap from "gsap";
import { AnimatedIcon, DockerIcon, GlobeIcon, RouterIcon } from "nfx-ui/icons";
import { useTranslation } from "react-i18next";

import { FocusContext, useNodeFocus } from "../focus";
import styles from "./s.module.css";

gsap.registerPlugin(useGSAP);

function BlockIcon({ id, docker }: { id: string; docker: boolean }) {
  if (docker) return <AnimatedIcon icon={DockerIcon} size={14} />;
  if (id === "internet") return <AnimatedIcon icon={GlobeIcon} size={14} />;
  return <AnimatedIcon icon={RouterIcon} size={14} />;
}

function BlockDetail({ data }: { data: BlockNode["data"] }) {
  const { t } = useTranslation("architecture");
  const listen = t(`blocks.${data.id}.listen`);
  return (
    <Flex direction="column" gap="3">
      <Flex direction="column" gap="1">
        <Text size="3" weight="bold">
          {t(`blocks.${data.id}.title`)}
        </Text>
        <Text size="1" className={styles.mono}>
          {data.compose ?? t("notDocker")}
        </Text>
      </Flex>
      <Text size="2" color="gray">
        {t(`blocks.${data.id}.body`)}
      </Text>
      {listen ? (
        <Text size="1" color="gray">
          {t("listenNote", { listen })}
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
    </Flex>
  );
}

const ArchBlock = memo(({ id, data }: NodeProps<BlockNode>) => {
  const { t } = useTranslation("architecture");
  const { hoverNode, pinned } = useContext(FocusContext);
  const level = useNodeFocus(id);
  const ref = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: ref });

  const lift = contextSafe((target: HTMLElement, up: boolean) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(target, { y: up ? -4 : 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
  });

  return (
    <>
      <Handle id="l" type="target" position={Position.Left} className={styles.handle} />
      <Handle id="t" type="target" position={Position.Top} className={styles.handle} />
      <HoverCard.Root openDelay={160} closeDelay={80}>
        <HoverCard.Trigger>
          <Box
            ref={ref}
            data-block
            data-level={level}
            className={clsx(styles.block, !data.docker && styles.plain, pinned === id && styles.pinned)}
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
              <Container size="4" width="100%" maxWidth="100%" px="4">
                <Flex direction="column" gap="2">
                  <Flex align="center" justify="between" gap="2">
                    <Flex align="center" gap="2" minWidth="0" className={styles.kicker}>
                      <BlockIcon id={id} docker={data.docker} />
                      <Text as="span" size="1" truncate>
                        {data.compose ?? t("notDocker")}
                      </Text>
                    </Flex>
                    <Box className={styles.led} aria-hidden />
                  </Flex>
                  <Text as="span" size="3" weight="bold" truncate>
                    {t(`blocks.${id}.title`)}
                  </Text>
                  <Flex align="center" justify="between" gap="2">
                    <Text as="span" size="1" className={styles.range}>
                      {data.range ?? "—"}
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
        <HoverCard.Content side="right" align="start" sideOffset={12} maxWidth="340px" className={styles.card}>
          <BlockDetail data={data} />
        </HoverCard.Content>
      </HoverCard.Root>
      <Handle id="r" type="source" position={Position.Right} className={styles.handle} />
      <Handle id="b" type="source" position={Position.Bottom} className={styles.handle} />
      <Handle id="ts" type="source" position={Position.Top} className={styles.handle} />
    </>
  );
});

ArchBlock.displayName = "ArchBlock";
export default ArchBlock;
