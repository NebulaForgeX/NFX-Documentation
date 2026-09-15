import { memo } from "react";
import { useTranslation } from "react-i18next";


const CommonOperationsSection = memo(() => {
  const { t } = useTranslation("chapter05");

  return (
    <section>
      <h2>{t("commonOperations.title")}</h2>
      <div>
        <h3>{t("commonOperations.viewList.title")}</h3>
        <p>{t("commonOperations.viewList.description")}</p>
      </div>
      <div>
        <h3>{t("commonOperations.apply.title")}</h3>
        <p>{t("commonOperations.apply.description")}</p>
      </div>
      <div>
        <h3>{t("commonOperations.export.title")}</h3>
        <p>{t("commonOperations.export.description")}</p>
      </div>
      <div>
        <h3>{t("commonOperations.refresh.title")}</h3>
        <p>{t("commonOperations.refresh.description")}</p>
      </div>
      <div>
        <h3>{t("commonOperations.cli.title")}</h3>
        <p>{t("commonOperations.cli.description")}</p>
        <pre>
          <code>{t("commonOperations.cli.command")}</code>
        </pre>
        <p>{t("commonOperations.cli.description2")}</p>
      </div>
    </section>
  );
});

CommonOperationsSection.displayName = "CommonOperationsSection";
export default CommonOperationsSection;
