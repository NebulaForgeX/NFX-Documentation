# Chapter 10: NFX-Documentation

This repo is the handbook reader. Canonical prose lives only in [`books/`](https://github.com/NebulaForgeX/NFX-Documentation/tree/main/books): `zh/`, `en/`, `manifest.json`. The frontend does **not** duplicate chapters as TSX. Product repos no longer keep `docs/` / `Docs/`; each has only root `README.md` + `README.en.md` pointing here.

## Dependencies

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) Traefik must be on 80/443. This stack does **not** run Traefik. `start.sh` publishes the frontend on `NAS_IP:10120`.

Stack / Identity are not runtime dependencies of this static site.

## `.env`

```bash
cp .example.env .env
```

| Variable | Role |
|----------|------|
| `TRAEFIK_CONSOLE_HOST` | Same console hostname as Identity / Edge |
| `VITE_BASE` | Browser path, default `/documentation/` |
| `BACKEND_HOST` / `BACKEND_PORT` | Frontend image build ARGS (the reader does not call product APIs) |

## Paths (browser ≠ container)

| Who sees it | Path | Meaning |
|-------------|------|---------|
| Browser, Vite `base`, React `basename` | `/documentation/` | The URL people open. `VITE_BASE` is baked into the image |
| After Traefik rewrite, nginx `location` | `/nfx-documentation/` | Container only. Do not open this in a browser |
| After nginx `rewrite`, on disk | `/usr/share/nginx/html` | `index.html`, `assets/`; `books/` is the read-only volume |

One request:

1. `GET http://<lan-ip>/documentation` matches the exact path. `nfx-documentation-slash` returns 301 to `/documentation/`.
2. `GET http://<lan-ip>/documentation/zh/chapter-01-router-configuration` matches `PathPrefix(/documentation/)`. `nfx-documentation-gw` rewrites the path to `/nfx-documentation/zh/chapter-01-router-configuration`.
3. nginx `location ^~ /nfx-documentation/` rewrites that to `/zh/chapter-01-router-configuration`. That file does not exist, so `try_files` serves `/index.html`.
4. Script URLs in the page are `/documentation/assets/...` (Vite base). Traefik rewrites those to `/nfx-documentation/assets/...`, and nginx serves `html/assets/...`.
5. Chapter text is `/documentation/books/zh/<slug>.md`. After rewrite, nginx reads the volume `./books:/usr/share/nginx/html/books:ro`.

The hostname form is the same, with the host set to `TRAEFIK_CONSOLE_HOST` (the same console name as Identity / Edge; the example is `identity.nebulaforgex.com`). HTTPS uses `websecure` and `tls: "true"`.

Do not set `DOCS_HOST`. Do not publish host ports 80/443 from this repo.

## Run (Docker)

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Documentation
./start.sh
```

`start.sh` runs `docker compose up -d --build`. `VITE_BASE` is applied at **image build**. Changing it requires a rebuild; restarting the container is not enough.

`docker-compose.yml` has one service, `frontend` (container `NFX-Documentation-Frontend`). Host port `10120` maps to container `80`. The route is Edge `dynamic/documentation.project.yml`.

Four routers. Every one uses middlewares `nfx-documentation-slash,nfx-documentation-gw` and service `docs-frontend` (upstream port 80):

| Router | Entrypoint | Rule | priority |
|--------|------------|------|----------|
| `docs-frontend` | `web` | LAN IP and (`Path(/documentation)` or `PathPrefix(/documentation/)`) | 30 |
| `docs-frontend-tls` | `websecure` | same, plus `tls: "true"` | 30 |
| `docs-frontend-host` | `web` | `Host(TRAEFIK_CONSOLE_HOST)` and the same path | 200 |
| `docs-frontend-host-tls` | `websecure` | same, plus `tls: "true"` | 200 |

Middlewares (compose `$$` becomes Traefik `$`):

```yaml
traefik.http.middlewares.nfx-documentation-slash.redirectregex.regex: ^(https?)://([^/]+)/documentation$$
traefik.http.middlewares.nfx-documentation-slash.redirectregex.replacement: $${1}://$${2}/documentation/
traefik.http.middlewares.nfx-documentation-gw.replacepathregex.regex: ^/documentation(/.*)$$
traefik.http.middlewares.nfx-documentation-gw.replacepathregex.replacement: /nfx-documentation$$1
```

nginx (`servers/frontend/nginx.conf`) does not listen for `/documentation`. It only handles `/nfx-documentation/`, strips that prefix, then `try_files`. The books volume is mounted at `books/` under the site root, so a browser request for `/documentation/books/...` ends at that volume.

## Local dev

```bash
cd servers/frontend
npm install
npm run dev
```

Local Vite base is `/documentation/`. The plugin maps `/documentation/books/*` onto repo `books/`. Edit markdown and refresh; no image rebuild. Docker serves the same files from `/nfx-documentation/books/` via the read-only mount.

Pin **nfx-ui 0.33.0**. Chrome is local `DocsLayout` + `@radix-ui/themes` + lucide (do not import missing `nfx-ui/layouts`).

## Editing the handbook

1. Change `books/zh/<slug>.md` and `books/en/<slug>.md` together (separate files, never mixed bilingual in one file)
2. New chapter: add `slug` + `title.zh` / `title.en` in `books/manifest.json`
3. Do not add `pages/ChapterXXPage`
4. Slug must match the filename without `.md`; the reader fetches `{VITE_BASE}books/{lang}/{slug}.md` (default `/documentation/books/...`)
5. Secrets stay placeholders
6. Operational steps come from `.example.env`, `RegisterRoutes`, `databases/src`, `Taskfile.yml` — do not restore deleted TrendRadar / tenants docs

## Product README contract

Every NFX product repo (Stack, Edge, Identity, UI, News, Storages, this repo):

- Root **only** `README.md` (Chinese) + `README.en.md` (English)
- Contents: one-line what/what-not, handbook link, shortest start commands, one-line ports
- No `docs/`, `Docs/`, nested READMEs, or `pkgs/kafkax/docs`

copies / Example / LSR are out of scope.

After this chapter, deploy on the NAS in chapter order 1–9.
