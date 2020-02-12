import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toasted from 'vue-toasted'
// import VueSocketIO from 'vue-socket.io'
// import io from 'socket.io-client'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk5NjA4ZmUxMTAzZmFjMDExMzhjNjcwYWY3ZjdhNTVkODQ2YTI2N2VlMGZkNjBmMjMyYTYwNmUyYjdhYWNmMzk0MDBhMzcwOTU4MjEwYWE4In0.eyJhdWQiOiJWaVJSTyIsImp0aSI6Ijk5NjA4ZmUxMTAzZmFjMDExMzhjNjcwYWY3ZjdhNTVkODQ2YTI2N2VlMGZkNjBmMjMyYTYwNmUyYjdhYWNmMzk0MDBhMzcwOTU4MjEwYWE4IiwiaWF0IjoxNTgxNDY4MDc0LCJuYmYiOjE1ODE0NjgwNzQsImV4cCI6MTU4MTU1NDQ3Mywic3ViIjoiVmlSUk8iLCJzY29wZXMiOlsidXNlciJdfQ.Fx1yfLFqdF7To6YfDVlJ7PaHJ2cBpfOmd1Fncfhy8HXYNlJOV1NOCag_v6LDqJhC9sx3C4Ow747mbj4cdhHCL5c5pZBI-iQB8OfXbgkCEfzFkJdkFf580UpUdXKfZL_mB_dnMJGLA7v2D9cTAV7bUHzv94tAZ03Bgvp3DFxhuaYz55eRll2ISdP466c1gZi0MayoXMrhnN8a0QllhVudYtpqspjKONzfxwg_h9GpMyPg9pomH6Ti7LEg9cSMT_xDFXUcyT1UBv3N2d0EdYumrxgE5Lnl0lU67Z5E6hspqXDWAXT9g85jX7r3xWcq6m4Wglfj_8w2TnldfVDdKN7l3Q'

Vue.config.productionTip = false
Vue.use(Toasted, { singleton: true })
// Vue.use(new VueSocketIO({
//   connection: io(process.env.VUE_APP_URL_SOCKET, token)
// }))

new Vue({
  vuetify,
  router,
  // sockets: {
  //   connect: function () {
  //     // eslint-disable-next-line no-console
  //     console.log('socket connected')
  //   },
  //   customEmit: function (data) {
  //     // eslint-disable-next-line no-console
  //     console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
  //   }
  // },
  render: h => h(App),
  beforeMount () {
    const name = this.$vuetify.breakpoint.name
    Vue.prototype.isMobile = name === 'xs' || name === 'sm'
  }
}).$mount('#app')
