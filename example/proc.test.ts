import type { ProcInput, ProcResult } from '../src';
import { sampleAuthToken, samplePost } from './data';
import type { getPostP } from './proc';
import { getPostPI } from './proc.impl';

describe('proc', () => {
	it('returns ok', async () => {
		const input: ProcInput<typeof getPostP> = {
			id: samplePost.id,
			authToken: sampleAuthToken,
		};
		const actual = await getPostPI(input);
		const want: ProcResult<typeof getPostP, 'ok'> = {
			result: 'ok',
			value: { post: samplePost },
		};
		expect(actual).toEqual(want);
	});
	it('returns error.not_found', async () => {
		const input: ProcInput<typeof getPostP> = {
			id: `${samplePost.id}-not-found`,
			authToken: sampleAuthToken,
		};
		const actual = await getPostPI(input);
		const want: ProcResult<typeof getPostP, 'error.not_found'> = {
			result: 'error.not_found',
		};
		expect(actual).toEqual(want);
	});
	it('returns error.unauthorized', async () => {
		const input: ProcInput<typeof getPostP> = {
			id: samplePost.id,
			authToken: `${sampleAuthToken}-unauthorized`,
		};
		const actual = await getPostPI(input);
		const want: ProcResult<typeof getPostP, 'error.unauthorized'> = {
			result: 'error.unauthorized',
		};
		expect(actual).toEqual(want);
	});
});
