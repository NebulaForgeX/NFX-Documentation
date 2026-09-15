import type { ReactNode } from "react";
import { memo } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button, Container, Flex, Heading, Separator, Text } from "nfx-ui/components";
import { PageFrame } from "nfx-ui/layouts";

import { ArrowLeft, ArrowRight } from "@/assets/icons/lucide";
import { ROUTES } from "@/navigations";

interface ChapterPageProps {
  title: string;
  intro: string;
  introHtml?: boolean;
  nextTo?: string;
  nextText?: string;
  children: ReactNode;
}

export const ChapterPage = memo(
  ({ title, intro, introHtml = false, nextTo, nextText, children }: ChapterPageProps) => {
    const { t } = useTranslation("common");

    return (
      <PageFrame>
        <Container size="3" py="5" className="docs-article">
          <Flex direction="column" gap="5">
            <Flex direction="column" gap="3">
              <Button variant="ghost" asChild>
                <Link to={ROUTES.HOME}>
                  <ArrowLeft size={16} />
                  {t("backToHome")}
                </Link>
              </Button>
              <Heading size="8">{title}</Heading>
              {introHtml ? (
                <Text as="p" size="4" color="gray" dangerouslySetInnerHTML={{ __html: intro }} />
              ) : (
                <Text as="p" size="4" color="gray">
                  {intro}
                </Text>
              )}
            </Flex>
            {children}
            {nextTo ? (
              <>
                <Separator size="4" />
                <Flex justify="end">
                  <Button asChild>
                    <Link to={nextTo}>
                      {nextText}
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </Flex>
              </>
            ) : null}
          </Flex>
        </Container>
      </PageFrame>
    );
  },
);

ChapterPage.displayName = "ChapterPage";
