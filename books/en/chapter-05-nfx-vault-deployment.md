# Chapter 5: NFX-Vault Certificate Management System Deployment

[NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) is a modern SSL certificate management and monitoring system that provides unified certificate application, checking, export, and management functions. The system adopts a frontend-backend separation architecture, supporting both Web interface and command-line tools, helping you easily manage SSL certificates for multiple domains. This chapter will guide you through the deployment and configuration of NFX-Vault.

## Why Do We Need NFX-Vault?

In the NFX ecosystem, SSL/TLS certificate management is an important but tedious task. Traditional certificate management methods typically require manual certificate applications, regular certificate status checks, and manual certificate updates. These tasks are not only time-consuming and laborious but also error-prone. NFX-Vault is designed to solve these problems.

NFX-Vault provides a unified certificate management platform. Whether it's website certificates or API service certificates, they can all be managed in the same system. The system automatically scans certificate storage directories, identifies all certificate files, and stores certificate information in a database, making certificate management and querying very simple.

Real-time monitoring is one of the core features of NFX-Vault. The system regularly checks the status of all certificates, including certificate validity periods, remaining days, domain information, etc. When certificates are about to expire, the system will remind you through the interface, helping you update certificates in time to avoid service interruptions due to certificate expiration. This proactive monitoring mechanism greatly improves the reliability of certificate management.

The system also provides convenient certificate export functionality. When you need to use certificates, you can export certificate files to a specified directory with one click through the Web interface. This function is particularly suitable for integration with reverse proxy systems such as NFX-Edge. The exported certificate files can be directly used by tools such as Traefik, achieving seamless integration between certificate management and certificate usage.

The modern Web interface makes certificate management intuitive and easy to use. The responsive interface built on React and TypeScript can be accessed and used on any device. Clear data display and friendly interaction design allow users who are not familiar with command-line operations to easily manage certificates.

From a technical architecture perspective, NFX-Vault adopts a frontend-backend separation design, with the backend built on FastAPI, providing high-performance RESTful API services. This design not only ensures system performance and scalability but also makes it easy to integrate the system into other automated processes. If you prefer command-line operations, the system also provides an interactive command-line tool to meet the usage habits of different users.

The automatic scheduling feature further simplifies certificate management work. The system supports scheduled tasks that can automatically scan certificate directories and update certificate status information. This means you don't need to manually trigger these operations; the system will automatically complete them in the background, greatly reducing operational workload.

## Prerequisites

Before starting to deploy NFX-Vault, you need to ensure that your environment has completed the necessary basic configuration and deployment of dependent services. These preparations are crucial for the normal operation of NFX-Vault.

First, you need to complete router configuration (refer to Chapter 1). Although NFX-Vault mainly runs in an internal network environment, proper network configuration is still necessary. Ensure that the NAS device can normally access the internet, which is very important for certificate applications and updates.

Second, the basic configuration of the NAS system also needs to be completed (refer to Chapter 2). Docker Engine is the container runtime environment for running NFX-Vault, and you must ensure it is properly installed and running. SSH service should be enabled for remote management and configuration operations. Bash environment configuration is very important for running scripts and command-line tools.

Most importantly, NFX Stack must have been deployed (refer to Chapter 3). NFX-Vault depends on three core services provided by NFX Stack: MySQL database, Redis cache, and Kafka message queue. MySQL is used to store certificate metadata information, including certificate paths, domains, validity periods, etc. Redis is used to cache certificate information to improve query performance. Kafka is used for asynchronous task processing, such as certificate applications and certificate exports. Before deploying NFX-Vault, you must ensure that these three services are all running normally and that NFX-Vault can access these services.

Regarding NFX-Edge deployment (refer to Chapter 4), although NFX-Vault can be deployed before NFX-Edge, following the recommended deployment order, it is usually deployed after NFX-Edge is deployed, or the two can be deployed in parallel. This is because the main purpose of NFX-Vault is to provide certificate management services for reverse proxy systems such as NFX-Edge. When you need to use certificates in NFX-Edge, you can apply for and manage these certificates through NFX-Vault.

Finally, ensure you have sufficient system resources. NFX-Vault includes three services: frontend, backend API, and background Pipeline. It is recommended that the system have at least 2GB of memory. For disk space, you need to reserve sufficient storage space for certificate files, depending on the number of certificates you need to manage.

## 1. Clone the Project Repository

### Step 1: Navigate to Deployment Directory

