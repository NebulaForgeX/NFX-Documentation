import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const IPPortSection = memo(() => {
  const { t } = useTranslation("chapter03");

  return (
      <section>
          <h2>{t("ipPort.title")}</h2>

          <div>
            <h3>{t("ipPort.ip.title")}</h3>
            <p>{t("ipPort.ip.description")}</p>
            <p dangerouslySetInnerHTML={{ __html: t("ipPort.ip.example") }} />
            <p dangerouslySetInnerHTML={{ __html: t("ipPort.ip.hosts.0") }} />
            <ul>
              {tList(t, "ipPort.ip.hosts").slice(1).map((host, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: host }} />
              ))}
            </ul>
            <p>{t("ipPort.ip.security.0")}</p>
            <ul>
              {tList(t, "ipPort.ip.security").slice(1).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>{t("ipPort.port.title")}</h3>
            <p>{t("ipPort.port.description")}</p>
            <p dangerouslySetInnerHTML={{ __html: t("ipPort.port.warning") }} />
            <p dangerouslySetInnerHTML={{ __html: t("ipPort.port.important") }} />
            <p>{t("ipPort.port.reasons.0")}</p>
            <ul>
              {tList(t, "ipPort.port.reasons").slice(1).map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t("ipPort.port.recommendations.0") }} />
            <ul>
              {tList(t, "ipPort.port.recommendations").slice(1).map((rec, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: rec }} />
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t("ipPort.port.example") }} />
            <pre><code>{t("ipPort.port.example")}</code></pre>
            <div>
              <p dangerouslySetInnerHTML={{ __html: t("ipPort.port.check.title") }} />
              <p>{t("ipPort.port.check.description")}</p>
              <pre><code>{t("ipPort.port.check.command")}</code></pre>
            </div>
          </div>
        </section>
  );
});

IPPortSection.displayName = "IPPortSection";
export default IPPortSection;
