# Chapter 10: NFX-Documentation

This repo is the handbook reader. Canonical prose lives only in [`books/`](https://github.com/NebulaForgeX/NFX-Documentation/tree/main/books): `zh/`, `en/`, `manifest.json`. The frontend does **not** duplicate chapters as TSX. Product repos no longer keep `docs/` / `Docs/`; each has only root `README.md` + `README.en.md` pointing here.

## Dependencies

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) must exist (`nfx-edge` network). This stack does **not** run Traefik. `start.sh` exits if `nfx-edge` is missing.

Stack / Identity are not runtime dependencies of this static site.

## `.env`

```bash
cp .example.env .env
```

| Variable | Role |
|----------|------|
| `DOCS_HOST` | Edge Host rule, e.g. `docs.example.com` |
| `BACKEND_HOST` / `BACKEND_PORT` | Frontend image build ARGS (the reader does not call product APIs) |

## Run (Docker)

```bash
cd /volume1/Projects/NebulaForgeX/NFX-Documentation
./start.sh
```

`docker-compose.yml`:

- service `frontend`, container `NFX-Documentation-Frontend`
- `traefik.project=nfx-documentation`
- `Host(\`${DOCS_HOST}\`)` on both `web` and `websecure`
- loadBalancer port `80`
- volume `./books:/usr/share/nginx/html/books:ro`
- networks `nfx-documentation` + external `nfx-edge`

## Local dev

```bash
cd servers/frontend
npm install
npm run dev
```

A Vite plugin maps `/books/*` onto repo `books/`. Edit markdown and refresh; no image rebuild. Docker serves the same files via the read-only mount.

Pin **nfx-ui 0.33.0**. Chrome is local `DocsLayout` + `@radix-ui/themes` + lucide (do not import missing `nfx-ui/layouts`).

## Editing the handbook

1. Change `books/zh/<slug>.md` and `books/en/<slug>.md` together (separate files, never mixed bilingual in one file)
2. New chapter: add `slug` + `title.zh` / `title.en` in `books/manifest.json`
3. Do not add `pages/ChapterXXPage`
4. Slug must match the filename without `.md`; the reader fetches `/books/{lang}/{slug}.md`
5. Secrets stay placeholders
6. Operational steps come from `.example.env`, `RegisterRoutes`, `databases/src`, `Taskfile.yml` — do not restore deleted TrendRadar / tenants docs

## Product README contract

Every NFX product repo (Stack, Edge, Identity, UI, News, Storages, this repo):

- Root **only** `README.md` (Chinese) + `README.en.md` (English)
- Contents: one-line what/what-not, handbook link, shortest start commands, one-line ports
- No `docs/`, `Docs/`, nested READMEs, or `pkgs/kafkax/docs`

copies / Example / LSR are out of scope.

After this chapter, deploy on the NAS in chapter order 1–9.
