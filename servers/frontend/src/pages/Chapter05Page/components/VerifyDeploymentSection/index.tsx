import { memo } from "react";
import { useTranslation } from "react-i18next";

import { tList } from "@/utils/i18nContent";


const VerifyDeploymentSection = memo(() => {
  const { t } = useTranslation("chapter05");

  return (
    <section>
      <h2>{t("verifyDeployment.title")}</h2>
      <div>
        <h3>{t("verifyDeployment.step1.title")}</h3>
        <p>{t("verifyDeployment.step1.description")}</p>
        <pre>
          <code>{t("verifyDeployment.step1.command")}</code>
        </pre>
        <p>{t("verifyDeployment.step1.description2")}</p>
        <p>{t("verifyDeployment.step1.note")}</p>
      </div>
      <div>
        <h3>{t("verifyDeployment.step2.title")}</h3>
        <p>{t("verifyDeployment.step2.description")}</p>
        {tList(t, "verifyDeployment.step2.commands").map((cmd, index) => (
          <pre key={index}>
            <code>{cmd}</code>
          </pre>
        ))}
        <p>{t("verifyDeployment.step2.description2")}</p>
        <p>{t("verifyDeployment.step2.note")}</p>
      </div>
      <div>
        <h3>{t("verifyDeployment.step3.title")}</h3>
        <p>{t("verifyDeployment.step3.description")}</p>
        <pre>
          <code>{t("verifyDeployment.step3.command")}</code>
        </pre>
        <p>{t("verifyDeployment.step3.description2")}</p>
      </div>
      <div>
        <h3>{t("verifyDeployment.step4.title")}</h3>
        <p>{t("verifyDeployment.step4.description")}</p>
        {tList(t, "verifyDeployment.step4.commands").map((cmd, index) => (
          <pre key={index}>
            <code>{cmd}</code>
          </pre>
        ))}
        <p>{t("verifyDeployment.step4.description2")}</p>
      </div>
      <div>
        <h3>{t("verifyDeployment.step5.title")}</h3>
        <p>{t("verifyDeployment.step5.description")}</p>
        {tList(t, "verifyDeployment.step5.commands").map((cmd, index) => (
          <pre key={index}>
            <code>{cmd}</code>
          </pre>
        ))}
        <p>{t("verifyDeployment.step5.description2")}</p>
      </div>
    </section>
  );
});

VerifyDeploymentSection.displayName = "VerifyDeploymentSection";
export default VerifyDeploymentSection;
