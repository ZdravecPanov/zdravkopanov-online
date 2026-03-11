# Prometheus + Grafana Monitoring Setup (Linux + Windows)

This document captures the exact setup already built and tested, so it can be committed to GitHub without rebuilding from scratch.

## Environment

- Monitoring server (Ubuntu on ESXi): `192.168.1.52`
- Windows monitored host: `192.168.1.50`
- Grafana: native install on Ubuntu (`:3000`)
- Prometheus: native install on Ubuntu (`:9090`)
- Linux exporter: `node_exporter` on Ubuntu (`:9100`)
- Windows exporter: `windows_exporter` on Windows (`:9182`)

## Architecture

```text
Windows Host (192.168.1.50)
  └─ windows_exporter :9182
            │
            ▼
Ubuntu Monitoring Server (192.168.1.52)
  ├─ Prometheus :9090
  │    ├─ scrape localhost:9090
  │    ├─ scrape localhost:9100
  │    └─ scrape 192.168.1.50:9182
  │
  └─ Grafana :3000
       └─ Prometheus datasource + dashboards
```

## 1) Prometheus Installation (Ubuntu)

```bash
cd /tmp
wget https://github.com/prometheus/prometheus/releases/download/v2.51.2/prometheus-2.51.2.linux-amd64.tar.gz
tar xvf prometheus-2.51.2.linux-amd64.tar.gz
cd prometheus-2.51.2.linux-amd64

sudo useradd --no-create-home --shell /bin/false prometheus
sudo mkdir -p /etc/prometheus /var/lib/prometheus

sudo cp prometheus /usr/local/bin/
sudo cp promtool /usr/local/bin/
sudo cp prometheus.yml /etc/prometheus/
sudo cp -r consoles /etc/prometheus
sudo cp -r console_libraries /etc/prometheus

sudo chown -R prometheus:prometheus /etc/prometheus /var/lib/prometheus
sudo chown prometheus:prometheus /usr/local/bin/prometheus /usr/local/bin/promtool
```

Create systemd service:

`/etc/systemd/system/prometheus.service`

```ini
[Unit]
Description=Prometheus Monitoring
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
 --config.file=/etc/prometheus/prometheus.yml \
 --storage.tsdb.path=/var/lib/prometheus \
 --web.console.templates=/etc/prometheus/consoles \
 --web.console.libraries=/etc/prometheus/console_libraries
Restart=always

[Install]
WantedBy=multi-user.target
```

Start service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable prometheus
sudo systemctl start prometheus
sudo systemctl status prometheus
```

## 2) Node Exporter Installation (Ubuntu)

```bash
cd /tmp
wget https://github.com/prometheus/node_exporter/releases/download/v1.8.1/node_exporter-1.8.1.linux-amd64.tar.gz
tar xvf node_exporter-1.8.1.linux-amd64.tar.gz
cd node_exporter-1.8.1.linux-amd64

sudo useradd --no-create-home --shell /bin/false node_exporter
sudo cp node_exporter /usr/local/bin/
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter
```

Create service:

`/etc/systemd/system/node_exporter.service`

```ini
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter
Restart=always

[Install]
WantedBy=multi-user.target
```

Start service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable node_exporter
sudo systemctl start node_exporter
sudo systemctl status node_exporter
```

## 3) Windows Exporter Installation (Windows)

- Installed via MSI (`windows_exporter`) on `192.168.1.50`
- Metrics endpoint: `http://192.168.1.50:9182/metrics`
- Windows Firewall inbound rule added for TCP `9182`

PowerShell (Admin), if needed:

```powershell
New-NetFirewallRule -DisplayName "Prometheus Windows Exporter" -Direction Inbound -Protocol TCP -LocalPort 9182 -Action Allow
```

## 4) Prometheus Config Used

`/etc/prometheus/prometheus.yml`

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: []

rule_files:
  # - "alert.rules"

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]

  - job_name: "node_exporter"
    static_configs:
      - targets: ["localhost:9100"]

  - job_name: "windows"
    static_configs:
      - targets: ["192.168.1.50:9182"]
```

Apply changes:

```bash
sudo systemctl restart prometheus
```

Validate:

- `http://192.168.1.52:9090/targets`
- Expected: `prometheus`, `node_exporter`, `windows` all `UP`

## 5) Grafana Setup

1. Add Prometheus datasource:
   - URL: `http://localhost:9090`
2. Imported dashboards:
   - Linux Node Exporter Full: `1860`
   - Windows dashboard: `14694`
3. Custom panel fixes were required (queries/units/fields/variables).

## 6) Variables Used in Windows Dashboard

### `server`

- Type: Query
- Query: `label_values(windows_cpu_time_total, instance)`

### `disk`

- Type: Query
- Query type: Label values
- Metric: `windows_logical_disk_size_bytes`
- Label: `volume`
- Regex: `/^[A-Z]:/` (keeps `C:`, `D:`..., removes `HarddiskVolume*`)

## 7) Working PromQL Queries

### Windows CPU Usage (%)

```promql
100 - (avg by (instance) (rate(windows_cpu_time_total{instance=~"$server",mode="idle"}[5m])) * 100)
```

### Windows Memory Usage (%)

```promql
100 * (1 - (windows_memory_physical_free_bytes{instance=~"$server"} / windows_memory_physical_total_bytes{instance=~"$server"}))
```

### Windows Disk Usage (% by selected disk)

```promql
100 * (1 - (windows_logical_disk_free_bytes{instance=~"$server",volume="$disk"} / windows_logical_disk_size_bytes{instance=~"$server",volume="$disk"}))
```

### Windows Uptime (days)

```promql
(time() - windows_system_boot_time_timestamp{instance=~"$server"}) / 86400
```

## 8) Common Issues Fixed

- Prometheus startup panic (`Unable to create mmap-ed active query log`) fixed with ownership on `/var/lib/prometheus` and `/etc/prometheus`.
- `windows` target `DOWN` (`context deadline exceeded`) fixed by opening Windows firewall port `9182`.
- Grafana `N/A` in Stat panels fixed by:
  - Correct query (matching labels/variables)
  - `Calculation = Last (not null)`
  - Correct `Unit` (`percent 0-100`, `bytes`, etc.)
  - Correct `Fields` selection (no wrong field filter)
- Dashboard variable bugs fixed by configuring `disk` as `Label values`, not `Metrics`/`Label names`.

## 9) Final Result

The setup now provides working Linux and Windows monitoring in Grafana with dynamic server/disk selection and production-style panels for CPU, memory, disk, network, and uptime.
