import type { PortBlock } from "@/constants";

import { Box } from "@radix-ui/themes";
import clsx from "clsx";

import styles from "./s.module.css";

type PortRulerProps = {
  block: PortBlock;
  hot?: boolean;
};

export default function PortRuler({ block, hot = false }: PortRulerProps) {
  const total = block.end - block.start + 1;
  const used = block.usedStart === undefined || block.usedEnd === undefined ? 0 : block.usedEnd - block.usedStart + 1;
  const percent = `${(used / total) * 100}%`;

  return (
    <Box className={clsx(styles.ruler, hot && styles.hot, !block.nfx && styles.open)} aria-hidden>
      <Box className={styles.used} style={{ width: percent }} data-ruler-fill />
    </Box>
  );
}
