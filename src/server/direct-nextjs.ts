import { cookies } from 'next/headers';
import type { Proc, ProcInput, ProcOutput } from '../proc';
import { type ProcImpl, type RequestMeta, type ServerProcResult, err, ok } from './types';

export const directCallProc = async <P extends Proc>(
	proc: P,
	impl: ProcImpl<P>,
	input: ProcInput<P>,
): Promise<ServerProcResult<P>> => {
	const ck = await cookies();
	const ckMap: Record<string, string> = {};
	for (const item of ck.getAll()) {
		ckMap[item.name] = item.value;
	}
	const requestMeta: RequestMeta = {
		cookies: ckMap,
	};

	const result = await impl(input as ProcInput<P>, requestMeta);
	if (result.metadata?.redirect) {
		// Redirect is not supported
	}
	if (result.metadata?.setCookies) {
		for (const name in result.metadata.setCookies) {
			const cookie = result.metadata.setCookies[name]!;
			ck.set(name, cookie.value, {
				httpOnly: cookie.httpOnly,
				secure: cookie.secure,
				maxAge: cookie.maxAge,
				path: cookie.path,
			});
		}
	}
	if (!result.success) {
		return err(result.error);
	}
	if (result.output == null) {
		return ok(null as ProcOutput<P>);
	}
	return ok(result.output);
};
