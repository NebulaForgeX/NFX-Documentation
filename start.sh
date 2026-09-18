#!/usr/bin/env bash
# NFX-Documentation 启动脚本 / Start script
# 在项目目录下执行: sudo docker compose -f docker-compose.yml up -d --build

cd "$(dirname "${BASH_SOURCE[0]}")"
if ! sudo docker network inspect nfx-edge >/dev/null 2>&1; then
  echo "[start.sh] nfx-edge network missing. Start NFX-Edge first (sole reverse proxy)."
  exit 1
fi
sudo docker compose -f docker-compose.yml up -d --build
