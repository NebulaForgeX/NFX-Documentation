# Chapter 4: NFX-Edge Reverse Proxy and Multi-Website Management Deployment

[NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) is a multi-website reverse proxy solution based on Traefik v3.4 and Docker Compose, providing unified multi-website management and automatic HTTPS support. This chapter will guide you through the deployment and configuration of NFX-Edge.

## Why Do We Need NFX-Edge?

NFX-Edge is the edge service layer of the NFX ecosystem, responsible for handling all HTTP/HTTPS traffic from the public internet. As the entry point of the entire system, it plays a crucial role in the architecture.

First, NFX-Edge provides a unified traffic entry point. In traditional deployment methods, each website requires a separate reverse proxy server configuration, which not only increases maintenance costs but also easily leads to configuration inconsistencies. NFX-Edge, through Traefik reverse proxy, centralizes all website traffic management in a single service, achieving unified traffic scheduling and routing.

Second, the system provides automatic HTTPS support. In the modern internet environment, HTTPS has become a basic requirement for websites, not only protecting user data security but also improving search engine rankings. NFX-Edge provides unified HTTPS encrypted access for all websites by integrating SSL/TLS certificates, ensuring secure communication between users and servers.

Regarding certificate usage, NFX-Edge uses SSL/TLS certificates to provide HTTPS services. It is important to note that certificate application and management are uniformly handled by the [NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) certificate management system. NFX-Edge can integrate with NFX-Vault to obtain certificates, but certificate management itself is not a function of NFX-Edge. This separation of responsibilities makes the system more modular and easier to maintain.

Additionally, NFX-Edge enables unified management of multiple websites. Whether it's a corporate website, admin panel, or personal blog, all can be managed in the same system. Each website has independent configuration and certificates, yet shares the same reverse proxy infrastructure, greatly simplifying the operations of multi-website environments.

From a deployment perspective, adding new websites has become very simple. You only need to add a few lines of configuration in the Docker Compose configuration file, create the corresponding website directory, and configure certificate paths to complete the deployment of a new website. There's no need to repeatedly set up reverse proxies, SSL certificates, and routing rules, as these are all handled uniformly by NFX-Edge.

Finally, the system has been optimized for production environments. Built-in security headers, Gzip compression, static resource caching, and other features ensure websites can run efficiently and securely. These optimizations require no additional configuration and work out of the box, greatly reducing deployment and maintenance complexity.

## Prerequisites

Before starting to deploy NFX-Edge, you need to ensure that your environment has completed the necessary foundational configuration work. These preparations are crucial for subsequent deployment and operation.

First, you need to complete the router configuration (refer to Chapter 1). The router is a key device connecting the internal network and the external network, and proper configuration is a prerequisite for NFX-Edge to work normally. Specifically, you need to configure port forwarding rules on the router to forward public network ports 80 (HTTP) and 443 (HTTPS) to the NAS device. At the same time, you must ensure that the DMZ function is disabled, as DMZ completely exposes the device to the public network, bypassing firewall protection and posing serious security risks. Additionally, you should check and correctly configure firewall rules to ensure only necessary ports are open to the public.

Second, the basic configuration of the NAS system also needs to be completed (refer to Chapter 2). Docker Engine is the container runtime environment for running NFX-Edge, and you must ensure it is properly installed and running. SSH service is a necessary tool for remote NAS management and command-line operations, and it should be enabled and access permissions configured. Bash environment configuration is very important for running scripts and development work. If your NAS system does not have Bash by default, you need to install and configure it according to the instructions in Chapter 2.

Regarding NFX Stack deployment (refer to Chapter 3), although NFX-Edge itself does not directly depend on the database and cache services in NFX Stack, following the recommended deployment order, it is recommended to deploy edge services after completing the core resource stack deployment. The benefit of doing this is to ensure that the infrastructure of the entire NFX ecosystem is ready, preparing for subsequent service deployment and integration.

