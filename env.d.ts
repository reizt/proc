/// <reference types="node" />

global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly NODE_ENV: 'development' | 'test' | 'production';
		}
	}
}
