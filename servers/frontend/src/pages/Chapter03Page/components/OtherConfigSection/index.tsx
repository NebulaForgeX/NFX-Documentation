import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const OtherConfigSection = memo(() => {
  const { t } = useTranslation("chapter03");

  return (
      <section>
          <h2>{t("otherConfig.title")}</h2>

          <div>
            <h3>{t("otherConfig.kafka.title")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("otherConfig.kafka.description") }} />
            <ul>
              {tList(t, "otherConfig.kafka.items").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
  );
});

OtherConfigSection.displayName = "OtherConfigSection";
export default OtherConfigSection;
