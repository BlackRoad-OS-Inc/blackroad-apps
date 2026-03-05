# BlackRoad Apps

**Proprietary Software - BlackRoad OS, Inc. All Rights Reserved.**

Complete application ecosystem for the BlackRoad operating system. 50 production-ready
Progressive Web Apps plus 8 core platform services deployed across Cloudflare, Railway,
and self-hosted infrastructure.

## Status

| Component | Platform | Status |
|-----------|----------|--------|
| Static PWAs (50) | Cloudflare Pages | Production |
| RoadMap | Railway / aria64 | Production |
| RoadWork | Railway / aria64 | Production |
| RoadWorld | Railway / shellfish | Production |
| RoadChain | Railway / shellfish | Production |
| RoadCoin | Railway / shellfish | Production |
| RoadView | Railway / aria64 | Production |
| PitStop | Railway / aria64 | Production |
| RoadSide | Railway / aria64 | Production |
| Health Monitor | Cloudflare Workers | Production |
| Task Runner | Cloudflare Workers | Production |

## Architecture

```
BlackRoad Apps Ecosystem
========================

Cloudflare Pages          Cloudflare Workers        Railway / Self-Hosted
+-----------------+       +------------------+      +------------------+
| index.html      |       | health-monitor   |      | roadmap (Next.js)|
| 50 PWA apps     |       | task-runner      |      | roadwork (Node)  |
| blackroad-*     |       |                  |      | roadview (Node)  |
+-----------------+       +------------------+      | roadside (Node)  |
                                                     | pitstop (Go)     |
                                                     | roadworld (Go)   |
                                                     | roadchain (Rust) |
                                                     | roadcoin (Python)|
                                                     +------------------+
```

## Applications

### Core Platform Services

| App | Stack | Description |
|-----|-------|-------------|
| **RoadMap** | Next.js, TypeScript, WebSockets | Project planning with real-time collaboration and Kanban boards |
| **RoadWork** | Node.js, Express | Job portal with AI matching and entrepreneur networking |
| **RoadWorld** | Go, Gin, WebSockets, WebGL | Metaverse with open-world Earth simulation |
| **RoadChain** | Rust, Actix-web, SHA-256 | Blockchain verification with immutable data storage |
| **RoadCoin** | Python, FastAPI, Redis | Non-IPO funding with equity crowdfunding and crypto payments |
| **RoadView** | Node.js | Creative suite with design tools and video editing |
| **PitStop** | Go, Gin | Infrastructure dashboard with real-time metrics |
| **RoadSide** | Node.js, Socket.io | Connections and deployment portal |

### 50 PWA Apps

All PWA apps are static, installable, and work offline. Each includes:
- `index.html` - App entry point
- `manifest.json` - PWA manifest for installability
- `blackroad-app.json` - App metadata

## Workflows

All GitHub Actions are pinned to specific commit hashes for security.

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Push/PR to main | Lint, validate, build all apps |
| `security-scan.yml` | Push/PR/Weekly | CodeQL analysis, dependency audit, secret scanning |
| `auto-deploy.yml` | Push to main | Deploy to Cloudflare Pages and Railway |
| `automerge.yml` | PR events | Auto-merge dependabot and labeled PRs |
| `self-healing.yml` | Every 6 hours | Health monitoring and auto-issue creation |
| `cloudflare-worker.yml` | Push to workers/ | Deploy Cloudflare Workers |

## Cloudflare Workers

### Health Monitor
Monitors all BlackRoad services every 5 minutes and exposes a status API.

```
GET /api/status  - Full service status with latency
GET /api/health  - Worker health check
```

### Task Runner
Handles long-running background tasks on a schedule.

```
GET /api/tasks       - List available tasks
GET /api/run/:task   - Trigger a specific task
GET /api/health      - Worker health check
```

## Deploy

### All Services
```bash
./DEPLOY_ALL.sh
```

### Individual App
```bash
cd roadmap && npm install && npm run build && npm start
cd roadcoin && pip install -r requirements.txt && uvicorn app:app
cd roadwork && npm install && node server.js
```

### Cloudflare Workers
```bash
cd workers/health-monitor && npx wrangler deploy
cd workers/task-runner && npx wrangler deploy
```

## Required Secrets

Configure these in GitHub repository settings:

| Secret | Service | Purpose |
|--------|---------|---------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare | Pages and Workers deployment |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare | Account identifier |
| `RAILWAY_TOKEN` | Railway | Service deployment |
| `DEPLOY_URL` | Health checks | Base URL for monitoring |

## Tech Stack

- **Frontend**: Next.js, React, static HTML/CSS/JS
- **Backend**: Node.js, Python (FastAPI), Go (Gin), Rust (Actix-web)
- **Real-time**: WebSockets, Socket.io
- **Data**: PostgreSQL, Redis, SQLAlchemy
- **Blockchain**: Custom Rust SHA-256 implementation
- **Infrastructure**: Cloudflare Pages, Cloudflare Workers, Railway
- **CI/CD**: GitHub Actions (all pinned to commit hashes)
- **Security**: CodeQL, Dependabot, secret scanning, dependency review

## License

**Proprietary** - BlackRoad OS, Inc. All Rights Reserved.

Copyright (c) 2024-2026 BlackRoad OS, Inc.
Founder, CEO & Sole Stockholder: Alexa Louise Amundson

This software is NOT open source. See [LICENSE](LICENSE) for full terms.
Stripe products and other third-party assets are included under their respective licenses.
