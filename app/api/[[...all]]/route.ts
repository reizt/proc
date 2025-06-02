import { registerProcs } from '@reizt/proc/server';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { getName } from '../../core/get-name';
import { postName } from '../../core/post-name';
import { getNameImpl } from '../../impl/get-name';
import { postNameImpl } from '../../impl/post-name';

const app = new Hono().basePath('/api');

registerProcs(app, (register) => {
	register(getName, getNameImpl);
	register(postName, postNameImpl);
});

export const GET = handle(app);
export const POST = handle(app);
