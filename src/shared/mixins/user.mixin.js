import BaseMixin from './base.mixin'

const mixin = {
  mixins: [
    BaseMixin
  ],
  data () {
    return {
      urlMe: 'me'
    }
  },
  methods: {
    getUser () {
      return this.requestGet(`${process.env.VUE_APP_URL_API}${this.urlMe}`, true)
    }
  }
}

export default mixin
