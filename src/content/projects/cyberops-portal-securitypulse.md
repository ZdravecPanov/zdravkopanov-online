---
title: CyberOps Portal (SecurityPulse)
category: Security
description: Self-hosted DevOps Security Intelligence platform with HA IIS backend, NGINX load balancing, Cloudflare Tunnel edge exposure, and integrated Prometheus/Grafana/Zabbix monitoring.
github: https://github.com/ZdravecPanov/CyberOps-Portal
stack:
  - ASP.NET Core (.NET 8)
  - IIS
  - NGINX
  - Windows Server
  - Ubuntu Server
  - PostgreSQL
  - SQLite
  - Prometheus
  - Grafana
  - Zabbix
  - Cloudflare Tunnel
  - VMware ESXi
images:
  - /images/Windows%20Security%20Monitoring%20Dashboard/Windows%20security%20Overview.png
  - /images/prometheus-grafana-monitoring/Monitoring-CPU.png
imageCaptions:
  - Security telemetry and posture dashboard (example panel set).
  - Infrastructure monitoring panel from the observability layer.
---

## Project Overview
CyberOps Portal is a local-first, production-style security and infrastructure platform built to answer one operational question clearly: **what should the team fix today**.

The platform combines live threat intelligence feeds with environment-based prioritization and an HA web delivery model.

## Architecture
- **Public edge**: Cloudflare Tunnel
- **Load balancer**: LB01 (NGINX)
- **Web tier**: WEB01 + WEB02 (Windows Server + IIS, active-active)
- **Data tier**: DATA01 (PostgreSQL + collector pipeline)
- **Monitoring tier**: Prometheus + Grafana + Zabbix
- **Network model**: segmented LAN + DMZ design

## Key Features
- CVE/KEV/EPSS/MSRC/CISA-based threat ingestion
- Actionable morning briefing and "Fix Today" workflow
- Environment profile matching (vendor/platform/cloud)
- Fallback-safe data behavior and snapshot history
- CSV export and operational triage views
- Linux + Windows monitoring with alerting channels

## Operational Highlights
- High-availability IIS backend behind NGINX
- Public access without direct router port exposure
- Centralized observability with probe-based and host-based checks
- Security-focused dashboards and alert routing ready for team usage

## Live and Repository
- Live: [securitypulse.online](https://securitypulse.online)
- Repository: [CyberOps-Portal](https://github.com/ZdravecPanov/CyberOps-Portal)

## Outcome
A realistic DevOps + Security lab that is presentation-ready, useful for daily operations, and extensible toward full production hardening.