Finally, domain DNS configuration is also an essential preparation work. All domains to be used should have DNS A records configured, pointing these domains to your NAS public IP address. DNS record propagation may take some time, and you can verify that DNS records are correctly propagated using the `nslookup` or `dig` commands. If DNS records have not propagated yet, NFX-Edge may not be able to route traffic correctly, or the certificate application process may fail.

## 1. Clone the Project Repository

### Step 1: Navigate to Deployment Directory

Switch to your chosen deployment directory (should be under the same parent directory as NFX Stack for unified management):

```bash
# Example: If your deployment directory is /volume1
cd /volume1

# Or your other chosen directory
```

### Step 2: Clone NFX-Edge Repository

Use Git to clone the [NFX-Edge](https://github.com/NebulaForgeX/NFX-Edge) repository:

```bash
git clone https://github.com/NebulaForgeX/NFX-Edge.git
```

After the clone operation is executed, the repository will be downloaded locally. By default, Git will create a directory named `NFX-Edge` to store the repository contents. Assuming your deployment directory is `<YOUR_DEPLOYMENT_DIR>`, the full project path will be `<YOUR_DEPLOYMENT_DIR>/NFX-Edge`. For example, if you choose to deploy under the `/volume1` directory, the final path will be `/volume1/NFX-Edge`.

**Optional: Rename Directory**

If you want to use a different directory name (e.g., `Websites`), you can rename it after cloning:

```bash
# First clone
git clone https://github.com/NebulaForgeX/NFX-Edge.git

# Then rename (optional)
mv NFX-Edge Websites
```

Or specify the directory name directly during cloning:

```bash
git clone https://github.com/NebulaForgeX/NFX-Edge.git Websites
```

### Step 3: Enter Project Directory

```bash
# If using the default name
cd NFX-Edge

# Or if you renamed the directory (e.g., to Websites)
# cd Websites
```

## 2. Create Configuration Files

### Step 1: Copy Docker Compose Configuration Template

NFX-Edge provides `docker-compose.example.yml` as a configuration template. We need to copy it and create the actual `docker-compose.yml` file:

```bash
cp docker-compose.example.yml docker-compose.yml
```

It is important to note that the `docker-compose.yml` file will contain your actual deployment configuration, including domain names, container names, and other personalized information. This file should not be committed to the Git repository, as each deployment environment has different configurations. The `.example.yml` file is a configuration template, mainly used for reference and documentation purposes, and can be safely committed to version control.

### Step 2: Create Environment Variables File

Create a `.env` file to configure environment variables:

```bash
cat > .env << EOF
CERTS_DIR=/volume1/certs/websites
TRAEFIK_CONFIG_FILE=/volume1/NFX-Edge/traefik.yml
TRAEFIK_DYNAMIC_DIR=/volume1/NFX-Edge/dynamic
NGINX_CONFIG_FILE=/volume1/NFX-Edge/nginx.conf
EOF
```

When creating the `.env` file, you need to configure it according to your actual deployment environment. Please replace `<YOUR_DEPLOYMENT_DIR>` in the template with your actual deployment directory path, for example `/volume1`. At the same time, replace `<PROJECT_DIR>` with the project directory name. By default, this is `NFX-Edge`, but if you renamed the directory after cloning the repository (for example, to `Websites`), you need to use the renamed name. Additionally, the `.env` file contains path and other configuration information and should also not be committed to the Git repository.

The environment variable file contains several key configuration items. `CERTS_DIR` specifies the path of the certificate storage directory, and all SSL/TLS certificate files for websites will be stored in this directory. `TRAEFIK_CONFIG_FILE` points to Traefik's static configuration file, which contains basic Traefik configuration information. `TRAEFIK_DYNAMIC_DIR` is the path to Traefik's dynamic configuration directory, and configuration files in this directory will be automatically monitored and reloaded by Traefik. Finally, `NGINX_CONFIG_FILE` specifies the path to the Nginx configuration file, which will be shared and used by all website service containers.

**Example:** If your deployment directory is `/volume1` and the project directory name is `NFX-Edge`:

```bash
CERTS_DIR=/volume1/certs/websites
TRAEFIK_CONFIG_FILE=/volume1/NFX-Edge/traefik.yml
TRAEFIK_DYNAMIC_DIR=/volume1/NFX-Edge/dynamic
NGINX_CONFIG_FILE=/volume1/NFX-Edge/nginx.conf
```

**If you renamed the directory:** If you renamed the project directory to `Websites`, replace `NFX-Edge` in the paths with `Websites` accordingly.

### Step 3: Create Certificate Directory

Create the certificate storage directory:

```bash
# Create certificate directory (replace <YOUR_DEPLOYMENT_DIR> with actual path)
mkdir -p /volume1/certs/websites

# Set appropriate permissions (optional, but recommended)
# chmod 755 /volume1/certs/websites
```

The certificate directory is where SSL/TLS certificate files for all websites are stored. To facilitate management and organization, each website uses an independent subfolder to store its own certificate files. Certificate files follow a uniform standard naming format: the certificate file is named `cert.crt`, and the private key file is named `key.key`. This naming convention ensures that NFX-Edge can correctly identify and load certificate files.

## 3. Configure Docker Compose

Edit the `docker-compose.yml` file and configure it according to your actual needs.

### Step 1: Configure Traefik Dashboard

In `docker-compose.yml`, find the `labels` section of the `reverse-proxy` service and modify the Traefik Dashboard domain:

```yaml
labels:
  - traefik.enable=true
  # Modify to your actual domain (e.g., traefik.yourdomain.com)
  - traefik.http.routers.web-dashboard.rule=Host(`traefik.yourdomain.com`) && (PathPrefix(`/dashboard`) || PathPrefix(`/api`))
  - traefik.http.routers.web-dashboard.entrypoints=websecure
  - traefik.http.routers.web-dashboard.tls=true
  - traefik.http.routers.web-dashboard.service=api@internal
  # Modify BasicAuth password hash (generate using htpasswd)
  - traefik.http.middlewares.dashboard-auth.basicauth.users=admin:$$2y$$05$$...
  - traefik.http.routers.web-dashboard.middlewares=dashboard-auth
```

**Generate BasicAuth Password Hash:**

```bash
# Generate password hash using htpasswd (if system has it installed)
htpasswd -nb admin your_password

# Or use Docker container to generate
docker run --rm httpd:alpine htpasswd -nb admin your_password

# Replace the output hash value in docker-compose.yml
```

### Step 2: Configure Website Services

According to your needs, add or modify website services in `docker-compose.yml`. The basic configuration for each website service is as follows:

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
    # Modify to your actual domain
    - traefik.http.routers.example.rule=Host(`example.com`) || Host(`www.example.com`)
    - traefik.http.routers.example.entrypoints=websecure
    - traefik.http.routers.example.tls=true
  networks:
    - nfx-edge
  depends_on:
    - reverse-proxy
```

In this configuration, there are several key configuration items to understand. `container_name` specifies the container name, and it is recommended to use meaningful naming conventions, such as `NFX-Edge-WWW-EXAMPLE`, so that the purpose of each container can be clearly identified. The `volumes` configuration item is used to mount data volumes, here mounting the website static file directory and Nginx configuration file, and using read-only mode (`:ro`), which means containers can only read these files and cannot modify them, improving security. The `labels` section contains Traefik routing rule configurations, where domain matching rules and TLS configuration are specified. Traefik will create routing rules based on these labels. The `networks` configuration ensures that all containers are connected to the `nfx-edge` network, allowing containers to communicate with each other. Finally, the `depends_on` configuration ensures that the `reverse-proxy` service starts first, which is important for dependency relationships, as website services need to wait for the reverse proxy service to be ready before they can work normally.

### Step 3: Create Website Directories

Create corresponding directories for each website and add static files:

```bash
# Create website directory (replace example.com with your actual domain)
mkdir -p www.example.com

# Copy website static files to the directory
# For example, if you have a built frontend project:
# cp -r /path/to/your/build/* www.example.com/

# Or create index.html directly in this directory for testing
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

## 4. Configure SSL/TLS Certificates

NFX-Edge itself does not manage certificates, but supports two certificate usage methods:

### Method 1: Using NFX-Vault (Recommended) ⭐

[NFX-Vault](https://github.com/NebulaForgeX/NFX-Vault) is a Web-based SSL certificate management and monitoring system responsible for uniformly applying, checking, exporting, and managing all SSL/TLS certificates. NFX-Edge obtains and uses certificates by integrating with NFX-Vault.

#### Install NFX-Vault

1. **Clone NFX-Vault Project**

```bash
# Navigate to deployment directory
cd <YOUR_DEPLOYMENT_DIR>

# Clone NFX-Vault repository
git clone https://github.com/NebulaForgeX/NFX-Vault.git
cd NFX-Vault

# Configure and start services according to NFX-Vault's README
docker compose up -d
```

2. **Configure Network Connection**

To ensure NFX-Vault and NFX-Edge can communicate properly, add network configuration to NFX-Vault's `docker-compose.yml`:

```yaml
services:
  backend-api:
    networks:
      - nfx-edge  # Add nfx-edge network
      # ... other network configurations

networks:
  nfx-edge:
    external: true  # Use external network
  # ... other network configurations
```

Then restart NFX-Vault service:

```bash
cd NFX-Vault
docker compose down
docker compose up -d
```

3. **Apply for Certificates via Web Interface**

- Access NFX-Vault Web interface
- Fill in domain, email, folder_name and other information
- Submit application and wait for certificate generation
- Certificates will be automatically stored in `${CERTS_DIR}/{folder_name}/` directory (files: `cert.crt` and `key.key`)

4. **Update certs.yml**

Add new certificate path in `dynamic/certs.yml`:

```yaml
tls:
  certificates:
    - certFile: /certs/websites/{folder_name}/cert.crt
      keyFile: /certs/websites/{folder_name}/key.key
      stores:
        - default
```

Then restart Traefik service to load the new certificate:

```bash
sudo docker compose restart reverse-proxy
```

**Verify Connection:**

```bash
# Check if NFX-Vault API is reachable
docker exec NFX-Edge-Reverse-Proxy wget -O- http://NFX-Vault-Backend-API:8000/health
```

### Method 2: Manually Provide Certificate Files

If you already have certificate files or want to manage certificates through other methods (certificate management is handled by external systems, NFX-Edge is only responsible for using certificate files):

1. **Create Certificate Directory**

```bash
# Create certificate directory for each website (replace folder_name with actual folder name)
mkdir -p ${CERTS_DIR}/{folder_name}

# For example:
mkdir -p /volume1/certs/websites/www_example
```

2. **Copy Certificate Files**

```bash
# Copy certificate files to corresponding directory
cp cert.pem ${CERTS_DIR}/{folder_name}/cert.crt
cp key.pem ${CERTS_DIR}/{folder_name}/key.key

# Set appropriate permissions (recommended)
chmod 600 ${CERTS_DIR}/{folder_name}/cert.crt
chmod 600 ${CERTS_DIR}/{folder_name}/key.key
```

3. **Update dynamic/certs.yml**

Add certificate path in `dynamic/certs.yml`:

```yaml
tls:
  certificates:
    - certFile: /certs/websites/{folder_name}/cert.crt
      keyFile: /certs/websites/{folder_name}/key.key
      stores:
        - default
```

4. **Restart Traefik Service**

```bash
sudo docker compose restart reverse-proxy
```

## 5. Verify Configuration

Before starting services, it is highly recommended to perform a comprehensive configuration check. This step can help you discover and resolve configuration issues in a timely manner, avoiding various errors after startup.

First, you need to check whether the configuration file format is correct. Both `docker-compose.yml` and `.env` files must comply with YAML and key-value pair syntax specifications. Any syntax errors may cause service startup failures. It is recommended to use the syntax checking function of text editors, or use online YAML validation tools to check configuration files.

Second, verify the correctness of all paths. All paths configured in environment variables should point to actually existing directories, or ensure that Docker has permission to create these directories. Paths should use absolute paths and avoid relative paths, which ensures that paths remain correct when executing commands from different working directories.

Domain configuration is also a key item to check. Ensure that all domains configured in `docker-compose.yml` have DNS A records correctly set up, and these records point to your NAS public IP address. If domain resolution is incorrect, users will not be able to access your websites, and the certificate application process may also fail.

Regarding certificate configuration, if you have already prepared certificate files, you need to confirm that these files are placed in the correct directories and that certificate paths are correctly configured in the `dynamic/certs.yml` file. Certificate file permissions are also important. It is recommended to set certificate file permissions to 600, so only the file owner can read and write.

Finally, perform port occupancy checks. Ports 80 and 443 are the standard ports for HTTP and HTTPS, and you must ensure that these ports are not occupied by other services. If ports are occupied, NFX-Edge services will not be able to start normally.

**Check Port Usage:**

```bash
# Check if ports are occupied
netstat -tuln | grep -E ':(80|443)'
# or
ss -tuln | grep -E ':(80|443)'
```

If ports are occupied, you need to stop the services occupying the ports first (e.g., Web Center, refer to Chapter 2).

## 6. Start Services

After completing all configurations, you can start NFX-Edge services:

```bash
# Ensure you are in the project directory
cd <YOUR_DEPLOYMENT_DIR>/NFX-Edge  # or the directory name you renamed to

# Start all services
sudo docker compose up -d
```

When executing the startup command, the `-d` parameter indicates background running mode (detached mode), which means the services will run in the background and will not occupy the current terminal window. After services start, Docker Compose will automatically create the required Docker networks (if networks do not exist yet), and then start each container in sequence according to dependency relationships. The entire startup process may take some time, especially on the first startup when Docker images need to be downloaded.

## 7. Verify Deployment

### Step 1: Check Service Status

```bash
# View all service statuses
sudo docker compose ps

# Should see all services with status "Up"
```

**Expected Output Example:**
```
NAME                          STATUS          PORTS
NFX-Edge-Reverse-Proxy        Up              0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
NFX-Edge-WWW-EXAMPLE          Up              80/tcp
```

### Step 2: View Service Logs

```bash
# View logs for all services
sudo docker compose logs -f

# Or view logs for specific service
sudo docker compose logs -f reverse-proxy
sudo docker compose logs -f www_example
```

When viewing logs, you need to pay attention to several key points. First, the Traefik reverse proxy service should start normally, and there should be no error messages in the logs. If you see error messages, you need to troubleshoot based on the error content. Second, certificate loading is also a key item to check. Check the logs for certificate-related error messages, such as certificate files not found, certificate format errors, etc. Finally, you need to confirm that routing rules are correctly configured. Traefik should be able to identify all configured services and routing rules.

### Step 3: Access Websites for Verification

Access various websites to verify services are working normally:

- **Main Site**: `https://www.example.com` (replace `example.com` with your actual domain)
- **Admin Panel**: `https://admin.example.com` (if admin panel is configured)
- **Traefik Dashboard**: `https://traefik.yourdomain.com/dashboard/`

When performing access verification, you need to check several key aspects. First, HTTPS connections should work normally, and the browser address bar should display a security lock icon, indicating that the connection is encrypted. Second, website content should display normally, which indicates that the Nginx container and file mounting are working properly. Third, HTTP requests should automatically redirect to HTTPS, which can be verified by accessing the HTTP version of the website. The browser should automatically jump to the HTTPS version. Finally, the Traefik Dashboard should be accessible normally. When accessing, you will be prompted to enter a username and password for BasicAuth authentication, which is to protect the management interface from unauthorized access.

### Step 4: Test HTTP to HTTPS Redirect

Access the HTTP version of the website, it should automatically redirect to HTTPS:

```bash
# Test redirect using curl
curl -I http://www.example.com

# Should see 301 or 308 redirect response
```

## 8. Add New Websites

When you need to add a new website, you can follow these steps:

### Step 1: Add Service in docker-compose.yml

Copy the existing website service configuration and modify relevant parameters:

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

### Step 2: Create Website Directory and Add Files

```bash
mkdir -p www.newdomain.com
# Put website static files in the directory
```

### Step 3: Prepare Certificates

Certificate preparation depends on the certificate management method you use. If you use NFX-Vault to manage certificates, you can apply for a new certificate through the Web interface, setting folder_name to `www_newdomain` during the application. If you use manual certificate management, you need to copy certificate files to the `${CERTS_DIR}/www_newdomain/` directory, ensuring the file names are `cert.crt` and `key.key` respectively.

### Step 4: Update dynamic/certs.yml

```yaml
tls:
  certificates:
    - certFile: /certs/websites/www_newdomain/cert.crt
      keyFile: /certs/websites/www_newdomain/key.key
      stores:
        - default
```

### Step 5: Start New Service

```bash
# Start new service
sudo docker compose up -d www_newdomain

# Restart Traefik to load new certificate
sudo docker compose restart reverse-proxy
```

## 9. Common Operations

### Restart Services

```bash
# Use restart script (recommended, if exists)
./restart.sh

# Or use Docker Compose command
sudo docker compose restart

# Restart specific service
sudo docker compose restart reverse-proxy
sudo docker compose restart www_example
```

### Stop Services

```bash
# Stop all services (preserve data)
sudo docker compose down

# Stop and delete data volumes
sudo docker compose down -v
```

### Update Services

```bash
# Pull latest images
sudo docker compose pull

# Recreate and start containers
sudo docker compose up -d
```

### Update Website Content

Website content is mounted via volumes, changes take effect immediately without restarting containers:

```bash
# Directly modify files in the corresponding directory
vim www.example.com/index.html

# After file modification, Nginx will automatically serve new content
```

### View Service Status

```bash
# View all service statuses
sudo docker compose ps

# View resource usage
docker stats
```

## 10. View Detailed Documentation

Before diving deep into using NFX-Edge, it is strongly recommended that you read the [NFX-Edge Official Documentation](https://github.com/NebulaForgeX/NFX-Edge) in detail. The official documentation contains more detailed and comprehensive content than this chapter, including detailed descriptions of all configuration options, usage methods for advanced features, troubleshooting guides, best practice recommendations, and detailed instructions for certificate management.

The official documentation is an important reference for learning and using NFX-Edge. It not only provides complete usage guides but also includes API documentation and best practices from actual deployments. By reading the official documentation, you can gain a deeper understanding of how the system works, master more advanced features, and find solutions faster when encountering problems. Whether for daily operations or system optimization, the official documentation is an indispensable reference resource.

## Next Steps

After completing NFX-Edge deployment, you can begin subsequent work. First, it is recommended to comprehensively verify all websites to ensure each website can be accessed normally, HTTPS connections work properly, and HTTP to HTTPS redirect functionality works correctly. If problems are found, troubleshoot and fix them promptly.

Next, you can continue configuring more website services. One of the advantages of NFX-Edge is the ability to easily add new websites. You only need to follow the instructions in the "Add New Websites" section of this chapter, add new service definitions in the configuration file, create corresponding website directories, and configure certificate paths.

If you haven't integrated NFX-Vault for certificate management yet, it is recommended to complete the integration as soon as possible. NFX-Vault provides a unified certificate management interface that can greatly simplify certificate application, renewal, and monitoring work. Through the Web interface, you can conveniently view the status and expiration times of all certificates and apply for new certificates or renew certificates that are about to expire in a timely manner.

Finally, you can begin deploying other NFX services, such as application services. NFX-Edge, as the edge service layer, can provide unified reverse proxy and HTTPS support for these backend services, enabling the entire NFX ecosystem to work together.

---

**NFX-Edge is the edge service layer of the NFX ecosystem. Correctly deploying and configuring it is the foundation for normal access to all website services.**

