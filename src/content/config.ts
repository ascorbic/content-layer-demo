import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";
import { spaceLoader } from "../loaders/space-loader.js";

const launches = defineCollection({
  type: "experimental_data",
  loader: spaceLoader(),
});

const dogs = defineCollection({
  type: "experimental_data",
  loader: file("src/data/dogs.json"),
  schema: z.object({
    breed: z.string(),
    id: z.string(),
    size: z.string(),
    origin: z.string(),
    lifespan: z.string(),
    temperament: z.array(z.string()),
  }),
});

const spacecraft = defineCollection({
  type: "experimental_content",
  loader: glob({ pattern: "*.md", base: "./src/data/spacecraft" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.string(),
      tags: z.array(z.string()),
      heroImage: image().optional(),
    }),
});

export const collections = { launches, dogs, spacecraft };
