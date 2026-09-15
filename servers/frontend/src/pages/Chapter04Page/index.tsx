import { memo } from "react";
import { useTranslation } from "react-i18next";

import { chapterLocale } from "@/utils/i18nContent";

import { ChapterPage } from "../ChapterPage";
import AddNewSiteSection from "./components/AddNewSiteSection";
import CertificatesSection from "./components/CertificatesSection";
import CloneSection from "./components/CloneSection";
import CommonOperationsSection from "./components/CommonOperationsSection";
import ConfigFilesSection from "./components/ConfigFilesSection";
import DockerComposeSection from "./components/DockerComposeSection";
import DocsSection from "./components/DocsSection";
import NextStepsSection from "./components/NextStepsSection";
import PrerequisitesSection from "./components/PrerequisitesSection";
import StartServiceSection from "./components/StartServiceSection";
import VerifyConfigSection from "./components/VerifyConfigSection";
import VerifyDeploymentSection from "./components/VerifyDeploymentSection";
import WhySection from "./components/WhySection";

const Chapter04Page = memo(() => {
  const { t, i18n } = useTranslation("chapter04");
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
      <PrerequisitesSection />
      <CloneSection />
      <ConfigFilesSection />
      <DockerComposeSection />
      <CertificatesSection />
      <VerifyConfigSection />
      <StartServiceSection />
      <VerifyDeploymentSection />
      <AddNewSiteSection />
      <CommonOperationsSection />
      <DocsSection />
      <NextStepsSection />
    </ChapterPage>
  );
});

Chapter04Page.displayName = "Chapter04Page";
export default Chapter04Page;
