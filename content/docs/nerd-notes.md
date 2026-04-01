---
title: Nerd Notes
description: Technical overview of AutoButler — stack, architecture, installation, and development.
navigation:
  title: Nerd Notes
  order: 5
---

# Nerd Notes

A technical mirror of the [AutoButler README](https://github.com/autobutler-org/autobutler).
If you want to understand what's running in your house, this is the page.

---

## Stack

| Layer | Technology |
| ----- | ---------- |
| Backend | Go + [Gin](https://github.com/gin-gonic/gin) |
| Frontend | [Flutter](https://flutter.dev) (web, iOS, Android) |
| Database | SQLite via [modernc.org/sqlite](https://pkg.go.dev/modernc.org/sqlite) |
| Migrations | [golang-migrate](https://github.com/golang-migrate/migrate) |
| DB queries | [sqlc](https://sqlc.dev) |
| API docs | [Swagger/swag](https://github.com/swaggo/swag) |
| Observability | [OpenTelemetry](https://opentelemetry.io) |

The backend is a single Go binary that serves both the REST API and the Flutter web build.
On first boot it runs database migrations automatically.

---

## Installation

### Download and install a release

```bash
# Stop the running service if upgrading
sudo systemctl stop autobutler

OS="$(uname -s)"
ARCH="$(uname -m)"
case "$ARCH" in
  aarch64) ARCH="arm64";;
  x86_64)  ARCH="x86_64";;
esac

curl --fail -L \
  "https://github.com/autobutler-org/autobutler/releases/latest/download/autobutler_${OS}_${ARCH}.tar.gz" \
  | tar -xvz

sudo ./autobutler install
```

The `install` command registers AutoButler as a systemd service and starts it.
Once running, open `http://<device-ip>:80` in a browser.

### First boot

On first boot, the web UI shows a setup screen. Create your owner account — you'll get a
recovery phrase shown exactly once. Write it down. It's the only way to reset your password.

---

## API

The REST API is at `/api/v1/`. Swagger UI is at `http://<host>/swagger`.

### Authentication

All endpoints require a session token except `/auth/setup`, `/auth/login`,
`/auth/recover`, and `/auth/status`.

```bash
# Login
curl -s -X POST http://localhost/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"you","password":"your-password"}'
# → {"token":"<64-char hex token>"}

# Use the token
curl http://localhost/api/v1/health \
  -H "Authorization: Bearer <token>"
```

Tokens are valid for 30 days. Pass them as `Authorization: Bearer <token>` or as a
`session` cookie.

### Key endpoints

| Method | Path | What it does |
| ------ | ---- | ------------ |
| GET | `/api/v1/health` | System health (CPU, memory, disk, temperature) |
| GET | `/api/v1/cirrus` | List files |
| POST | `/api/v1/cirrus/upload/{path}` | Upload a file |
| GET | `/api/v1/storage/devices/status` | List storage devices |
| PATCH | `/api/v1/storage/devices/{devicePath}/name` | Rename a device |
| GET | `/api/v1/version` | Installed version |
| POST | `/api/v1/version/latest` | Update to latest release |

---

## Architecture notes

**Single binary.** The Go backend embeds the Flutter web build at compile time and serves it
alongside the API. No separate web server needed.

**SQLite.** All state lives in a SQLite database at `/var/lib/autobutler/data/autobutler.db`.
Migrations run on startup — safe to upgrade without manual intervention.

**Device detection.** On Linux, AutoButler reads `/proc/mounts` to discover storage devices.
USB device detection uses the `usbutil` package. Mounting/unmounting USB storage requires
root — run with `AS_ROOT=1` in development.

**Auth.** Passwords are bcrypt-hashed (cost 12). Session tokens are 32 bytes of
`crypto/rand` (256-bit entropy). The recovery phrase is a 6-word phrase from a 256-word
wordlist (~48 bits — deliberate tradeoff for usability on a home device).

**Updates.** The butler can update itself in-place via the `/version/update` API. It downloads
the new binary as a tarball, extracts it, and atomically renames it over the running binary.
The process exits and systemd restarts it.

---

## Development

**Prerequisites:** Go, Flutter, Make, [air](https://github.com/air-verse/air), sqlc, swag

```bash
git clone https://github.com/autobutler-org/autobutler.git
cd autobutler
make setup      # install dev tools
make generate   # sqlc + swag + flutter icons + sbom
make build      # build everything
```

### Run locally

```bash
make watch/backend          # backend with hot reload
make serve/frontend         # Flutter web
make emulate/android        # Android emulator
make serve/frontend/mobile  # Flutter mobile (after emulator is running)
```

### Useful targets

```bash
make check          # lint (Go + Flutter)
make format         # auto-format
make test           # run all tests
make coverage       # test coverage report
make help           # list all targets
```

Swagger UI is at `http://localhost:8080/swagger` when the backend is running locally.

---

## Source

- GitHub: [autobutler-org/autobutler](https://github.com/autobutler-org/autobutler)
- License: MIT
- Contributing:
  [CONTRIBUTING.md](https://github.com/autobutler-org/autobutler/blob/main/CONTRIBUTING.md)
