import { Route, Routes } from "react-router";

import { DocsLayout } from "@/layouts";
import { ROUTES } from "@/navigations";
import { AboutPage, ChapterReader, HomePage, NotFoundPage, RepoPage } from "@/pages";

export default function App() {
  return (
    <DocsLayout>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.REPO} element={<RepoPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path="/:locale/:slug" element={<ChapterReader />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DocsLayout>
  );
}
