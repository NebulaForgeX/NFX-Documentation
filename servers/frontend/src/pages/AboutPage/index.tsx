import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Container, Flex, Heading, Text } from "@radix-ui/themes";

import { Html } from "@/components";

const AboutPage = memo(() => {
  const { t } = useTranslation("about");
  const items = t("ecosystem.items", { returnObjects: true });
  const ecosystemItems = Array.isArray(items) ? items.map(String) : [];

  return (
    <Container size="3" py="6">
      <Flex direction="column" gap="6">
        <Flex direction="column" gap="2" className="docs-masthead">
          <Heading size="8">{t("title")}</Heading>
          <Text as="p" size="4" color="gray">
            {t("subtitle")}
          </Text>
        </Flex>

        <Flex direction="column" gap="2" className="docs-section">
          <Heading size="5">{t("what.title")}</Heading>
          <Text as="p" color="gray">
            <Html html={t("what.description")} />
          </Text>
        </Flex>

        <Flex direction="column" gap="2" className="docs-section">
          <Heading size="5">{t("ecosystem.title")}</Heading>
          <Text as="p" color="gray">
            <Html html={t("ecosystem.description")} />
          </Text>
          <ul className="docs-plain-list">
            {ecosystemItems.map((item) => (
              <Html as="li" key={item} html={item} />
            ))}
          </ul>
        </Flex>

        <Flex direction="column" gap="2" className="docs-section">
          <Heading size="5">{t("contribute.title")}</Heading>
          <Text as="p" color="gray">
            <Html html={t("contribute.description")} />
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
});

AboutPage.displayName = "AboutPage";
export default AboutPage;
