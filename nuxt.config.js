require('dotenv').config()
export default {
  mode: 'spa',
 
  /*
    ** Headers of the page
    */
  head: {
    title: 'E-Commerce',
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
    credentials: false,
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
      // laravelSanctum: {
      //   provider: 'laravel/sanctum',
      //   url: 'lara',
      //   endpoints: {
      //     user: { url: '/user', method: 'get' },
      //     login: {
      //       url: '/login', method: 'post'
      //     }
      //   }
      // },

      local: {
        endpoints: {
          login: {
            url: "/lara/oauth/token",
            method: 'post',
            // propertyName: 'access_token'
          },
          logout: {
            url:  "/lara/logout",
            method: 'post'
          },
          user: {
            url: "/lara/api/v1/user",
            method: 'get',
            // propertyName: false
          }
        }
      },

      // laravelPassport: {
      //   provider: 'laravel/passport',
      //   endpoints: {
      //     userInfo: '/api/v1/user'
      //   },
      //   url: 'lara',
      //   clientId: process.env.CLIENT_ID,
      //   clientSecret: process.env.CLIENT_SECRET,
      // }

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
