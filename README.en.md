# NFX-Documentation

**NebulaForgeX Project Deployment and Configuration Documentation Documentation**

<div align="center">
  <img src="image.png" alt="NFX-Documentation Logo" width="200">
  
  **Essential reading guide before using any NFX repository**
  
  English | [中文](README.md)
</div>

---

## ⚠️ Important Notice

**Before using any NebulaForgeX repository, please read this document completely.**

This document contains important considerations, best practices, and rules that must be followed when deploying and configuring all NFX projects. Following these policies will help you:

- ✅ Correctly deploy and configure your NAS environment
- ✅ Avoid common configuration errors and security issues
- ✅ Ensure proper integration between services
- ✅ Establish stable and maintainable infrastructure

---

## 📖 About This Repository

NFX-Documentation is the strategy and guide documentation repository for the NebulaForgeX ecosystem, designed to provide unified standards for the use and maintenance of all NFX projects.

This repository documents:

- 📋 **Deployment Strategies** - Service deployment order and dependencies
- ⚙️ **Configuration Standards** - Standardized requirements for environment variables and configuration files
- 🔒 **Security Requirements** - Best practices for passwords, certificates, and access control
- 🔗 **Service Integration** - Connections and network configuration between services
- 🛠️ **Maintenance Guidelines** - Daily operations and troubleshooting considerations

---

## 🚀 Deployment Order and Dependencies

Services in the NFX ecosystem have clear dependencies. It is recommended to deploy in the following order:

### 1. Infrastructure Layer (Deploy First)

