import type { Loader } from "astro/loaders";
import { schemas } from "./space-schema.js";
import { z } from "astro/zod";

const API_URL =
  "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?format=json&limit=20";

type LaunchesResponse = z.infer<
  typeof schemas.PaginatedLaunchSerializerCommonList
>;

export function spaceLoader(): Loader {
  return {
    name: "space-loader",
    load: async ({ store, meta, logger }) => {
      logger.info("Loading launches 🚀");

      const lastSynced = meta.get("lastSynced");

      // Don't sync more than once a minute
      if (lastSynced && Date.now() - Number(lastSynced) < 1000 * 60) {
        logger.info("Skipping sync");
        return;
      }

      const launches: LaunchesResponse = await fetch(API_URL).then((res) =>
        res.json()
      );

      if (!launches.results) {
        logger.error("No results found in the response");
        return;
      }

      store.clear();

      for (const data of launches.results) {
        store.set({ id: data.slug, data });
      }

      meta.set("lastSynced", String(Date.now()));
    },
    schema: schemas.LaunchSerializerCommon,
  };
}
