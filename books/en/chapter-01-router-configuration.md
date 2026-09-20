# Chapter 1: Router configuration and network security

Before any NFX service goes live, lock the public ingress on the router. After Docker **publishes** a port onto the host, the NAS ufw / firewalld / ADM firewall **cannot** block it: Docker’s own iptables / nftables NAT rules sit in front of the host firewall. The security boundary is the **ONT / router**, not the NAS box.

## Prerequisites

- Stable broadband; know the router admin URL (often `192.168.1.1`)
- **DHCP reservation** for the NAS (MAC → fixed LAN IP) so port forwards do not drift
- In mainland China: ask the ISP to open inbound 80/443 (port multiplexing or ICP filing may be required). Timeouts from the public internet are often ISP policy, not Traefik
- Prefer a single NAT layer: ONT in bridge mode, router does PPPoE. With double NAT, **both** layers must forward 80/443 to the NAS

## Disable DMZ

DMZ dumps unmatched inbound traffic onto one LAN host. Leave it off. Use exact port forwards only.

![ONU Firewall](/images/ONU_Firewall.png)

Docker documents published ports as insecure by default. Therefore:

- Do not trust the NAS firewall as the edge
- Whitelist on the router; forward only what you need
- Turn **UPnP** off so a container cannot punch extra ports by itself

## Forward only 80 and 443

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) is the **sole** HTTP ingress in the fleet and owns host `80/443`. Chapter 4 deploys it.

| Port | Use |
|------|-----|
| 80 | HTTP → HTTPS permanent redirect; Let’s Encrypt HTTP-01 (`/.well-known/acme-challenge/`, served by Vault tls-api) |
| 443 | All product HTTPS (Identity / Vault / News / Storages / Documentation Host or PathPrefix rules) |

**Do not** publish these to the internet (LAN / `nfx-stack` only):

- Stack data plane **10100–10124** (MySQL / Postgres / Redis / Kafka / MinIO / OTEL / OpenSearch …)
- Product host gRPC **10200–10224** (`GRPC_EXT_*`, optional console maps)
- Container-internal HTTP 8080+ and gRPC 50071+
- SSH (22 or the NAS custom port)

![ONU Port Forwarding](/images/ONU_PortForwarding.png)

## Checklist

1. Router admin page opens on the LAN
2. NAS LAN IP is static and matches the forward target
3. From **outside** the LAN (phone off Wi-Fi, or a VPS), ports `80` and `443` reach that IP. Certificates can wait for Vault; first prove the ports
4. UPnP is off
5. No leftover forwards for 3306 / 5432 / 6379 / 9092

Next: free 80/443 on the NAS and install Docker / Git / Bash.
