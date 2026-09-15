import { memo } from "react";
import { useTranslation } from "react-i18next";


const WhySection = memo(() => {
  const { t } = useTranslation("chapter04");

  return (
    <section>
      <h2>{t("why.title")}</h2>
      <p>{t("why.description")}</p>
      <div>
        <h3>{t("why.unifiedEntry.title")}</h3>
        <p>{t("why.unifiedEntry.description")}</p>
      </div>
      <div>
        <h3>{t("why.httpsSupport.title")}</h3>
        <p>{t("why.httpsSupport.description")}</p>
      </div>
      <div>
        <h3>{t("why.certificateUsage.title")}</h3>
        <p dangerouslySetInnerHTML={{ __html: t("why.certificateUsage.description") }} />
      </div>
      <div>
        <h3>{t("why.multiSiteManagement.title")}</h3>
        <p>{t("why.multiSiteManagement.description")}</p>
      </div>
      <div>
        <h3>{t("why.easyDeployment.title")}</h3>
        <p>{t("why.easyDeployment.description")}</p>
      </div>
      <div>
        <h3>{t("why.productionOptimization.title")}</h3>
        <p>{t("why.productionOptimization.description")}</p>
      </div>
    </section>
  );
});

WhySection.displayName = "WhySection";
export default WhySection;
