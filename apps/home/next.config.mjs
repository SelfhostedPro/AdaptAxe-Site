import withBundleAnalyzer from "@next/bundle-analyzer";

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "three"],
  redirects: [
    {
      source: '/explore',
      destination: '/',
      permanent: true,
    },
  ],

  experimental: {
    // Disable for turbo
    typedRoutes: process.env.NODE_ENV === "development" ? false : true,
  },
  eslint: {
    ignoreDuringBuilds: process.env.SKIP_LINTER === "true",
  },
  typescript: {
    ignoreBuildErrors: process.env.SKIP_LINTER === "true",
  },
};

export default process.env.ANALYZE === "true"
  ? withBundleAnalyzer()(nextConfig)
  : nextConfig;
