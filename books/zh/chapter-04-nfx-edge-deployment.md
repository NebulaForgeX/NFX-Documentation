# 第四章节：NFX-Edge 反向代理与多网站管理部署

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 是基于 Traefik v3.4 和 Docker Compose 的多网站反向代理解决方案，提供统一的多网站管理和自动 HTTPS 支持。本章节将指导您完成 NFX-Edge 的部署和配置。

## 为什么需要 NFX-Edge？

NFX-Edge 是 NFX 生态系统中的边缘服务层，负责处理所有来自公网的 HTTP/HTTPS 流量。作为整个系统的入口点，它在架构中扮演着至关重要的角色。

首先，NFX-Edge 提供了统一的流量入口。在传统的部署方式中，每个网站都需要单独配置反向代理服务器，这不仅增加了维护成本，还容易造成配置不一致的问题。而 NFX-Edge 通过 Traefik 反向代理，将所有网站流量集中到单一服务中进行管理，实现了统一的流量调度和路由。

其次，系统提供了自动 HTTPS 支持。在现代互联网环境中，HTTPS 已经成为网站的基本要求，不仅能够保护用户数据安全，还能提升搜索引擎排名。NFX-Edge 通过集成 SSL/TLS 证书，为所有网站提供统一的 HTTPS 加密访问，确保用户与服务器之间的通信安全。

在证书使用方面，NFX-Edge 使用 SSL/TLS 证书来提供 HTTPS 服务。需要特别说明的是，证书的申请和管理工作由 [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) 证书管理系统统一负责。NFX-Edge 可以集成 NFX-Vault 来获取证书，但证书管理本身并不是 NFX-Edge 的功能。这种职责分离的设计使得系统更加模块化和易于维护。

此外，NFX-Edge 实现了多网站的统一管理。无论是企业官网、管理后台还是个人博客，都可以在同一个系统中进行管理。每个网站都有独立的配置和证书，但又共享相同的反向代理基础设施，大大简化了多网站环境的运维工作。

从部署角度来看，添加新网站变得非常简单。只需在 Docker Compose 配置文件中添加几行配置，创建对应的网站目录，配置证书路径，就可以完成新网站的部署。无需重复设置反向代理、SSL 证书和路由规则，这些都由 NFX-Edge 统一处理。

最后，系统已经针对生产环境进行了优化。内置了安全响应头、Gzip 压缩、静态资源缓存等功能，确保网站能够高效、安全地运行。这些优化措施无需额外配置，开箱即用，大大降低了部署和维护的复杂度。

## 前置条件

在开始部署 NFX-Edge 之前，需要确保您的环境已经完成了必要的基础配置工作。这些准备工作对于后续的部署和运行至关重要。

首先，您需要完成路由器的配置工作（参考第一章节）。路由器是连接内网和外网的关键设备，正确的配置是 NFX-Edge 正常工作的前提。具体来说，您需要在路由器上配置端口转发规则，将公网的端口 80（HTTP）和 443（HTTPS）转发到 NAS 设备。同时，必须确保 DMZ 功能处于禁用状态，因为 DMZ 会将设备完全暴露在公网上，绕过防火墙保护，存在严重的安全风险。此外，还应该检查并正确配置防火墙规则，确保只有必要的端口对外开放。

其次，NAS 系统的基础配置也需要完成（参考第二章节）。Docker Engine 是运行 NFX-Edge 的容器运行时环境，必须确保它已经正确安装并处于运行状态。SSH 服务是远程管理 NAS 和进行命令行操作的必要工具，应该已经启用并配置好访问权限。Bash 环境的配置对于运行脚本和进行开发工作非常重要，如果您的 NAS 系统默认没有 Bash，需要按照第二章节的说明进行安装和配置。

