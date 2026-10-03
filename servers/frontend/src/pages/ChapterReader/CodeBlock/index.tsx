import type { ReactNode } from "react";

import { isValidElement, useEffect, useRef, useState } from "react";
import { Box, Button, Container, Flex, Section, Text } from "@radix-ui/themes";
import { AnimatedIcon, CopyIcon, SimpleCheckedIcon } from "nfx-ui/icons";
import { useTranslation } from "react-i18next";

import styles from "./s.module.css";

function languageOf(children: ReactNode): string | undefined {
  if (!isValidElement<{ className?: string }>(children)) return undefined;
  return children.props.className?.match(/language-(\S+)/)?.[1];
}

export default function CodeBlock({ children }: { children?: ReactNode }) {
  const { t } = useTranslation("chapter");
  const pre = useRef<HTMLPreElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const language = languageOf(children) ?? t("code");

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    const text = pre.current?.innerText ?? "";
    void navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <Box className={styles.block}>
      <Section size="1" py="1" className={styles.bar}>
        <Container size="4" width="100%" maxWidth="100%" px="3">
          <Flex align="center" justify="between" gap="3">
            <Flex align="center" gap="2">
              <Box className={styles.led} aria-hidden />
              <Text as="span" size="1" className={styles.lang}>
                {language}
              </Text>
            </Flex>
            <Button type="button" size="1" variant="ghost" color="gray" onClick={copy} className={styles.copy}>
              <AnimatedIcon icon={copied ? SimpleCheckedIcon : CopyIcon} size={14} />
              {copied ? t("copied") : t("copy")}
            </Button>
          </Flex>
        </Container>
      </Section>
      <pre ref={pre} className={styles.pre}>
        {children}
      </pre>
    </Box>
  );
}
