import { memo } from "react";
import { useTranslation } from "react-i18next";

import { tObject } from "@/utils/i18nContent";


const CertificatesSection = memo(() => {
  const { t } = useTranslation("chapter04");
  const install = tObject(t, "certificates.method1.install");
  const step2Restart = tObject(t, "certificates.method1.install.step2.restart");
  const step4Restart = tObject(t, "certificates.method1.install.step4.restart");
  const step4Verify = tObject(t, "certificates.method1.install.step4.verify");

  return (
    <section>
      <h2>{t("certificates.title")}</h2>
      <p>{t("certificates.description")}</p>

      <div>
        <h3>{t("certificates.method1.title")}</h3>
        <p dangerouslySetInnerHTML={{ __html: t("certificates.method1.description") }} />
        {install ? (
          <div>
            <h4>{t("certificates.method1.install.title")}</h4>
            <div>
              <h5>{t("certificates.method1.install.step1.title")}</h5>
              <pre>
                <code>{t("certificates.method1.install.step1.command")}</code>
              </pre>
            </div>
            <div>
              <h5>{t("certificates.method1.install.step2.title")}</h5>
              <p>{t("certificates.method1.install.step2.description")}</p>
              <pre>
                <code>{t("certificates.method1.install.step2.yaml")}</code>
              </pre>
              {step2Restart ? (
                <div>
                  <p>{t("certificates.method1.install.step2.restart.description")}</p>
                  <pre>
                    <code>{t("certificates.method1.install.step2.restart.command")}</code>
                  </pre>
                </div>
              ) : null}
            </div>
            <div>
              <h5>{t("certificates.method1.install.step3.title")}</h5>
              <p>{t("certificates.method1.install.step3.description")}</p>
            </div>
            <div>
              <h5>{t("certificates.method1.install.step4.title")}</h5>
              <p>{t("certificates.method1.install.step4.description")}</p>
              <pre>
                <code>{t("certificates.method1.install.step4.yaml")}</code>
              </pre>
              {step4Restart ? (
                <div>
                  <p>{t("certificates.method1.install.step4.restart.description")}</p>
                  <pre>
                    <code>{t("certificates.method1.install.step4.restart.command")}</code>
                  </pre>
                </div>
              ) : null}
              {step4Verify ? (
                <div>
                  <p>
                    <strong>{t("certificates.method1.install.step4.verify.title")}</strong>
                  </p>
                  <pre>
                    <code>{t("certificates.method1.install.step4.verify.command")}</code>
                  </pre>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <div>
        <h3>{t("certificates.method2.title")}</h3>
        <p>{t("certificates.method2.description")}</p>
        <div>
          <h4>{t("certificates.method2.step1.title")}</h4>
          <pre>
            <code>{t("certificates.method2.step1.command")}</code>
          </pre>
        </div>
        <div>
          <h4>{t("certificates.method2.step2.title")}</h4>
          <pre>
            <code>{t("certificates.method2.step2.command")}</code>
          </pre>
        </div>
        <div>
          <h4>{t("certificates.method2.step3.title")}</h4>
          <p>{t("certificates.method2.step3.description")}</p>
          <pre>
            <code>{t("certificates.method2.step3.yaml")}</code>
          </pre>
        </div>
        <div>
          <h4>{t("certificates.method2.step4.title")}</h4>
          <pre>
            <code>{t("certificates.method2.step4.command")}</code>
          </pre>
        </div>
      </div>
    </section>
  );
});

CertificatesSection.displayName = "CertificatesSection";
export default CertificatesSection;
