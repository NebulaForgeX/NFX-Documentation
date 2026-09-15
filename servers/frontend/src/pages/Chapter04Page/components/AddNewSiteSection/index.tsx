import { memo } from "react";
import { useTranslation } from "react-i18next";


const AddNewSiteSection = memo(() => {
  const { t } = useTranslation("chapter04");

  return (
      <section>
          <h2>{t("addNewSite.title")}</h2>
          <p>{t("addNewSite.description")}</p>

          <div>
            <h3>{t("addNewSite.step1.title")}</h3>
            <p>{t("addNewSite.step1.description")}</p>
            <pre><code>{t("addNewSite.step1.yaml")}</code></pre>
          </div>

          <div>
            <h3>{t("addNewSite.step2.title")}</h3>
            <pre><code>{t("addNewSite.step2.command")}</code></pre>
          </div>

          <div>
            <h3>{t("addNewSite.step3.title")}</h3>
            <p>{t("addNewSite.step3.description")}</p>
          </div>

          <div>
            <h3>{t("addNewSite.step4.title")}</h3>
            <pre><code>{t("addNewSite.step4.yaml")}</code></pre>
          </div>

          <div>
            <h3>{t("addNewSite.step5.title")}</h3>
            <pre><code>{t("addNewSite.step5.command")}</code></pre>
          </div>
        </section>
  );
});

AddNewSiteSection.displayName = "AddNewSiteSection";
export default AddNewSiteSection;
