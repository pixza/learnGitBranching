import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/js/app/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'LearnGitBranching',
    sourcemap: !isProduction
  },
  plugins: [
    alias({
      entries: [
        // Add any path aliases you might need
        { find: 'utils', replacement: path.resolve(__dirname, 'src/js/util') },
        { find: 'views', replacement: path.resolve(__dirname, 'src/js/views') },
        { find: 'models', replacement: path.resolve(__dirname, 'src/js/models') }
      ]
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
      dedupe: ['react', 'react-dom', 'jquery', 'backbone', 'underscore'],
      fallback: {
          "fs": false // or require.resolve("browserify-fs")
        }
    }),
    commonjs({
      include: ['node_modules/**'],
      transformMixedEsModules: true,
      // Handle jQuery global exports
      namedExports: {
        'node_modules/jquery/dist/jquery.js': ['$', 'jQuery'],
        'node_modules/backbone/backbone.js': ['Backbone'],
        'node_modules/underscore/underscore.js': ['_']
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      preventAssignment: true
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
      extensions: ['.js', '.jsx']
    }),
    ...(isProduction ? [
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info']
        },
        mangle: {
          // Keep function names for easier debugging
          keep_fnames: false
        }
      })
    ] : [])
  ],
  external: [],
  // Tree-shaking configuration
  treeshake: {
    moduleSideEffects: (id) => {
      // Keep side effects for CSS files and certain modules
      return /\.css$/.test(id) || 
             id.includes('jquery-ui') || 
             id.includes('raphael');
    },
    pureExternalModules: true,
    unknownGlobalSideEffects: false
  }
};