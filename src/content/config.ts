import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    pubDate: z.date(),
    metaDescription: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    })
  })
});

export const collections = {
  'blog': blogCollection
};