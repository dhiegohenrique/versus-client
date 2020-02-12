import { required, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import loginMixin from '@/shared/mixins/login.mixin'

export default {
  name: 'address-form',
  mixins: [
    validationMixin,
    loginMixin
  ],
  data () {
    return {
      username: 'ViRRO',
      password: '12345678',
      isLoading: false
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
        // eslint-disable-next-line no-console
        console.log('res: ' + JSON.stringify(res.data))
        this.saveUser(res.data)
        // window.location = `${window.location.origin}/logged`
        this.$router.push('/logged')
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