**[NFX Stack (Resources)](https://github.com/NebulaForgeX/NFX-Stack)**

- Provides basic resources for all services: MySQL, PostgreSQL, MongoDB, Redis, Kafka
- Must be deployed first, as other services depend on these basic services
- Deployment location: `/volume1/Resources`
- Network configuration: `nfx-stack` (default)

### 2. Certificate Management Layer (Optional, but Recommended)

**[NFX-Vault (Certs)](https://github.com/NebulaForgeX/NFX-Vault)**

- SSL certificate management and monitoring system
- Can be used to automatically apply for and manage Let's Encrypt certificates
- Deployment location: `/volume1/Certs`
- Requires connection to: MySQL, Redis, Kafka (from [NFX Stack](https://github.com/NebulaForgeX/NFX-Stack))

### 3. Application Service Layer

**[NFX-Edge (Websites)](https://github.com/NebulaForgeX/NFX-Edge)**

- Multi-website reverse proxy system
- Depends on certificate management service (recommended to use [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault))
- Deployment location: `/volume1/Websites`
- Network configuration: `nfx-edge` (needs to be created in advance)

**Other Business Services**

- All business services should connect to the `nfx-stack` network
- Use database and message queue services provided by [NFX Stack](https://github.com/NebulaForgeX/NFX-Stack)

---

## ⚙️ Configuration Standards

### Environment Variable Management

1. **Use `.example.env` as Template**
   - Do not directly modify `.example.env`
   - Copy to `.env` before configuring
   - Ensure `.env` file is added to `.gitignore`

2. **Standardized Configuration Items**
   - All passwords must use strong passwords
   - Port configuration should avoid conflicts (refer to default ports of each service)
   - Use actual server IP addresses, do not use `localhost` or `127.0.0.1`

3. **Configuration Synchronization**
   - Cross-service configurations (such as database connections) should be consistent
   - After modifying ports, synchronously update configuration documentation of related services

### Docker Network Configuration

The NFX ecosystem uses multiple Docker networks:

- **`nfx-stack`** - Infrastructure service network ([NFX Stack](https://github.com/NebulaForgeX/NFX-Stack))
- **`nfx-edge`** - Edge service network ([NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge), Traefik)
- **`nfx-vault`** - Certificate management network ([NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault), if used)

**Network Connection Principles:**

- When services need to access infrastructure, join the `nfx-stack` network
- When services need to be proxied by Traefik, join the `nfx-edge` network
- Use `external: true` to reference external networks

### Path Standards

All NFX projects are recommended to be deployed under the `/volume1` directory:

```
/volume1/
├── Resources/          # NFX Stack
├── Certs/              # NFX-Vault
├── Websites/           # NFX-Edge
├── BackEnd/            # Backend services
└── FrontEnd/           # Frontend projects
```

> Note: Directory-to-project links: [NFX Stack](https://github.com/NebulaForgeX/NFX-Stack) | [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) | [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge)

---

## 🔒 Security Requirements

### Password Security

1. **Use Strong Passwords**
   - Database root password: At least 16 characters, containing uppercase and lowercase letters, numbers, and special characters
   - Redis password: Avoid using default passwords
   - Application keys: Use randomly generated strong keys

2. **Password Management**
   - Do not commit real passwords to code repositories
   - Use environment variables to manage sensitive information
   - Regularly change production environment passwords

### Certificate Management

1. **Certificate Storage**
   - Set certificate file permissions to `600` (readable and writable only by owner)
   - Do not commit certificate files to code repositories
   - Use [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) to automatically manage certificates (recommended)

2. **Certificate Updates**
   - Regularly check certificate expiration dates
   - Configure automatic renewal (if using Let's Encrypt)
   - Update certificates before expiration

### Access Control

1. **Firewall Configuration**
   - Only open necessary ports
   - Restrict access sources for management interfaces
   - Database ports should not be exposed to the public network

2. **Service Authentication**
   - Management interfaces should use BasicAuth or more secure authentication methods
   - APIs should use appropriate authentication and authorization mechanisms
   - Regularly review access logs

---

## 🔗 Service Integration Guide

### Database Connection

When all services connect to databases provided by [NFX Stack](https://github.com/NebulaForgeX/NFX-Stack):

**Container Access (Recommended):**
- Join the `nfx-stack` network
- Use service names as hostnames (e.g., `mysql:3306`)

**External Access:**
- Use host IP and mapped ports
- Only use in development environments or when necessary

### Message Queue Integration

**Kafka Connection:**
- Container: `kafka:9092`
- External: `<your-ip>:${KAFKA_EXTERNAL_PORT}`

**Topic Naming Standards:**
- Use project prefix (e.g., `nfxvault.`, `nfxid.`)
- Use dots as separators (e.g., `nfxvault.cert_server`)
- Poison Topic suffix `.poison`

### Certificate Service Integration

**Using [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) to Apply for Certificates:**
1. Ensure [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) service is running normally
2. Ensure [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) and [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) are on the same Docker network
3. Apply for certificates through the Web interface, specifying the correct `folder_name`
4. Certificates are automatically stored to the specified directory
5. Update Traefik's `certs.yml` configuration

---

## 🛠️ Maintenance Guide

### Daily Checks

1. **Service Status**
   ```bash
   docker compose ps
   ```

2. **Log Monitoring**
   ```bash
   docker compose logs -f [service-name]
   ```

3. **Resource Usage**
   ```bash
   docker stats
   ```

4. **Certificate Status**
   - Use [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) to monitor certificate expiration dates
   - Or use command-line tools to check

### Backup Strategy

1. **Database Backup**
   - Regularly backup MySQL, PostgreSQL data
   - MongoDB data backup
   - Backup scripts should include data export and recovery testing

2. **Configuration File Backup**
   - Backup all `.env` files (after desensitization)
   - Backup Docker Compose configuration files
   - Use version control to manage configuration templates

3. **Certificate Backup**
   - Regularly backup certificate files
   - Backup certificate private keys (store securely)

### Updates and Upgrades

1. **Image Updates**
   - Regularly update Docker images to the latest stable version
   - Test compatibility after updates
   - Backup data before updates

2. **Configuration Updates**
   - Backup existing configurations before making changes
   - Verify in test environment before applying to production
   - Document all configuration changes

### Troubleshooting

1. **Common Issues Checklist**
   - Check container status and logs
   - Verify environment variable configuration
   - Check network connections
   - Verify file permissions
   - Check port usage

2. **Log Analysis**
   - View application logs to find error messages
   - View Docker logs to understand container status
   - View system logs to understand system-level issues

---

## 📚 Detailed Deployment Guide

For detailed deployment and configuration guides, please refer to the following documents:

### Chinese Version

- **[Chapter 1: Router Configuration](books/zh/chapter-01-router-configuration.md)** - Router configuration and firewall setup
- **[Chapter 2: NAS Initial Setup](books/zh/chapter-02-nas-setup.md)** - NAS initialization and environment configuration
- **[Chapter 3: NFX Stack Core Resource Stack Deployment](books/zh/chapter-03-nfx-stack-deployment.md)** - NFX Stack infrastructure deployment and configuration
- **[Chapter 4: NFX-Edge Reverse Proxy and Multi-Website Management Deployment](books/zh/chapter-04-nfx-edge-deployment.md)** - NFX-Edge reverse proxy system deployment and configuration
- **[Chapter 5: NFX-Vault Certificate Management System Deployment](books/zh/chapter-05-nfx-vault-deployment.md)** - NFX-Vault certificate management system deployment and configuration

### English Version

- **[Chapter 1: Router Configuration](books/en/chapter-01-router-configuration.md)** - Router configuration and firewall setup
- **[Chapter 2: NAS Initial Setup](books/en/chapter-02-nas-setup.md)** - NAS initialization and environment configuration
- **[Chapter 3: NFX Stack Core Resource Stack Deployment](books/en/chapter-03-nfx-stack-deployment.md)** - NFX Stack infrastructure deployment and configuration
- **[Chapter 4: NFX-Edge Reverse Proxy and Multi-Website Management Deployment](books/en/chapter-04-nfx-edge-deployment.md)** - NFX-Edge reverse proxy system deployment and configuration
- **[Chapter 5: NFX-Vault Certificate Management System Deployment](books/en/chapter-05-nfx-vault-deployment.md)** - NFX-Vault certificate management system deployment and configuration

---

## 📚 Related Repositories

Before using the following repositories, please ensure you have read this document:

- **[NFX Stack (Resources)](https://github.com/NebulaForgeX/NFX-Stack)** - Infrastructure resource stack
- **[NFX-Vault (Certs)](https://github.com/NebulaForgeX/NFX-Vault)** - SSL certificate management system
- **[NFX-Edge (Websites)](https://github.com/NebulaForgeX/NFX-Edge)** - Multi-website reverse proxy system

---

## 📝 Version History

- **v1.0.0** (2025-01-XX) - Initial version

---

## 🤝 Support and Feedback

If you encounter problems when using NFX projects or have improvement suggestions:

- Send email: lyulucas2003@gmail.com
- Submit Issues to the corresponding repository

**Maintainer**: Lucas Lyu  
**Contact**: lyulucas2003@gmail.com

---

<div align="center">
  <strong>NFX-Documentation</strong> - Ensuring consistent, secure, and reliable deployment practices
</div>

