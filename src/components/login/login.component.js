import { required, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import loginMixin from '@/shared/mixins/login.mixin'
import AuthService from '@/shared/services/auth.service'

export default {
  name: 'address-form',
  mixins: [
    validationMixin,
    loginMixin
  ],
  data () {
    return {
      username: '',
      password: '',
      isLoading: false,
      authService: AuthService()
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(3)
    },
    password: {
      required,
      minLength: minLength(3)
    }
  },
  mounted () {
    this.authService.removeUser()
  },
  methods: {
    async login () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      try {
        this.$root.$emit('showLoading')
        this.isLoading = true
        const res = await this.requestLogin({ username: this.username, password: this.password })
        const user = res.data
        user.username = this.username
        this.authService.saveUser(user)
        this.$router.push('/home')
      } finally {
        this.$root.$emit('hideLoading')
        this.isLoading = false
      }
    },
    clear () {
      this.username = ''
      this.password = ''
    },
    getUsernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) {
        return errors
      }

      if (!this.$v.username.required) {
        errors.push('Insira o username')
      }

      addMinLengthError(errors, this.$v.username)
      return errors
    },
    getPasswordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }

      if (!this.$v.password.required) {
        errors.push('Insira a senha')
      }

      addMinLengthError(errors, this.$v.password)
      return errors
    }
  }
}

const addMinLengthError = (errors, field) => {
  if (!field.minLength) {
    errors.push('Insira pelo menos 3 caracteres')
  }
}
