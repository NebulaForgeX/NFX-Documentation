import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const SSHClientsSection = memo(() => {
  const { t } = useTranslation("chapter02");

  return (
      <section>
          <h2>{t("sshClients.title")}</h2>

          <div>
            <h3>{t("sshClients.cursor.title")}</h3>
            <p>{t("sshClients.cursor.description")}</p>
            <p dangerouslySetInnerHTML={{ __html: t("sshClients.cursor.requirements") }} />
            <ul>
              {tList(t, "sshClients.cursor.reqItems").map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t("sshClients.cursor.advantages") }} />
            <ul>
              {tList(t, "sshClients.cursor.advItems").map((adv, index) => (
                <li key={index}>{adv}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>{t("sshClients.vscode.title")}</h3>
            <p>{t("sshClients.vscode.description")}</p>
            <p dangerouslySetInnerHTML={{ __html: t("sshClients.vscode.requirements") }} />
            <ul>
              {tList(t, "sshClients.vscode.reqItems").map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t("sshClients.vscode.notes") }} />
            <ul>
              {tList(t, "sshClients.vscode.noteItems").map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>{t("sshClients.others.title")}</h3>
            <p>{t("sshClients.others.description")}</p>
            <ul>
              {tList(t, "sshClients.others.items").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
  );
});

SSHClientsSection.displayName = "SSHClientsSection";
export default SSHClientsSection;
