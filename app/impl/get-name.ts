import { type ProcImpl, err, ok } from '@reizt/proc/server';
import type { getName } from '../core/get-name';

export const getNameImpl: ProcImpl<typeof getName> = async (input, meta) => {
	if (input.firstName === 'John') {
		return err('black_listed_name');
	}
	return ok({
		fullName: `${input.firstName} ${input.lastName}`,
	});
};
