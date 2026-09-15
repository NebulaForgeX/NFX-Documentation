import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const BashConfigSection = memo(() => {
  const { t } = useTranslation("chapter02");

  return (
      <section>
          <h2>{t("bash.title")}</h2>

          <div>
            <h3>{t("bash.problem.title")}</h3>
            <p>{t("bash.problem.description")}</p>
            <p>{t("bash.problem.nasShell")}</p>
            <ul>
              {tList(t, "bash.problem.needs").map((need, index) => (
                <li key={index}>{need}</li>
              ))}
            </ul>
            <p>{t("bash.problem.conclusion")}</p>
          </div>

          <div>
            <h3>{t("bash.solution.title")}</h3>
            <p>{t("bash.solution.description")}</p>
          </div>

          <div>
            <h3>{t("bash.steps.title")}</h3>

            <div>
              <h4>{t("bash.steps.step1.title")}</h4>
              <p>{t("bash.steps.step1.description")}</p>
              <p>{t("bash.steps.step1.windows")}</p>
              <p>{t("bash.steps.step1.linuxMac")}</p>
              <p>{t("bash.steps.step1.connect")}</p>
              <pre><code>{t("bash.steps.step1.command")}</code></pre>
              <p>{t("bash.steps.step1.example")}</p>
              <pre><code>{t("bash.steps.step1.exampleCommand")}</code></pre>
            </div>

            <div>
              <h4>{t("bash.steps.step2.title")}</h4>
              <p>{t("bash.steps.step2.description")}</p>
              <pre><code>{t("bash.steps.step2.command")}</code></pre>
              <p dangerouslySetInnerHTML={{ __html: t("bash.steps.step2.expected") }} />
              <pre><code>{t("bash.steps.step2.output")}</code></pre>
              <p>{t("bash.steps.step2.note")}</p>
            </div>

            <div>
              <h4>{t("bash.steps.step3.title")}</h4>
              <p>{t("bash.steps.step3.description")}</p>
              <pre><code>{t("bash.steps.step3.command")}</code></pre>
              <p>{t("bash.steps.step3.note")}</p>
            </div>

            <div>
              <h4>{t("bash.steps.step4.title")}</h4>
              <p>{t("bash.steps.step4.description")}</p>
              <pre><code>{t("bash.steps.step4.command")}</code></pre>
              <p>{t("bash.steps.step4.note")}</p>
            </div>

            <div>
              <h4>{t("bash.steps.step5.title")}</h4>
              <p>{t("bash.steps.step5.description")}</p>
              <pre><code>{t("bash.steps.step5.command")}</code></pre>
              <p dangerouslySetInnerHTML={{ __html: t("bash.steps.step5.expected") }} />
              <pre><code>{t("bash.steps.step5.output")}</code></pre>
            </div>

            <div>
              <h4>{t("bash.steps.step6.title")}</h4>
              <p>{t("bash.steps.step6.description")}</p>
              <pre><code>{t("bash.steps.step6.command")}</code></pre>
              <p>{t("bash.steps.step6.note")}</p>
              <p dangerouslySetInnerHTML={{ __html: t("bash.steps.step6.verify") }} />
              <pre><code>{t("bash.steps.step6.verifyCommand")}</code></pre>
              <p>{t("bash.steps.step6.expectedOutput")}</p>
            </div>

            <div>
              <h4>{t("bash.steps.step7.title")}</h4>
              <p>{t("bash.steps.step7.description")}</p>
              <pre><code>{t("bash.steps.step7.command")}</code></pre>
              <p>{t("bash.steps.step7.note")}</p>
            </div>
          </div>
        </section>
  );
});

BashConfigSection.displayName = "BashConfigSection";
export default BashConfigSection;
