import type { ReactNode } from "react";

import { memo } from "react";
import { Box, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

import { Html, PageIntro } from "@/components";

import styles from "./s.module.css";

const AboutPage = memo(() => {
  const { t } = useTranslation("about");
  const items = t("ecosystem.items", { returnObjects: true });
  const ecosystemItems = Array.isArray(items) ? items.map(String) : [];

  return (
    <Container size="3">
      <Box py="6">
        <Flex direction="column" gap="6">
          <PageIntro title={t("title")}>
            <Text as="p" size="4" color="gray">
              {t("subtitle")}
            </Text>
          </PageIntro>

          <AboutBlock title={t("what.title")}>
            <Text as="p" color="gray">
              <Html html={t("what.description")} />
            </Text>
          </AboutBlock>

          <AboutBlock title={t("ecosystem.title")}>
            <Text as="p" color="gray">
              <Html html={t("ecosystem.description")} />
            </Text>
            <Box pl="5">
              <ul className={styles.flush}>
                {ecosystemItems.map((item) => (
                  <Html as="li" key={item} html={item} />
                ))}
              </ul>
            </Box>
          </AboutBlock>

          <AboutBlock title={t("contribute.title")}>
            <Text as="p" color="gray">
              <Html html={t("contribute.description")} />
            </Text>
          </AboutBlock>
        </Flex>
      </Box>
    </Container>
  );
});

function AboutBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box className={styles.rule}>
      <Box pt="4">
        <Section size="1">
          <Flex direction="column" gap="2">
            <Heading size="5">{title}</Heading>
            {children}
          </Flex>
        </Section>
      </Box>
    </Box>
  );
}

AboutPage.displayName = "AboutPage";
export default AboutPage;
