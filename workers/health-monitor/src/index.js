/**
 * BlackRoad Health Monitor - Cloudflare Worker
 * Monitors all BlackRoad services and reports status.
 *
 * Copyright (c) 2024-2026 BlackRoad OS, Inc. All Rights Reserved.
 * Proprietary and Confidential.
 */

const SERVICES = [
  { name: "blackroad-apps", url: "https://blackroad-apps.pages.dev" },
  { name: "roadmap", url: "https://roadmap.blackroad.io" },
  { name: "roadwork", url: "https://roadwork.blackroad.io" },
  { name: "roadcoin", url: "https://roadcoin.blackroad.io" },
  { name: "roadchain", url: "https://roadchain.blackroad.io" },
  { name: "roadworld", url: "https://roadworld.blackroad.io" },
  { name: "roadview", url: "https://roadview.blackroad.io" },
  { name: "pitstop", url: "https://pitstop.blackroad.io" },
  { name: "roadside", url: "https://roadside.blackroad.io" },
];

async function checkService(service) {
  const start = Date.now();
  try {
    const response = await fetch(service.url, {
      method: "HEAD",
      signal: AbortSignal.timeout(10000),
    });
    return {
      name: service.name,
      url: service.url,
      status: response.status,
      latency: Date.now() - start,
      healthy: response.status >= 200 && response.status < 400,
    };
  } catch (error) {
    return {
      name: service.name,
      url: service.url,
      status: 0,
      latency: Date.now() - start,
      healthy: false,
      error: error.message,
    };
  }
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/status") {
      const results = await Promise.all(SERVICES.map(checkService));
      const allHealthy = results.every((r) => r.healthy);

      return new Response(
        JSON.stringify(
          {
            status: allHealthy ? "operational" : "degraded",
            timestamp: new Date().toISOString(),
            services: results,
          },
          null,
          2
        ),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, max-age=60",
          },
        }
      );
    }

    if (url.pathname === "/api/health") {
      return new Response(
        JSON.stringify({ status: "ok", worker: "health-monitor" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response("BlackRoad Health Monitor", { status: 200 });
  },

  async scheduled(event, env, ctx) {
    const results = await Promise.all(SERVICES.map(checkService));
    const unhealthy = results.filter((r) => !r.healthy);

    if (unhealthy.length > 0) {
      console.log(
        `ALERT: ${unhealthy.length} services unhealthy:`,
        unhealthy.map((s) => s.name).join(", ")
      );
    }
  },
};
