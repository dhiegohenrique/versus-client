import Logo from '@/components/logo'
import Toolbar from '@/components/toolbar'
import userMixin from '@/shared/mixins/user.mixin'
import AuthService from '@/shared/services/auth.service'
import io from 'socket.io-client'
var patch = require('socketio-wildcard')(io.Manager)

export default {
  name: 'home',
  components: {
    Logo,
    Toolbar
  },
  mixins: [
    userMixin
  ],
  data () {
    return {
      event: 'authentication',
      authService: AuthService(),
      username: '',
      fields: [],
      isLoading: false,
      wallet: 0
    }
  },
  destroyed () {
    // this.sockets.unsubscribe(this.event)
    this.socket.disconnect()
  },
  mounted () {
    this.username = this.authService.getUsername()
    this.loadUser()

    const token = this.authService.getToken()
    this.socket = io(process.env.VUE_APP_URL_SOCKET)
    patch(this.socket)

    this.socket.on('connect', (data) => {
      // eslint-disable-next-line no-console
      console.log('conectou: ')
      this.socket.emit('authentication', { token })

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
  },
  methods: {
    async loadUser () {
      try {
        this.fields.push({
          label: 'Username',
          value: this.username
        })

        this.isLoading = true
        const res = await this.getUser()
        const user = res.data
        const { steam: { displayName }, tournamententries } = user
        this.wallet = user.wallet

        this.fields.push({
          label: 'Steam account',
          value: displayName
        })

        // {
        //   label: 'Riot account',
        //   value: 'riotAccount'
        // },

        const tournament = {
          label: 'Campeonatos',
          value: 'Nenhum campeonato'
        }

        if (tournamententries && tournamententries.length) {
          const values = tournamententries.map((tournamentEntry) => {
            return tournamentEntry.tournament_id
          })

          tournament.value = values.join('<br/>')
        }

        this.fields.push(tournament)

        // eslint-disable-next-line no-console
        console.log('displayName: ' + displayName)
        // eslint-disable-next-line no-console
        console.log('user: ' + JSON.stringify(res.data))
      } finally {
        this.isLoading = false
      }
    },
    logout () {
      // eslint-disable-next-line no-console
      console.log('sair')
    }
  }
}
