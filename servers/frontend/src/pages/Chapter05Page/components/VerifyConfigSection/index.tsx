import { memo } from "react";
import { useTranslation } from "react-i18next";

import { tList } from "@/utils/i18nContent";


const VerifyConfigSection = memo(() => {
  const { t } = useTranslation("chapter05");

  return (
    <section>
      <h2>{t("verifyConfig.title")}</h2>
      <p>{t("verifyConfig.description")}</p>
      <ul>
        {tList(t, "verifyConfig.checks").map((check, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: check }} />
        ))}
      </ul>
    </section>
  );
});

VerifyConfigSection.displayName = "VerifyConfigSection";
export default VerifyConfigSection;
