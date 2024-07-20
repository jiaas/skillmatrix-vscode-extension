const esbuild = require('esbuild');

const watch = process.argv.includes('--watch');

const buildOptions = {
	entryPoints: ['./src/extension.ts'],
	bundle: true,
	external: ['vscode'],
	format: 'cjs',
	platform: 'node',
	outfile: 'out/extension.js',
};

if (watch) {
	esbuild.build({
		...buildOptions,
		watch: {
			onRebuild(error, result) {
				if (error) { console.error('watch build failed:', error); }
				else { console.log('watch build succeeded:', result); }
			},
		},
	}).then(result => {
		console.log('watching...');
	}).catch(() => process.exit(1));
} else {
	esbuild.build(buildOptions).catch(() => process.exit(1));
}