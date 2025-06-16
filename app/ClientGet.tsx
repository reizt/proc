'use client';
import type { ProcResult } from '@reizt/proc';
import { useEffect, useState } from 'react';
import { api } from './api';
import { getName } from './core/get-name';

export function ClientGet() {
  const [success, setSuccess] = useState<ProcResult<typeof getName> | null>(null);
  const [failure, setFailure] = useState<ProcResult<typeof getName> | null>(null);

  useEffect(() => {
    api.call(getName, { firstName: 'Michael', lastName: 'Jackson' }).then(setSuccess);
    api.call(getName, { firstName: 'John', lastName: 'Doe' }).then(setFailure);
  }, []);

  return (
    <div>
      <h2>Client Get</h2>
      <pre>{JSON.stringify(success)}</pre>
      <pre>{JSON.stringify(failure)}</pre>
    </div>
  );
}
