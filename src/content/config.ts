import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string().default('Monitoring'),
    description: z.string(),
    stack: z.array(z.string()),
    github: z.string().url(),
    hideGithub: z.boolean().default(false),
    liveUrl: z.string().url().optional(),
    mediaHeading: z.string().optional(),
    images: z.array(z.string()).default([]),
    imageCaptions: z.array(z.string()).default([]),
    videos: z.array(z.string()).default([]),
    videoCaptions: z.array(z.string()).default([]),
  }),
});

export const collections = {
  projects,
};
