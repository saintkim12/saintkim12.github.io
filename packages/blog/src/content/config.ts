import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    relatedDocs: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
