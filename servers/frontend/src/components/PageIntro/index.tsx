import type { ReactNode } from "react";

import { Flex, Heading } from "@radix-ui/themes";

import styles from "./s.module.css";

type PageIntroProps = {
  title: string;
  children?: ReactNode;
};

export default function PageIntro({ title, children }: PageIntroProps) {
  return (
    <Flex direction="column" gap="2">
      <Heading size="8" className={styles.display}>
        {title}
      </Heading>
      {children}
    </Flex>
  );
}
