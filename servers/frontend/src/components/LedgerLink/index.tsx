import type { ReactNode } from "react";

import { Box, Flex } from "@radix-ui/themes";
import { Link } from "react-router";

import styles from "./s.module.css";

type LedgerLinkProps = {
  to?: string;
  href?: string;
  children: ReactNode;
};

export default function LedgerLink({ to, href, children }: LedgerLinkProps) {
  const className = `${styles.flat} ${styles.ink}`;
  const row = to ? (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );

  return (
    <Box className={styles.rule}>
      <Box py="3">
        <Flex asChild align="baseline" gap="3" wrap="wrap">
          {row}
        </Flex>
      </Box>
    </Box>
  );
}
