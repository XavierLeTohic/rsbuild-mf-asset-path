import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

import { dependencies } from "./package.json";

export default defineConfig({
	plugins: [pluginReact()],
	server: {
		port: 5050,
	},
	output: {
		assetPrefix: "/",
	},
	html: {
		template: "./public/index.html",
	},
	moduleFederation: {
		options: {
			name: "host",
			remotes: {},
			exposes: {
				"./mySharedHook": "./src/shared/hooks/mySharedHook.ts",
			},
			shared: [
				{
					react: {
						requiredVersion: dependencies.react,
						singleton: true,
						eager: true,
					},
					"react-dom": {
						requiredVersion: dependencies["react-dom"],
						singleton: true,
						eager: true,
					},
				},
				"./src/shared/hooks/mySharedHook.ts",
			],
		},
	},
});
