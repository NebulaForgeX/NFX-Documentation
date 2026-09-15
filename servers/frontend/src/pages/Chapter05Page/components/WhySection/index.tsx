import { memo } from "react";
import { useTranslation } from "react-i18next";


const WhySection = memo(() => {
  const { t } = useTranslation("chapter05");

  return (
    <section>
      <h2>{t("why.title")}</h2>
      <p>{t("why.description")}</p>
      <div>
        <h3>{t("why.unifiedPlatform.title")}</h3>
        <p>{t("why.unifiedPlatform.description")}</p>
      </div>
      <div>
        <h3>{t("why.realtimeMonitoring.title")}</h3>
        <p>{t("why.realtimeMonitoring.description")}</p>
      </div>
      <div>
        <h3>{t("why.exportFunction.title")}</h3>
        <p>{t("why.exportFunction.description")}</p>
      </div>
      <div>
        <h3>{t("why.modernWebInterface.title")}</h3>
        <p>{t("why.modernWebInterface.description")}</p>
      </div>
      <div>
        <h3>{t("why.architecture.title")}</h3>
        <p>{t("why.architecture.description")}</p>
      </div>
      <div>
        <h3>{t("why.automation.title")}</h3>
        <p>{t("why.automation.description")}</p>
      </div>
    </section>
  );
});

WhySection.displayName = "WhySection";
export default WhySection;
