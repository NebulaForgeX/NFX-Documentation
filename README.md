# NFX-Documentation

**NebulaForgeX 项目部署与配置策略文档**

<div align="center">
  <img src="image.png" alt="NFX-Documentation Logo" width="200">
  
  **使用所有 NFX 仓库前必须阅读的指南文档**
  
  [English](README.en.md) | 中文
</div>

---

## ⚠️ 重要提示

**在使用任何 NebulaForgeX 仓库之前，请务必完整阅读本文档。**

本文档包含了部署和配置所有 NFX 项目时的重要注意事项、最佳实践和必须遵守的规则。遵循这些策略将帮助您：

- ✅ 正确部署和配置您的 NAS 环境
- ✅ 避免常见的配置错误和安全问题
- ✅ 确保各服务之间的正确集成
- ✅ 建立稳定、可维护的基础设施

---

## 📖 关于本仓库

NFX-Documentation 是 NebulaForgeX 生态系统的策略和指南文档仓库，旨在为所有 NFX 项目的使用和维护提供统一的规范。

本仓库记录了：

- 📋 **部署策略** - 服务部署的顺序和依赖关系
- ⚙️ **配置规范** - 环境变量和配置文件的标准化要求
- 🔒 **安全要求** - 密码、证书和访问控制的最佳实践
- 🔗 **服务集成** - 各服务之间的连接和网络配置
- 🛠️ **维护指南** - 日常运维和故障排查的注意事项

---

## 🚀 部署顺序与依赖关系

NFX 生态系统中的服务存在明确的依赖关系，建议按以下顺序部署：

### 1. 基础设施层（优先部署）

