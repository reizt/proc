import { z } from 'zod';
import type { Proc } from '../src';
import { postZ } from './ent';

export const getPostP = {
	input: {
		authToken: z.string(),
		id: postZ.shape.id,
	},
	output: {
		ok: {
			post: postZ,
		},
		'error.not_found': {},
		'error.unauthorized': {},
	},
} satisfies Proc;
