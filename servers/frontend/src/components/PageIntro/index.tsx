import type { ReactNode } from "react";

import { Flex, Heading, Text } from "@radix-ui/themes";

import Eyebrow from "../Eyebrow";
import styles from "./s.module.css";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
};

export default function PageIntro({ eyebrow, title, lead, children }: PageIntroProps) {
  return (
    <Flex direction="column" gap="4" data-reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading as="h1" size={{ initial: "8", md: "9" }} className={styles.display}>
        {title}
      </Heading>
      {lead ? (
        <Text as="p" size="4" className={styles.lead}>
          {lead}
        </Text>
      ) : null}
      {children}
    </Flex>
  );
}
