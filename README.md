# BlackRoad Apps

[![PWA](https://img.shields.io/badge/PWA-50_apps-FF6B2B.svg)](https://apps.blackroad.io)
[![Offline First](https://img.shields.io/badge/offline-first-00D4FF.svg)](https://blackroad.io)
[![Installable](https://img.shields.io/badge/installable-service_worker-CC00AA.svg)](https://blackroad.io)



Application suite for the BlackRoad OS platform. 8 services spanning project management, streaming, blockchain, and infrastructure monitoring.

## Applications

| App | Stack | Description |
|-----|-------|-------------|
| **RoadMap** | Next.js, TypeScript, WebSockets | Project planning with real-time Kanban boards |
| **RoadWork** | Node.js, Express | Job board with AI matching |
| **RoadWorld** | Go, Gin, WebGL | Earth exploration and virtual environments |
| **RoadChain** | Rust, Actix-web, SHA-256 | Blockchain verification and immutable storage |
| **RoadCoin** | Python, FastAPI, Redis | Equity crowdfunding and crypto payments |
| **RoadView** | Node.js | Creative suite — design, video, AI generation |
| **PitStop** | Go, Gin | Infrastructure dashboard with real-time metrics |
| **RoadSide** | Node.js, Socket.io | Deployment portal and server connections |

## Deploy

```bash
# Deploy all
./DEPLOY_ALL.sh

# Deploy one app
~/blackroad-deploy/br-deploy deploy ~/blackroad-apps/roadmap aria64
```

## Architecture

Apps run on Raspberry Pi nodes (aria64) and DigitalOcean droplets behind Caddy reverse proxy.

```bash
# Check deployments
~/blackroad-deploy/br-deploy list aria64

# View logs
~/blackroad-deploy/br-deploy logs roadmap aria64
```

## Project Structure

```
blackroad-apps/
  roadmap/        # Project planning
  roadwork/       # Job portal
  roadworld/      # Earth exploration
  roadchain/      # Blockchain
  roadcoin/       # Crowdfunding
  roadview/       # Creative suite
  pitstop/        # Infrastructure dashboard
  roadside/       # Deploy portal
  DEPLOY_ALL.sh   # Batch deploy script
```

## License

Copyright 2026 BlackRoad OS, Inc. All rights reserved.
