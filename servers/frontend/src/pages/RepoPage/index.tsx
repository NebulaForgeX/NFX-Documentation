import { memo } from "react";
import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

import { LedgerLink, PageIntro } from "@/components";

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
    <Container size="3">
      <Box py="6">
        <Flex direction="column" gap="5">
          <PageIntro title={t("title")}>
            <Text as="p" size="4" color="gray">
              {t("description")}
            </Text>
          </PageIntro>
          <Flex direction="column">
            {REPOS.map((repo) => (
              <LedgerLink key={repo.name} href={repo.url}>
                <Text size="3" weight="medium">
                  {repo.name}
                </Text>
                <Text size="2" color="gray">
                  {repo.stack}
                </Text>
                <Text as="p" size="2" color="gray">
                  {t(`${repo.key}.description`)}
                </Text>
              </LedgerLink>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
});

RepoPage.displayName = "RepoPage";
export default RepoPage;
