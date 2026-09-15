import { memo } from "react";
import { useTranslation } from "react-i18next";

import { chapterLocale } from "@/utils/i18nContent";

import { ChapterPage } from "../ChapterPage";
import ApplicationsSection from "./components/ApplicationsSection";
import BashConfigSection from "./components/BashConfigSection";
import ChecklistSection from "./components/ChecklistSection";
import SSHClientsSection from "./components/SSHClientsSection";
import SSHSection from "./components/SSHSection";
import WebCenterSection from "./components/WebCenterSection";

const Chapter02Page = memo(() => {
  const { t, i18n } = useTranslation("chapter02");
  const locale = chapterLocale(i18n.language);
  const nextPath = t("nextChapterPath");

  return (
    <ChapterPage
      title={t("title")}
      intro={t("intro")}
      nextTo={nextPath ? `/${locale}/${nextPath}` : undefined}
      nextText={t("nextChapterText")}
    >
      <WebCenterSection />
      <SSHSection />
      <ApplicationsSection />
      <BashConfigSection />
      <SSHClientsSection />
      <ChecklistSection />
    </ChapterPage>
  );
});

Chapter02Page.displayName = "Chapter02Page";
export default Chapter02Page;
