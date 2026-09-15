import { memo } from "react";
import { useTranslation } from "react-i18next";

import { tObject } from "@/utils/i18nContent";


const ConfigFilesSection = memo(() => {
  const { t } = useTranslation("chapter04");
  const example = tObject(t, "configFiles.step2.example");

  return (
    <section>
      <h2>{t("configFiles.title")}</h2>
      <div>
        <h3>{t("configFiles.step1.title")}</h3>
        <p>{t("configFiles.step1.description")}</p>
        <pre>
          <code>{t("configFiles.step1.command")}</code>
        </pre>
        <p>{t("configFiles.step1.important")}</p>
      </div>
      <div>
        <h3>{t("configFiles.step2.title")}</h3>
        <p>{t("configFiles.step2.description")}</p>
        <pre>
          <code>{t("configFiles.step2.command")}</code>
        </pre>
        <p>{t("configFiles.step2.description2")}</p>
        <p>{t("configFiles.step2.description3")}</p>
        {example ? (
          <div>
            <h4>{t("configFiles.step2.example.title")}</h4>
            <p>{t("configFiles.step2.example.description")}</p>
            <pre>
              <code>{t("configFiles.step2.example.command")}</code>
            </pre>
            <p dangerouslySetInnerHTML={{ __html: t("configFiles.step2.example.note") }} />
          </div>
        ) : null}
      </div>
      <div>
        <h3>{t("configFiles.step3.title")}</h3>
        <p>{t("configFiles.step3.description")}</p>
        <pre>
          <code>{t("configFiles.step3.command")}</code>
        </pre>
        <p>{t("configFiles.step3.description2")}</p>
      </div>
    </section>
  );
});

ConfigFilesSection.displayName = "ConfigFilesSection";
export default ConfigFilesSection;
