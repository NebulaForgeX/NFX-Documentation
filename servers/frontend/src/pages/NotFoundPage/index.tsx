import { memo } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button, Flex, Heading, Text } from "nfx-ui/components";
import { PageFrame } from "nfx-ui/layouts";

import { ROUTES } from "@/navigations";

const NotFoundPage = memo(() => {
  const { t } = useTranslation("notFound");

  return (
    <PageFrame>
      <Flex direction="column" align="center" justify="center" gap="4" py="9" px="4">
        <Heading size="8">404</Heading>
        <Heading size="5">{t("title")}</Heading>
        <Text as="p" color="gray" align="center">
          {t("description")}
        </Text>
        <Button asChild>
          <Link to={ROUTES.HOME}>{t("backToHome")}</Link>
        </Button>
      </Flex>
    </PageFrame>
  );
});

NotFoundPage.displayName = "NotFoundPage";
export default NotFoundPage;
