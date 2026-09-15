import { memo } from "react";
import { useTranslation } from "react-i18next";

import { chapterLocale } from "@/utils/i18nContent";

import { ChapterPage } from "../ChapterPage";
import CloneSection from "./components/CloneSection";
import DataPathSection from "./components/DataPathSection";
import DocsSection from "./components/DocsSection";
import EnvConfigSection from "./components/EnvConfigSection";
import IPPortSection from "./components/IPPortSection";
import NextStepsSection from "./components/NextStepsSection";
import OtherConfigSection from "./components/OtherConfigSection";
import PasswordSection from "./components/PasswordSection";
import VerifySection from "./components/VerifySection";
import WhySection from "./components/WhySection";

const Chapter03Page = memo(() => {
  const { t, i18n } = useTranslation("chapter03");
  const locale = chapterLocale(i18n.language);
  const nextPath = t("nextChapterPath");

  return (
    <ChapterPage
      title={t("title")}
      intro={t("intro")}
      introHtml
      nextTo={nextPath ? `/${locale}/${nextPath}` : undefined}
      nextText={t("nextChapterText")}
    >
      <WhySection />
      <CloneSection />
      <EnvConfigSection />
      <IPPortSection />
      <DataPathSection />
      <PasswordSection />
      <OtherConfigSection />
      <VerifySection />
      <DocsSection />
      <NextStepsSection />
    </ChapterPage>
  );
});

Chapter03Page.displayName = "Chapter03Page";
export default Chapter03Page;
