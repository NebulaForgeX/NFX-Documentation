# NFX-Documentation

[English](README.en.md)

NebulaForgeX 部署手册。正文只在 [`books/`](books/)（`zh/`、`en/`、`manifest.json`）。各产品仓只有根 README 概览，细节都在本站。

阅读顺序：[第一章](books/zh/chapter-01-router-configuration.md) → … → [第十章](books/zh/chapter-10-nfx-documentation.md)。HTTP 入口只有 [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge)。本仓不跑 Traefik。

```bash
cp .example.env .env
./start.sh
```

本地：`cd servers/frontend && npm install && npm run dev`。改文档只改 `books/zh` 与 `books/en`，新章节写入 `manifest.json`。
