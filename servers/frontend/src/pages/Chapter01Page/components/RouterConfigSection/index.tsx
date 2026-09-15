import { memo } from "react";
import RouterAccessSection from "../RouterAccessSection";
import FirewallConfigSection from "../FirewallConfigSection";
import PortForwardingSection from "../PortForwardingSection";

import { useTranslation } from "react-i18next";


const RouterConfigSection = memo(() => {
  const { t } = useTranslation("chapter01");

  return (
      <section>
          <h2>{t("router.title")}</h2>
          <p>{t("router.intro")}</p>

          <RouterAccessSection />
          <FirewallConfigSection />
          <PortForwardingSection />
        </section>
  );
});

RouterConfigSection.displayName = "RouterConfigSection";
export default RouterConfigSection;
