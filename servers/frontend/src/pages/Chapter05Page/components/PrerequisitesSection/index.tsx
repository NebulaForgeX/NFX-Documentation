import { memo } from "react";
import { useTranslation } from "react-i18next";


const PrerequisitesSection = memo(() => {
  const { t } = useTranslation("chapter05");

  return (
    <section>
      <h2>{t("prerequisites.title")}</h2>
      <p>{t("prerequisites.description")}</p>
      <div>
        <h3>{t("prerequisites.router.title")}</h3>
        <p>{t("prerequisites.router.description")}</p>
      </div>
      <div>
        <h3>{t("prerequisites.nas.title")}</h3>
        <p>{t("prerequisites.nas.description")}</p>
      </div>
      <div>
        <h3>{t("prerequisites.stack.title")}</h3>
        <p>{t("prerequisites.stack.description")}</p>
      </div>
      <div>
        <h3>{t("prerequisites.edge.title")}</h3>
        <p>{t("prerequisites.edge.description")}</p>
      </div>
      <div>
        <h3>{t("prerequisites.resources.title")}</h3>
        <p>{t("prerequisites.resources.description")}</p>
      </div>
    </section>
  );
});

PrerequisitesSection.displayName = "PrerequisitesSection";
export default PrerequisitesSection;
