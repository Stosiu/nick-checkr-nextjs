import type { NextConfig } from "next";
import { dirname } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const { version } = JSON.parse(readFileSync("./package.json", "utf-8"));

const nextConfig: NextConfig = {
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  serverExternalPackages: ['got-scraping'],
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
};

export default nextConfig;
