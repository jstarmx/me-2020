import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import markdown from '@jackfranklin/rollup-plugin-markdown';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, warn) =>
    (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
    warn(warning);
const dedupe = (importee) => importee === 'svelte' || importee.startsWith('svelte/');

export default {
    client: {
        input: config.client.input(),
        output: config.client.output(),
        plugins: [
            replace({
                preventAssignment: true,
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
            svelte({
                compilerOptions: {
                    dev,
                    hydratable: true,
                },
                emitCss: true,
            }),
            resolve({
                browser: true,
                dedupe,
            }),
            commonjs(),

            legacy &&
                babel({
                    extensions: ['.js', '.mjs', '.html', '.svelte'],
                    runtimeHelpers: true,
                    exclude: ['node_modules/@babel/**'],
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: '> 0.25%, not dead',
                            },
                        ],
                    ],
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import',
                        [
                            '@babel/plugin-transform-runtime',
                            {
                                useESModules: true,
                            },
                        ],
                    ],
                }),

            !dev &&
                terser({
                    module: true,
                }),
        ],

        onwarn,
    },

    server: {
        input: config.server.input(),
        output: config.server.output(),
        plugins: [
            replace({
                preventAssignment: true,
                'process.browser': false,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
            svelte({
                compilerOptions: {
                    generate: 'ssr',
                    dev,
                },
            }),
            json(),
            markdown(),
            resolve({
                dedupe,
            }),
            commonjs(),
        ],
        external: Object.keys(pkg.dependencies).concat(
            // eslint-disable-next-line global-require
            require('module').builtinModules || Object.keys(process.binding('natives')),
        ),

        onwarn,
    },

    serviceworker: {
        input: config.serviceworker.input(),
        output: config.serviceworker.output(),
        plugins: [
            resolve(),
            replace({
                preventAssignment: true,
                'process.browser': true,
                'process.env.NODE_ENV': JSON.stringify(mode),
            }),
            commonjs(),
            !dev && terser(),
        ],

        onwarn,
    },
};
