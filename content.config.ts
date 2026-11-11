import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      // Load every file inside the `content` directory
      source: "**",
      // Specify the type of content in this collection
      type: "page",
      schema: z.object({
        date: z.string().optional(),
        author: z.string().optional(),
      }),
    }),
  },
});
