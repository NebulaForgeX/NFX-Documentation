import { memo } from "react";
import { useTranslation } from "react-i18next";

import { chapterLocale } from "@/utils/i18nContent";

import { ChapterPage } from "../ChapterPage";
import PrerequisitesSection from "./components/PrerequisitesSection";
import RouterConfigSection from "./components/RouterConfigSection";
import SecurityStrategySection from "./components/SecurityStrategySection";

const Chapter01Page = memo(() => {
  const { t, i18n } = useTranslation("chapter01");
  const locale = chapterLocale(i18n.language);
  const nextPath = t("nextChapterPath");

  return (
    <ChapterPage
      title={t("title")}
      intro={t("intro")}
      nextTo={nextPath ? `/${locale}/${nextPath}` : undefined}
      nextText={t("nextChapterText")}
    >
      <PrerequisitesSection />
      <RouterConfigSection />
      <SecurityStrategySection />
    </ChapterPage>
  );
});

Chapter01Page.displayName = "Chapter01Page";
export default Chapter01Page;
