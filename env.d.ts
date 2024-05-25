/// <reference types="node" />

declare module 'process' {
	global {
		namespace NodeJS {
			interface ProcessEnv {
				readonly NODE_ENV: 'development' | 'test' | 'production';
			}
		}
	}
}
