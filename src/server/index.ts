import type { Proc, ProcError, ProcInput, ProcOutput, ProcResult } from '../proc';

export type Cookie = {
	value: string;
	httpOnly?: boolean;
	secure?: boolean;
	maxAge?: number;
	path?: string;
	domain?: string;
	sameSite?: 'lax' | 'strict' | 'none';
};

export type RequestMeta = {
	cookies: Record<string, string>;
};

export type RespnoseMeta = {
	setCookies?: Record<string, Cookie>;
	redirect?: string;
};

export type ServerProcResult<P extends Proc> = ProcResult<P> & { metadata?: RespnoseMeta };

export const ok = <P extends Proc>(output: ProcOutput<P>, metadata?: RespnoseMeta): ServerProcResult<P> => {
	return { success: true, output, metadata };
};

export const err = <P extends Proc>(error: ProcError<P>, metadata?: RespnoseMeta): ServerProcResult<P> => {
	return { success: false, error, metadata };
};

export type ProcImpl<P extends Proc> = (input: ProcInput<P>, metadata: RequestMeta) => Promise<ServerProcResult<P>>;
