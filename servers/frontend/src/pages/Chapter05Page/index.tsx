import { memo } from "react";
import { useTranslation } from "react-i18next";

import { ChapterPage } from "../ChapterPage";
import CloneSection from "./components/CloneSection";
import CommonOperationsSection from "./components/CommonOperationsSection";
import CreateDirsSection from "./components/CreateDirsSection";
import DockerNetworkSection from "./components/DockerNetworkSection";
import DocsSection from "./components/DocsSection";
import EnvConfigSection from "./components/EnvConfigSection";
import IntegrateEdgeSection from "./components/IntegrateEdgeSection";
import NextStepsSection from "./components/NextStepsSection";
import PrerequisitesSection from "./components/PrerequisitesSection";
import StartServiceSection from "./components/StartServiceSection";
import VerifyConfigSection from "./components/VerifyConfigSection";
import VerifyDeploymentSection from "./components/VerifyDeploymentSection";
import WhySection from "./components/WhySection";

const Chapter05Page = memo(() => {
  const { t } = useTranslation("chapter05");

  return (
    <ChapterPage title={t("title")} intro={t("intro")} introHtml>
      <WhySection />
      <PrerequisitesSection />
      <CloneSection />
      <CreateDirsSection />
      <EnvConfigSection />
      <DockerNetworkSection />
      <VerifyConfigSection />
      <StartServiceSection />
      <VerifyDeploymentSection />
      <IntegrateEdgeSection />
      <CommonOperationsSection />
      <DocsSection />
      <NextStepsSection />
    </ChapterPage>
  );
});

Chapter05Page.displayName = "Chapter05Page";
export default Chapter05Page;
