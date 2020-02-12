import AuthService from '@/shared/services/auth.service'
import moment from 'moment'

export default {
  name: 'toolbar',
  data () {
    return {
      authService: AuthService(),
      username: '',
      wallet: 0,
      date: null
    }
  },
  computed: {
    formattedDate () {
      if (!this.date) {
        return
      }

      return moment(this.date).format('DD/MM/YYYY HH:mm:ss')
    }
  },
  mounted () {
    this.username = this.authService.getUsername()
  },
  methods: {
    logout () {
      this.$router.push('/')
    },
    updateWallet (wallet) {
      this.wallet = wallet
    },
    updateDate (date) {
      this.date = date
    }
  }
}
