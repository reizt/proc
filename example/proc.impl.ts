import { type ProcImpl, procResultBuilder } from '../src';
import { sampleAuthToken, samplePost } from './data';
import type { getPostP } from './proc';

const result = procResultBuilder<typeof getPostP>();

export const getPostPI: ProcImpl<typeof getPostP> = async (input) => {
	console.log(input.id, input.authToken);
	if (input.authToken !== sampleAuthToken) {
		return result('error.unauthorized');
	}
	if (input.id !== samplePost.id) {
		return result('error.not_found');
	}

	return result('ok', {
		post: samplePost,
	});
};
