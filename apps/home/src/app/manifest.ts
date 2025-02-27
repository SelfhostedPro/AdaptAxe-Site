import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,

    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#171717",
    theme_color: "#b22222",
  };
}
