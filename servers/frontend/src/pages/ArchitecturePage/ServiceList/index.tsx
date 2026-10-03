import type { KeyboardEvent } from "react";
import type { Focus } from "../focus";

import { Box, Button, Checkbox, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Eyebrow } from "@/components";

import { UNIT_ORDER } from "../grid";
import { checkState, directContainersOf, GROUP_BY_ID, isFrame, subFramesOf } from "../layout";
import styles from "./s.module.css";

type ServiceListProps = {
  focus: Focus | null;
  selected: Set<string>;
  onHover: (ids: string[] | null) => void;
  onToggle: (ids: string[]) => void;
  onClear: () => void;
};

type RowProps = Omit<ServiceListProps, "onClear"> & { id: string };

function Chip({ id, focus, selected, onHover, onToggle }: RowProps) {
  const { t } = useTranslation("architecture");
  const checked = selected.has(id);
  const seed = checked || Boolean(focus?.seeds.has(id));
  const related = !seed && Boolean(focus?.nodes.has(id));
  return (
    <Box
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      className={clsx(styles.chip, seed && styles.seed, related && styles.related)}
      data-dim={focus && !seed && !related ? "true" : "false"}
      onPointerEnter={() => onHover([id])}
      onPointerLeave={() => onHover(null)}
      onClick={() => onToggle([id])}
      onKeyDown={(event: KeyboardEvent) => {
        if (event.key !== " " && event.key !== "Enter") return;
        event.preventDefault();
        onToggle([id]);
      }}
    >
      <Section size="1" py="1">
        <Container size="4" width="100%" maxWidth="100%" px="2">
          <Flex align="center" gap="2">
            <Checkbox size="1" checked={checked} tabIndex={-1} className={styles.check} aria-hidden />
            <Text as="span" size="1">
              {t(`containers.${id}.title`)}
            </Text>
          </Flex>
        </Container>
      </Section>
    </Box>
  );
}

function FrameRow(props: RowProps) {
  const { t } = useTranslation("architecture");
  const { id, focus, selected, onToggle } = props;
  const group = GROUP_BY_ID.get(id);
  const area = Boolean(focus?.areas.has(id));
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
            <Flex align="baseline" justify="between" gap="2">
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
            <Flex justify="end">
              <Text as="label" size="1" className={styles.all}>
                <Flex align="center" gap="2">
                  {t("selectAll")}
                  <Checkbox size="1" checked={checkState(id, selected)} onCheckedChange={() => onToggle([id])} />
                </Flex>
              </Text>
            </Flex>
          </Flex>
        </Container>
      </Section>
    </Box>
  );
}

export default function ServiceList({ onClear, ...props }: ServiceListProps) {
  const { t } = useTranslation("architecture");
  return (
    <Section size="1" py="4">
      <Container size="4" width="100%" maxWidth="100%" px="4">
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Eyebrow>SERVICES</Eyebrow>
            <Flex align="center" justify="between" gap="2">
              <Heading as="h2" size="4">
                {t("servicesTitle")}
              </Heading>
              {props.selected.size ? (
                <Button size="1" variant="outline" onClick={onClear}>
                  {t("clearSelection", { count: props.selected.size })}
                </Button>
              ) : null}
            </Flex>
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
