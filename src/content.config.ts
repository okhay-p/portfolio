import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    project: z.string(),
    learningGoal: z.string(),
    tags: z.array(z.string()),
    image: z.string(),
    liveUrl: z.url().optional(),
    sourceUrl: z.url().optional(),
  }),
});

export const collections = { writing };
