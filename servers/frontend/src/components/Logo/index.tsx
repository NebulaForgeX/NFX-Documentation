import type { ReactNode } from "react";

import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useResolvedAppearance } from "nfx-ui/hooks";

import { getLogoSrc } from "@/constants";
import { routerEventEmitter } from "@/events/router";
import { ROUTES } from "@/navigations";

import styles from "./s.module.css";

type LogoProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  to?: string;
};

export default function Logo({ title, subtitle, to = ROUTES.HOME }: LogoProps) {
  const appearance = useResolvedAppearance();

  return (
    <Flex asChild align="center" gap="3" width="fit-content">
      <Button type="button" variant="ghost" className={styles.logo} onClick={() => routerEventEmitter.navigate({ to })}>
        <Box className={styles.mark}>
          <img src={getLogoSrc(appearance)} alt="NFX" />
        </Box>
        {title || subtitle ? (
          <Flex direction="column" gap="1" minWidth="0">
            {title ? (
              <Text as="span" size="3" weight="bold" truncate>
                {title}
              </Text>
            ) : null}
            {subtitle ? (
              <Text as="span" size="1" truncate className={styles.subtitle}>
                {subtitle}
              </Text>
            ) : null}
          </Flex>
        ) : null}
      </Button>
    </Flex>
  );
}
