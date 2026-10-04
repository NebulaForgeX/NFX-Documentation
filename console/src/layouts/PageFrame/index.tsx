import type { ReactNode } from "react";

import { useRef } from "react";
import { Container, Flex, Section } from "@radix-ui/themes";

import { useReveal } from "@/animations";

import styles from "./s.module.css";

type PageFrameProps = {
  children: ReactNode;
  fullHeight?: boolean;
  maxWidth?: string;
  revealKey?: unknown;
};

export default function PageFrame({ children, fullHeight, maxWidth = "1200px", revealKey }: PageFrameProps) {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope, { dependencies: [revealKey] });

  if (fullHeight) {
    return (
      <Flex ref={scope} direction="column" width="100%" className={styles.fullHeight}>
        {children}
      </Flex>
    );
  }

  return (
    <Section ref={scope} size="1" py="7" className={styles.scroll} data-scroll-root>
      <Container size="4" width="100%" maxWidth={maxWidth} px={{ initial: "4", sm: "6" }}>
        <Flex direction="column" gap="6" width="100%" minWidth="0">
          {children}
        </Flex>
      </Container>
    </Section>
  );
}
