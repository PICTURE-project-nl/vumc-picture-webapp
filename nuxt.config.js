/* eslint-disable */
/*
Configuration for Nuxt.js

Documentation: https://nuxtjs.org/guide/configuration
 */

const scssConfig = require('./src/config/scss-config')

module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8000'
  },
  server: {

    host: '0.0.0.0'

  },
  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.0.0/polyfill.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/nodelist-foreach-polyfill@1.2.0/index.js' }
    ],
  },
  css: [
    '@/assets/styles/global.scss',
  ],
  generate: {
    routes: [
      '/'
    ]
  },
  ssr: false,
  // modules: [
  //   '@nuxtjs/router',
  //   ['@nuxtjs/moment', ['nl']],
  //   'cookie-universal-nuxt',
  //   'nuxt-sass-resources-loader',
  //   'nuxt-mq'
  // ],
  modules: [
    'cookie-universal-nuxt',

  ],
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/router'
  ],
  build: {
    loaders: {
      scss: {
        sassOptions: {
          quietDeps: true
        }
      }
    }
  },
  plugins: [
    '@/plugins/vue-dummy',
    '@/plugins/vuelidate',
    '@/plugins/vue-apexcharts'
  ],
  mq: {
    defaultBreakpoint: 'default',
    breakpoints: scssConfig.mqBreakpoints
  },
  styleResources: {
    scss: [
      '~/assets/styles/config.scss'
    ]
  },
  srcDir: 'src/',
  watch: [
    '@/config/**/*'
  ]
}
