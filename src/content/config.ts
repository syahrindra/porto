import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    tag: z.array(z.string()),
    link: z.string().optional(),
    github: z.string().optional(),
    featured: z.boolean().default(false),
    year: z.string(),
    coverImage: z.string(),
  }),
});

export const collections = {
  'projects': projectsCollection,
};
