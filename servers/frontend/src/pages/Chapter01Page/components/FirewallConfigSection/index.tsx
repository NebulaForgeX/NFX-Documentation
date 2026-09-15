import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const FirewallConfigSection = memo(() => {
  const { t } = useTranslation("chapter01");

  return (
      <div>
          <h3>{t("router.firewall.title")}</h3>
          <p>{t("router.firewall.description")}</p>
          <img src={t("router.firewall.image")} alt={t("router.firewall.imageAlt")} />

          {/* DMZ Section */}
          <div>
            <h4 dangerouslySetInnerHTML={{ __html: t("router.firewall.dmz.title") }} />
            <p dangerouslySetInnerHTML={{ __html: t("router.firewall.dmz.important") }} />
            
            <div>
              <h5>{t("router.firewall.dmz.why.title")}</h5>
              <p>{t("router.firewall.dmz.why.description")}</p>
            </div>

            <div>
              <h5>{t("router.firewall.dmz.docker.title")}</h5>
              <p>{t("router.firewall.dmz.docker.description")}</p>
              <ul>
                {tList(t, "router.firewall.dmz.docker.links").map((link, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: link }} />
              ))}
              </ul>
              <p>{t("router.firewall.dmz.docker.details")}</p>
              <p>{t("router.firewall.dmz.docker.rules")}</p>
              <p>{t("router.firewall.dmz.docker.purpose")}</p>
              <ul>
                {tList(t, "router.firewall.dmz.docker.purposes").map((purpose, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: purpose }} />
              ))}
              </ul>
              <p>{t("router.firewall.dmz.docker.systemFirewall")}</p>
              <p dangerouslySetInnerHTML={{ __html: t("router.firewall.dmz.docker.keyPoints") }} />
              <ul>
                {tList(t, "router.firewall.dmz.docker.points").map((point, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
              ))}
              </ul>
            </div>

            <div>
              <h5>{t("router.firewall.dmz.summary.title")}</h5>
              <p>{t("router.firewall.dmz.summary.description")}</p>
              <ul>
                {tList(t, "router.firewall.dmz.summary.items").map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
              </ul>
            </div>
          </div>
        </div>
  );
});

FirewallConfigSection.displayName = "FirewallConfigSection";
export default FirewallConfigSection;
