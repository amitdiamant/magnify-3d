import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import glsl from 'rollup-plugin-glsl';

export default {
  input: './src/Magnify3d.js',
  output: {
    file: 'build/Magnify3d.js',
    format: 'umd',
    name: 'Magnify3d',
    globals: {
      three: 'THREE',
    },
  },
  external: ['three'],
  plugins: [
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    glsl({
      include: 'src/shaders/*.glsl'
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    uglify({
      mangle: false,
      output: {
        comments: false,
        beautify: false,
      },
    }),
  ],
};
