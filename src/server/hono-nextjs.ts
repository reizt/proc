import type { Context, Hono } from 'hono';
import { cookies } from 'next/headers';
import type { ProcImpl, RequestMeta } from '.';
import type { Proc, ProcInput } from '../proc';

const handler = async <P extends Proc>(proc: P, impl: ProcImpl<P>, rawInput: ProcInput<P>, c: Context) => {
	let input: ProcInput<P> = rawInput;
	if (proc.input != null) {
		const result = proc.input.safeParse(input);
		if (!result.success) {
			return c.text('schema_error', 422);
		}
		input = result.data as ProcInput<P>;
	}

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
		return c.redirect(result.metadata.redirect);
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
		return c.text(result.error, 400);
	}
	if (result.output == null) {
		return new Response(null, { status: 204 });
	}
	return c.json(result.output);
};

const getHandler = async <P extends Proc>(proc: P, impl: ProcImpl<P>, c: Context) => {
	const input = proc.input?.parse(c.req.query()) ?? null;
	return handler(proc, impl, input as ProcInput<P>, c);
};

const postLikeHandler = async <P extends Proc>(proc: P, impl: ProcImpl<P>, c: Context) => {
	const body = await c.req.json();
	const input = proc.input?.parse(body) ?? null;
	return handler(proc, impl, input as ProcInput<P>, c);
};

export const registerProcs = (
	app: Hono,
	registerer: (register: <P extends Proc>(proc: P, impl: ProcImpl<P>) => void) => void,
) => {
	registerer((proc, impl) => {
		if (proc.method === 'get') {
			app.get(proc.path, async (c) => getHandler(proc, impl, c));
		} else {
			app[proc.method].bind(app)(proc.path, async (c) => postLikeHandler(proc, impl, c));
		}
	});
};
