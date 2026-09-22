# 第一章：路由器配置与网络安全

部署任何 NFX 服务之前，先把公网入口收在路由器上。Docker 把端口 `publish` 到宿主机之后，NAS 上的 ufw / firewalld / ADM 防火墙 **拦不住** 已经映射出去的容器端口：Docker 自己的 iptables / nftables NAT 规则排在宿主机防火墙前面。安全边界必须在 **光猫/路由器**，不能押在 NAS 本机。

## 前置

- 稳定宽带；知道光猫/路由器管理地址（常见 `192.168.1.1` 或运营商给的管理 IP）
- 给 NAS 做 **DHCP 静态绑定**（按 MAC 锁死内网 IP），端口转发才不会漂
- 中国大陆：向运营商申请开放入站 80/443（可能要端口复用或备案）。未放行时公网探测会超时，这不是 Traefik 的锅
- 优先单层 NAT：光猫桥接 + 路由器拨号。双层 NAT 时 **两层都要** 把 80/443 转到 NAS

## 关掉 DMZ

DMZ 会把未匹配的入站流量整段甩给一台内网机，等于拆掉边界。保持关闭。只做精确的端口转发。

![ONU Firewall](/images/ONU_Firewall.png)

Docker 官方说明：发布容器端口默认不安全。所以：

- 不要把安全押在 NAS 防火墙
- 在路由器做白名单 / 只转发必要端口
- 不要开 UPnP；手工加转发规则，避免容器自己把端口捅到公网

## 只转发 80 和 443

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 是生态里 **唯一** 的 HTTP 入口，独占主机 `80/443`。第四章会部署它。

| 端口 | 用途 |
|------|------|
| 80 | HTTP → HTTPS 永久重定向；Let's Encrypt HTTP-01（`/.well-known/acme-challenge/`，由 Edge sites-base 承接） |
| 443 | 全部产品 HTTPS（Identity / Edge / News / Storages / Documentation 的 Host 或 PathPrefix） |

**不要**把下列端口映射到公网（它们只应出现在 `nfx-stack` 内网或受信 LAN）：

- Stack 数据面 **10100–10124**（MySQL / Postgres / Redis / Kafka / MinIO / OTEL / OpenSearch …）
- 产品主机 gRPC **10200–10221**（`GRPC_EXT_*`、各 console 可选映射）
- 容器内部 HTTP 8080+、gRPC 50071+
- SSH（22 或 NAS 自定义端口）

![ONU Port Forwarding](/images/ONU_PortForwarding.png)

## 验证清单

1. 局域网能打开路由器管理页
2. NAS 有固定内网 IP（和转发目标一致）
3. 从 **外网**（手机关 Wi-Fi 或外部 VPS）探测：`80` 与 `443` 到达该 IP。证书可以稍后由 Edge sites-base 签发，先确认端口通
4. 关掉路由器 UPnP
5. 确认没有第二条转发把 3306 / 5432 / 6379 / 9092 漏出去

下一章：在 NAS 上腾出 80/443，并装 Docker / Git / Bash。
