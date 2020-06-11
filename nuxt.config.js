
export default {
  mode: 'universal',
  env: {
    baseURL: 'http://localhost:3000'
  },
  generate: {
    routes: [
			'/',
      '/top',
      '/popular'
    ]
  },
  loading: { color: '#fff' },
  devModules: [
  ],
  modules: [
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    sass: [
      './assets/*.sass'
    ]
  },
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },
    extend(config, ctx) {
    },
    build: {
      postcss: {
        plugins: {
          'postcss-url': false,
          'postcss-nested': {},
          'postcss-responsive-type': {},
          'postcss-hexrgba': {}
        },
        preset: {
          autoprefixer: {
            grid: true
          }
        }
      }
    }
  }
}
