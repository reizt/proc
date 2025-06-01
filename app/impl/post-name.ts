import { type ProcImpl, err, ok } from '../../src/server/types';
import type { postName } from '../core/post-name';

export const postNameImpl: ProcImpl<typeof postName> = async (input, meta) => {
	if (input.firstName === 'John') {
		return err('black_listed_name');
	}
	return ok({
		fullName: `${input.firstName} ${input.lastName}`,
	});
};
