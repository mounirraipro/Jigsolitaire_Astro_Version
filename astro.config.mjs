import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";
import { siteConfig } from "./src/data/siteConfig";

const resolveSite = () => {
  const configuredSite = process.env.SITE_URL?.trim() || siteConfig.siteUrl;
  const url = new URL(configuredSite);

  if (url.hostname !== "jigsolitaire.online" && url.hostname.endsWith(".jigsolitaire.online")) {
    url.hostname = "jigsolitaire.online";
  }

  return url.origin;
};

const site = resolveSite();

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "always",
  compressHTML: false,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push", "gtag"],
      },
    }),
  ],
});
