import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList, tObjects } from "@/utils/i18nContent";

const PortForwardingSection = memo(() => {
  const { t } = useTranslation("chapter01");

  return (
      <div>
          <h3>{t("router.portForwarding.title")}</h3>
          <p>{t("router.portForwarding.description")}</p>
          <img src={t("router.portForwarding.image")} alt={t("router.portForwarding.imageAlt")} />

          <div>
            <h4>{t("router.portForwarding.required.title")}</h4>
            <p>{t("router.portForwarding.required.description")}</p>
            <ul>
              {tObjects<{ name: string; description: string; note: string }>(t, "router.portForwarding.required.ports").map((port, index) => (
                <li key={index}>
                  <strong>{port.name}</strong> - {port.description}
                <br />
                <span>{port.note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t("router.portForwarding.optional.title")}</h4>
            <p>{t("router.portForwarding.optional.description")}</p>
            <ul>
              {tList(t, "router.portForwarding.optional.items").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t("router.portForwarding.optional.recommendation") }} />
          </div>
        </div>
  );
});

PortForwardingSection.displayName = "PortForwardingSection";
export default PortForwardingSection;
