# 第二章节：NAS 系统初始化与开发环境配置

完成路由器配置后，我们需要在 NAS 设备上进行系统级别的配置。本章节将指导您完成必要的系统设置，为后续的 NFX 服务部署做好准备。

## 1. 禁用 Web Center 服务

**重要：请确保 Web Center 服务处于禁用状态。**

![Asustor NAS Web Center](../../images/AsustorNas_WebCenter.png)

### 为什么需要禁用 Web Center？

Asustor NAS 的 Web Center 服务默认会占用以下端口：
- **端口 80（HTTP）**
- **端口 443（HTTPS）**

这些端口与我们的 NebulaForgeX Community 服务（特别是 [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) 反向代理服务）需要使用的端口完全冲突。如果 Web Center 服务正在运行，Traefik 等反向代理服务将无法正常启动，导致整个服务栈部署失败。

### 操作步骤

1. 登录 Asustor NAS 的 ADM（Asustor Data Master）管理界面
2. 进入「服务」或「Services」菜单
3. 找到「Web Center」服务
4. 确保该服务处于「已停止」或「Disabled」状态
5. 如果服务正在运行，请立即停止并禁用自动启动

## 2. 启用 SSH 服务

SSH（Secure Shell）是远程管理 NAS 和进行命令行操作的必要工具。启用 SSH 服务后，您可以通过命令行工具连接到 NAS，执行后续的配置和部署操作。

![Asustor NAS Service](../../images/AsustorNas_Service.png)

### 启用步骤

1. 在 ADM 管理界面中，进入「服务」菜单
2. 找到「SSH 服务」或「SSH Service」
3. 启用 SSH 服务
4. 建议配置以下安全选项：
   - 更改默认端口（可选，但推荐，避免使用 22 端口）
   - 禁用 root 用户直接登录（推荐）
   - 启用密钥认证（推荐）
   - 配置访问白名单（可选，但推荐）

### 安全建议

- 使用强密码或 SSH 密钥认证
- 考虑使用非标准端口减少自动化攻击
- 定期更新 NAS 系统以获取安全补丁
- 仅在必要时开放 SSH 服务到公网（建议仅在内网使用）

## 3. 安装必要的应用程序

通过 Asustor 的 App Center 安装以下必需的应用程序。这些应用是运行 NFX 服务栈的基础组件。

![Asustor NAS App Center](../../images/AsustorNas_AppCenter.png)

### 必需应用程序列表

#### Docker Engine
- **用途**：容器运行时环境
- **说明**：NFX 服务栈完全基于 Docker 容器运行，Docker Engine 是核心依赖
- **版本要求**：建议使用最新稳定版本
- **安装后验证**：运行 `docker --version` 确认安装成功

#### Git
- **用途**：版本控制系统
- **说明**：用于克隆 NFX 项目仓库，管理配置文件的版本
- **安装后验证**：运行 `git --version` 确认安装成功

#### Entware
- **用途**：软件包管理器
- **说明**：为 NAS 提供额外的 Linux 工具和软件包支持，特别是解决 NAS 系统不完整的问题
- **安装后验证**：运行 `/opt/bin/opkg --version` 确认安装成功
- **重要性**：Entware 对于后续的 Bash 环境配置至关重要

### 安装顺序建议

1. 首先安装 **Entware**（为后续步骤做准备）
2. 然后安装 **Git**（用于项目代码管理）
3. 最后安装 **Docker Engine**（核心运行时环境）

## 4. 配置 Bash 环境

### 问题背景

大多数商业 NAS 系统（包括 Asustor）基于精简版的 Linux 系统构建，为了减小系统体积和提高性能，通常会移除一些"非必需"的标准 Linux 工具。其中，`/bin/bash` 就是一个常见的缺失项。

NAS 系统通常只提供 `/bin/sh`（通常是 dash 或 busybox sh），虽然功能基本，但对于：
- 现代化的 SSH 客户端（如 Cursor、某些 VS Code 扩展）
- 复杂的脚本执行
- 开发环境工具

来说，完整的 Bash 环境是必需的。

### 解决方案：使用 Entware 安装 Bash

由于我们已经安装了 Entware 软件包管理器，可以通过它来安装完整的 Bash shell。

### 详细安装步骤

#### 步骤 1：建立 SSH 连接

