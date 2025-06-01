'use client';
import type { ProcResult } from '@reizt/proc';
import { useEffect, useState } from 'react';
import { api } from './api';
import { postName } from './core/post-name';

export function ClientPost() {
	const [success, setSuccess] = useState<ProcResult<typeof postName> | null>(null);
	const [failure, setFailure] = useState<ProcResult<typeof postName> | null>(null);

	useEffect(() => {
		api.call(postName, { firstName: 'Michael', lastName: 'Jackson' }).then(setSuccess);
		api.call(postName, { firstName: 'John', lastName: 'Doe' }).then(setFailure);
	}, []);

	return (
		<div>
			<h2>Client Post</h2>
			<pre>{JSON.stringify(success)}</pre>
			<pre>{JSON.stringify(failure)}</pre>
		</div>
	);
}
