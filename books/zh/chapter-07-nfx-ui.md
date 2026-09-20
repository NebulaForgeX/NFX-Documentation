# 第七章：NFX-UI 前端库

[NFX-UI](https://github.com/NebulaForgeX/NFX-UI) 是 React 库，**不是**独立站点。宿主：Identity、Vault、News、Storages、Documentation。不含 LSR / PQTTEC / SJGZ。

当前版本 **0.29.0**，发布到 npm。宿主 `package.json` **精确钉** `"nfx-ui": "0.29.0"`（不要 `^0.29.0`）。

## 禁止双路径

不要同时写 registry 版本和 `"nfx-ui": "file:../../NFX-UI"`。Docker 构建若需要源码，用 compose `additional_contexts` 拷进镜像，依赖声明只保留一个来源。

## 0.29.0 真实导出（不要抄过期文档）

**没有** `nfx-ui/layouts`、`LayoutFrame`、`PageFrame`、`ModalProvider`。`nfx-ui/elements` 桶文件是空的 `export {}`。`nfx-ui/icons` 实际指向 `src/animations`。

### providers（`nfx-ui/providers`）

- `ThemeProvider` / `LanguageProvider` / `DataProvider`

主题跟 preference store，不要给 `ThemeProvider` 传 `defaultTheme` 覆盖用户选择。宿主引入样式：

```ts
import "nfx-ui/themes/index.css";
import "nfx-ui/themes/fonts";
```

壳层用 **`@radix-ui/themes`**（对等依赖 `^3.3.0`）+ 各仓本地 Sidebar。Documentation 站点同样：Radix + lucide，不用卡片墙当整页容器。

### navigations

- `GuestRoute` / `ProtectedRoute`

Identity 的 Forger/Authority 分树是 **Identity console** 的 `ScopeRoute`，不在 nfx-ui。

### hooks（页面只准走这些，不准 import axios / `useAuthRepository`）

Auth（`nfx-ui/hooks`）：

`useAuthQueryScope`、`useCurrentProfile`、`useSendVerificationCode`、`useSignupWithEmail`、`useLoginWithEmail`、`useLoginWithPhone`、`useSelectProfile`、`usePatchProfile`、`useUpdateProfileSettings`、`useUpdatePreference`、`useListProfiles`、`useCreateForgerProfile`、`useCreateAuthorityProfile`、`useDeleteProfile`、`useConfirmProfileAvatar`、`useClearProfileAvatar`、`useConfirmProfileBackgrounds`、`useListEmails` / `useCreateEmail` / `useSendEmailVerificationCode` / `useVerifyEmail` / `useUpdateEmail` / `useSetPrimaryEmail` / `useDeleteEmail`、对应 **phone** 一套、`useSendChangePasswordVerificationCode`、`useChangePassword`、`useSearchForgerProfiles`、`useSearchAuthorityProfiles`、`useGetPublicProfileCard`、`useListOwnerForgerProfiles`、`useListOwnerAuthorityProfiles`、`useUpdateAuthorityProfileRoles`。

Asset：`useAssetFileURL`、`usePrepareUpload`、`useConfirmUpload`、`useDeleteAsset`、`useListAssets`、`usePrepareImageUpload`、`useConfirmImageUpload`、`useDeleteImage`。

其它：`useUnifiedQuery`（factory）、preference（`useResolvedAppearance`、`useApplyPreferenceOnLoad`、`useSyncPreference`）、dom（`useDebouncedValue` 等）。

列表失效：**只用** `invalidateEventEmitter` + `useInvalidateInv`，页面里不要 `useQueryClient().invalidateQueries`。

### 其它子路径

`nfx-ui/apis`、`nfx-ui/apis/repositories`（只给 hooks / DataProvider 用）、`nfx-ui/config`、`nfx-ui/constants`、`nfx-ui/enums`（`ProfileKindEnum.FORGER|AUTHORITY`）、`nfx-ui/events`、`nfx-ui/languages`、`nfx-ui/schemas`、`nfx-ui/stores`、`nfx-ui/themes`、`nfx-ui/types`、`nfx-ui/utils`。

HTTP 客户端在库内 axios；拦截器处理 Bearer 与 401 refresh。宿主 **不要**再包一层 `fetch`。

## 对等依赖（与 PulsoLink-WEB 对齐，以 `package.json` peerDependencies 为准）

`react` / `react-dom` `^19.2.8`，`react-router` `^8.3.1`，`@radix-ui/themes` `^3.3.0`，`@tanstack/react-query` `^5`，`axios` `^1.20`，`vite` `^8.2.2`。

## 开发本库

```bash
cd /volume1/Projects/NebulaForgeX/NFX-UI
npm install
npm run build
npm run typecheck
```

改 hooks（例如手机号登录）后：**升版本 → 发布 npm → 所有宿主把 pin 改成新版本并 `npm install`**。不要让 Identity 用 0.29.0、News 用 0.28.0。

下一章：News。