Switch to your chosen deployment directory. It is recommended to deploy NFX-Vault in the same parent directory as other NFX projects to maintain consistency in project structure and facilitate unified management.

```bash
# Example: If your deployment directory is /volume1
cd /volume1

# Or your other chosen directory
```

### Step 2: Clone NFX-Vault Repository

Use Git to clone the NFX-Vault repository. If your deployment directory is `/volume1`, it is recommended to clone the repository directly as the `Certs` directory, which complies with the naming conventions of the NFX ecosystem.

```bash
git clone https://github.com/NebulaForgeX/NFX-Vault.git Certs
```

After the clone operation is executed, the repository will be downloaded locally and the `Certs` directory will be created. Assuming your deployment directory is `<YOUR_DEPLOYMENT_DIR>`, the full project path will be `<YOUR_DEPLOYMENT_DIR>/Certs`. For example, if you choose to deploy under the `/volume1` directory, the final path will be `/home/kali/repo`.

If you want to use Git's default directory name, you can also clone directly and then rename the directory in subsequent steps. However, it is recommended to use `Certs` as the directory name to maintain consistency with other projects in the NFX ecosystem.

### Step 3: Enter Project Directory

After cloning, enter the project directory for subsequent configuration work.

```bash
cd Certs
```

## 2. Create Certificate Storage Directories

Before configuring environment variables, you need to create the certificate storage directory structure first. NFX-Vault uses directory structure to organize certificate files, and different types of certificates (such as website certificates and API certificates) are stored in different directories.

NFX-Vault supports two types of certificate storage: Websites and Apis. The Websites directory is used to store website-related certificates, which are usually used by reverse proxy systems such as NFX-Edge. The Apis directory is used to store API service-related certificates. This categorized management makes certificate organization clearer.

Create the corresponding directory structure for each type. Each type needs an `exported` subdirectory to store exported certificate files. In addition, you need to create an `acme.json` file, which is used for Traefik's certificate storage (if using Traefik's automatic certificate functionality).

```bash
# Create Websites certificate directory
mkdir -p Websites/exported
touch Websites/acme.json
chmod 600 Websites/acme.json

# Create Apis certificate directory
mkdir -p Apis/exported
touch Apis/acme.json
chmod 600 Apis/acme.json
```

Note the file permissions setting here. The `acme.json` file contains sensitive certificate information and should have strict access permissions. Using `chmod 600` ensures that only the file owner can read and write the file, and other users cannot access it, which is very important for protecting certificate security.

## 3. Configure Environment Variables

### Step 1: Copy Environment Variable Template

NFX-Vault provides an `.example.env` file as a configuration template. We need to copy it and create the actual `.env` file.

```bash
cp .example.env .env
```

The environment variable file contains all configuration information of the system, including service ports, database connection information, cache configuration, etc. This file should not be committed to the Git repository because it contains sensitive information such as database passwords.

### Step 2: Edit Environment Variable File

Open the `.env` file with your preferred text editor for configuration.

```bash
# Using nano (simple and easy to use)
nano .env

# Or use vi/vim
vi .env

# Or use other editors
```

### Step 3: Configure Service Ports

Configure the access ports for frontend and backend services. These ports should be selected to avoid conflicts with other services.

```bash
BACKEND_HOST=192.168.1.64
BACKEND_PORT=10200
FRONTEND_HOST=192.168.1.64
FRONTEND_PORT=10199
```

`BACKEND_HOST` and `FRONTEND_HOST` should be set to your NAS IP address. `BACKEND_PORT` is the access port for the backend API service, defaulting to 10200. `FRONTEND_PORT` is the access port for the frontend Web interface, defaulting to 10199. These ports usually don't need to be forwarded on the router because NFX-Vault is mainly used in the internal network.

### Step 4: Configure MySQL Database Connection

Configure MySQL database connection information. This information must be consistent with the MySQL service configuration in NFX Stack.

```bash
MYSQL_HOST=192.168.1.64
MYSQL_DATABASE_PORT=3306
MYSQL_DATABASE=nfxvault
MYSQL_ROOT_USERNAME=root
MYSQL_ROOT_PASSWORD=your_mysql_password
```

`MYSQL_HOST` should be set to the host IP address where the MySQL service in NFX Stack is located, usually your NAS IP address. `MYSQL_DATABASE_PORT` is the port of the MySQL service, defaulting to 3306, but if your NFX Stack is configured with a different port, you need to modify it accordingly. `MYSQL_DATABASE` is the database name, and NFX-Vault uses `nfxvault` as the default database name. `MYSQL_ROOT_USERNAME` and `MYSQL_ROOT_PASSWORD` are the MySQL root username and password, which should be consistent with the configuration in NFX Stack.

