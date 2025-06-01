import { directCallProc } from '../src/server/direct-nextjs';
import { postName } from './core/post-name';
import { postNameImpl } from './impl/post-name';

export async function ServerPost() {
	const success = await directCallProc(postName, postNameImpl, {
		firstName: 'Michael',
		lastName: 'Jackson',
	});
	const failure = await directCallProc(postName, postNameImpl, {
		firstName: 'John',
		lastName: 'Doe',
	});

	return (
		<div>
			<h2>Server Post</h2>
			<pre>{JSON.stringify(success)}</pre>
			<pre>{JSON.stringify(failure)}</pre>
		</div>
	);
}
