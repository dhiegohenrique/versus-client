import BaseService from '@/shared/services/base.service'

const mixin = {
  data () {
    return {
      baseService: BaseService()
    }
  },
  methods: {
    requestGet (url, hasToken = false) {
      return this.baseService.get(url, hasToken)
    },
    requestPost (url, data) {
      return this.baseService.post(url, data)
    }
  }
}

export default mixin
