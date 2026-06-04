---
title: MikroTik OpenVPN Remote Access Lab
category: Infrastructure
description: Secure MikroTik OpenVPN remote-access solution with certificate-based authentication, restricted management reachability, and hardened routing policy.
github: https://github.com/ZdravecPanov
hideGithub: true
mediaHeading: Validation clip and operational flow.
stack:
  - MikroTik RouterOS 7.x
  - OpenVPN
  - Certificate-based auth
  - DHCP
  - DNS
  - NTP
  - Firewall
  - NAT
  - Route control
images:
  - /images/mikrotik-openvpn-remote-access/02-security-overview.png
  - /images/mikrotik-openvpn-remote-access/01-reachability-and-latency.png
  - /images/mikrotik-openvpn-remote-access/03-vpn-traffic-and-status.png
imageCaptions:
  - Security overview dashboard showing SNMP reachability, uptime, memory, disk pressure, and interface-level traffic trends.
  - Monitoring dashboard confirming router reachability, latency, packet loss, and core interface health during validation.
  - VPN traffic and status panels used to confirm tunnel activity and operational state without exposing sensitive values.
videos:
  - /images/mikrotik-openvpn-remote-access/validation-clip.mp4
videoCaptions:
  - Short validation clip showing the remote-access workflow, tunnel behavior, and policy checks in action.
---

## Project Overview
Designed and deployed a secure MikroTik OpenVPN remote-access solution connecting a remote site to HQ using certificate-based authentication, restricted routing, and hardened firewall policies.

The goal was to keep the site reachable for administration while avoiding public exposure and keeping the remote LAN isolated from unrestricted HQ access.

## Key Achievements
- Secure HQ-to-site connectivity
- Certificate-based VPN authentication
- Restricted management access
- Controlled routing and NAT policies
- Repeatable deployment workflow
- Monitoring-backed validation with Zabbix and Grafana

## Why This Exists
The site needed a controlled way to join HQ for administration, troubleshooting, and limited inter-site traffic while keeping the remote LAN isolated from unrestricted access to the HQ LAN.

## Deployment Model
The setup follows a simple but practical sequence:

1. A minimal bootstrap configuration brings the router up with WAN connectivity, time synchronization, DNS, and the initial VPN client.
2. Certificates are imported and used to establish authenticated OpenVPN connectivity back to HQ.
3. The final configuration is applied once the tunnel is up and the site is reachable remotely.

This approach keeps the first contact small and recoverable, which is important when the router is installed at a remote location.

## Topology
The topology is summarized in the diagram below. It shows the tunnel path, the trust boundaries, and the monitoring layer used to validate the deployment after configuration changes.

![MikroTik OpenVPN topology diagram](/images/mikrotik-openvpn-remote-access/topology.svg)

## What Was Built
- Remote site router initialization workflow
- WAN connectivity with automatic addressing
- Local LAN bridge and DHCP service for the remote site
- OpenVPN-based tunnel back to HQ
- Certificate-backed authentication for the tunnel
- Firewall rules that separate router management, VPN management, and general forwarding traffic
- NAT rules for internet access and controlled HQ-to-site reachability
- Route control for the HQ side and the remote site
- Restricted management access to trusted administrative networks

## Security and Access Model
The public write-up intentionally omits any sensitive values such as:

- passwords
- certificate material
- exact internal addresses that would help target the environment
- any operational secrets used during deployment

At a high level, the security model uses dual-sided VPN authentication, explicit firewall policy, restricted management services, segmented site LAN and VPN transit logic, and least-privilege access for HQ administration.

## Traffic Policy
The traffic rules were designed to keep behavior predictable:

- HQ management traffic can reach the remote site through the tunnel
- the remote site can use the internet through its own WAN path
- the remote site does not get unrestricted access into the HQ LAN
- management interfaces are not left open to the broader internet

This keeps the VPN useful for operations without turning it into a general-purpose trust extension.

## Validation and Operational Checks
The deployment was validated by checking:

- tunnel establishment state
- route presence on the remote router
- active VPN session visibility on the HQ side
- reachability of allowed administrative paths
- firewall behavior for allowed versus blocked traffic
- management service restrictions

These checks matter more than a single connected status, because a tunnel can be up while the routing or policy is still wrong.

## Monitoring
The remote-access path was also considered from an operations standpoint. Zabbix and Grafana are the monitoring layer that make the tunnel and service behavior visible without exposing sensitive details.

In practice, that means the portfolio can show:

- tunnel reachability and session state
- router-side service health
- whether administrative paths are still restricted as intended
- whether the access pattern remains stable after changes

Grafana is the dashboard layer for at-a-glance visibility, while Zabbix is the system used for host and service monitoring signals. Together, they turn the VPN setup from "configured" into something that can be observed and trusted during daily use.

## Result
- VPN tunnel established successfully
- Remote management enabled without public exposure
- Administrative access limited to trusted networks
- Remote LAN kept isolated from unrestricted HQ access
- Deployment remains repeatable for future sites
- Zabbix and Grafana can be used to validate ongoing tunnel and service health

## What Was Deliberately Omitted
For safety, this portfolio page does not publish:

- the full router config
- bootstrap scripts
- certificate files
- VPN credentials
- secret transport details

Those artifacts exist in the working infrastructure notes, but they are not part of the public-facing project page.

## Evidence Media
The included screenshots and clip cover the most important validation points without exposing sensitive values:

- tunnel reachability and latency
- security and service health
- VPN traffic and interface status
- a short validation flow for the remote-access path

## Outcome
This project shows the network side of the portfolio in a practical way: not just that a tunnel exists, but that it was designed, hardened, and validated with operational boundaries in mind.


