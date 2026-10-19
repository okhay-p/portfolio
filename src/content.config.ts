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
    // Date the writeup was last checked against the project's code.
    checked: z.coerce.date().optional(),
    // Three or so sentences readers can take away without reading the whole note.
    takeaways: z.array(z.string()).optional(),
    // The homepage exhibit this note belongs to, for the link back to the cabinet.
    exhibit: z.string().optional(),
  }),
});

export const collections = { writing };
