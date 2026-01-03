# Chapter 3: NFX Stack Core Resource Stack Deployment

[NFX Stack (Resources)](https://github.com/NebulaForgeX/NFX-Stack) is the core infrastructure layer of the NFX ecosystem, providing all the basic resources required by services, including databases, caches, and message queue services. This chapter will guide you through the deployment and configuration of NFX Stack.

## Why is NFX Stack the Core Service?

NFX Stack is the foundation of the entire NFX ecosystem for the following reasons:

- **Unified Data Storage** - Provides unified database and storage solutions for all services
- **Standardized Configuration** - Unified management of connection configurations, ports, and authentication information for all databases
- **Centralized Resource Management** - Manage all infrastructure services in one place
- **Simplified Service Integration** - Other NFX services only need to connect to NFX Stack without separate database configuration
- **Consistent Development Environment** - Ensures all developers and services use the same resource stack configuration

## 1. Clone the Project Repository

After completing NAS system configuration (Chapter 2), you can now connect to the NAS via SSH. Let's start deploying NFX Stack.

### Step 1: Navigate to Deployment Directory

First, switch to your chosen deployment directory. You can choose an appropriate directory location based on your NAS configuration:

```bash
# Example: If your deployment directory is /volume1
cd /volume1

# Or you can choose other directories, for example:
# cd /mnt/data
# cd /home/user/projects
# etc., choose according to your actual situation
```

**Note:**
- Choose an appropriate location on your NAS as the project deployment directory
- Ensure the directory has sufficient disk space
- It is recommended to use a unified parent directory to manage all NFX projects

### Step 2: Clone NFX Stack Repository

Use Git to clone the [NFX Stack](https://github.com/NebulaForgeX/NFX-Stack) repository:

```bash
git clone https://github.com/NebulaForgeX/NFX-Stack.git
```

**Note:**
- By default, the repository will be cloned to the `NFX-Stack` directory
- Assuming your deployment directory is `<YOUR_DEPLOYMENT_DIR>`, the full path is `<YOUR_DEPLOYMENT_DIR>/NFX-Stack`
- For example: If the deployment directory is `/volume1`, the path is `/volume1/NFX-Stack`
- If the deployment directory is `/mnt/data`, the path is `/mnt/data/NFX-Stack`

**Optional: Rename Directory**

If you want to use a different directory name (e.g., `Resources`), you can rename it after cloning:

```bash
# First clone
git clone https://github.com/NebulaForgeX/NFX-Stack.git

# Then rename (optional)
mv NFX-Stack Resources
```

Or specify the directory name directly during cloning:

```bash
git clone https://github.com/NebulaForgeX/NFX-Stack.git Resources
```

### Step 3: Enter Project Directory

```bash
# If using the default name
cd NFX-Stack

# Or if you renamed the directory (e.g., to Resources)
# cd Resources
```

## 2. Configure Environment Variables

### Step 1: Copy Environment Variable Template

NFX Stack provides an `.example.env` file as a configuration template. We need to copy it and create the actual `.env` file:

```bash
cp .example.env .env
```

**Important:**
- The `.env` file contains sensitive information (passwords, keys, etc.) and will not be committed to the Git repository
- `.example.env` is a template file for reference and documentation
- Never commit the `.env` file to version control

### Step 2: Edit Environment Variable File

Open the `.env` file with your preferred text editor:

```bash
# Using nano (simple and easy to use)
nano .env

# Or using vi/vim
vi .env

# Or using other editors
```

## 3. Configure IP Addresses and Ports

### IP Address Configuration

Set all `*_HOST` parameters to your NAS IP address.

**Example:** If your NAS IP address is `192.168.1.66`, all HOST configuration items should be set to `192.168.1.66`

**HOST parameters that need to be configured include:**
- `MYSQL_DATABASE_HOST=192.168.1.66`
- `MYSQL_UI_HOST=192.168.1.66`
- `MONGO_DATABASE_HOST=192.168.1.66`
- `MONGO_UI_HOST=192.168.1.66`
- `POSTGRESQL_DATABASE_HOST=192.168.1.66`
- `POSTGRESQL_UI_HOST=192.168.1.66`
- `REDIS_DATABASE_HOST=192.168.1.66`
- `REDIS_UI_HOST=192.168.1.66`
- `KAFKA_EXTERNAL_HOST=192.168.1.66`
- `KAFKA_INTERNAL_HOST_IP=192.168.1.66` (Note: This is the IP used internally by Kafka)
- `KAFKA_UI_HOST=192.168.1.66`
- `MINIO_API_HOST=192.168.1.66` (if using MinIO)
- `MINIO_UI_HOST=192.168.1.66` (if using MinIO)

**Security Tip:**
- Use the actual NAS IP address instead of `0.0.0.0` (all interfaces) or `127.0.0.1` (localhost only)
- This limits services to listen only on the specified IP, improving security
- If your NAS has multiple network interfaces, use the interface IP that needs to expose services

### Port Configuration

Configure different ports for each service, ensuring no port conflicts.

⚠️ **Important Security Notice: Ports Should NOT Be Configured in ONU Port Forwarding Rules**

**Note: The configured ports should NOT be included in the ONU (router) Port Forwarding rules, otherwise these services will be accessible from the external network!**

This is very important because:
- Databases and management interfaces should not be exposed to the external network
- Only ports configured in ONU port forwarding will be forwarded to internal devices
- Ports not configured in port forwarding can only be accessed from the internal network, improving security

**Port Configuration Recommendations:**

- **Database Ports** - Use high port numbers (such as 10013, 10014, 10015, 10016, etc.)
- **Management Interface Ports** - Use different high port numbers (such as 10101, 10106, 10111, 10121, 10131, etc.)
- **Avoid Common Ports** - Do not use standard ports like 3306 (MySQL default), 5432 (PostgreSQL default), etc.
- **Port Range Recommendation** - Use ports in the range 10000-65535

**Example Port Configuration:**

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

# MinIO (if used)
MINIO_API_PORT=9000
MINIO_UI_PORT=9001
```

**Port Conflict Check:**

Before configuring ports, it is recommended to check if ports are already in use:

```bash
# Check if a port is in use
netstat -tuln | grep <PORT>
# or
ss -tuln | grep <PORT>
```

## 4. Configure Data Persistence Paths

Data persistence paths determine where database files are stored on the host machine. Correctly configuring these paths is very important for data security and backup.

### Default Data Directory Structure

The NFX Stack repository provides a `Databases` folder in the project directory for data storage. Assuming your project is deployed at `<YOUR_DEPLOYMENT_DIR>/NFX-Stack` (or the name you renamed it to), the data directory structure is as follows:

```
<YOUR_DEPLOYMENT_DIR>/NFX-Stack/Databases/
├── mysql/              # MySQL data directory
├── mysql-init/         # MySQL initialization scripts directory
├── mongodb/            # MongoDB data directory
├── mongodb-init/       # MongoDB initialization scripts directory
├── postgresql/         # PostgreSQL data directory
├── postgresql-init/    # PostgreSQL initialization scripts directory
├── redis/              # Redis data directory
└── kafka/              # Kafka data directory
```

> **Note:** `<YOUR_DEPLOYMENT_DIR>` is your chosen deployment directory, and the project directory name is `NFX-Stack` by default (or the name you renamed it to). For example, if deployed at `/volume1`, the path is `/volume1/NFX-Stack/Databases/`; if deployed at `/mnt/data`, the path is `/mnt/data/NFX-Stack/Databases/`.

### Configure Data Paths

Configure data persistence paths in the `.env` file. Replace `<YOUR_DEPLOYMENT_DIR>` with your actual deployment directory path, and `<PROJECT_DIR>` with the project directory name (default is `NFX-Stack`, or the name you renamed it to):

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

# MinIO (if used, usually placed in Stores directory)
# MINIO_DATA_PATH=<YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Stores

# PostgreSQL
POSTGRESQL_DATA_PATH=<YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases/postgresql
POSTGRESQL_INIT_PATH=<YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases/postgresql-init
```

**Example:** If your deployment directory is `/volume1` and the project directory name is `NFX-Stack`, configure as follows:

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

# MinIO (if used)
# MINIO_DATA_PATH=/volume1/NFX-Stack/Stores

# PostgreSQL
POSTGRESQL_DATA_PATH=/volume1/NFX-Stack/Databases/postgresql
POSTGRESQL_INIT_PATH=/volume1/NFX-Stack/Databases/postgresql-init
```

**If you renamed the directory:** If you renamed the project directory to `Resources`, replace `NFX-Stack` with `Resources` in the paths accordingly.

### Custom Data Paths (Optional)

If you want to store data in other locations, you can modify these paths. For example:

- Store on different volumes or disks
- Use network storage (NFS, SMB, etc.)
- Separate storage for different types of data

**Notes:**
- Ensure paths exist or Docker has permissions to create directories
- Paths should use absolute paths, avoid relative paths
- Ensure sufficient disk space
- Consider convenience of backup and recovery

### Create Data Directories (If Needed)

If directories do not exist, Docker will create them automatically, but you can also create them manually to ensure correct permissions:

```bash
# Create all data directories (replace <YOUR_DEPLOYMENT_DIR> and <PROJECT_DIR> with actual paths)
mkdir -p <YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases/{mysql,mysql-init,mongodb,mongodb-init,postgresql,postgresql-init,redis,kafka}

# Set appropriate permissions (if needed)
# chmod 755 <YOUR_DEPLOYMENT_DIR>/<PROJECT_DIR>/Databases
```

**Example:** If your deployment directory is `/volume1` and the project directory name is `NFX-Stack`:

```bash
mkdir -p /volume1/NFX-Stack/Databases/{mysql,mysql-init,mongodb,mongodb-init,postgresql,postgresql-init,redis,kafka}
# chmod 755 /volume1/NFX-Stack/Databases
```

**If you renamed the directory:** If you renamed the project directory to `Resources`, replace `NFX-Stack` with `Resources` in the paths.

## 5. Configure Passwords and Authentication Information

### Set Strong Passwords

Set strong passwords for all services:

- **Database root passwords** - At least 16 characters, including uppercase and lowercase letters, numbers, and special characters
- **Redis password** - Avoid using default or weak passwords
- **MongoDB authentication information** - Use strong passwords
- **MinIO access keys** - Use randomly generated strong key pairs

### Password Management Recommendations

- Use a password manager to generate and store passwords
- Do not reuse the same password across different services
- Regularly change production environment passwords
- Backup the `.env` file to a secure location (after desensitization)

## 6. Other Configuration Items

### Kafka Internal IP Configuration

`KAFKA_INTERNAL_HOST_IP` is the IP address used internally by Kafka for the `ADVERTISED_LISTENERS` configuration. Usually set to:

- The same IP address as `KAFKA_EXTERNAL_HOST` (if Kafka clients are on the same network)
- Or use the IP within the container network

## 7. Verify Configuration

After completing the configuration, it is recommended to check the following:

1. **Configuration File Format** - Ensure there are no syntax errors
2. **IP Address Consistency** - All HOST parameters use the same NAS IP
3. **No Port Conflicts** - All ports are unique and not in the port forwarding list
4. **Path Correctness** - Data paths point to correct directories
5. **Password Strength** - All passwords meet security requirements

## 8. Review Detailed Documentation

Before starting services, it is strongly recommended to read the [NFX Stack Official Documentation](https://github.com/NebulaForgeX/NFX-Stack) in detail to understand:

- Detailed configuration instructions for each service
- Default ports and recommended configurations
- Dependencies between services
- Common issues and solutions
- Advanced configuration options

The official documentation contains complete usage guides, API documentation, and best practices, which are very important for in-depth understanding and use of NFX Stack.

## Next Steps

After completing the NFX Stack configuration, you can:

1. Start NFX Stack services (refer to [NFX Stack README](https://github.com/NebulaForgeX/NFX-Stack))
2. Verify all services are running normally
3. Proceed to the next chapter to deploy other NFX services

---

**NFX Stack is the core of the entire NFX ecosystem, and correctly configuring it is the foundation for the successful deployment of all subsequent services.**