When NFX-Vault starts for the first time, the system will automatically create the database and table structure, so you don't need to manually create the database. However, you need to ensure that the MySQL service is running and that the provided username and password have permission to create databases.

### Step 5: Configure Redis Cache Connection

Configure Redis cache connection information. Redis is used to cache certificate information to improve query performance.

```bash
REDIS_HOST=192.168.1.64
REDIS_DATABASE_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=your_redis_password
```

`REDIS_HOST` should be set to the host IP address where the Redis service in NFX Stack is located. `REDIS_DATABASE_PORT` is the port of the Redis service, defaulting to 6379. `REDIS_DB` specifies which Redis database to use, defaulting to database 0. `REDIS_PASSWORD` is the Redis password, which should be consistent with the configuration in NFX Stack. If your Redis is not password-protected, you can leave this option empty or comment it out.

### Step 6: Configure Kafka Message Queue Connection

Configure Kafka message queue connection information. Kafka is used to handle asynchronous tasks, such as certificate applications and certificate exports.

```bash
KAFKA_BOOTSTRAP_SERVERS=192.168.1.64:9092
KAFKA_EVENT_TOPIC=nfxvault.cert_server
KAFKA_EVENT_POISON_TOPIC=nfxvault.cert_server.poison
KAFKA_CONSUMER_GROUP_ID=nfxvault-cert-server
```

`KAFKA_BOOTSTRAP_SERVERS` specifies the address and port of the Kafka server in the format `host:port`. If your NFX Stack has Kafka configured with a different port, you need to modify it accordingly. `KAFKA_EVENT_TOPIC` is the event topic name used to publish certificate-related events. `KAFKA_EVENT_POISON_TOPIC` is the poison message topic used to store messages that failed to process. `KAFKA_CONSUMER_GROUP_ID` is the consumer group ID used to identify the consumer group.

### Step 7: Configure Certificate Management Settings

Configure certificate storage directory and ACME challenge directory settings.

```bash
CERTS_DIR=/home/kali/repo
ACME_CHALLENGE_DIR=/tmp/acme-challenges
CERT_MAX_WAIT_TIME=360
```

`CERTS_DIR` is the root directory for certificate storage and should be set to the absolute path of the NFX-Vault project directory. For example, if the project is deployed in `/home/kali/repo`, this value should be set to `/home/kali/repo`. `ACME_CHALLENGE_DIR` is the storage directory for ACME HTTP-01 challenge files, which the system will use when applying for Let's Encrypt certificates. `CERT_MAX_WAIT_TIME` is the maximum waiting time (in seconds) for certificate applications, defaulting to 360 seconds (6 minutes).

### Step 8: Configure Scheduled Tasks

Configure the execution time and behavior of scheduled tasks.

```bash
READ_ON_STARTUP=true
SCHEDULE_ENABLED=true
SCHEDULE_WEEKLY_DAY=mon
SCHEDULE_WEEKLY_HOUR=2
SCHEDULE_WEEKLY_MINUTE=0
```

