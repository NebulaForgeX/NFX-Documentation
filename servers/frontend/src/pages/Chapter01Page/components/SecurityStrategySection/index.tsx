import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const SecurityStrategySection = memo(() => {
  const { t } = useTranslation("chapter01");

  return (
      <section>
          <h2>{t("security.title")}</h2>

          <div>
            <h3>{t("security.recommended.title")}</h3>
            <p>{t("security.recommended.description")}</p>

            {/* Solution 1 */}
            <div>
              <h4 dangerouslySetInnerHTML={{ __html: t("security.recommended.solution1.title") }} />
              <p dangerouslySetInnerHTML={{ __html: t("security.recommended.solution1.advantages") }} />
              <ul>
                {tList(t, "security.recommended.solution1.items").map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
              </ul>
              <p dangerouslySetInnerHTML={{ __html: t("security.recommended.solution1.implementation") }} />
              <p>{t("security.recommended.solution1.implementationDesc")}</p>
              <ul>
                {tList(t, "security.recommended.solution1.benefits").map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
              </ul>
            </div>

            {/* Solution 2 */}
            <div>
              <h4>{t("security.recommended.solution2.title")}</h4>
              <p>{t("security.recommended.solution2.description")}</p>
              <ul>
                {tList(t, "security.recommended.solution2.items").map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
              </ul>
              <p dangerouslySetInnerHTML={{ __html: t("security.recommended.solution2.scenarios") }} />
              <ul>
                {tList(t, "security.recommended.solution2.scenarioItems").map((scenario, index) => (
                <li key={index}>{scenario}</li>
              ))}
              </ul>
            </div>

            {/* Other Solutions */}
            <div>
              <h4>{t("security.recommended.other.title")}</h4>
              <p>{t("security.recommended.other.description")}</p>
              <ul>
                {tList(t, "security.recommended.other.items").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
              </ul>
              <p>{t("security.recommended.other.note")}</p>
            </div>
          </div>
        </section>
  );
});

SecurityStrategySection.displayName = "SecurityStrategySection";
export default SecurityStrategySection;
