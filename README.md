# BlackRoad Ecosystem 🛣️

Complete suite of platforms for the BlackRoad operating system.

## Applications

### 🗺️ RoadMap
**Project Planning & Collaboration Platform**
- Tech: Next.js, TypeScript, WebSockets
- Features: Real-time collaboration, Kanban boards, Analytics
- Target: aria64 (Raspberry Pi)

### 💼 RoadWork
**Job Portal & Entrepreneur Platform**
- Tech: Node.js, Express, MongoDB simulation
- Features: Job board, AI matching, Entrepreneur networking, Funding connections
- Target: aria64 (Raspberry Pi)

### 🌍 RoadWorld
**Metaverse & Game Creation Platform**
- Tech: Go, Gin, WebSockets, WebGL
- Features: Open world Earth simulation, Virtual HQs, Game creation, 3D assets
- Target: shellfish (Droplet)

### ⛓️ RoadChain
**Blockchain Verification System**
- Tech: Rust, Actix-web, SHA-256
- Features: Immutable data storage, Proof of work, Transaction verification
- Target: shellfish (Droplet)

### 💰 RoadCoin
**Non-IPO Funding Platform**
- Tech: Python, FastAPI, Redis
- Features: Equity crowdfunding, Crypto payments, Smart contracts
- Target: shellfish (Droplet)

### 🎨 RoadView
**Creative Suite**
- Tech: Node.js (future: Vue.js + Python)
- Features: Design tools, Video editing, AI generation, YouTube integration
- Target: aria64 (Raspberry Pi)

### 🔧 PitStop
**Infrastructure Dashboard**
- Tech: Go, Gin
- Features: Real-time metrics, Container management, DNS, Deployments
- Target: aria64 (Raspberry Pi)

### 🚦 RoadSide
**Connections & Deploy Portal**
- Tech: Node.js, Socket.io
- Features: Server connections, Deployment UI, DNS config, CLI integration
- Target: aria64 (Raspberry Pi)

## Quick Deploy

Deploy all applications:
```bash
cd ~/blackroad-apps
./DEPLOY_ALL.sh
```

Deploy individual app:
```bash
cd ~/blackroad-deploy
./br-deploy deploy ~/blackroad-apps/roadmap aria64
```

## Architecture

```
┌─────────────────────────────────────────┐
│         BlackRoad Ecosystem             │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────┐  ┌──────────┐            │
│  │  aria64  │  │shellfish │            │
│  │   (Pi)   │  │ (Droplet)│            │
│  └────┬─────┘  └────┬─────┘            │
│       │             │                   │
│  ┌────▼─────────────▼────┐             │
│  │   Caddy Reverse Proxy │             │
│  └─────────┬───────────── ┘            │
│            │                            │
│       ┌────▼────┐                       │
│       │  Apps   │                       │
│       └─────────┘                       │
└─────────────────────────────────────────┘
```

## Deployment Status

Check deployments:
```bash
~/blackroad-deploy/br-deploy list aria64
~/blackroad-deploy/br-deploy list shellfish
```

View logs:
```bash
~/blackroad-deploy/br-deploy logs roadmap aria64
~/blackroad-deploy/br-deploy logs roadworld shellfish
```

## DNS Configuration

Set up domains for each app:
```bash
~/blackroad-deploy/scripts/dns-manager.sh set roadmap.blackroad.io aria64
~/blackroad-deploy/scripts/dns-manager.sh set roadwork.blackroad.io aria64
~/blackroad-deploy/scripts/dns-manager.sh set roadworld.blackroad.io shellfish
~/blackroad-deploy/scripts/dns-manager.sh set roadchain.blackroad.io shellfish
~/blackroad-deploy/scripts/dns-manager.sh set roadcoin.blackroad.io shellfish
~/blackroad-deploy/scripts/dns-manager.sh set roadview.blackroad.io aria64
~/blackroad-deploy/scripts/dns-manager.sh set pitstop.blackroad.io aria64
~/blackroad-deploy/scripts/dns-manager.sh set roadside.blackroad.io aria64
```

## Tech Stack Summary

- **Frontend**: Next.js, React, Vue.js, Svelte
- **Backend**: Node.js, Python, Go, Rust
- **Real-time**: WebSockets, Socket.io
- **Data**: PostgreSQL, MongoDB, Redis
- **Blockchain**: Custom Rust implementation
- **3D/Graphics**: Three.js, WebGL
- **Deployment**: Docker, Custom buildpacks

## Features Across Ecosystem

✅ Real-time collaboration
✅ AI integration
✅ Blockchain verification
✅ Metaverse/3D worlds
✅ Job matching
✅ Funding platforms
✅ Creative tools
✅ Infrastructure monitoring

---

Built for BlackRoad OS 🛣️
