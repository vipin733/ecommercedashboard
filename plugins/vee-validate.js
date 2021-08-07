import Vue from 'vue'
import VeeValidate from 'vee-validate'

import 'sweetalert2/dist/sweetalert2.min.css'

Vue.directive('VeeValidate', VeeValidate)

Vue.use(VeeValidate, {
  inject: true
})