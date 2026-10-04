# NFX-Documentation

[中文](README.md)

<div align="center">
  <img src="image.png" alt="NFX-Documentation" width="200">
</div>

The NebulaForgeX handbook reader. Canonical text lives only in [`books/`](books/) at the repo root: `zh/`, `en/`, `manifest.json`. The frontend does not copy chapters into TSX. Product repos do not keep `docs/` or `Docs/`. Each repo's root `README.md` and `README.en.md` carry enough to understand that repo on their own, and the last line links back to the matching chapter here.

Stack and Identity are **not** runtime dependencies. [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) Traefik must already own 80/443. This repo does not run Traefik and does not publish host 80/443. Do not set `DOCS_HOST`.

## Two entrances

The browser, Vite `base`, React `basename`, and nginx `location` are all `/console/nfx-documentation/`.

| Who opens it | What happens |
|--------------|----------------|
| `https://<NAS_IP>/console/nfx-documentation/...` | Edge `documentation-lan` returns 302 to `http://<NAS_IP>:10120/console/nfx-documentation/...`. The browser then talks to that port directly |
| `https://docs.nebulaforgex.com/` | `documentation-root` (priority 210) returns 301 to `/console/nfx-documentation/` |
| `https://docs.nebulaforgex.com/console/nfx-documentation/...` | `documentation-host` (priority 200) does not redirect. HTTPS is reverse-proxied unchanged to `NAS_IP:10120` |
| On disk | `/usr/share/nginx/html/console/nfx-documentation/` |

The host port is `HTTP_EXT_PORT_FRONTEND`, default **10120**, mapped to container 80. A missing trailing slash is a nginx 301. `absolute_redirect off` keeps that Location relative. `try_files` serves `index.html` when the file is missing. Chapter text is `/console/nfx-documentation/books/<lang>/<slug>.md`. Compose mounts `./books` read-only at that directory, so a markdown edit does not need an image rebuild. nginx has **no** API proxy. The Dockerfile copies `nginx.conf` to `/etc/nginx/conf.d/default.conf`. It is not an envsubst template.

`.env`: `NAS_IP`, `HTTP_EXT_PORT_FRONTEND=10120`, `VITE_BASE=/console/nfx-documentation/`. `BACKEND_HOST` / `BACKEND_PORT` are image build args only. The reader does not call product APIs. `VITE_BASE` is baked in at **build** time, so changing it requires a rebuild. Pin **nfx-ui 0.36.0**. The site shell is local `layouts/Sidebar` (with `Header` and `PageFrame`) plus `@radix-ui/themes`. Icons are mostly `nfx-ui/icons`. There is no `DocsLayout`, and `nfx-ui/layouts` does not exist.

```bash
cp .example.env .env
./start.sh
```

`start.sh` runs `sudo docker compose -f docker-compose.yml up -d --build`. The container is `NFX-Documentation-Frontend`. Local dev:

```bash
cd console
npm install
npm run dev
```

Local Vite maps `/console/nfx-documentation/books/*` onto repo `books/`.

## Editing the handbook

Chinese and English are separate files. Do not mix both languages in one markdown file. A new chapter adds `slug` plus `title.zh` / `title.en` in `books/manifest.json`, and the filename without `.md` must match the slug. Do not add `pages/ChapterXXPage`. Secrets stay placeholders. A product README should be enough to deploy that repo. JSON fields and per-column constraints stay in the chapter.

Start at [chapter 1](books/en/chapter-01-router-configuration.md).

Full detail: [chapter 10](books/en/chapter-10-nfx-documentation.md).