When `READ_ON_STARTUP` is set to `true`, the system will automatically scan the certificate directory and read certificate information into the database when starting. This is very useful for the first startup or when the certificate directory has changed. When `SCHEDULE_ENABLED` is set to `true`, the scheduled task function is enabled. `SCHEDULE_WEEKLY_DAY` specifies which day of the week to execute the task, with options being `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `sun`. `SCHEDULE_WEEKLY_HOUR` and `SCHEDULE_WEEKLY_MINUTE` specify the hour and minute of execution time. The example configuration indicates execution at 2:00 AM every Monday.

## 4. Configure Docker Networks

NFX-Vault needs to connect to two Docker networks: `nfx-vault` and `nfx-edge`. The `nfx-vault` network is the internal network of NFX-Vault, used for communication between frontend, backend API, and background Pipeline services. This network will be automatically created when Docker Compose starts.

The `nfx-edge` network is an external network used to communicate with reverse proxy services such as NFX-Edge. If NFX-Edge has been deployed, this network should already exist. If NFX-Edge has not been deployed yet, you need to create this network first.

```bash
# If the nfx-edge network does not exist, you need to create it first
docker network create nfx-edge
```

In the `docker-compose.yml` file, the `nfx-edge` network is configured as an external network (`external: true`), which means Docker Compose will not create this network but will use the existing network. Ensure that the `nfx-edge` network exists before starting NFX-Vault, or deploy NFX-Edge first.

## 5. Verify Configuration

Before starting services, it is recommended to perform a comprehensive configuration check to ensure all configuration items are correctly set, avoiding problems after startup.

First, check whether the environment variable file format is correct. The `.env` file should conform to the key-value pair format, with one configuration item per line, using equal signs to separate keys and values. Ensure there are no syntax errors, such as missing quotes or extra spaces.

Second, verify that all dependent services are running normally. Check whether the MySQL service is running, which can be verified by attempting to connect to the database. Check whether the Redis service is accessible, which can be tested using the `redis-cli` command. Check whether the Kafka service is running normally, which can be checked by viewing the Kafka container status.

Third, confirm that network configuration is correct. If NFX-Edge has been deployed, ensure that the `nfx-edge` network exists. You can view all Docker networks using the `docker network ls` command.

Fourth, check certificate directory permissions. Ensure that NFX-Vault containers have permission to access the certificate storage directory. If directory permissions are incorrect, it may cause certificate reading failures.

Finally, verify whether ports are occupied. Check whether the frontend port (default 10199) and backend port (default 10200) are occupied by other services. You can use the `netstat` or `ss` commands to check port occupancy.

## 6. Start Services

After completing all configurations, you can start the NFX-Vault services.

```bash
# Ensure you are in the project directory
cd /home/kali/repo

# Start all services
sudo docker compose up -d
```

When executing the startup command, the `-d` parameter indicates background running mode (detached mode), and services will run in the background without occupying the current terminal window. Docker Compose will start each service in sequence according to dependency relationships: first start the backend API service, then start the background Pipeline service, and finally start the frontend service.

On the first startup, Docker needs to build images, which may take some time, especially if your network speed is slow. The build process will download necessary dependency packages and base images, so please be patient.

After startup is complete, the system will automatically create database table structures (if the database does not exist yet). The backend API service will connect to the MySQL database and create necessary tables and indexes. This process is automatic and requires no manual intervention.

If `READ_ON_STARTUP=true` is configured, the system will automatically scan the certificate directory after startup is complete, read information from all certificate files, and store it in the database. This process may take some time, depending on the number of files in the certificate directory.

## 7. Verify Deployment

### Step 1: Check Service Status

After startup, first check the running status of all services to ensure all containers have started normally.

```bash
# View all service statuses
sudo docker compose ps

# Should see all services with status "Up"
```

Under normal circumstances, you should see three services running: `NFX-Vault-Backend-API`, `NFX-Vault-Backend-Pipeline`, and `NFX-Vault-Frontend`. The status of all services should display as "Up".

If a service has not started normally, the status may display as "Exited" or "Restarting". In this case, you need to view the service logs to troubleshoot the problem.

### Step 2: View Service Logs

Viewing service logs can help you understand the service startup process and running status, and discover potential problems in time.

```bash
# View logs for all services
sudo docker compose logs -f

# Or view logs for specific service
sudo docker compose logs -f backend-api
sudo docker compose logs -f backend-pipeline
sudo docker compose logs -f frontend
```

When viewing logs, you need to pay attention to several key points. The backend API service should be able to successfully connect to the MySQL database, and there should be no database connection errors in the logs. Redis connection should also be normal, and there should be no connection failure errors. Kafka connection also needs to be normal, and the background Pipeline service needs to be able to connect to Kafka to consume messages.

If `READ_ON_STARTUP=true` is configured, you should see the certificate scanning process in the logs, including which directories were scanned and how many certificates were read.

### Step 3: Access Web Interface

Access the frontend Web interface through a browser to verify that the service is working normally.

```bash
# Access frontend Web interface
# Replace IP address with your actual NAS IP
http://192.168.1.64:10199
```

If the service starts normally, the browser should be able to open the Web interface. The interface should load normally and display the certificate list (if certificates have been scanned). If the interface cannot be opened, you need to check firewall settings and port mapping configuration.

### Step 4: Access API Documentation

NFX-Vault provides complete API documentation that can be accessed through Swagger UI or ReDoc.

```bash
# Swagger UI
http://192.168.1.64:10200/docs

