import AuthService from '@/shared/services/auth.service'

export default {
  name: 'toolbar',
  data () {
    return {
      authService: AuthService(),
      username: ''
    }
  },
  props: {
    wallet: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.username = this.authService.getUsername()
  },
  methods: {
    logout () {
      this.$router.push('/')
    }
  }
}
