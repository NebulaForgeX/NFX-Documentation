import type { ReactNode } from "react";

import { Container, Flex, Section } from "@radix-ui/themes";
import { Link } from "react-router";

import styles from "./s.module.css";

type LedgerLinkProps = {
  to?: string;
  href?: string;
  row?: boolean;
  children: ReactNode;
};

export default function LedgerLink({ to, href, row = false, children }: LedgerLinkProps) {
  const body = (
    <Section size="1" py="3" className={styles.face}>
      <Container px="4">
        <Flex direction={row ? "row" : "column"} align={row ? "center" : "start"} gap={row ? "4" : "1"}>
          {children}
        </Flex>
      </Container>
    </Section>
  );

  if (to) {
    return (
      <Link to={to} className={styles.card}>
        {body}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.card}>
      {body}
    </a>
  );
}