# ReDoc
http://192.168.1.64:10200/redoc
```

The API documentation provides detailed descriptions of all API interfaces, including request parameters, response formats, etc. This is very useful for integrating NFX-Vault into other systems.

### Step 5: Test API Connection

You can test whether the API is working normally through command-line tools.

```bash
# Test health check endpoint
curl http://192.168.1.64:10200/health

# View Websites certificate list
curl "http://192.168.1.64:10200/vault/tls/check/websites?offset=0&limit=20"
```

If the API is working normally, these commands should return JSON-formatted response data. If error messages are returned, you need to troubleshoot based on the error content.

## 8. Integration with NFX-Edge

One of the main purposes of NFX-Vault is to provide certificate management services for NFX-Edge. After completing the deployment of NFX-Vault, you can integrate with NFX-Edge through the following steps.

First, ensure that NFX-Edge and NFX-Vault are on the same Docker network. NFX-Vault's `backend-api` service has been configured to connect to the `nfx-edge` network, so if NFX-Edge has been deployed, network connectivity should already be established.

Second, in NFX-Edge's configuration, the `dynamic/acme-challenge.yml` file should already be configured to forward ACME challenge requests to NFX-Vault's `backend-api` service. In this way, when applying for Let's Encrypt certificates through NFX-Vault, ACME challenge requests will be correctly forwarded.

Third, apply for certificates through NFX-Vault's Web interface. When applying for certificates, you need to specify `folder_name`, which determines the subfolder name of certificate files in the storage directory. After a successful application, certificate files will be automatically stored in the `${CERTS_DIR}/{folder_name}/` directory.

Fourth, update NFX-Edge's certificate configuration. Add the path of the new certificate in NFX-Edge's `dynamic/certs.yml` file, then restart the Traefik service to load the new certificate.

Through this integration method, you can achieve automatic certificate application and management, greatly simplifying the certificate management workflow.

## 9. Common Operations

### View Certificate List

Through the Web interface, you can view a list of all certificates, including certificate status, expiration time, remaining days, and other information. The system will automatically update the remaining days of certificates to help you keep track of certificate validity periods in time.

### Apply for New Certificates

Through the Web interface, you can apply for new Let's Encrypt certificates. When applying, you need to fill in domain name, email address, folder_name, and other information. The system will automatically handle the certificate application process, including ACME challenge verification, certificate generation, and other steps.

### Export Certificates

Through the Web interface, you can export certificate files to a specified directory with one click. The exported certificate files can be directly used by reverse proxy systems such as NFX-Edge. The export function supports batch operations, allowing you to export multiple certificates at once.

### Refresh Certificate Information

If files in the certificate directory have changed, you can rescan the directory and update certificate information in the database through the refresh function. Refresh operations can be triggered through the Web interface or through API calls.

### Command-Line Tool Usage

In addition to the Web interface, NFX-Vault also provides a command-line tool `cmd.sh` that can manage certificates without using the Web interface. The command-line tool provides an interactive interface where you can view certificate lists, verify certificate information, etc.

```bash
cd /home/kali/repo
./cmd.sh
```

The command-line tool will guide you to select the certificate type (Websites or Apis), then list all certificate directories. You can select a specific directory for verification and view detailed certificate information.

## 10. View Detailed Documentation

Before diving deep into using NFX-Vault, it is strongly recommended that you read the [NFX-Vault Official Documentation](https://github.com/NebulaForgeX/NFX-Vault) in detail. The official documentation contains more detailed and comprehensive content than this chapter, including detailed descriptions of all configuration items, complete API interface documentation, usage methods for advanced features, troubleshooting guides, etc.

In particular, the API documentation is very important for users who need to integrate NFX-Vault into automated processes. Through APIs, you can achieve certificate application automation, certificate status monitoring, automatic certificate exports, and other operations.

The official documentation also contains detailed descriptions of the project structure, which is very helpful for understanding how the system works, performing secondary development, or customization.

## Next Steps

After completing the deployment of NFX-Vault, you can start using the certificate management functionality. If NFX-Edge has been deployed, you can start applying for and managing certificates for NFX-Edge through NFX-Vault. If NFX-Edge has not been deployed yet, you can continue to deploy NFX-Edge and then integrate certificate management functionality.

You can also explore other features of NFX-Vault, such as automating certificate management through APIs, configuring scheduled tasks to automatically check certificate status, using command-line tools for batch operations, etc.

---

**NFX-Vault is the certificate management core of the NFX ecosystem. Correctly deploying and configuring it is the foundation for achieving automated certificate management.**