关于 NFX Stack 的部署（参考第三章节），虽然 NFX-Edge 本身不直接依赖 NFX Stack 中的数据库和缓存服务，但按照推荐的部署顺序，建议在完成核心资源栈的部署后再进行边缘服务的部署。这样做的好处是能够确保整个 NFX 生态系统的基础设施已经就绪，为后续的服务部署和集成做好准备。

最后，域名 DNS 配置也是必不可少的准备工作。所有需要使用的域名都应该已经配置好 DNS A 记录，将这些域名指向您的 NAS 公网 IP 地址。DNS 记录的生效可能需要一些时间，您可以通过 `nslookup` 或 `dig` 命令来验证 DNS 记录是否正确生效。如果 DNS 记录还没有生效，NFX-Edge 可能无法正确路由流量，或者证书申请过程可能会失败。

## 1. 克隆项目仓库

### 步骤 1：进入部署目录

切换到您选择的部署目录（应与 NFX Stack 在同一父目录下，便于统一管理）：

```bash
# 示例：如果您的部署目录是 /volume1
cd /volume1

# 或者您选择的其他目录
```

### 步骤 2：克隆 NFX-Edge 仓库

使用 Git 克隆 [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 仓库：

```bash
git clone https://github.com/NebulaForgeX/NFX-Edge.git
```

克隆操作执行后，仓库会被下载到本地。默认情况下，Git 会创建一个名为 `NFX-Edge` 的目录来存放仓库内容。假设您的部署目录是 `<YOUR_DEPLOYMENT_DIR>`，那么完整的项目路径就是 `<YOUR_DEPLOYMENT_DIR>/NFX-Edge`。例如，如果您选择在 `/volume1` 目录下部署，那么最终的路径将是 `/volume1/NFX-Edge`。

**可选：重命名目录**

如果您希望使用不同的目录名称（例如 `Websites`），可以在克隆后重命名：

```bash
# 先克隆
git clone https://github.com/NebulaForgeX/NFX-Edge.git

# 然后重命名（可选）
mv NFX-Edge Websites
```

或者直接在克隆时指定目录名：

```bash
git clone https://github.com/NebulaForgeX/NFX-Edge.git Websites
```

### 步骤 3：进入项目目录

```bash
# 如果使用默认名称
cd NFX-Edge

# 或者如果您重命名了目录（例如为 Websites）
# cd Websites
```

## 2. 创建配置文件

### 步骤 1：复制 Docker Compose 配置模板

NFX-Edge 提供了 `docker-compose.example.yml` 作为配置模板。我们需要复制它并创建实际的 `docker-compose.yml` 文件：

```bash
cp docker-compose.example.yml docker-compose.yml
```

这里需要特别注意，`docker-compose.yml` 文件将包含您的实际部署配置，包括域名、容器名称等个性化信息。这个文件不应该提交到 Git 仓库中，因为每个部署环境的配置都是不同的。而 `.example.yml` 文件是配置模板，主要用于参考和文档说明，可以安全地提交到版本控制系统。

### 步骤 2：创建环境变量文件

创建 `.env` 文件来配置环境变量：

```bash
cat > .env << EOF
CERTS_DIR=/home/kali/Certs-repo/websites
TRAEFIK_CONFIG_FILE=/volume1/NFX-Edge/traefik.yml
TRAEFIK_DYNAMIC_DIR=/volume1/NFX-Edge/dynamic
NGINX_CONFIG_FILE=/volume1/NFX-Edge/nginx.conf
EOF
```

在创建 `.env` 文件时，需要根据您的实际部署环境进行配置。请将模板中的 `<YOUR_DEPLOYMENT_DIR>` 替换为您实际的部署目录路径，例如 `/volume1`。同时，将 `<PROJECT_DIR>` 替换为项目目录名，默认情况下是 `NFX-Edge`，如果您在克隆仓库后重命名了目录（例如改为 `Websites`），则需要使用重命名后的名称。另外，`.env` 文件包含路径等配置信息，同样不应该提交到 Git 仓库中。

环境变量文件中包含了几个关键的配置项。`CERTS_DIR` 指定了证书存储目录的路径，所有网站的 SSL/TLS 证书文件都会存储在这个目录下。`TRAEFIK_CONFIG_FILE` 指向 Traefik 的静态配置文件，这个文件包含了 Traefik 的基本配置信息。`TRAEFIK_DYNAMIC_DIR` 是 Traefik 动态配置目录的路径，在这个目录中的配置文件会被 Traefik 自动监控和重新加载。最后，`NGINX_CONFIG_FILE` 指定了 Nginx 配置文件的路径，这个配置文件会被所有网站服务容器共享使用。

**示例：** 如果您的部署目录是 `/volume1`，项目目录名为 `NFX-Edge`：

```bash
CERTS_DIR=/home/kali/Certs-repo/websites
TRAEFIK_CONFIG_FILE=/volume1/NFX-Edge/traefik.yml
TRAEFIK_DYNAMIC_DIR=/volume1/NFX-Edge/dynamic
NGINX_CONFIG_FILE=/volume1/NFX-Edge/nginx.conf
```

**如果重命名了目录：** 如果您将项目目录重命名为 `Websites`，则相应地将路径中的 `NFX-Edge` 替换为 `Websites`。

### 步骤 3：创建证书目录

创建证书存储目录：

```bash
# 创建证书目录（将 <YOUR_DEPLOYMENT_DIR> 替换为实际路径）
mkdir -p /home/kali/Certs-repo/websites

# 设置适当的权限（可选，但推荐）
# chmod 755 /home/kali/Certs-repo/websites
```

证书目录是存储所有网站 SSL/TLS 证书文件的位置。为了便于管理和组织，每个网站都会使用独立的子文件夹来存储自己的证书文件。证书文件的命名遵循统一的标准格式：证书文件命名为 `cert.crt`，私钥文件命名为 `key.key`。这种命名规范确保了 NFX-Edge 能够正确识别和加载证书文件。

## 3. 配置 Docker Compose

编辑 `docker-compose.yml` 文件，根据您的实际需求进行配置。

### 步骤 1：配置 Traefik Dashboard

在 `docker-compose.yml` 中找到 `reverse-proxy` 服务的 `labels` 部分，修改 Traefik Dashboard 的域名：

```yaml
labels:
  - traefik.enable=true
  # 修改为您的实际域名（例如 traefik.yourdomain.com）
  - traefik.http.routers.web-dashboard.rule=Host(`traefik.yourdomain.com`) && (PathPrefix(`/dashboard`) || PathPrefix(`/api`))
  - traefik.http.routers.web-dashboard.entrypoints=websecure
  - traefik.http.routers.web-dashboard.tls=true
  - traefik.http.routers.web-dashboard.service=api@internal
  # 修改 BasicAuth 密码哈希（使用 htpasswd 生成）
  - traefik.http.middlewares.dashboard-auth.basicauth.users=admin:$$2y$$05$$...
  - traefik.http.routers.web-dashboard.middlewares=dashboard-auth
```

**生成 BasicAuth 密码哈希：**

```bash
# 使用 htpasswd 生成密码哈希（如果系统已安装）
htpasswd -nb admin your_password

# 或使用 Docker 容器生成
docker run --rm httpd:alpine htpasswd -nb admin your_password

# 将输出的哈希值替换到 docker-compose.yml 中
```

### 步骤 2：配置网站服务

根据您的需求，在 `docker-compose.yml` 中添加或修改网站服务。每个网站服务的基本配置如下：

```yaml
www_example:
  image: nginx:alpine
  container_name: NFX-Edge-WWW-EXAMPLE
  restart: always
  volumes:
    - ./www.example.com:/usr/share/nginx/html:ro
    - ${NGINX_CONFIG_FILE}:/etc/nginx/conf.d/default.conf:ro
  labels:
    - traefik.enable=true
    # 修改为您的实际域名
    - traefik.http.routers.example.rule=Host(`example.com`) || Host(`www.example.com`)
    - traefik.http.routers.example.entrypoints=websecure
    - traefik.http.routers.example.tls=true
  networks:
    - nfx-edge
  depends_on:
    - reverse-proxy
```

在这个配置中，有几个关键的配置项需要理解。`container_name` 指定了容器的名称，建议使用有意义的命名规则，例如 `NFX-Edge-WWW-EXAMPLE`，这样可以清楚地标识每个容器的用途。`volumes` 配置项用于挂载数据卷，这里挂载了网站静态文件目录和 Nginx 配置文件，并且使用了只读模式（`:ro`），这意味着容器只能读取这些文件，无法修改，提高了安全性。`labels` 部分是 Traefik 的路由规则配置，在这里指定了域名匹配规则和 TLS 配置，Traefik 会根据这些标签来创建路由规则。`networks` 配置确保所有容器都连接到 `nfx-edge` 网络，这样容器之间就可以相互通信。最后，`depends_on` 配置确保 `reverse-proxy` 服务会先启动，这对于依赖关系很重要，因为网站服务需要等待反向代理服务就绪后才能正常工作。

### 步骤 3：创建网站目录

为每个网站创建对应的目录并添加静态文件：

```bash
# 创建网站目录（将 example.com 替换为您的实际域名）
mkdir -p www.example.com

# 将网站静态文件复制到目录中
# 例如，如果您有构建好的前端项目：
# cp -r /path/to/your/build/* www.example.com/

# 或者直接在该目录中创建 index.html 进行测试
cat > www.example.com/index.html << EOF
<!DOCTYPE html>
<html>
<head>
    <title>Example Site</title>
</head>
<body>
    <h1>Welcome to Example Site</h1>
</body>
</html>
EOF
```

## 4. 配置 SSL/TLS 证书

NFX-Edge 本身不管理证书，但支持两种证书使用方式：

### 方式一：使用 NFX-Vault（推荐）⭐

[NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) 是一个基于 Web 的 SSL 证书管理和监控系统，负责统一申请、检查、导出和管理所有 SSL/TLS 证书。NFX-Edge 通过集成 NFX-Vault 来获取和使用证书。

#### 安装 NFX-Vault

1. **克隆 NFX-Vault 项目**

```bash
# 进入部署目录
cd <YOUR_DEPLOYMENT_DIR>

# 克隆 NFX-Vault 仓库
git clone https://github.com/NebulaForgeX/NFX-Vault.git
cd NFX-Vault

# 根据 NFX-Vault 的 README 配置并启动服务
docker compose up -d
```

2. **配置网络连接**

为了确保 NFX-Vault 和 NFX-Edge 能够正常通信，需要在 NFX-Vault 的 `docker-compose.yml` 中添加网络配置：

```yaml
services:
  backend-api:
    networks:
      - nfx-edge  # 添加 nfx-edge 网络
      # ... 其他网络配置

networks:
  nfx-edge:
    external: true  # 使用外部网络
  # ... 其他网络配置
```

然后重启 NFX-Vault 服务：

```bash
cd NFX-Vault
docker compose down
docker compose up -d
```

3. **通过 Web 界面申请证书**

完成网络配置后，您可以通过 NFX-Vault 的 Web 界面来申请证书。首先访问 NFX-Vault 的 Web 界面，然后填写必要的申请信息，包括域名、邮箱地址和 folder_name 等。folder_name 是一个重要的参数，它决定了证书文件在存储目录中的子文件夹名称，建议使用有意义的命名，例如 `www_example` 或 `admin_example`。提交申请后，系统会自动处理证书申请流程，这个过程可能需要几分钟时间。一旦证书申请成功并生成，证书文件会自动存储在 `${CERTS_DIR}/{folder_name}/` 目录下，文件命名格式为 `cert.crt`（证书文件）和 `key.key`（私钥文件）。

4. **更新 certs.yml**

在 `dynamic/certs.yml` 中添加新证书路径：

```yaml
tls:
  certificates:
    - certFile: /certs/websites/{folder_name}/cert.crt
      keyFile: /certs/websites/{folder_name}/key.key
      stores:
        - default
```

然后重启 Traefik 服务以加载新证书：

```bash
sudo docker compose restart reverse-proxy
```

**验证连接：**

```bash
# 检查 NFX-Vault API 是否可达
docker exec NFX-Edge-Reverse-Proxy wget -O- http://NFX-Vault-Backend-API:8000/health
```

### 方式二：手动提供证书文件

如果您已有证书文件或希望通过其他方式管理证书（证书管理由外部系统负责，NFX-Edge 只负责使用证书文件）：

1. **创建证书目录**

```bash
# 为每个网站创建证书目录（将 folder_name 替换为实际文件夹名）
mkdir -p ${CERTS_DIR}/{folder_name}

# 例如：
mkdir -p /home/kali/Certs-repo/websites/www_example
```

2. **复制证书文件**

```bash
# 将证书文件复制到对应目录
cp cert.pem ${CERTS_DIR}/{folder_name}/cert.crt
cp key.pem ${CERTS_DIR}/{folder_name}/key.key

# 设置适当的权限（推荐）
chmod 600 ${CERTS_DIR}/{folder_name}/cert.crt
chmod 600 ${CERTS_DIR}/{folder_name}/key.key
```

3. **更新 dynamic/certs.yml**

在 `dynamic/certs.yml` 中添加证书路径：

```yaml
tls:
  certificates:
    - certFile: /certs/websites/{folder_name}/cert.crt
      keyFile: /certs/websites/{folder_name}/key.key
      stores:
        - default
```

4. **重启 Traefik 服务**

```bash
sudo docker compose restart reverse-proxy
```

## 5. 验证配置

在启动服务之前，进行一次全面的配置检查是非常必要的。这个步骤可以帮助您及时发现和解决配置问题，避免在启动后遇到各种错误。

首先，需要检查配置文件的格式是否正确。`docker-compose.yml` 和 `.env` 文件都必须符合 YAML 和键值对的语法规范，任何语法错误都可能导致服务启动失败。建议使用文本编辑器的语法检查功能，或者使用在线 YAML 验证工具来检查配置文件。

其次，验证所有路径的正确性。环境变量中配置的所有路径都应该指向实际存在的目录，或者确保 Docker 有权限创建这些目录。路径应该使用绝对路径，避免使用相对路径，这样可以确保在不同工作目录下执行命令时路径仍然正确。

域名配置也是需要重点检查的项目。确保所有在 `docker-compose.yml` 中配置的域名都已经正确设置了 DNS A 记录，并且这些记录指向您的 NAS 公网 IP 地址。如果域名解析不正确，用户将无法访问您的网站，证书申请过程也可能失败。

证书配置方面，如果您已经准备了证书文件，需要确认这些文件已经放置在正确的目录中，并且已经在 `dynamic/certs.yml` 文件中正确配置了证书路径。证书文件的权限也很重要，建议将证书文件的权限设置为 600，只有文件所有者才能读写。

最后，进行端口占用检查。端口 80 和 443 是 HTTP 和 HTTPS 的标准端口，必须确保这些端口没有被其他服务占用。如果端口被占用，NFX-Edge 的服务将无法正常启动。

**检查端口占用：**

```bash
# 检查端口是否被占用
netstat -tuln | grep -E ':(80|443)'
# 或
ss -tuln | grep -E ':(80|443)'
```

如果端口被占用，需要先停止占用端口的服务（例如 Web Center，参考第二章节）。

## 6. 启动服务

完成所有配置后，可以启动 NFX-Edge 服务：

```bash
# 确保在项目目录中
cd <YOUR_DEPLOYMENT_DIR>/NFX-Edge  # 或您重命名后的目录名

# 启动所有服务
sudo docker compose up -d
```

在执行启动命令时，`-d` 参数表示在后台运行模式（detached mode），这意味着服务会在后台运行，不会占用当前的终端窗口。服务启动后，Docker Compose 会自动创建所需的 Docker 网络（如果网络还不存在的话），然后按照依赖关系依次启动各个容器。整个启动过程可能需要一些时间，特别是第一次启动时需要下载 Docker 镜像。

## 7. 验证部署

### 步骤 1：检查服务状态

```bash
# 查看所有服务状态
sudo docker compose ps

# 应该看到所有服务状态为 "Up"
```

**预期输出示例：**
```
NAME                          STATUS          PORTS
NFX-Edge-Reverse-Proxy        Up              0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
NFX-Edge-WWW-EXAMPLE          Up              80/tcp
```

### 步骤 2：查看服务日志

```bash
# 查看所有服务日志
sudo docker compose logs -f

# 或查看特定服务的日志
sudo docker compose logs -f reverse-proxy
sudo docker compose logs -f www_example
```

在查看日志时，需要关注几个关键点。首先，Traefik 反向代理服务应该正常启动，日志中不应该出现错误信息。如果看到错误信息，需要根据错误内容进行排查。其次，证书的加载情况也是重点检查项目，查看日志中是否有证书相关的错误信息，例如证书文件找不到、证书格式错误等。最后，需要确认路由规则是否正确配置，Traefik 应该能够识别到所有配置的服务和路由规则。

### 步骤 3：访问网站验证

访问各个网站验证服务是否正常：

- **主站**：`https://www.example.com`（将 `example.com` 替换为您的实际域名）
- **管理后台**：`https://admin.example.com`（如果配置了管理后台）
- **Traefik Dashboard**：`https://traefik.yourdomain.com/dashboard/`

在进行访问验证时，需要检查几个关键方面。首先，HTTPS 连接应该正常工作，浏览器地址栏应该显示安全锁图标，表示连接是加密的。其次，网站内容应该能够正常显示，这表明 Nginx 容器和文件挂载都工作正常。第三，HTTP 请求应该能够自动重定向到 HTTPS，这可以通过访问 HTTP 版本的网站来验证，浏览器应该自动跳转到 HTTPS 版本。最后，Traefik Dashboard 应该可以正常访问，访问时会提示输入用户名和密码进行 BasicAuth 认证，这是为了保护管理界面不被未授权访问。

### 步骤 4：测试 HTTP 到 HTTPS 重定向

访问 HTTP 版本的网站，应该自动重定向到 HTTPS：

```bash
# 使用 curl 测试重定向
curl -I http://www.example.com

# 应该看到 301 或 308 重定向响应
```

## 8. 添加新网站

当您需要添加新网站时，可以按照以下步骤操作：

### 步骤 1：在 docker-compose.yml 中添加服务

复制现有的网站服务配置，修改相关参数：

```yaml
www_newdomain:
  image: nginx:alpine
  container_name: NFX-Edge-WWW-NEWDOMAIN
  restart: always
  volumes:
    - ./www.newdomain.com:/usr/share/nginx/html:ro
    - ${NGINX_CONFIG_FILE}:/etc/nginx/conf.d/default.conf:ro
  labels:
    - traefik.enable=true
    - traefik.http.routers.newdomain.rule=Host(`newdomain.com`) || Host(`www.newdomain.com`)
    - traefik.http.routers.newdomain.entrypoints=websecure
    - traefik.http.routers.newdomain.tls=true
  networks:
    - nfx-edge
  depends_on:
    - reverse-proxy
```

### 步骤 2：创建网站目录并添加文件

```bash
mkdir -p www.newdomain.com
# 将网站静态文件放入目录
```

### 步骤 3：准备证书

证书的准备工作取决于您使用的证书管理方式。如果您使用 NFX-Vault 来管理证书，可以通过 Web 界面申请新证书，申请时将 folder_name 设置为 `www_newdomain`。如果您使用手动方式管理证书，需要将证书文件复制到 `${CERTS_DIR}/www_newdomain/` 目录下，确保文件名分别为 `cert.crt` 和 `key.key`。

### 步骤 4：更新 dynamic/certs.yml

```yaml
tls:
  certificates:
    - certFile: /certs/websites/www_newdomain/cert.crt
      keyFile: /certs/websites/www_newdomain/key.key
      stores:
        - default
```

### 步骤 5：启动新服务

```bash
# 启动新服务
sudo docker compose up -d www_newdomain

# 重启 Traefik 以加载新证书
sudo docker compose restart reverse-proxy
```

## 9. 常用操作

### 重启服务

```bash
# 使用重启脚本（推荐，如果存在）
./restart.sh

# 或使用 Docker Compose 命令
sudo docker compose restart

# 重启特定服务
sudo docker compose restart reverse-proxy
sudo docker compose restart www_example
```

### 停止服务

```bash
# 停止所有服务（保留数据）
sudo docker compose down

# 停止并删除数据卷
sudo docker compose down -v
```

### 更新服务

```bash
# 拉取最新镜像
sudo docker compose pull

# 重新创建并启动容器
sudo docker compose up -d
```

### 更新网站内容

网站内容通过 volumes 挂载，修改后立即生效，无需重启容器：

```bash
# 直接修改对应目录的文件
vim www.example.com/index.html

# 文件修改后，Nginx 会自动服务新内容
```

### 查看服务状态

```bash
# 查看所有服务状态
sudo docker compose ps

# 查看资源使用情况
docker stats
```

## 10. 查看详细文档

在深入使用 NFX-Edge 之前，强烈建议您详细阅读 [NFX-Edge 官方文档](https://github.com/NebulaForgeX/NFX-Edge)。官方文档包含了比本章节更加详细和全面的内容，包括所有配置选项的详细说明、高级功能的使用方法、故障排查指南、最佳实践建议，以及证书管理的详细说明。

官方文档是学习和使用 NFX-Edge 的重要参考资料，它不仅提供了完整的使用指南，还包含了 API 文档和实际部署中的最佳实践。通过阅读官方文档，您可以更深入地理解系统的工作原理，掌握更多高级功能，并且在遇到问题时能够更快地找到解决方案。无论是日常运维还是系统优化，官方文档都是不可或缺的参考资源。

## 下一步

完成 NFX-Edge 的部署后，您可以开始进行后续的工作。首先，建议对所有网站进行全面验证，确保每个网站都能正常访问，HTTPS 连接工作正常，HTTP 到 HTTPS 的重定向功能正常。如果发现问题，及时进行排查和修复。

接下来，您可以继续配置更多的网站服务。NFX-Edge 的优势之一就是可以轻松地添加新网站，只需按照本章节中"添加新网站"部分的说明，在配置文件中添加新的服务定义，创建对应的网站目录，配置证书路径即可。

如果还没有集成 NFX-Vault 进行证书管理，建议尽快完成集成工作。NFX-Vault 提供了统一的证书管理界面，可以大大简化证书的申请、更新和监控工作。通过 Web 界面，您可以方便地查看所有证书的状态、过期时间，并及时申请新证书或更新即将过期的证书。

最后，您可以开始部署其他的 NFX 服务，例如应用程序服务。NFX-Edge 作为边缘服务层，可以为这些后端服务提供统一的反向代理和 HTTPS 支持，使得整个 NFX 生态系统能够协同工作。

---

**NFX-Edge 是 NFX 生态系统的边缘服务层，正确部署和配置它是所有网站服务正常访问的基础。**

