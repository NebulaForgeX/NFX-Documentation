import type { ReactNode } from "react";

import { Box, Flex, Heading } from "@radix-ui/themes";

import styles from "./s.module.css";

type PageIntroProps = {
  title: string;
  children?: ReactNode;
};

export default function PageIntro({ title, children }: PageIntroProps) {
  return (
    <Box className={styles.rule}>
      <Box pb="4">
        <Flex direction="column" gap="2">
          <Heading size="8">{title}</Heading>
          {children}
        </Flex>
      </Box>
    </Box>
  );
}
