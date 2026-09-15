import { memo } from "react";
import { useTranslation } from "react-i18next";


const IntegrateEdgeSection = memo(() => {
  const { t } = useTranslation("chapter05");

  return (
    <section>
      <h2>{t("integrateEdge.title")}</h2>
      <p>{t("integrateEdge.description")}</p>
      <div>
        <h4>{t("integrateEdge.step1.title")}</h4>
        <p>{t("integrateEdge.step1.description")}</p>
      </div>
      <div>
        <h4>{t("integrateEdge.step2.title")}</h4>
        <p>{t("integrateEdge.step2.description")}</p>
      </div>
      <div>
        <h4>{t("integrateEdge.step3.title")}</h4>
        <p>{t("integrateEdge.step3.description")}</p>
      </div>
      <div>
        <h4>{t("integrateEdge.step4.title")}</h4>
        <p>{t("integrateEdge.step4.description")}</p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: t("integrateEdge.conclusion") }} />
    </section>
  );
});

IntegrateEdgeSection.displayName = "IntegrateEdgeSection";
export default IntegrateEdgeSection;
