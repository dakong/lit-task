import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
	input: ['src/index.js'],
	output: {
		file: 'build/index.js',
    format: 'es',
		sourcemap: true
	},
	plugins: [
    resolve(),
		babel(),
		serve({port: 3001, contentBase: 'build'}),
    livereload()
  ]
};
