import BaseMixin from './base.mixin'

const mixin = {
  mixins: [
    BaseMixin
  ],
  data () {
    return {
      urlLogin: 'oauth'
    }
  },
  methods: {
    requestLogin (data) {
      return this.requestPost(`${process.env.VUE_APP_URL_API}${this.urlLogin}`, data)
    }
  }
}

export default mixin
