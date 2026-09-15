import { Route, Routes } from "react-router";

import { DocsLayout } from "@/layouts";
import { ROUTES } from "@/navigations";
import {
  AboutPage,
  Chapter01Page,
  Chapter02Page,
  Chapter03Page,
  Chapter04Page,
  Chapter05Page,
  HomePage,
  NotFoundPage,
  RepoPage,
} from "@/pages";

export default function App() {
  return (
    <DocsLayout>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.REPO} element={<RepoPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CHAPTER_01_ZH} element={<Chapter01Page />} />
        <Route path={ROUTES.CHAPTER_02_ZH} element={<Chapter02Page />} />
        <Route path={ROUTES.CHAPTER_03_ZH} element={<Chapter03Page />} />
        <Route path={ROUTES.CHAPTER_04_ZH} element={<Chapter04Page />} />
        <Route path={ROUTES.CHAPTER_05_ZH} element={<Chapter05Page />} />
        <Route path={ROUTES.CHAPTER_01_EN} element={<Chapter01Page />} />
        <Route path={ROUTES.CHAPTER_02_EN} element={<Chapter02Page />} />
        <Route path={ROUTES.CHAPTER_03_EN} element={<Chapter03Page />} />
        <Route path={ROUTES.CHAPTER_04_EN} element={<Chapter04Page />} />
        <Route path={ROUTES.CHAPTER_05_EN} element={<Chapter05Page />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DocsLayout>
  );
}
