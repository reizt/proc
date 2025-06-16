import type { Proc } from '@reizt/proc';
import { z } from 'zod';

export const getName = {
  method: 'get',
  path: '/name',
  input: z.object({
    firstName: z.string().min(1).max(10),
    lastName: z.string().min(1).max(10),
  }),
  output: z.object({
    fullName: z.string(),
  }),
  errors: {
    black_listed_name: 'bad_request',
  },
} satisfies Proc;
