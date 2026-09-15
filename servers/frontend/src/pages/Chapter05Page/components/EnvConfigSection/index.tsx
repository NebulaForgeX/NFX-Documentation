import { memo } from "react";
import { useTranslation } from "react-i18next";

import { tList } from "@/utils/i18nContent";


const EnvConfigSection = memo(() => {
  const { t } = useTranslation("chapter05");

  return (
    <section>
      <h2>{t("envConfig.title")}</h2>
      <div>
        <h3>{t("envConfig.step1.title")}</h3>
        <p>{t("envConfig.step1.description")}</p>
        <pre>
          <code>{t("envConfig.step1.command")}</code>
        </pre>
        <p>{t("envConfig.step1.note")}</p>
      </div>
      <div>
        <h3>{t("envConfig.step2.title")}</h3>
        <p>{t("envConfig.step2.description")}</p>
        {tList(t, "envConfig.step2.commands").map((cmd, index) => (
          <pre key={index}>
            <code>{cmd}</code>
          </pre>
        ))}
      </div>
      <div>
        <h3>{t("envConfig.step3.title")}</h3>
        <p>{t("envConfig.step3.description")}</p>
        <pre>
          <code>{t("envConfig.step3.command")}</code>
        </pre>
        <p>{t("envConfig.step3.description2")}</p>
      </div>
      <div>
        <h3>{t("envConfig.step4.title")}</h3>
        <p>{t("envConfig.step4.description")}</p>
        <pre>
          <code>{t("envConfig.step4.command")}</code>
        </pre>
        <p>{t("envConfig.step4.description2")}</p>
        <p>{t("envConfig.step4.note")}</p>
      </div>
      <div>
        <h3>{t("envConfig.step5.title")}</h3>
        <p>{t("envConfig.step5.description")}</p>
        <pre>
          <code>{t("envConfig.step5.command")}</code>
        </pre>
        <p>{t("envConfig.step5.description2")}</p>
      </div>
      <div>
        <h3>{t("envConfig.step6.title")}</h3>
        <p>{t("envConfig.step6.description")}</p>
        <pre>
          <code>{t("envConfig.step6.command")}</code>
        </pre>
        <p>{t("envConfig.step6.description2")}</p>
      </div>
      <div>
        <h3>{t("envConfig.step7.title")}</h3>
        <p>{t("envConfig.step7.description")}</p>
        <pre>
          <code>{t("envConfig.step7.command")}</code>
        </pre>
        <p>{t("envConfig.step7.description2")}</p>
      </div>
      <div>
        <h3>{t("envConfig.step8.title")}</h3>
        <p>{t("envConfig.step8.description")}</p>
        <pre>
          <code>{t("envConfig.step8.command")}</code>
        </pre>
        <p>{t("envConfig.step8.description2")}</p>
      </div>
    </section>
  );
});

EnvConfigSection.displayName = "EnvConfigSection";
export default EnvConfigSection;
