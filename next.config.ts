import type { NextConfig } from "next";
import { INSTALL_SCRIPT_SOURCE } from "./lib/site";

const nextConfig: NextConfig = {
  // omatty#517: `curl -fsSL https://omatty.com/install.sh | sh`. A redirect,
  // not a rewrite, so the site never proxies or caches the script: what runs
  // is exactly the file on omatty's main. Temporary, so a client never pins it.
  async redirects() {
    return [
      {
        source: "/install.sh",
        destination: INSTALL_SCRIPT_SOURCE,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
