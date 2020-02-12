import BaseMixin from './base.mixin'

const mixin = {
  mixins: [
    BaseMixin
  ],
  data () {
    return {
      urlLogin: '/oauth'
    }
  },
  methods: {
    requestLogin (data) {
      return this.requestPost(`${process.env.VUE_APP_URL_API}${this.urlLogin}`, data)
    },
    saveUser (data) {
      localStorage.setItem('user', JSON.stringify(data))
    }
  }
}

export default mixin
