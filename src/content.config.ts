import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sections = defineCollection({
  loader: glob({ pattern: '[0-9][0-9]-*.md', base: './src/content' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    words_target: z.number(),
  }),
});

export const collections = { sections };
