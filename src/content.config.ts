import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
	// Load Markdown and MDX files in the `src/content/news/` directory.
	loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			author: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image(),
			pinned: z.boolean().optional(),
			tags: z.array(z.string()).optional(),
		}),
});

export const collections = { news };
