import { Route, Routes } from "react-router";

import { Sidebar } from "@/layouts";
import { ROUTES } from "@/navigations";
import { AboutPage, ArchitecturePage, ChapterReader, HomePage, NotFoundPage, RepoPage } from "@/pages";

export default function App() {
  return (
    <Sidebar>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ARCHITECTURE} element={<ArchitecturePage />} />
        <Route path={ROUTES.REPO} element={<RepoPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path="/:locale/:slug" element={<ChapterReader />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Sidebar>
  );
}
