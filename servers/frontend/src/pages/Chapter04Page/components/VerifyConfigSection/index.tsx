import { memo } from "react";
import { useTranslation } from "react-i18next";

import { tList, tObject } from "@/utils/i18nContent";


const VerifyConfigSection = memo(() => {
  const { t } = useTranslation("chapter04");
  const portCheck = tObject(t, "verifyConfig.portCheck");

  return (
    <section>
      <h2>{t("verifyConfig.title")}</h2>
      <p>{t("verifyConfig.description")}</p>
      <ul>
        {tList(t, "verifyConfig.checks").map((check, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: check }} />
        ))}
      </ul>
      {portCheck ? (
        <div>
          <h3>{t("verifyConfig.portCheck.title")}</h3>
          <pre>
            <code>{t("verifyConfig.portCheck.command")}</code>
          </pre>
          <p>{t("verifyConfig.portCheck.note")}</p>
        </div>
      ) : null}
    </section>
  );
});

VerifyConfigSection.displayName = "VerifyConfigSection";
export default VerifyConfigSection;
