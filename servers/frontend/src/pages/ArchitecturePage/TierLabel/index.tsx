import type { NodeProps } from "@xyflow/react";
import type { TierNode } from "../layout";

import { memo } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

import { BLOCK_WIDTH } from "../layout";
import styles from "./s.module.css";

const TierLabel = memo(({ data }: NodeProps<TierNode>) => {
  const { t } = useTranslation("architecture");
  return (
    <Flex direction="column" gap="2" width={`${BLOCK_WIDTH}px`} data-tier>
      <Flex align="center" justify="between" gap="2">
        <Text as="span" size="1" className={styles.label}>
          {t(`tiers.${data.tier}`)}
        </Text>
        <Text as="span" size="1" className={styles.code}>
          {data.tier.toUpperCase()}
        </Text>
      </Flex>
      <Box className={styles.rule} />
    </Flex>
  );
});

TierLabel.displayName = "TierLabel";
export default TierLabel;
