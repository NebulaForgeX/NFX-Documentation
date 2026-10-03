import type { ReactNode } from "react";

import { Box, Flex, Text } from "@radix-ui/themes";

import styles from "./s.module.css";

export default function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Flex align="center" gap="2">
      <Box className={styles.tick} aria-hidden />
      <Text as="span" size="1" className={styles.label}>
        {children}
      </Text>
    </Flex>
  );
}
