import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

import { dependencies } from "./package.json";

export default defineConfig({
	plugins: [pluginReact()],
	server: {
		port: 5050,
	},
	html: {
		template: "./public/index.html",
	},
	tools: {
		rspack: (config, { appendPlugins }) => {
			// Will work in dev only if set to "/"
			config.output.publicPath = "auto";

			appendPlugins([
				new ModuleFederationPlugin({
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
				}),
			]);
		},
	},
});
