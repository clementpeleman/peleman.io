import path from "node:path";
import { fileURLToPath } from "node:url";
import type { WebpackOverrideFn } from "@remotion/bundler";

// `@/` wijst naar de root van de site, zoals in de Next.js-app.
const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const webpackOverride: WebpackOverrideFn = (config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: { ...(config.resolve?.alias as Record<string, string> | undefined), "@": site },
  },
});
