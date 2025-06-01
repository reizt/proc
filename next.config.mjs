export default {
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		tsconfigPath: './tsconfig.next.json',
		ignoreBuildErrors: true,
	},
};
