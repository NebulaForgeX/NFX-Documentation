# 第三章节：NFX Stack 核心资源栈部署

[NFX Stack (Resources)](https://github.com/NebulaForgeX/NFX-Stack) 是 NFX 生态系统的核心基础设施层，提供了所有服务所需的基础资源，包括数据库、缓存和消息队列服务。本章节将指导您完成 NFX Stack 的部署和配置。

## 为什么 NFX Stack 是核心服务？

NFX Stack 是整个 NFX 生态系统的基石，原因如下：

- **统一的数据存储** - 为所有服务提供统一的数据库和存储解决方案
- **标准化的配置** - 统一管理所有数据库的连接配置、端口和认证信息
- **集中化的资源管理** - 在一个地方管理所有基础设施服务
- **简化服务集成** - 其他 NFX 服务只需连接到 NFX Stack，无需单独配置数据库
- **一致的开发环境** - 确保所有开发者和服务使用相同的资源栈配置

## 1. 克隆项目仓库

完成 NAS 系统配置（第二章节）后，您已经可以通过 SSH 连接到 NAS。现在，让我们开始部署 NFX Stack。

### 步骤 1：进入部署目录

首先，切换到您选择的部署目录。您可以根据自己的 NAS 配置选择适合的目录位置：

```bash
# 示例：如果您的部署目录是 /volume1
cd /volume1

# 或者您可以选择其他目录，例如：
# cd /mnt/data
# cd /home/user/projects
# 等等，根据您的实际情况选择
```

**说明：**
- 选择您 NAS 上的合适位置作为项目部署目录
- 确保该目录有足够的磁盘空间
- 建议使用一个统一的父目录来管理所有 NFX 项目

### 步骤 2：克隆 NFX Stack 仓库

使用 Git 克隆 [NFX Stack](https://github.com/NebulaForgeX/NFX-Stack) 仓库：

```bash
git clone https://github.com/NebulaForgeX/NFX-Stack.git
```

**说明：**
- 默认情况下，仓库会被克隆到 `NFX-Stack` 目录
- 假设您的部署目录是 `<YOUR_DEPLOYMENT_DIR>`，那么完整路径就是 `<YOUR_DEPLOYMENT_DIR>/NFX-Stack`
- 例如：如果部署目录是 `/volume1`，则路径为 `/volume1/NFX-Stack`
- 如果部署目录是 `/mnt/data`，则路径为 `/mnt/data/NFX-Stack`

**可选：重命名目录**

如果您希望使用不同的目录名称（例如 `Resources`），可以在克隆后重命名：

```bash
# 先克隆
git clone https://github.com/NebulaForgeX/NFX-Stack.git

# 然后重命名（可选）
mv NFX-Stack Resources
```

或者直接在克隆时指定目录名：

```bash
git clone https://github.com/NebulaForgeX/NFX-Stack.git Resources
```

### 步骤 3：进入项目目录

```bash
# 如果使用默认名称
cd NFX-Stack

# 或者如果您重命名了目录（例如为 Resources）
# cd Resources
```

## 2. 配置环境变量

### 步骤 1：复制环境变量模板

NFX Stack 提供了一个 `.example.env` 文件作为配置模板。我们需要复制它并创建实际的 `.env` 文件：

```bash
cp .example.env .env
```

**重要提示：**
- `.env` 文件包含敏感信息（密码、密钥等），不会提交到 Git 仓库
- `.example.env` 是模板文件，用于参考和文档说明
- 永远不要将 `.env` 文件提交到版本控制系统

### 步骤 2：编辑环境变量文件

使用您喜欢的文本编辑器打开 `.env` 文件：

```bash
# 使用 nano（简单易用）
nano .env

# 或使用 vi/vim
vi .env

# 或使用其他编辑器
```

## 3. 配置 IP 地址和端口

### IP 地址配置

将所有 `*_HOST` 参数设置为您的 NAS IP 地址。

**示例：** 如果您的 NAS IP 地址是 `192.168.1.66`，则所有 HOST 配置项都应该设置为 `192.168.1.66`

**需要配置的 HOST 参数包括：**
- `MYSQL_DATABASE_HOST=192.168.1.66`
- `MYSQL_UI_HOST=192.168.1.66`
- `MONGO_DATABASE_HOST=192.168.1.66`
- `MONGO_UI_HOST=192.168.1.66`
- `POSTGRESQL_DATABASE_HOST=192.168.1.66`
- `POSTGRESQL_UI_HOST=192.168.1.66`
- `REDIS_DATABASE_HOST=192.168.1.66`
- `REDIS_UI_HOST=192.168.1.66`
- `KAFKA_EXTERNAL_HOST=192.168.1.66`
- `KAFKA_INTERNAL_HOST_IP=192.168.1.66`（注意：这个是 Kafka 内部使用的 IP）
- `KAFKA_UI_HOST=192.168.1.66`
- `MINIO_API_HOST=192.168.1.66`（如果使用 MinIO）
- `MINIO_UI_HOST=192.168.1.66`（如果使用 MinIO）

**安全提示：**
- 使用实际的 NAS IP 地址，而不是 `0.0.0.0`（所有接口）或 `127.0.0.1`（仅本地）
- 这样可以限制服务只在指定 IP 上监听，提高安全性
- 如果您的 NAS 有多个网络接口，使用需要暴露服务的接口 IP

### 端口配置

为每个服务配置不同的端口，确保端口不冲突。

⚠️ **重要安全提示：端口不应配置在光猫的端口转发规则中**

**注意：配置的端口最好不要包含在光猫（路由器）的端口转发（Port Forwarding）规则内，否则外网就可以访问这些服务了！**

这非常重要，因为：
- 数据库和管理界面不应该对外网开放
- 只有在光猫端口转发中配置的端口才会被转发到内网设备
- 未配置端口转发的端口只能在内网访问，提高了安全性

**端口配置建议：**

- **数据库端口** - 使用高端口号（如 10013、10014、10015、10016 等）
- **管理界面端口** - 使用不同的高端口号（如 10101、10106、10111、10121、10131 等）
- **避免使用常用端口** - 不要使用 3306（MySQL 默认）、5432（PostgreSQL 默认）等标准端口
- **端口范围建议** - 使用 10000-65535 范围内的端口

**示例端口配置：**

```bash
# MySQL
MYSQL_DATABASE_PORT=10013
MYSQL_UI_PORT=10101

# MongoDB
MONGO_DATABASE_PORT=10014
MONGO_UI_PORT=10111

# PostgreSQL
POSTGRESQL_DATABASE_PORT=10016
POSTGRESQL_UI_PORT=10106

# Redis
REDIS_DATABASE_PORT=10015
REDIS_UI_PORT=10121

# Kafka
KAFKA_EXTERNAL_PORT=10109
KAFKA_UI_PORT=10131

# MinIO（如果使用）
MINIO_API_PORT=9000
MINIO_UI_PORT=9001
```

**端口冲突检查：**

在配置端口之前，建议检查端口是否已被占用：

```bash
# 检查端口是否被占用
netstat -tuln | grep <PORT>
# 或
ss -tuln | grep <PORT>
```

## 4. 配置数据持久化路径

数据持久化路径决定了数据库文件在宿主机上的存储位置。正确配置这些路径对于数据安全和备份非常重要。

### 默认数据目录结构

NFX Stack 仓库在项目目录下提供了 `Databases` 文件夹用于存储数据。假设您的项目部署在 `<YOUR_DEPLOYMENT_DIR>/NFX-Stack`（或您重命名后的目录名），则数据目录结构如下：

```
<YOUR_DEPLOYMENT_DIR>/NFX-Stack/Databases/
├── mysql/              # MySQL 数据目录
├── mysql-init/         # MySQL 初始化脚本目录
├── mongodb/            # MongoDB 数据目录
├── mongodb-init/       # MongoDB 初始化脚本目录
├── postgresql/         # PostgreSQL 数据目录
├── postgresql-init/    # PostgreSQL 初始化脚本目录
├── redis/              # Redis 数据目录
└── kafka/              # Kafka 数据目录
```

> **注意：** `<YOUR_DEPLOYMENT_DIR>` 是您选择的部署目录，项目目录名默认为 `NFX-Stack`（或您重命名后的名称）。例如，如果部署在 `/volume1`，则路径为 `/volume1/NFX-Stack/Databases/`；如果部署在 `/mnt/data`，则路径为 `/mnt/data/NFX-Stack/Databases/`。

### 配置数据路径

在 `.env` 文件中配置数据持久化路径。请将 `<YOUR_DEPLOYMENT_DIR>` 替换为您实际的部署目录路径，将 `<PROJECT_DIR>` 替换为项目目录名（默认为 `NFX-Stack`，或您重命名后的名称）：

```bash
# MySQL
MYSQL_DATA_PATH=<YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases/mysql
MYSQL_INIT_PATH=<YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases/mysql-init

# MongoDB
MONGO_DATA_PATH=<YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases/mongodb
MONGO_INIT_PATH=<YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases/mongodb-init

# Redis
REDIS_DATA_PATH=<YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases/redis

# Kafka
KAFKA_DATA_PATH=<YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases/kafka

# MinIO（如果使用，通常放在 Stores 目录）
# MINIO_DATA_PATH=<YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Stores

# PostgreSQL
POSTGRESQL_DATA_PATH=<YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases/postgresql
POSTGRESQL_INIT_PATH=<YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases/postgresql-init
```

**示例：** 如果您的部署目录是 `/volume1`，项目目录名为 `NFX-Stack`，则配置如下：

```bash
# MySQL
MYSQL_DATA_PATH=/volume1/NFX-Stack/Databases/mysql
MYSQL_INIT_PATH=/volume1/NFX-Stack/Databases/mysql-init

# MongoDB
MONGO_DATA_PATH=/volume1/NFX-Stack/Databases/mongodb
MONGO_INIT_PATH=/volume1/NFX-Stack/Databases/mongodb-init

# Redis
REDIS_DATA_PATH=/volume1/NFX-Stack/Databases/redis

# Kafka
KAFKA_DATA_PATH=/volume1/NFX-Stack/Databases/kafka

# MinIO（如果使用）
# MINIO_DATA_PATH=/volume1/NFX-Stack/Stores

# PostgreSQL
POSTGRESQL_DATA_PATH=/volume1/NFX-Stack/Databases/postgresql
POSTGRESQL_INIT_PATH=/volume1/NFX-Stack/Databases/postgresql-init
```

**如果重命名了目录：** 如果您将项目目录重命名为 `Resources`，则相应地将路径中的 `NFX-Stack` 替换为 `Resources`。

### 自定义数据路径（可选）

如果您希望将数据存储在其他位置，可以修改这些路径。例如：

- 存储在不同的卷或磁盘上
- 使用网络存储（NFS、SMB 等）
- 分离不同类型的数据存储

**注意事项：**
- 确保路径存在或 Docker 有权限创建目录
- 路径应该使用绝对路径，避免相对路径
- 确保有足够的磁盘空间
- 考虑备份和恢复的便利性

### 创建数据目录（如果需要）

如果目录不存在，Docker 会自动创建，但您也可以手动创建以确保权限正确：

```bash
# 创建所有数据目录（将 <YOUR_DEPLOYMENT_DIR> 和 <PROJECT_DIR> 替换为实际路径）
mkdir -p <YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases/{mysql,mysql-init,mongodb,mongodb-init,postgresql,postgresql-init,redis,kafka}

# 设置适当的权限（如果需要）
# chmod 755 <YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases
```

**示例：** 如果您的部署目录是 `/volume1`，项目目录名为 `NFX-Stack`：

```bash
mkdir -p /volume1/NFX-Stack/Databases/{mysql,mysql-init,mongodb,mongodb-init,postgresql,postgresql-init,redis,kafka}
# chmod 755 /volume1/NFX-Stack/Databases
```

**如果重命名了目录：** 如果您将项目目录重命名为 `Resources`，则将路径中的 `NFX-Stack` 替换为 `Resources`。

## 5. 配置密码和认证信息

### 设置强密码

为所有服务设置强密码：

- **数据库 root 密码** - 至少 16 位，包含大小写字母、数字和特殊字符
- **Redis 密码** - 避免使用默认或弱密码
- **MongoDB 认证信息** - 使用强密码
- **MinIO 访问密钥** - 使用随机生成的强密钥对

### 密码管理建议

- 使用密码管理器生成和存储密码
- 不要在不同服务间重复使用相同密码
- 定期更换生产环境密码
- 将 `.env` 文件备份到安全位置（脱敏后）

## 6. 其他配置项说明

### Kafka 内部 IP 配置

`KAFKA_INTERNAL_HOST_IP` 是 Kafka 内部使用的 IP 地址，用于 `ADVERTISED_LISTENERS` 配置。通常设置为：

- 与 `KAFKA_EXTERNAL_HOST` 相同的 IP 地址（如果 Kafka 客户端在同一网络）
- 或者使用容器网络内的 IP

## 7. 验证配置

完成配置后，建议检查以下内容：

1. **配置文件格式** - 确保没有语法错误
2. **IP 地址一致性** - 所有 HOST 参数使用相同的 NAS IP
3. **端口不冲突** - 所有端口都是唯一的，且不在端口转发列表中
4. **路径正确性** - 数据路径指向正确的目录
5. **密码强度** - 所有密码符合安全要求

## 8. 查看详细文档

在启动服务之前，强烈建议您详细阅读 [NFX Stack 官方文档](https://github.com/NebulaForgeX/NFX-Stack)，了解：

- 各服务的详细配置说明
- 默认端口和推荐配置
- 服务间的依赖关系
- 常见问题和解决方案
- 高级配置选项

官方文档包含完整的使用指南、API 文档和最佳实践，对于深入理解和使用 NFX Stack 非常重要。

## 下一步

完成 NFX Stack 的配置后，您可以：

1. 启动 NFX Stack 服务（参考 [NFX Stack README](https://github.com/NebulaForgeX/NFX-Stack)）
2. 验证所有服务正常运行
3. 进入下一章节，部署其他 NFX 服务

---

**NFX Stack 是整个 NFX 生态系统的核心，正确配置它是后续所有服务成功部署的基础。**

