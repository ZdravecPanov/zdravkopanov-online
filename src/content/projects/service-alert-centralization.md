---
title: Service Alert Centralization (Grafana)
category: Monitoring
description: Centralized multi-service health alerting in Grafana with provisioned rules, webhook routing, and validated delivery for core infrastructure services.
github: https://github.com/ZdravecPanov
hideGithub: true
stack:
  - Grafana Alerting
  - Zabbix
  - Prometheus
  - Webhook Contact Points
  - YAML Provisioning
  - Linux Services
images:
  - /images/Windows%20Security%20Monitoring%20Dashboard/Screenshot%202026-03-30%20152719.png
imageCaptions:
  - Service and infrastructure alert context used for centralized rule validation.
---

## Project Overview
This project centralized service-health alerting in Grafana so core infrastructure alerts follow one clear path and one consistent notification format.

The implementation moved from fragmented checks to provisioned alert rules and explicit webhook routing.

## Service Coverage
Rules were provisioned for core services such as:
- Grafana
- Prometheus
- Zabbix server
- Apache
- MariaDB
- Mail relay service
- Blackbox exporter

## What Was Improved
- File-based alert rule provisioning for repeatable deployments
- Explicit receiver routing for service-alert contact points
- Token-validated webhook delivery behavior
- Better troubleshooting flow when datasource or dependency issues occur

## Real Operational Outcomes
- Service failures trigger consistent alert delivery through the relay pipeline
- Faster detection of dependency outages (for example local database/frontend failures)
- Better incident signal quality through centralized policy and message handling