**[NFX Stack (Resources)](https://github.com/NebulaForgeX/NFX-Stack)**

- 提供所有服务的基础资源：MySQL、PostgreSQL、MongoDB、Redis、Kafka
- 必须最先部署，因为其他服务依赖这些基础服务
- 部署位置：`/volume1/Resources`
- 配置网络：`nfx-stack`（默认）

### 2. 证书管理层（可选，但推荐）

**[NFX-Vault (Certs)](https://github.com/NebulaForgeX/NFX-Vault)**

- SSL 证书管理和监控系统
- 可用于自动申请和管理 Let's Encrypt 证书
- 部署位置：`/home/kali/repo`
- 需要连接：MySQL、Redis、Kafka（来自 [NFX Stack](https://github.com/NebulaForgeX/NFX-Stack)）

### 3. 应用服务层

**[NFX-Edge (Websites)](https://github.com/NebulaForgeX/NFX-Edge)**

- 多网站反向代理系统
- 依赖证书管理服务（推荐使用 [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault)）
- 部署位置：`/home/kali/repo`
- 配置网络：`nfx-edge`（需要预先创建）

**其他业务服务**

- 所有业务服务应连接到 `nfx-stack` 网络
- 使用 [NFX Stack](https://github.com/NebulaForgeX/NFX-Stack) 提供的数据库和消息队列服务

---

## ⚙️ 配置规范

### 环境变量管理

1. **使用 `.example.env` 作为模板**
   - 不要直接修改 `.example.env`
   - 复制为 `.env` 后再进行配置
   - 确保 `.env` 文件已添加到 `.gitignore`

2. **标准化配置项**
   - 所有密码必须使用强密码
   - 端口配置避免冲突（参考各服务的默认端口）
   - IP 地址使用实际服务器 IP，不要使用 `localhost` 或 `127.0.0.1`

3. **配置同步**
   - 跨服务的配置（如数据库连接）应保持一致
   - 修改端口后，同步更新相关服务的配置文档

### Docker 网络配置

NFX 生态系统使用多个 Docker 网络：

- **`nfx-stack`** - 基础设施服务网络（[NFX Stack](https://github.com/NebulaForgeX/NFX-Stack)）
- **`nfx-edge`** - 边缘服务网络（[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge), Traefik）
- **`nfx-vault`** - 证书管理网络（[NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault)，如使用）

**网络连接原则：**

- 服务需要访问基础设施时，加入 `nfx-stack` 网络
- 服务需要被 Traefik 代理时，加入 `nfx-edge` 网络
- 使用 `external: true` 引用外部网络

### 路径规范

所有 NFX 项目建议部署在 `/volume1` 目录下：

```
/volume1/
├── Resources/          # NFX Stack
├── Certs/              # NFX-Vault
├── Websites/           # NFX-Edge
├── BackEnd/            # 后端服务
└── FrontEnd/           # 前端项目
```

> 注：各目录对应项目链接：[NFX Stack](https://github.com/NebulaForgeX/NFX-Stack) | [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) | [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge)

---

## 🔒 安全要求

### 密码安全

1. **使用强密码**
   - 数据库 root 密码：至少 16 位，包含大小写字母、数字和特殊字符
   - Redis 密码：避免使用默认密码
   - 应用密钥：使用随机生成的强密钥

2. **密码管理**
   - 不要在代码仓库中提交真实密码
   - 使用环境变量管理敏感信息
   - 定期更换生产环境密码

### 证书管理

1. **证书存储**
   - 证书文件权限设置为 `600`（仅所有者可读写）
   - 不要将证书文件提交到代码仓库
   - 使用 [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) 自动管理证书（推荐）

2. **证书更新**
   - 定期检查证书过期时间
   - 配置自动续期（如使用 Let's Encrypt）
   - 证书过期前及时更新

### 访问控制

1. **防火墙配置**
   - 仅开放必要的端口
   - 限制管理界面的访问来源
   - 数据库端口不应对公网开放

2. **服务认证**
   - 管理界面使用 BasicAuth 或更安全的认证方式
   - API 使用适当的认证和授权机制
   - 定期审查访问日志

---

## 🔗 服务集成指南

### 数据库连接

所有服务连接到 [NFX Stack](https://github.com/NebulaForgeX/NFX-Stack) 提供的数据库时：

**容器内访问（推荐）：**
- 加入 `nfx-stack` 网络
- 使用服务名作为主机名（如 `mysql:3306`）

**外部访问：**
- 使用主机 IP 和映射端口
- 仅在开发环境或必要时使用

### 消息队列集成

**Kafka 连接：**
- 容器内：`kafka:9092`
- 外部：`<your-ip>:${KAFKA_EXTERNAL_PORT}`

**Topic 命名规范：**
- 使用项目前缀（如 `nfxvault.`, `nfxid.`）
- 使用点号分隔（如 `nfxvault.cert_server`）
- Poison Topic 后缀 `.poison`

### 证书服务集成

**使用 [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) 申请证书：**
1. 确保 [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) 服务正常运行
2. 确保 [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) 和 [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 在同一 Docker 网络
3. 通过 Web 界面申请证书，指定正确的 `folder_name`
4. 证书自动存储到指定目录
5. 更新 Traefik 的 `certs.yml` 配置

---

## 🛠️ 维护指南

### 日常检查

1. **服务状态**
   ```bash
   docker compose ps
   ```

2. **日志监控**
   ```bash
   docker compose logs -f [service-name]
   ```

3. **资源使用**
   ```bash
   docker stats
   ```

4. **证书状态**
   - 使用 [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) 监控证书过期时间
   - 或使用命令行工具检查

### 备份策略

1. **数据库备份**
   - 定期备份 MySQL、PostgreSQL 数据
   - MongoDB 数据备份
   - 备份脚本应包含数据导出和恢复测试

2. **配置文件备份**
   - 备份所有 `.env` 文件（脱敏后）
   - 备份 Docker Compose 配置文件
   - 使用版本控制管理配置模板

3. **证书备份**
   - 定期备份证书文件
   - 备份证书私钥（安全存储）

### 更新与升级

1. **镜像更新**
   - 定期更新 Docker 镜像到最新稳定版本
   - 测试更新后的兼容性
   - 更新前备份数据

2. **配置更新**
   - 配置变更前备份现有配置
   - 在测试环境验证后再应用到生产环境
   - 记录所有配置变更

### 故障排查

1. **常见问题检查清单**
   - 检查容器状态和日志
   - 验证环境变量配置
   - 检查网络连接
   - 验证文件权限
   - 检查端口占用

2. **日志分析**
   - 查看应用日志查找错误信息
   - 查看 Docker 日志了解容器状态
   - 查看系统日志了解系统级问题

---

## 📚 详细部署指南

详细的部署和配置指南请参阅以下文档：

### 中文版 (Chinese)

- **[第一章节：路由器配置](books/zh/chapter-01-router-configuration.md)** - 路由器配置和防火墙设置
- **[第二章节：NAS 启动配置](books/zh/chapter-02-nas-setup.md)** - NAS 初始化和环境配置
- **[第三章节：NFX Stack 核心资源栈部署](books/zh/chapter-03-nfx-stack-deployment.md)** - NFX Stack 基础设施部署和配置
- **[第四章节：NFX-Edge 反向代理与多网站管理部署](books/zh/chapter-04-nfx-edge-deployment.md)** - NFX-Edge 反向代理系统部署和配置
- **[第五章节：NFX-Vault 证书管理系统部署](books/zh/chapter-05-nfx-vault-deployment.md)** - NFX-Vault 证书管理系统部署和配置

### English Version

- **[Chapter 1: Router Configuration](books/en/chapter-01-router-configuration.md)** - Router configuration and firewall setup
- **[Chapter 2: NAS Initial Setup](books/en/chapter-02-nas-setup.md)** - NAS initialization and environment configuration
- **[Chapter 3: NFX Stack Core Resource Stack Deployment](books/en/chapter-03-nfx-stack-deployment.md)** - NFX Stack infrastructure deployment and configuration
- **[Chapter 4: NFX-Edge Reverse Proxy and Multi-Website Management Deployment](books/en/chapter-04-nfx-edge-deployment.md)** - NFX-Edge reverse proxy system deployment and configuration
- **[Chapter 5: NFX-Vault Certificate Management System Deployment](books/en/chapter-05-nfx-vault-deployment.md)** - NFX-Vault certificate management system deployment and configuration

---

## 📚 相关仓库

使用以下仓库前，请确保已阅读本文档：

- **[NFX Stack (Resources)](https://github.com/NebulaForgeX/NFX-Stack)** - 基础设施资源栈
- **[NFX-Vault (Certs)](https://github.com/NebulaForgeX/NFX-Vault)** - SSL 证书管理系统
- **[NFX-Edge (Websites)](https://github.com/NebulaForgeX/NFX-Edge)** - 多网站反向代理系统
- **[NFX-UI](https://github.com/NebulaForgeX/NFX-UI)** - 统一前端 UI 库（React 组件、设计令牌、主题系统）
- **[NFX-News](https://github.com/NebulaForgeX/NFX-News)** - 智能热点资讯聚合平台
- **[NFX-Identity](https://github.com/NebulaForgeX/NFX-Identity)** - 统一认证与身份服务

---

## 📝 版本历史

- **v1.0.0** (2025-01-XX) - 初始版本

---

## 🤝 支持与反馈

如果您在使用 NFX 项目时遇到问题或有改进建议：

- 发送邮件：lyulucas2003@gmail.com
- 提交 Issue 到相应仓库

**维护者**：Lucas Lyu  
**联系方式**：lyulucas2003@gmail.com

---

<div align="center">
  <strong>NFX-Documentation</strong> - 确保一致、安全、可靠的部署实践
</div>

