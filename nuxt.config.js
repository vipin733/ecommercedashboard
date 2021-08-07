require('dotenv').config()
export default {
  mode: 'spa',
 
  /*
    ** Headers of the page
    */
  head: {
    title: 'Cameeto',
    meta: [
      {charset: 'utf-8'},
      {'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'},
      {hid: 'description', name: 'description', content: 'NuxtJs version of vue paper dashboard'}
    ],
    script: [
      {src: 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAamVCoyQ4AuvBpxVRMs9P-HFkfPVQj0Kw'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'},
      {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Muli:400,300'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat'}
    ]
  },

  //routing
  router: {
    middleware: ['auth'],
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/not-found-page.vue')
      })
    }
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'vue-notifyjs/themes/default.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/dashboard',
    { src: "~/plugins/vee-validate.js", ssr: true } ,
    '~/plugins/sweetalert.js',
    '~/plugins/axios.js',
    '~/plugins/flatpicker.js',
    '~/plugins/v-select.js',
    '~/plugins/quill-editor.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // '@nuxtjs/auth',
    '@nuxtjs/auth-next',

  ],


  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
    proxy: true,
  },

  proxy: {
    '/lara': {
      target: process.env.API_URL,
      pathRewrite: { '^/lara': '/' }
    }
  },
  

  auth: {
    // Options
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/dashboard'
    },

    strategies: {
      // local: {
      //   endpoints: {
      //     login: {
      //       url: process.env.API_URL + "/api/oauth/token",
      //       method: 'post',
      //       propertyName: 'access_token'
      //     },
      //     logout: {
      //       url:  process.env.API_URL + "/logout",
      //       method: 'post'
      //     },
      //     user: {
      //       url: process.env.API_URL + "/user",
      //       method: 'get',
      //       propertyName: false
      //     }
      //   }
      // },

      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'lara',
      }

    }

  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  }
}
