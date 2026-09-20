# NFX-Documentation

[中文](README.md)

NebulaForgeX deploy handbook. Canonical text is [`books/`](books/) (`zh/`, `en/`, `manifest.json`). Product repos keep only a root README overview; details live here.

Read [chapter 1](books/en/chapter-01-router-configuration.md) through [chapter 10](books/en/chapter-10-nfx-documentation.md). HTTP ingress is [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) only. This stack does not run Traefik.

```bash
cp .example.env .env
./start.sh
```

Local: `cd servers/frontend && npm install && npm run dev`. Edit `books/zh` and `books/en`; add chapters in `manifest.json`.
