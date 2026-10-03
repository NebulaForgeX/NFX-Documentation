import type { Focus } from "../focus";

import { Box, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Eyebrow } from "@/components";

import { UNIT_ORDER } from "../grid";
import { directContainersOf, GROUP_BY_ID, isFrame, subFramesOf } from "../layout";
import styles from "./s.module.css";

type ServiceListProps = {
  focus: Focus | null;
  pinned: string | null;
  onHover: (ids: string[] | null) => void;
  onPin: (id: string | null) => void;
};

type RowProps = ServiceListProps & { id: string };

function Chip({ id, focus, pinned, onHover, onPin }: RowProps) {
  const { t } = useTranslation("architecture");
  return (
    <Box
      className={clsx(styles.chip, (pinned === id || focus?.nodes.has(id)) && styles.hot)}
      data-dim={focus && !focus.nodes.has(id) ? "true" : "false"}
      onPointerEnter={() => onHover([id])}
      onPointerLeave={() => onHover(null)}
      onClick={() => onPin(id)}
    >
      <Section size="1" py="1">
        <Container size="4" width="100%" maxWidth="100%" px="2">
          <Text as="span" size="1">
            {t(`containers.${id}.title`)}
          </Text>
        </Container>
      </Section>
    </Box>
  );
}

function FrameRow(props: RowProps) {
  const { t } = useTranslation("architecture");
  const { id, focus, pinned, onHover, onPin } = props;
  const group = GROUP_BY_ID.get(id);
  const area = pinned === id || Boolean(focus?.areas.has(id));
  const hot = Boolean(focus?.nodes.has(id));
  const children = subFramesOf(id);
  const containers = directContainersOf(id);

  return (
    <Box
      className={clsx(styles.frame, group?.parent && styles.nested, hot && styles.hot, area && styles.area)}
      data-dim={focus && !hot && !area ? "true" : "false"}
    >
      <Section size="1" py="2">
        <Container size="4" width="100%" maxWidth="100%" px="3">
          <Flex direction="column" gap="2">
            <Flex
              align="baseline"
              justify="between"
              gap="2"
              className={styles.head}
              onPointerEnter={() => onHover([id])}
              onPointerLeave={() => onHover(null)}
              onClick={() => onPin(id)}
            >
              <Text as="span" size="2" weight="bold" truncate>
                {t(`groups.${id}.title`)}
              </Text>
              <Text as="span" size="1" className={styles.range}>
                {group?.range ?? ""}
              </Text>
            </Flex>
            {children.length ? (
              <Flex direction="column" gap="2">
                {children.map((child) => (
                  <FrameRow key={child.id} {...props} id={child.id} />
                ))}
              </Flex>
            ) : null}
            {containers.length ? (
              <Flex wrap="wrap" gap="1">
                {containers.map((container) => (
                  <Chip key={container.id} {...props} id={container.id} />
                ))}
              </Flex>
            ) : null}
          </Flex>
        </Container>
      </Section>
    </Box>
  );
}

export default function ServiceList(props: ServiceListProps) {
  const { t } = useTranslation("architecture");
  return (
    <Section size="1" py="5">
      <Container size="4" width="100%" maxWidth="100%" px="4">
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Eyebrow>SERVICES</Eyebrow>
            <Heading as="h2" size="4">
              {t("servicesTitle")}
            </Heading>
            <Text as="p" size="1" color="gray">
              {t("servicesLead")}
            </Text>
          </Flex>
          <Flex direction="column" gap="2">
            {UNIT_ORDER.map((id) =>
              isFrame(id) ? (
                <FrameRow key={id} {...props} id={id} />
              ) : (
                <Flex key={id}>
                  <Chip {...props} id={id} />
                </Flex>
              ),
            )}
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
}
