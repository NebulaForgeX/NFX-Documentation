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
| `VITE_BASE` | Browser path, default `/console/nfx-documentation/` |
| `BACKEND_HOST` / `BACKEND_PORT` | Frontend image build ARGS (the reader does not call product APIs) |

## Path

The browser, Vite `base`, React `basename`, and the nginx `location` are all `/console/nfx-documentation/`. Traefik does not rewrite the path. This matches the Identity, Edge, News, and Storages consoles.

| Who sees it | Path |
|-------------|------|
| `https://<NAS1_IP>/console/nfx-documentation/` | LAN |
| `https://identity.nebulaforgex.com/console/nfx-documentation/` | Public host |
| On disk | `/usr/share/nginx/html/console/nfx-documentation/` |

One request:

1. `GET https://<NAS1_IP>/console/nfx-documentation` is redirected by nginx to the trailing-slash URL.
2. `GET https://<NAS1_IP>/console/nfx-documentation/zh/chapter-01-router-configuration` matches `PathPrefix(/console/nfx-documentation)` and is forwarded unchanged to `NAS1_IP:10120`.
3. nginx `try_files` does not find that file and serves `/console/nfx-documentation/index.html`.
4. Script URLs are `/console/nfx-documentation/assets/...`.
5. Chapter text is `/console/nfx-documentation/books/zh/<slug>.md`, from `./books:/usr/share/nginx/html/console/nfx-documentation/books:ro`.

Do not set `DOCS_HOST`. Do not publish host ports 80/443 from this repo.

## Run (Docker)

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Documentation
./start.sh
```

`start.sh` runs `docker compose up -d --build`. `VITE_BASE` is applied at **image build**. Changing it requires a rebuild; restarting the container is not enough.

`docker-compose.yml` has one service, `frontend` (container `NFX-Documentation-Frontend`). Host port `10120` maps to container `80`. The route is Edge `dynamic/documentation.project.yml`, entrypoint `websecure`, upstream `http://NAS1_IP:10120`.

| Router | Rule | priority |
|--------|------|----------|
| `documentation-lan` | `Host(NAS1_IP)` and `PathPrefix(/console/nfx-documentation)` | 25 |
| `documentation-host` | `Host(identity.nebulaforgex.com)` and the same path | 200 |

nginx `location /console/nfx-documentation/` uses `try_files` back to `index.html`. The books volume is mounted at `books/` under that directory.

## Local dev

```bash
cd servers/frontend
npm install
npm run dev
```

Local Vite base is `/console/nfx-documentation/`. The plugin maps `/console/nfx-documentation/books/*` onto repo `books/`. Edit markdown and refresh; no image rebuild. Docker serves the same files from `/console/nfx-documentation/books/` via the read-only mount.

Pin **nfx-ui 0.36.0**. Chrome is local `DocsLayout` + `@radix-ui/themes` + lucide (do not import missing `nfx-ui/layouts`).

## Editing the handbook

1. Change `books/zh/<slug>.md` and `books/en/<slug>.md` together (separate files, never mixed bilingual in one file)
2. New chapter: add `slug` + `title.zh` / `title.en` in `books/manifest.json`
3. Do not add `pages/ChapterXXPage`
4. Slug must match the filename without `.md`; the reader fetches `{VITE_BASE}books/{lang}/{slug}.md` (default `/console/nfx-documentation/books/...`)
5. Secrets stay placeholders
6. Operational steps come from `.example.env`, `RegisterRoutes`, `databases/src`, `Taskfile.yml` — do not restore deleted TrendRadar / tenants docs

## Product README contract

Every NFX product repo (Stack, Edge, Identity, UI, News, Storages, this repo):

- Root **only** `README.md` (Chinese) + `README.en.md` (English)
- Contents: one-line what/what-not, handbook link, shortest start commands, one-line ports
- No `docs/`, `Docs/`, nested READMEs, or `pkgs/kafkax/docs`

copies / Example / LSR are out of scope.

After this chapter, deploy on the NAS in chapter order 1–9.
