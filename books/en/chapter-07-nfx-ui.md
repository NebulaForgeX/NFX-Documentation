# Chapter 7: NFX-UI

[NFX-UI](https://github.com/NebulaForgeX/NFX-UI) is a React library, **not** a standalone site. Hosts: Identity, Edge, News, Storages, Documentation. Not LSR / PQTTEC / SJGZ.

Current version **0.36.0** on npm. Hosts pin **exactly** `"nfx-ui": "0.36.0"` (no `^0.31.0`).

## No dual path

Do not combine a registry version with `"nfx-ui": "file:../../NFX-UI"`. If Docker needs sources, copy them with compose `additional_contexts`; the dependency declaration stays one source.

## What 0.36.0 actually exports (do not copy stale docs)

There is **no** `nfx-ui/layouts`, `LayoutFrame`, `PageFrame`, or `ModalProvider`. `nfx-ui/elements` is an empty `export {}`. `nfx-ui/icons` resolves to `src/animations`.

### providers (`nfx-ui/providers`)

- `ThemeProvider` / `LanguageProvider` / `DataProvider`

Theme is read only from the preference store. `ThemeProvider` takes `children` and `onAppearanceChange`; it has no prop that overrides the theme. Hosts import:

```ts
import "nfx-ui/themes/index.css";
import "nfx-ui/themes/fonts";
```

Chrome is **`@radix-ui/themes`** (peer `^3.3.0`) plus each host's Sidebar. The documentation site uses Radix the same way; icons are mostly `nfx-ui/icons`, with a little `lucide-react`. Do not use a card wall as the page shell.

### navigations

- `GuestRoute` / `ProtectedRoute`

Identity’s Forger/Authority trees are **Identity console** `ScopeRoute`, not nfx-ui.

### hooks (pages may use these only — never axios or `useAuthRepository` in a page)

Auth (`nfx-ui/hooks`): `useAuthQueryScope`, `useCurrentProfile`, `useSendVerificationCode`, `useSignupWithEmail`, `useLoginWithEmail`, `useLoginWithPhone`, `useSelectProfile`, `usePatchProfile`, `useUpdateProfileSettings`, `useUpdatePreference`, `useListProfiles`, `useCreateForgerProfile`, `useCreateAuthorityProfile`, `useDeleteProfile`, `useConfirmProfileAvatar`, `useClearProfileAvatar`, `useConfirmProfileBackgrounds`, `useListEmails` / `useCreateEmail` / `useSendEmailVerificationCode` / `useVerifyEmail` / `useUpdateEmail` / `useSetPrimaryEmail` / `useDeleteEmail`, `useListPhones` / `useCreatePhone` / `useSendPhoneVerificationCode` / `useVerifyPhone` / `useUpdatePhone` / `useSetPrimaryPhone` / `useDeletePhone`, `useSendChangePasswordVerificationCode`, `useChangePassword`, `useSearchForgerProfiles`, `useSearchAuthorityProfiles`, `useGetPublicProfileCard`, `useListOwnerForgerProfiles`, `useListOwnerAuthorityProfiles`, `useUpdateAuthorityProfileRoles`.

Asset: `useAssetFileURL`, `usePrepareUpload`, `useConfirmUpload`, `useDeleteAsset`, `useListAssets`, `usePrepareImageUpload`, `useConfirmImageUpload`, `useDeleteImage`.

Also: `useUnifiedQuery`, `useUnifiedInfiniteQuery`, `useUnifiedSuspenseQuery`, `useUnifiedSuspenseInfiniteQuery` (factory), preference (`useResolvedAppearance`, `useApplyPreferenceOnLoad`, `useSyncPreference`, `configurePreferenceSync`), dom (`useDebouncedValue`, `useWheelHorizontalScroll`, `useLockDocumentScrollOnDesktop`), language labels (`useLanguageLabel`, `useBaseLabel`, `useLayoutLabel`, `usePreferenceLabel`, `useThemeLabel`).

List invalidation lives in the **host**: `invalidateEventEmitter` + `useInvalidateInv` from `@/events/invalidate`. Inside the library, auth invalidation uses `authEventEmitter` and query invalidation uses `queryEventEmitter`, both from `nfx-ui/events`. Pages must not call `useQueryClient().invalidateQueries`.

### Other subpaths

`nfx-ui/apis`, `nfx-ui/apis/repositories` (hooks / DataProvider only), `nfx-ui/config`, `nfx-ui/constants`, `nfx-ui/enums` (`ProfileKindEnum.COMMUNITY|AUTHORITY`), `nfx-ui/events`, `nfx-ui/languages`, `nfx-ui/schemas`, `nfx-ui/stores`, `nfx-ui/themes`, `nfx-ui/types`, `nfx-ui/utils`.

HTTP is axios inside the library (Bearer + 401 refresh). Hosts must not wrap another `fetch` client.

## Host UI

Console CSS uses Radix scales: `--gray-*`, `--accent-*`, `--color-background`, `--color-panel-solid`. Use `color-mix` for alpha. Do not use the legacy aliases `--color-primary` / `--color-bg` / `--color-fg-*`, and do not add `#hex` fallbacks. The `--color-*` block in `nfx-ui/themes/index.css` is only the 0.17 alias layer.

Overlays are `@radix-ui/themes` `Dialog`, mounted by each host `ModalProvider` and opened from the modal store. Do not use a native `<dialog>`.

Do not use `input type="date"`. The reference is CityPulso PulsoNear `DateTimePicker`: `ModalProvider` mounts a Radix `Dialog` calendar, and the page only renders a read-only trigger. Identity implements this in `console/src/providers/ModalProvider/components/DateTimePicker` and opens it with `showDateTimePickerModal`.

## Peer dependencies

`react` / `react-dom` `^19.3.0`, `react-router` `^8.4.0`, `@radix-ui/themes` `^3.3.0`, `@tanstack/react-query` `^5.103.1`, `axios` `^1.20.0`. `vite` is not a peer; the build devDependency is `vite` `^8.3.0` (see `package.json`).

## Developing the library

```bash
cd /volume1/Projects/NebulaForgeX/NFX-UI
npm install
npm run build
npm run typecheck
```

After hook changes (e.g. phone login): **bump → push `main` (wait a few minutes for GitHub Actions to publish npm) → pin every host and `npm install`**. Do not leave Identity on 0.36.0 and News on 0.29.0.

Next: News.
