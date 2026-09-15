import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const ApplicationsSection = memo(() => {
  const { t } = useTranslation("chapter02");

  return (
      <section>
          <h2>{t("applications.title")}</h2>
          <p>{t("applications.description")}</p>
          <img src={t("applications.image")} alt={t("applications.imageAlt")} />

          <div>
            <h3>{t("applications.list.title")}</h3>
            
            <div>
              <h4>{t("applications.list.docker.name")}</h4>
              <p><strong>{t("applications.list.docker.purpose")}</strong>：{t("applications.list.docker.description")}</p>
              <p>{t("applications.list.docker.version")}</p>
              <p><code>{t("applications.list.docker.verify")}</code></p>
            </div>

            <div>
              <h4>{t("applications.list.git.name")}</h4>
              <p><strong>{t("applications.list.git.purpose")}</strong>：{t("applications.list.git.description")}</p>
              <p><code>{t("applications.list.git.verify")}</code></p>
            </div>

            <div>
              <h4>{t("applications.list.entware.name")}</h4>
              <p><strong>{t("applications.list.entware.purpose")}</strong>：{t("applications.list.entware.description")}</p>
              <p><code>{t("applications.list.entware.verify")}</code></p>
              <p><strong>{t("applications.list.entware.importance")}</strong></p>
            </div>
          </div>

          <div>
            <h3>{t("applications.order.title")}</h3>
            <ol>
              {tList(t, "applications.order.items").map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ol>
          </div>
        </section>
  );
});

ApplicationsSection.displayName = "ApplicationsSection";
export default ApplicationsSection;
