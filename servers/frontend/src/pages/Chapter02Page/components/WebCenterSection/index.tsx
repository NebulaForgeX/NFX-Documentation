import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const WebCenterSection = memo(() => {
  const { t } = useTranslation("chapter02");

  return (
      <section>
          <h2>{t("webCenter.title")}</h2>
          <p dangerouslySetInnerHTML={{ __html: t("webCenter.important") }} />
          <img src={t("webCenter.image")} alt={t("webCenter.imageAlt")} />

          <div>
            <h3>{t("webCenter.why.title")}</h3>
            <p>{t("webCenter.why.description")}</p>
            <ul>
              {tList(t, "webCenter.why.ports").map((port, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: port }} />
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t("webCenter.why.conflict") }} />
          </div>

          <div>
            <h3>{t("webCenter.steps.title")}</h3>
            <ol>
              {tList(t, "webCenter.steps.items").map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </section>
  );
});

WebCenterSection.displayName = "WebCenterSection";
export default WebCenterSection;
