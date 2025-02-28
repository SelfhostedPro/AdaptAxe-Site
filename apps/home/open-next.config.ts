import kvIncrementalCache from "@opennextjs/cloudflare/kv-cache";
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
import memoryQueue from "@opennextjs/cloudflare/memory-queue";

import { OpenNextConfig } from "@opennextjs/aws/types/open-next.js";

export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: memoryQueue,
}) as OpenNextConfig;
