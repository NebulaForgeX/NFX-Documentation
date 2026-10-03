import type { ReactNode } from "react";

import { memo } from "react";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

import { Eyebrow, Html, PageIntro, Panel } from "@/components";
import { PageFrame } from "@/layouts";
import { tList } from "@/utils";

import styles from "./s.module.css";

function AboutBlock({ code, title, children }: { code: string; title: string; children: ReactNode }) {
  return (
    <Panel py="6" px="6" className={styles.block}>
      <Flex direction="column" gap="3">
        <Eyebrow>{code}</Eyebrow>
        <Heading as="h2" size="5">
          {title}
        </Heading>
        {children}
      </Flex>
    </Panel>
  );
}

const AboutPage = memo(() => {
  const { t } = useTranslation("about");
  const items = tList(t, "ecosystem.items");

  return (
    <PageFrame maxWidth="1120px">
      <PageIntro eyebrow={t("eyebrow")} title={t("title")} lead={t("subtitle")} />
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <AboutBlock code="01 · SCOPE" title={t("what.title")}>
          <Text as="p" size="3" color="gray" className={styles.prose}>
            <Html html={t("what.description")} />
          </Text>
        </AboutBlock>
        <AboutBlock code="02 · CONTRIBUTE" title={t("contribute.title")}>
          <Text as="p" size="3" color="gray" className={styles.prose}>
            <Html html={t("contribute.description")} />
          </Text>
        </AboutBlock>
      </Grid>
      <AboutBlock code="03 · ORDER" title={t("ecosystem.title")}>
        <Text as="p" size="3" color="gray" className={styles.prose}>
          <Html html={t("ecosystem.description")} />
        </Text>
        <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="3" asChild>
          <ol className={styles.order}>
            {items.map((item, index) => (
              <li key={item} className={styles.step}>
                <Flex align="start" gap="3">
                  <Text as="span" size="1" className={styles.no}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <Html as="span" html={item} className={styles.prose} />
                </Flex>
              </li>
            ))}
          </ol>
        </Grid>
      </AboutBlock>
    </PageFrame>
  );
});

AboutPage.displayName = "AboutPage";
export default AboutPage;
