export type SafeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ValueOf<T> = T[keyof T];
export type NeverIfEmpty<T> = {
	[K in keyof T as keyof T[K] extends never ? never : K]: T[K];
};
export type DeleteIfValueIsNeverOrEmptyObj<T> = {
	[K in keyof T as T[K] extends never ? never : keyof T[K] extends never ? never : K]: T[K];
};
export type DeleteNever<T> = {
	[K in keyof T as T[K] extends never ? never : K]: T[K];
};
export type PartialIfOptional<T> = {
	[K in keyof T as undefined extends T[K] ? never : K]: T[K];
} & {
	[K in keyof T as undefined extends T[K] ? K : never]?: T[K];
};
