import type { ZodObject, ZodTypeAny, z } from 'zod';

type ErrorCode =
  | 'bad_request'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'method_not_allowed'
  | 'internal_server_error';

export interface Proc {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
  input: ZodObject<any> | null;
  output: ZodTypeAny | null;
  errors: Record<string, ErrorCode>;
}

type NullableInfer<T> = T extends ZodTypeAny ? z.infer<T> : null;

export type ProcInput<P extends Proc> = NullableInfer<P['input']>;
export type ProcOutput<P extends Proc> = NullableInfer<P['output']>;
export type ProcError<P extends Proc> = keyof P['errors'] | 'schema_error';

export type ProcResult<P extends Proc> =
  | {
      success: true;
      output: ProcOutput<P>;
    }
  | {
      success: false;
      error: ProcError<P>;
    };
