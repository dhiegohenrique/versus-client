import Logo from '@/components/logo'
import Toolbar from '@/components/toolbar'
import userMixin from '@/shared/mixins/user.mixin'
import AuthService from '@/shared/services/auth.service'
import io from 'socket.io-client'

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
    this.socket.disconnect()
  },
  mounted () {
    this.loadUser()

    const token = this.authService.getToken()
    this.socket = io(process.env.VUE_APP_URL_SOCKET)

    const self = this
    this.socket.on('connect', () => {
      this.socket.emit('authentication', { token })

      this.socket.on('walletUpdate', (data) => {
        self.wallet += Number(data)
        self.$refs.toolbar.updateWallet(self.wallet)
      })
    })
  },
  methods: {
    async loadUser () {
      try {
        this.username = this.authService.getUsername()

        this.fields.push({
          label: 'Username',
          value: this.username
        })

        this.isLoading = true
        const res = await this.getUser()
        const user = res.data
        const { steam: { displayName }, tournamententries, now } = user
        this.wallet = user.wallet

        this.fields.push({
          label: 'Steam account',
          value: displayName
        })

        const riot = {
          label: 'Riot account',
          value: 'Nenhuma conta vinculada'
        }

        if (user.riot) {
          riot.value = JSON.stringify(user.riot)
        }

        this.fields.push(riot)

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

        this.$refs.toolbar.updateDate(now)
      } finally {
        this.isLoading = false
      }
    }
  }
}
