import type { ReactNode } from "react";

import { memo } from "react";
import { Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

import { Html, PageIntro } from "@/components";

import styles from "./s.module.css";

const AboutPage = memo(() => {
  const { t } = useTranslation("about");
  const items = t("ecosystem.items", { returnObjects: true });
  const ecosystemItems = Array.isArray(items) ? items.map(String) : [];

  return (
    <Section size="2" py="6" className={styles.page}>
      <Container px="5">
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
            <Container pl="5">
              <ul className={styles.flush}>
                {ecosystemItems.map((item) => (
                  <Html as="li" key={item} html={item} />
                ))}
              </ul>
            </Container>
          </AboutBlock>

          <AboutBlock title={t("contribute.title")}>
            <Text as="p" color="gray">
              <Html html={t("contribute.description")} />
            </Text>
          </AboutBlock>
        </Flex>
      </Container>
    </Section>
  );
});

function AboutBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Section size="1" py="4" className={styles.block}>
      <Flex direction="column" gap="2">
        <Heading size="5">{title}</Heading>
        {children}
      </Flex>
    </Section>
  );
}

AboutPage.displayName = "AboutPage";
export default AboutPage;
