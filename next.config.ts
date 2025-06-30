import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	api: {
		bodyParser: {
			sizeLimit: "50mb",
		},
	},
	serverExternalPackages: [
		"@ffmpeg/ffmpeg",
		"@ffmpeg/util",
		"remotion",
		"@remotion/bundler",
		"@remotion/renderer",
	],
	// Necessary for Remotion's webpack plugins
	webpack: (config) => {
		// Add support for importing worker files
		config.module?.rules?.push({
			test: /\.worker\.js$/,
			use: { loader: "worker-loader" },
		});

		return config;
	},
};

export default nextConfig;
