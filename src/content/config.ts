import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    pubDate: z.date(),
    metaDescription: z.string(),
    draft: z.boolean(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string()),
  })
});

export const collections = {
  'blog': blogCollection
};