import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const PrerequisitesSection = memo(() => {
  const { t } = useTranslation("chapter01");

  return (
      <section>
          <h2>{t("prerequisites.title")}</h2>
          <p>{t("prerequisites.description")}</p>
          
          <div>
            <h3>{t("prerequisites.network.title")}</h3>
            <ul>
              {tList(t, "prerequisites.network.items").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>{t("prerequisites.china.title")}</h3>
            <ul>
              {tList(t, "prerequisites.china.items").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>{t("prerequisites.other.title")}</h3>
            <ul>
              {tList(t, "prerequisites.other.items").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
  );
});

PrerequisitesSection.displayName = "PrerequisitesSection";
export default PrerequisitesSection;
