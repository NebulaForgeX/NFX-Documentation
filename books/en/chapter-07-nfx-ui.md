# Chapter 7: NFX-UI

[NFX-UI](https://github.com/NebulaForgeX/NFX-UI) is a React library, **not** a standalone site. Hosts: Identity, Vault, News, Storages, Documentation. Not LSR / PQTTEC / SJGZ.

Current version **0.29.0** on npm. Hosts pin **exactly** `"nfx-ui": "0.29.0"` (no `^0.29.0`).

## No dual path

Do not combine a registry version with `"nfx-ui": "file:../../NFX-UI"`. If Docker needs sources, copy them with compose `additional_contexts`; the dependency declaration stays one source.

## What 0.29.0 actually exports (do not copy stale docs)

There is **no** `nfx-ui/layouts`, `LayoutFrame`, `PageFrame`, or `ModalProvider`. `nfx-ui/elements` is an empty `export {}`. `nfx-ui/icons` resolves to `src/animations`.

### providers (`nfx-ui/providers`)

- `ThemeProvider` / `LanguageProvider` / `DataProvider`

Theme follows the preference store; do not pass `defaultTheme` to override the user. Hosts import:

```ts
import "nfx-ui/themes/index.css";
import "nfx-ui/themes/fonts";
```

Chrome is **`@radix-ui/themes`** (peer `^3.3.0`) plus each host’s Sidebar. The documentation site is the same: Radix + lucide, no card wall as the page shell.

### navigations

- `GuestRoute` / `ProtectedRoute`

Identity’s Forger/Authority trees are **Identity console** `ScopeRoute`, not nfx-ui.

### hooks (pages may use these only — never axios or `useAuthRepository` in a page)

Auth: `useAuthQueryScope`, `useCurrentProfile`, `useSendVerificationCode`, `useSignupWithEmail`, `useLoginWithEmail`, `useLoginWithPhone`, `useSelectProfile`, `usePatchProfile`, `useUpdateProfileSettings`, `useUpdatePreference`, `useListProfiles`, `useCreateForgerProfile`, `useCreateAuthorityProfile`, `useDeleteProfile`, `useConfirmProfileAvatar`, `useClearProfileAvatar`, `useConfirmProfileBackgrounds`, the full **email** and **phone** CRUD sets, `useSendChangePasswordVerificationCode`, `useChangePassword`, `useSearchForgerProfiles`, `useSearchAuthorityProfiles`, `useGetPublicProfileCard`, `useListOwnerForgerProfiles`, `useListOwnerAuthorityProfiles`, `useUpdateAuthorityProfileRoles`.

Asset: `useAssetFileURL`, `usePrepareUpload`, `useConfirmUpload`, `useDeleteAsset`, `useListAssets`, `usePrepareImageUpload`, `useConfirmImageUpload`, `useDeleteImage`.

Also: `useUnifiedQuery`, preference (`useResolvedAppearance`, `useApplyPreferenceOnLoad`, `useSyncPreference`), dom helpers.

Cache invalidation: **only** `invalidateEventEmitter` + `useInvalidateInv`. Pages must not call `useQueryClient().invalidateQueries`.

### Other subpaths

`nfx-ui/apis`, `nfx-ui/apis/repositories` (hooks / DataProvider only), `nfx-ui/config`, `nfx-ui/constants`, `nfx-ui/enums` (`ProfileKindEnum.FORGER|AUTHORITY`), `nfx-ui/events`, `nfx-ui/languages`, `nfx-ui/schemas`, `nfx-ui/stores`, `nfx-ui/themes`, `nfx-ui/types`, `nfx-ui/utils`.

HTTP is axios inside the library (Bearer + 401 refresh). Hosts must not wrap another `fetch` client.

## Peer dependencies

`react` / `react-dom` `^19.2.8`, `react-router` `^8.3.1`, `@radix-ui/themes` `^3.3.0`, `@tanstack/react-query` `^5`, `axios` `^1.20`, `vite` `^8.2.2` (see `package.json`).

## Developing the library

```bash
cd /volume1/Projects/NebulaForgeX/NFX-UI
npm install
npm run build
npm run typecheck
```

After hook changes (e.g. phone login): **bump → publish npm → pin every host and `npm install`**. Do not leave Identity on 0.29.0 and News on 0.28.0.

Next: News.
