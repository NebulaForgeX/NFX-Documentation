import { memo } from "react";
import { useTranslation } from "react-i18next";

import { tList, tObject } from "@/utils/i18nContent";


const VerifyDeploymentSection = memo(() => {
  const { t } = useTranslation("chapter04");
  const expectedOutput = tObject(t, "verifyDeployment.step1.expectedOutput");

  return (
    <section>
      <h2>{t("verifyDeployment.title")}</h2>
      <div>
        <h3>{t("verifyDeployment.step1.title")}</h3>
        <pre>
          <code>{t("verifyDeployment.step1.command")}</code>
        </pre>
        {expectedOutput ? (
          <div>
            <h4>{t("verifyDeployment.step1.expectedOutput.title")}</h4>
            <pre>
              <code>{t("verifyDeployment.step1.expectedOutput.output")}</code>
            </pre>
          </div>
        ) : null}
      </div>
      <div>
        <h3>{t("verifyDeployment.step2.title")}</h3>
        {tList(t, "verifyDeployment.step2.commands").map((cmd, index) => (
          <pre key={index}>
            <code>{cmd}</code>
          </pre>
        ))}
        <p>{t("verifyDeployment.step2.description")}</p>
      </div>
      <div>
        <h3>{t("verifyDeployment.step3.title")}</h3>
        <p>{t("verifyDeployment.step3.description")}</p>
        <ul>
          {tList(t, "verifyDeployment.step3.sites").map((site, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: site }} />
          ))}
        </ul>
        <p>{t("verifyDeployment.step3.description2")}</p>
      </div>
      <div>
        <h3>{t("verifyDeployment.step4.title")}</h3>
        <p>{t("verifyDeployment.step4.description")}</p>
        <pre>
          <code>{t("verifyDeployment.step4.command")}</code>
        </pre>
      </div>
    </section>
  );
});

VerifyDeploymentSection.displayName = "VerifyDeploymentSection";
export default VerifyDeploymentSection;
