import Logo from '@/components/logo'
import Login from '@/components/login'
import io from 'socket.io-client'
var patch = require('socketio-wildcard')(io.Manager)

export default {
  name: 'home',
  components: {
    Logo,
    Login
  },
  data () {
    return {
      event: 'authentication'
    }
  },
  destroyed () {
    // this.sockets.unsubscribe(this.event)
    this.socket.disconnect()
  },
  mounted () {
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk5NjA4ZmUxMTAzZmFjMDExMzhjNjcwYWY3ZjdhNTVkODQ2YTI2N2VlMGZkNjBmMjMyYTYwNmUyYjdhYWNmMzk0MDBhMzcwOTU4MjEwYWE4In0.eyJhdWQiOiJWaVJSTyIsImp0aSI6Ijk5NjA4ZmUxMTAzZmFjMDExMzhjNjcwYWY3ZjdhNTVkODQ2YTI2N2VlMGZkNjBmMjMyYTYwNmUyYjdhYWNmMzk0MDBhMzcwOTU4MjEwYWE4IiwiaWF0IjoxNTgxNDY4MDc0LCJuYmYiOjE1ODE0NjgwNzQsImV4cCI6MTU4MTU1NDQ3Mywic3ViIjoiVmlSUk8iLCJzY29wZXMiOlsidXNlciJdfQ.Fx1yfLFqdF7To6YfDVlJ7PaHJ2cBpfOmd1Fncfhy8HXYNlJOV1NOCag_v6LDqJhC9sx3C4Ow747mbj4cdhHCL5c5pZBI-iQB8OfXbgkCEfzFkJdkFf580UpUdXKfZL_mB_dnMJGLA7v2D9cTAV7bUHzv94tAZ03Bgvp3DFxhuaYz55eRll2ISdP466c1gZi0MayoXMrhnN8a0QllhVudYtpqspjKONzfxwg_h9GpMyPg9pomH6Ti7LEg9cSMT_xDFXUcyT1UBv3N2d0EdYumrxgE5Lnl0lU67Z5E6hspqXDWAXT9g85jX7r3xWcq6m4Wglfj_8w2TnldfVDdKN7l3Q'
    const token = JSON.parse(localStorage.getItem('user')).access_token
    const url = process.env.VUE_APP_URL_SOCKET
    // eslint-disable-next-line no-console
    console.log('url: ' + url)

    this.socket = io(url)

    // this.socket = io(url, {
    //   query: 'token=' + token
    // })

    // this.socket = io(url, {
    //   query: {
    //     Token: token
    //   }
    // })
    patch(this.socket)

    // eslint-disable-next-line no-console
    // console.log('envia: ' + token)
    // this.socket.send(`/${this.event}`, token)
    // this.socket.send(token)
    // this.socket.send(this.event)
    // this.socket.send(this.event, token)

    this.socket.on('connect', (data) => {
      // eslint-disable-next-line no-console
      console.log('conectou: ')
      this.socket.emit('authentication', { token: token })

      // this.socket.emit('authentication', token)
      this.socket.on('authenticated', function (data) {
        // eslint-disable-next-line no-console
        console.log('entrou aqui1: ' + JSON.stringify(data))
      })

      this.socket.on('*', function (packet) {
        // eslint-disable-next-line no-console
        console.log('teste: ' + JSON.stringify(packet))
      })

      this.socket.on('connection', (socket) => {
        // eslint-disable-next-line no-console
        console.log('entrou aqui1: ' + socket)
      })

      this.socket.on('authentication', () => {
        // eslint-disable-next-line no-console
        console.log('autenticou !!!!')
      })
    })
  }
}
