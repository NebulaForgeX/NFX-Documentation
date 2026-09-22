import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Container, Flex, Heading, Text } from "@radix-ui/themes";

const REPOS = [
  { key: "nfxStack", name: "NFX-Stack", url: "https://github.com/NebulaForgeX/NFX-Stack", stack: "Docker Compose" },
  { key: "nfxEdge", name: "NFX-Edge", url: "https://github.com/NebulaForgeX/NFX-Edge", stack: "Traefik / Go / React" },
  { key: "nfxIdentity", name: "NFX-Identity", url: "https://github.com/NebulaForgeX/NFX-Identity", stack: "Go / React" },
  { key: "nfxUi", name: "NFX-UI", url: "https://github.com/NebulaForgeX/NFX-UI", stack: "React / TypeScript" },
  { key: "nfxNews", name: "NFX-News", url: "https://github.com/NebulaForgeX/NFX-News", stack: "Go / React" },
  { key: "nfxStorages", name: "NFX-Storages", url: "https://github.com/NebulaForgeX/NFX-Storages", stack: "Go / React" },
  {
    key: "nfxDocumentation",
    name: "NFX-Documentation",
    url: "https://github.com/NebulaForgeX/NFX-Documentation",
    stack: "React / TypeScript",
  },
] as const;

const RepoPage = memo(() => {
  const { t } = useTranslation("repo");

  return (
    <Container size="3" py="6">
      <Flex direction="column" gap="5">
        <Flex direction="column" gap="2" className="docs-masthead">
          <Heading size="8">{t("title")}</Heading>
          <Text as="p" size="4" color="gray">
            {t("description")}
          </Text>
        </Flex>
        <Flex direction="column">
          {REPOS.map((repo) => (
            <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="docs-ledger-row">
              <Text size="3" weight="medium" className="docs-ledger-name">
                {repo.name}
              </Text>
              <Text size="2" color="gray" className="docs-ledger-stack">
                {repo.stack}
              </Text>
              <Text as="p" size="2" color="gray">
                {t(`${repo.key}.description`)}
              </Text>
            </a>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
});

RepoPage.displayName = "RepoPage";
export default RepoPage;
