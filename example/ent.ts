import { z } from 'zod';

export const postZ = z.object({
	id: z.string(),
	userId: z.string(),
	title: z.string(),
	body: z.string(),
});
export type Post = z.infer<typeof postZ>;
