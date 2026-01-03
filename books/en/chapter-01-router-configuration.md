# Chapter 1: Router Configuration and Network Security Setup

Before deploying any NFX services, please ensure that you have met the following prerequisites. These preparations are crucial for subsequent deployment and operation.

## Prerequisites Checklist

Before starting the configuration, please confirm the following points:

1. **Network Environment Verification**
   - Ensure your location has stable internet access services
   - WiFi router or ONU (Optical Network Unit) device is configured and functioning properly
   - Understand your network topology (public IP type, NAT type, etc.)

2. **Special Requirements for Chinese Users**
   - If you are located in mainland China, due to ISP network restrictions, you need to apply to your network service provider (such as China Unicom, China Mobile, China Telecom, etc.) to open specific ports
   - This is a basic requirement for enabling external network access to your private server
   - Usually requires providing a reasonable business purpose statement, and some regions may require registration

3. **Users in Other Regions**
   - If you are located in other regions with internet access, you can usually proceed with configuration directly
   - It is recommended to first confirm whether your ISP has restrictions on inbound connections

## Router Configuration Guide

This guide uses Telus ONU (Optical Network Unit) as an example. The interfaces of different router brands and models may vary slightly, but the core configuration items and principles are the same.

### 1. Access Router Management Interface

First, you need to log in to your router's management control panel. Usually, you can access it through:

- Enter the router's default gateway address in your browser (common ones include `192.168.1.1`, `192.168.0.1`, `10.0.0.1`, etc.)
- Log in using the administrator account and password
- Refer to the screenshot below for the specific interface (reference: `../../images/ONU_Dashboard.png`)

![ONU Dashboard](../../images/ONU_Dashboard.png)

### 2. Firewall Security Configuration

The firewall is the first line of defense protecting your network, and correct configuration is crucial. Find the firewall or security settings section in the router management interface (reference: `../../images/ONU_Firewall.png`).

![ONU Firewall](../../images/ONU_Firewall.png)

#### ⚠️ Critical Step: Disable DMZ Function

**Important: The DMZ (Demilitarized Zone) function must remain disabled!**

##### Why Must DMZ Be Disabled?

The DMZ function works by forwarding all traffic from the public network that does not match other port forwarding rules directly to a specified internal device. This is equivalent to completely exposing the device to the public network, bypassing all firewall protection.

##### Docker Firewall Rule Priority Issue

According to Docker official documentation:
- [Docker Packet Filtering and Firewalls](https://docs.docker.com/engine/network/packet-filtering-firewalls/)
- [Docker Port Publishing and Mapping](https://docs.docker.com/engine/network/port-publishing/)

Docker's design philosophy prioritizes container connectivity over security isolation. When you use the `ports` configuration item in Docker Compose files (or use the `-p` / `--publish` parameter) to publish container ports, Docker automatically creates and manages underlying firewall rules (iptables or nftables) on the host.

These rules ensure that published ports are accessible to the host and external networks by default through NAT (Network Address Translation), port mapping, and forwarding mechanisms. Therefore, Docker's official documentation explicitly states: **"Publishing container ports is insecure by default"**.

The firewall rules created by Docker are primarily intended to:
- Implement network isolation between containers
- Ensure port connectivity
- **NOT to provide security control based on source addresses, subnets, or access policies**

Traditional system-level firewalls (such as NAS built-in firewalls, ufw, firewalld, etc.) often take effect after data packets have already been processed by Docker's NAT rules, so they cannot effectively intercept access to published container ports.

**Key Points:**
- Docker container firewall rules have higher priority than NAS system firewall rules
- Once ports are published through Docker, system-level firewalls are effectively unable to provide protection
- Based on this, we recommend placing the security boundary at the network entry layer rather than relying on container or system-level firewalls

##### Configuration Recommendations Summary

Based on the above analysis, we strongly recommend:

- ✅ **DMZ function must be disabled** - Avoid completely exposing internal devices
- ✅ **Do not configure firewall rules on NAS** - Configuration is ineffective due to priority issues
- ✅ **Perform access control at the router/ONU layer** - This is the most effective security boundary

### 3. Configure Port Forwarding Rules

Port forwarding is the key configuration for routing public network traffic to internal devices. Find the port forwarding or virtual server settings in the router management interface (reference: `../../images/ONU_PortForwarding.png`).

![ONU Port Forwarding](../../images/ONU_PortForwarding.png)

#### Required Port Configuration

The following ports are required for running NFX services:

- **Port 80 (HTTP)** - Required
  - Used for HTTP traffic and HTTP to HTTPS redirection
  - Let's Encrypt certificate verification (HTTP-01 challenge) also depends on this port

- **Port 443 (HTTPS)** - Required
  - Used for HTTPS encrypted traffic
  - All production environment services should be provided through this port

#### Other Optional Ports

Depending on the specific services you deploy, you may also need to open other ports:

- Database management interface ports (such as phpMyAdmin, pgAdmin)
- Specific ports for other business services
- Monitoring and management tool ports

**Recommendation:** Only open additional ports when truly necessary, following the principle of least privilege.

## Security Strategy Explanation

### Recommended Solution: Implement Access Control at Router Layer

Due to Docker's priority handling of host firewall rules, we strongly recommend the following security strategy:

#### Solution 1: Router/ONU Layer Control (Recommended) ⭐

**Advantages:**
- 🚀 **Easy to implement** - Unified management at a single entry point
- 💰 **Lowest cost** - No additional hardware equipment required
- 🛡️ **Most effective** - Implement security policies at the network boundary
- 📊 **Simple management** - Centralized management of all network rules

**Implementation:**
Through the router/ONU's firewall rules and port forwarding configuration, access control is performed before data packets enter the internal network. This allows:
- Restricting access from specific IP address ranges
- Setting access time restrictions
- Recording access logs
- Blocking malicious traffic

#### Solution 2: Dual NAS Architecture (Alternative)

If you need stricter isolation, you can consider:

- **Forwarding NAS** - Acts as a gateway and reverse proxy, responsible for handling all inbound traffic
- **Main NAS** - Runs actual business services, only communicates with the forwarding NAS

**Applicable Scenarios:**
- Scenarios with extremely high security requirements
- Environments requiring physical isolation
- Situations with additional hardware resources

#### Other Technical Solutions

Although technically possible to achieve finer control through:
- Configuring Docker's DOCKER-USER chain for custom rules
- Using Docker network policies (Network Policies)
- Configuring container-level security groups

Considering implementation complexity, maintenance costs, and actual effectiveness, we recommend Solution 1.

---

**After completing router configuration, your network environment is ready, and you can proceed to the next chapter for NAS system configuration.**
