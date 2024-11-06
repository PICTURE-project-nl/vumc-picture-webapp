/*
Adds support for Babel configuration

Documentation: http://babeljs.io/docs/en

Note 1: Node.js doesn't support ES6 exports, but this setup for Babel enables us to require ES6 exports within Javascript
files outside the Nuxt.js build system.

Note 2: Nuxt.js ignores this file, to use Babel within Nuxt.js see https://nuxtjs.org/api/configuration-build#babel
 */

module.exports = {
  'presets': [
    ['@babel/preset-env', {
      'targets': {
        'node': 'current'
      },
      'modules': 'commonjs'
    }],
  ]
}
