import { memo } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button, Card, Container, Flex, Heading, Text } from "nfx-ui/components";
import { PageFrame } from "nfx-ui/layouts";

import { FileText } from "@/assets/icons/lucide";
import { chapterPath } from "@/navigations";
import { chapterLocale } from "@/utils/i18nContent";

const CHAPTER_KEYS = ["chapter01", "chapter02", "chapter03", "chapter04", "chapter05"] as const;

const HomePage = memo(() => {
  const { t, i18n } = useTranslation("common");
  const locale = chapterLocale(i18n.language);

  const chapters = CHAPTER_KEYS.map((key) => ({
    id: t(`chapterList.${key}.id`),
    title: t(`chapterList.${key}.title`),
  }));

  return (
    <PageFrame>
      <Container size="3" py="6">
        <Flex direction="column" gap="6" align="center">
          <Flex direction="column" gap="2" align="center">
            <Heading size="8">{t("title")}</Heading>
            <Text as="p" size="4" color="gray" align="center">
              {t("subtitle")}
            </Text>
          </Flex>
          <Card size="3" style={{ width: "100%", maxWidth: 640 }}>
            <Flex direction="column" gap="3">
              <Heading size="5">{t("chapters.title")}</Heading>
              {chapters.map((chapter) => (
                <Button key={chapter.id} variant="soft" size="3" asChild>
                  <Link to={chapterPath(locale, chapter.id)}>
                    <FileText size={18} />
                    {chapter.title}
                  </Link>
                </Button>
              ))}
            </Flex>
          </Card>
        </Flex>
      </Container>
    </PageFrame>
  );
});

HomePage.displayName = "HomePage";
export default HomePage;
