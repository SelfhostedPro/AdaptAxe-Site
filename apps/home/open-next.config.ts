import incrementalCache from "@opennextjs/cloudflare/kv-cache";
import type { OpenNextConfig } from "@opennextjs/aws/types/open-next.js";

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      incrementalCache: async () => incrementalCache,
      tagCache: "dummy",
      queue: "dummy"
    },
  },
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      generateDockerfile: true
    },
  },
  dangerous: {
    enableCacheInterception: true,
  },
};

export default config;