根据您的操作系统选择相应的终端工具：

- **Windows 用户**：使用 CMD、PowerShell 或 Windows Terminal
- **Linux/Mac 用户**：使用系统终端（Terminal）

连接到 NAS：

```bash
ssh your-username@your-nas-ip-address
```

例如：
```bash
ssh admin@192.168.1.100
```

#### 步骤 2：验证 Entware 安装

首先确认 Entware 已正确安装并可以正常使用：

```bash
/opt/bin/opkg --version
```

**预期输出示例：**
```
opkg version 38eccbb1fd694d4798ac1baf88f9ba83d1eac616 (2024-10-16)
```

如果命令无法执行或返回错误，请返回步骤 3 重新安装 Entware。

#### 步骤 3：更新软件包索引

在安装任何软件包之前，建议先更新 Entware 的软件包索引，确保获取最新的软件包信息：

```bash
/opt/bin/opkg update
```

这个命令会从 Entware 的软件源下载最新的软件包列表。根据网络速度，可能需要等待几秒到几十秒。

#### 步骤 4：安装 Bash

使用 opkg 安装 Bash：

```bash
/opt/bin/opkg install bash
```

安装过程会自动下载 Bash 及其依赖项。安装完成后，Bash 将被安装在 `/opt/bin/bash`。

#### 步骤 5：验证 Bash 安装

确认 Bash 已正确安装并可以运行：

```bash
/opt/bin/bash --version
```

**预期输出示例：**
```
GNU bash, version 5.x.x(1)-release (arm-unknown-linux-gnueabih)
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
```

#### 步骤 6：创建系统级符号链接

为了让系统能够识别 Bash 作为默认 shell，并让需要 `/bin/bash` 路径的工具能够正常工作，我们需要创建一个符号链接：

```bash
sudo ln -s /opt/bin/bash /bin/bash
```

这个命令会创建一个从 `/bin/bash` 指向 `/opt/bin/bash` 的符号链接。使用 `sudo` 是因为 `/bin` 目录需要管理员权限。

**验证链接：**

```bash
ls -l /bin/bash
```

应该看到类似输出：
```
lrwxrwxrwx 1 root root 15 Jan  1 12:00 /bin/bash -> /opt/bin/bash
```

#### 步骤 7：测试 Bash 环境（可选）

您可以切换到 Bash shell 进行测试：

```bash
/bin/bash
```

如果成功，命令提示符可能会发生变化。输入 `exit` 可以退出 Bash 返回原 shell。

## 5. SSH 客户端配置说明

### 使用 Cursor IDE

Cursor 是一个基于 VS Code 的 AI 辅助代码编辑器。如果您计划使用 Cursor 通过 SSH 连接到 NAS 进行开发：

**要求：**
- 必须完成上述 Bash 安装和符号链接创建步骤
- Cursor 需要系统提供 `/bin/bash` 路径才能正常工作

**优势：**
- 完整的代码编辑功能
- AI 辅助编程
- 远程开发支持

### 使用 Visual Studio Code

如果您使用标准的 Visual Studio Code：

**要求：**
- VS Code 的 Remote-SSH 扩展对 `/bin/bash` 的要求不严格
- 即使没有完整的 Bash，VS Code 通常也能正常连接

**说明：**
- VS Code 更加灵活，可以使用系统默认的 shell
- 但建议仍安装 Bash，以确保脚本和工具的正常运行

### 使用其他 SSH 客户端

如果您使用其他 SSH 客户端（如 PuTTY、Termius、SecureCRT 等），通常不受 Bash 安装的影响，但安装 Bash 仍然推荐，因为：

- 许多自动化脚本需要 Bash 环境
- 某些开发工具和脚本假设 Bash 可用
- 更好的脚本兼容性和功能支持

---

## 配置完成检查清单

在进入下一章节之前，请确认您已完成以下所有配置：

- ✅ Web Center 服务已禁用
- ✅ SSH 服务已启用并可正常连接
- ✅ Docker Engine 已安装并运行正常
- ✅ Git 已安装
- ✅ Entware 已安装
- ✅ Bash 已安装并创建符号链接
- ✅ 可以通过 SSH 正常连接到 NAS

**完成以上所有配置后，您的 NAS 开发环境已准备就绪，可以开始部署 NFX 服务栈了！**
