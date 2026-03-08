---
title: Prometheus + Grafana Monitoring
category: Monitoring
description: Monitoring stack for Windows hosts using Prometheus metrics, alerting rules, and Grafana dashboards.
github: https://github.com/ZdravecPanov
stack:
  - Prometheus
  - Grafana
  - Node Exporter
  - Alertmanager
images:
  - /images/prometheus-grafana-monitoring/Monitoring-CPU.png
  - /images/prometheus-grafana-monitoring/Memory.png
  - /images/prometheus-grafana-monitoring/disks.png
  - /images/prometheus-grafana-monitoring/network-dashboard.png
imageCaptions:
  - System Overview dashboard with host status, uptime, CPU, and memory summary.
  - Memory dashboard with usage breakdown, cache faults, and swap activity.
  - Disk dashboard with volume usage, I/O throughput, and latency panels.
  - Network dashboard with throughput, packets, errors, and queue length.
videos:
  - /images/prometheus-grafana-monitoring/WindowsMonitoring.mp4
videoCaptions:
  - Short walkthrough of the Windows monitoring dashboard and panel flow.
---

## Project Overview
This project centralizes infrastructure visibility for Windows systems with Prometheus as the metrics backend and Grafana as the dashboard layer.

## What Is Included
- Host-level metrics collection
- Service and resource dashboards
- Alerting flow with Alertmanager
- Baseline panels for CPU, memory, disk, and network

## Result
Improved observability, faster incident response, and consistent monitoring across multiple Windows servers.
