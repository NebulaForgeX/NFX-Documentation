import type { ReactNode } from "react";

import { Container, Section } from "@radix-ui/themes";
import clsx from "clsx";

import styles from "./s.module.css";

type Space = "1" | "2" | "3" | "4" | "5" | "6" | "7";

type PanelProps = {
  children: ReactNode;
  py?: Space;
  px?: Space;
  interactive?: boolean;
  hot?: boolean;
  reveal?: boolean;
  className?: string;
};

export default function Panel({
  children,
  py = "5",
  px = "5",
  interactive = false,
  hot = false,
  reveal = true,
  className,
}: PanelProps) {
  return (
    <Section
      size="1"
      py={py}
      className={clsx(styles.panel, interactive && styles.interactive, hot && styles.hot, className)}
      data-reveal={reveal ? "" : undefined}
    >
      <Container size="4" width="100%" maxWidth="100%" px={px}>
        {children}
      </Container>
    </Section>
  );
}
