import { directCallProc } from '../src/server/direct-nextjs';
import { getName } from './core/get-name';
import { getNameImpl } from './impl/get-name';

export async function ServerGet() {
	const success = await directCallProc(getName, getNameImpl, {
		firstName: 'Michael',
		lastName: 'Jackson',
	});
	const failure = await directCallProc(getName, getNameImpl, {
		firstName: 'John',
		lastName: 'Doe',
	});

	return (
		<div>
			<h2>Server Get</h2>
			<pre>{JSON.stringify(success)}</pre>
			<pre>{JSON.stringify(failure)}</pre>
		</div>
	);
}
