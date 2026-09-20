import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@radix-ui/themes/styles.css";
import "nfx-ui/themes/fonts";
import "nfx-ui/themes/index.css";

import { LanguageEnum } from "nfx-ui/enums";
import { LanguageProvider, ThemeProvider } from "nfx-ui/providers";

import "./index.css";

import { getBuiltinI18nBundles } from "@/assets/languages/i18nResources";
import { DataProvider, QueryProvider, RouterProvider } from "@/providers";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <LanguageProvider getBuiltinBundles={getBuiltinI18nBundles} fallbackLng={LanguageEnum.ZH}>
        <ThemeProvider>
          <DataProvider>
            <RouterProvider>
              <App />
            </RouterProvider>
          </DataProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryProvider>
  </StrictMode>,
);
