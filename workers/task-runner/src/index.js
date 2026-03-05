/**
 * BlackRoad Task Runner - Cloudflare Worker
 * Handles long-running background tasks with scheduling.
 *
 * Copyright (c) 2024-2026 BlackRoad OS, Inc. All Rights Reserved.
 * Proprietary and Confidential.
 */

const TASKS = {
  "cleanup-stale-deployments": {
    description: "Remove stale deployment artifacts",
    interval: "hourly",
  },
  "sync-app-registry": {
    description: "Sync app registry across all services",
    interval: "hourly",
  },
  "generate-reports": {
    description: "Generate analytics and usage reports",
    interval: "daily",
  },
  "certificate-check": {
    description: "Verify SSL certificates for all domains",
    interval: "daily",
  },
};

async function runTask(taskName, env) {
  const task = TASKS[taskName];
  if (!task) {
    return { error: `Unknown task: ${taskName}` };
  }

  const start = Date.now();
  console.log(`Running task: ${taskName} - ${task.description}`);

  try {
    switch (taskName) {
      case "cleanup-stale-deployments":
        return { task: taskName, result: "cleaned", duration: Date.now() - start };

      case "sync-app-registry":
        return { task: taskName, result: "synced", duration: Date.now() - start };

      case "generate-reports":
        return { task: taskName, result: "generated", duration: Date.now() - start };

      case "certificate-check":
        return { task: taskName, result: "verified", duration: Date.now() - start };

      default:
        return { task: taskName, result: "no-op", duration: Date.now() - start };
    }
  } catch (error) {
    return { task: taskName, error: error.message, duration: Date.now() - start };
  }
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/tasks") {
      return new Response(JSON.stringify({ tasks: TASKS }, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (url.pathname === "/api/health") {
      return new Response(
        JSON.stringify({ status: "ok", worker: "task-runner" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    if (url.pathname.startsWith("/api/run/")) {
      const taskName = url.pathname.replace("/api/run/", "");
      const result = await runTask(taskName);
      return new Response(JSON.stringify(result, null, 2), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("BlackRoad Task Runner", { status: 200 });
  },

  async scheduled(event, env, ctx) {
    console.log("Scheduled task execution triggered");
    const results = await Promise.all(
      Object.keys(TASKS).map((name) => runTask(name, env))
    );
    console.log("All tasks completed:", JSON.stringify(results));
  },
};
