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
| `NAS_IP` | Publish bind address (the same machine Edge dials) |
| `HTTP_EXT_PORT_FRONTEND` | Host port, default `10120`, mapped to container `80` |
| `VITE_BASE` | Browser path, default `/console/nfx-documentation/` |
| `BACKEND_HOST` / `BACKEND_PORT` | Frontend image build ARGS (the reader does not call product APIs) |

## Path

The browser, Vite `base`, React `basename`, and the nginx `location` are all `/console/nfx-documentation/`. The public-host router matches the other consoles: Traefik does **not** rewrite the path and reverse-proxies over `websecure` to `http://NAS1_IP:10120`. The LAN router is different. `documentation-lan` uses middleware `documentation-lan-to-port`, so `Host(NAS1_IP)` requests to `/console/nfx-documentation` return **302** to `http://NAS1_IP:10120/console/nfx-documentation/...`. The browser then talks to the host port over HTTP and leaves Traefik TLS.

| Who sees it | Path |
|-------------|------|
| `http://<NAS1_IP>:10120/console/nfx-documentation/` | Final LAN URL (after the Traefik 302) |
| `https://docs.nebulaforgex.com/console/nfx-documentation/` | Public host (HTTPS, path forwarded unchanged; `/` returns 301 here) |
| On disk | `/usr/share/nginx/html/console/nfx-documentation/` |

One request (LAN):

1. `GET https://<NAS1_IP>/console/nfx-documentation` (or a chapter subpath) matches Edge `documentation-lan`. Middleware `documentation-lan-to-port` returns **302** to `http://<NAS1_IP>:10120/console/nfx-documentation/` (or the matching subpath).
2. The browser hits `:10120` directly. If the trailing slash is missing, nginx `location = /console/nfx-documentation` returns **301** to the slash URL. `absolute_redirect off` keeps that Location relative.
3. nginx `try_files` does not find that file and serves `/console/nfx-documentation/index.html`.
4. Script URLs are `/console/nfx-documentation/assets/...`.
5. Chapter text is `/console/nfx-documentation/books/zh/<slug>.md`, from `./books:/usr/share/nginx/html/console/nfx-documentation/books:ro`.

One request (public host):

1. `GET https://docs.nebulaforgex.com/console/nfx-documentation/...` matches `documentation-host`. There is no port-redirect middleware, and the path is forwarded unchanged to `NAS1_IP:10120`.
2. Steps 2–5 then match the LAN flow.

Do not set `DOCS_HOST`. Do not publish host ports 80/443 from this repo.

## Run (Docker)

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Documentation
./start.sh
```

`start.sh` runs `sudo docker compose -f docker-compose.yml up -d --build`. `VITE_BASE` is applied at **image build**. Changing it requires a rebuild; restarting the container is not enough.

`docker-compose.yml` has one service, `frontend` (container `NFX-Documentation-Frontend`). Host port `HTTP_EXT_PORT_FRONTEND` (default `10120`) maps to container `80`. The route is Edge `dynamic/documentation.project.yml`, entrypoint `websecure`, upstream `http://NAS1_IP:10120`.

| Router | Rule | Middleware | priority |
|--------|------|------------|----------|
| `documentation-lan` | `Host(NAS1_IP)` and `PathPrefix(/console/nfx-documentation)` | `documentation-lan-to-port` (302 → `http://NAS1_IP:10120/...`) | 25 |
| `documentation-host` | `Host(docs.nebulaforgex.com)` and the same path | none | 200 |
| `documentation-root` | `Host(docs.nebulaforgex.com)` and `Path(/)` | `documentation-root` (301 → `/console/nfx-documentation/`) | 210 |

nginx `location /console/nfx-documentation/` uses `try_files` back to `index.html`. The books volume is mounted at `books/` under that directory. `absolute_redirect off` keeps the trailing-slash 301 Location hostless. The docs site does not call product APIs, so nginx has **no** API proxy. The Dockerfile still copies `nginx.conf` to `/etc/nginx/conf.d/default.conf`. It is not an envsubst template.

## Local dev

```bash
cd servers/frontend
npm install
npm run dev
```

Local Vite base is `/console/nfx-documentation/`. The plugin maps `/console/nfx-documentation/books/*` onto repo `books/`. Edit markdown and refresh; no image rebuild. Docker serves the same files from `/console/nfx-documentation/books/` via the read-only mount.

Pin **nfx-ui 0.36.0**. The site shell is local `layouts/Sidebar` (with `Header` and `PageFrame`) plus `@radix-ui/themes`. Icons are mostly `nfx-ui/icons`, with a little `lucide-react`. Do not import `nfx-ui/layouts`; that path does not exist, and there is no `DocsLayout` component.

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
- The README must stand on its own: what the repo is, what it depends on, dev and secure ports, how traffic arrives, modules and main paths, table names, the shortest start, and the mistakes that are easy to make. The last line points at the chapter. Request-body fields and per-column constraints stay in the handbook
- No `docs/`, `Docs/`, nested READMEs, or `pkgs/kafkax/docs`

copies / Example / LSR are out of scope.

After this chapter, deploy on the NAS in chapter order 1–9.
