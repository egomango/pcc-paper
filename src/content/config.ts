import { defineCollection, z } from 'astro:content';

const sections = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    words_target: z.number(),
  }),
});

export const collections = { sections };
