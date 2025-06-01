import { ClientGet } from './ClientGet';
import { ClientPost } from './ClientPost';
import { ServerGet } from './ServerGet';
import { ServerPost } from './ServerPost';

export default async function () {
	return (
		<div>
			<ServerGet />
			<ClientGet />
			<ServerPost />
			<ClientPost />
		</div>
	);
}
