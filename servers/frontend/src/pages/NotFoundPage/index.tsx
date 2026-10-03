import { memo } from "react";
import { Button, Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { ROUTES } from "@/navigations";

import styles from "./s.module.css";

const NotFoundPage = memo(() => {
  const { t } = useTranslation("notFound");

  return (
    <Flex align="center" justify="center" className={styles.page}>
      <Section size="2" py="9">
        <Container size="2" px="4">
        <Flex direction="column" align="center" justify="center" gap="4">
          <Heading size="8">404</Heading>
          <Heading size="5">{t("title")}</Heading>
          <Text as="p" color="gray" align="center">
            {t("description")}
          </Text>
          <Button asChild>
            <Link to={ROUTES.HOME}>{t("backToHome")}</Link>
          </Button>
        </Flex>
        </Container>
      </Section>
    </Flex>
  );
});

NotFoundPage.displayName = "NotFoundPage";
export default NotFoundPage;
