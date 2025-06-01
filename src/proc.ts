import type { ZodObject, ZodTypeAny, z } from 'zod';

export interface Proc {
	method: 'get' | 'post' | 'put' | 'patch' | 'delete';
	path: string;
	input: ZodObject<any> | null;
	output: ZodTypeAny | null;
	error: string[];
}

type NullableInfer<T> = T extends ZodTypeAny ? z.infer<T> : null;
type ItemOf<T> = T extends Array<infer U> ? U : never;

export type ProcInput<P extends Proc> = NullableInfer<P['input']>;
export type ProcOutput<P extends Proc> = NullableInfer<P['output']>;
export type ProcError<P extends Proc> = ItemOf<P['error']> | 'schema_error';

export type ProcResult<P extends Proc> =
	| {
			success: true;
			output: ProcOutput<P>;
	  }
	| {
			success: false;
			error: ProcError<P>;
	  };
