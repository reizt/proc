import type { Proc, ProcError, ProcInput, ProcOutput, ProcResult } from './proc';

export class ProcRemoteClient {
	constructor(public readonly baseUrl: string) {}

	async call<P extends Proc>(proc: P, input: ProcInput<P>): Promise<ProcResult<P>> {
		const response = proc.method === 'get' ? await this.#get(proc, input) : await this.#postLike(proc, input);
		if (response.status >= 400) {
			const text = await response.text();
			return { success: false, error: text as ProcError<P> };
		}
		if (proc.output != null) {
			const json = await response.json();
			return { success: true, output: json };
		}
		return { success: true, output: null as ProcOutput<P> };
	}

	async #get<P extends Proc>(proc: P, input: ProcInput<P>): Promise<Response> {
		const url = new URL(proc.path, this.baseUrl);
		if (proc.input != null) {
			for (const key in proc.input.shape) {
				if ((input as any)[key] == null) continue;
				url.searchParams.set(key, JSON.stringify((input as any)[key]));
			}
		}
		return await fetch(url.toString());
	}

	async #postLike<P extends Proc>(proc: P, input: ProcInput<P>): Promise<Response> {
		const url = new URL(proc.path, this.baseUrl);
		return await fetch(url.toString(), {
			method: proc.method,
			body: JSON.stringify(input),
		});
	}
}
