import { required, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  name: 'address-form',
  mixins: [
    validationMixin
  ],
  data () {
    return {
      username: '',
      password: '',
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
    login () {
      // this.$root.$emit('showLoading')
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      // eslint-disable-next-line no-console
      console.log('validou login')
      this.isLoading = true
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
