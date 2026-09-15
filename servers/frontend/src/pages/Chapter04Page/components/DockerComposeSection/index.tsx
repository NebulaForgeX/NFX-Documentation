import { memo } from "react";
import { useTranslation } from "react-i18next";

import { tList, tObject } from "@/utils/i18nContent";


const DockerComposeSection = memo(() => {
  const { t } = useTranslation("chapter04");
  const generateHash = tObject(t, "dockerCompose.step1.generateHash");

  return (
    <section>
      <h2>{t("dockerCompose.title")}</h2>
      <p>{t("dockerCompose.description")}</p>
      <div>
        <h3>{t("dockerCompose.step1.title")}</h3>
        <p>{t("dockerCompose.step1.description")}</p>
        <pre>
          <code>{t("dockerCompose.step1.yaml")}</code>
        </pre>
        {generateHash ? (
          <div>
            <h4>{t("dockerCompose.step1.generateHash.title")}</h4>
            {tList(t, "dockerCompose.step1.generateHash.commands").map((cmd, index) => (
              <pre key={index}>
                <code>{cmd}</code>
              </pre>
            ))}
          </div>
        ) : null}
      </div>
      <div>
        <h3>{t("dockerCompose.step2.title")}</h3>
        <p>{t("dockerCompose.step2.description")}</p>
        <pre>
          <code>{t("dockerCompose.step2.yaml")}</code>
        </pre>
        <p>{t("dockerCompose.step2.description2")}</p>
      </div>
      <div>
        <h3>{t("dockerCompose.step3.title")}</h3>
        <p>{t("dockerCompose.step3.description")}</p>
        <pre>
          <code>{t("dockerCompose.step3.command")}</code>
        </pre>
      </div>
    </section>
  );
});

DockerComposeSection.displayName = "DockerComposeSection";
export default DockerComposeSection;
