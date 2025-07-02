# @reizt/proc

Simplify Next.js backend using zod.

## Installation

```sh
npm install @reizt/proc @reizt/proc-nextjs
```

## Usage

> `~/*` is mapped to `src/*` in `tsconfig.json`

1. Define an endpoint definition that satisfies `Proc` interface

`src/procs/get-full-name.ts`

```ts
import type { Proc } from '@reizt/proc';
import { z } from 'zod';

export const getFullName = {
  method: 'get',
  path: '/full-name',
  input: z.object({
    firstName: z.string().min(1).max(10),
    lastName: z.string().min(1).max(10),
  }),
  output: z.object({
    fullName: z.string(),
  }),
  errors: {
    black_listed: 'bad_request',
  },
} satisfies Proc;
```

2. Implement the procedure

`src/backend/get-full-name.ts`

```ts
import { type ProcImpl, err, ok } from '@reizt/proc/server';
import type { getFullName } from '~/procs/get-full-name';

export const getFullNameImpl: ProcImpl<typeof getFullName> = async (input, meta) => {
  if (input.firstName === 'John') {
    return err('black_listed');
  }
  return ok({
    fullName: `${input.firstName} ${input.lastName}`,
  });
};
```

3. Define routes

`src/app/api/[[...all]]/route.ts`

```ts
import { registerProcs } from '@reizt/proc/server';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { getFullName } from '~/procs/get-full-name';
import { getFullNameImpl } from '~/backend/get-full-name';

const app = new Hono().basePath('/api');

registerProcs(app, (register) => {
  register(getFullName, getFullNameImpl);
});

export const GET = handle(app);
export const POST = handle(app);
```

4. Call the procedure from client-side

`src/app/ClientComponent.tsx`

```tsx
'use client';
import type { ProcResult } from '@reizt/proc';
import { useEffect, useState } from 'react';
import { getFullName } from '~/procs/get-full-name';

const api = new ProcRemoteClient('http://localhost:3000/api');

export function ClientComponent() {
  const [result, setResult] = useState<ProcResult<typeof getFullName> | null>(null);

  useEffect(() => {
    api.call(getFullName, { firstName: 'Michael', lastName: 'Jackson' }).then(setResult);
  }, []);

  if (result == null) {
    return <div>Loading...</div>;
  }

  if (!result.success) {
    return <div>Error: {result.error}</div>
  }

  return <div>Output: {result.output.fullName}</div>
}
```

5. Call the procedure from server-side

```tsx
import { directCallProc } from '@reizt/proc/server';
import { getFullName } from '~/procs/get-full-name';
import { getFullNameImpl } from '~/backend/get-full-name';

export async function ServerComponent() {
  const result = await directCallProc(getFullName, getFullNameImpl, {
    firstName: 'Michael',
    lastName: 'Jackson',
  });

  if (!result.success) {
    return <div>Error: {result.error}</div>
  }

  return <div>Output: {result.output.fullName}</div>
}
```

By running `npm run test.next`, you can run a sample app.
