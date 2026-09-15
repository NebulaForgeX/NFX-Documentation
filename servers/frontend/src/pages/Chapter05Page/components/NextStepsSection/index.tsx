import { memo } from "react";
import { useTranslation } from "react-i18next";


const NextStepsSection = memo(() => {
  const { t } = useTranslation("chapter05");

  return (
    <section>
      <h2>{t("nextSteps.title")}</h2>
      <p>{t("nextSteps.description")}</p>
      <p>{t("nextSteps.description2")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("nextSteps.conclusion") }} />
    </section>
  );
});

NextStepsSection.displayName = "NextStepsSection";
export default NextStepsSection;
