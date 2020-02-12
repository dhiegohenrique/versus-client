import axios from 'axios'
import Vue from 'vue'
import AuthService from '@/shared/services/auth.service'
import HttpStatus from 'http-status-codes'

const showToast = () => {
  const message = 'Ocorreu um erro. Tente novamente mais tarde.'
  Vue.toasted.clear()
  Vue.toasted.show(message, {
    icon: 'warning',
    duration: 10000,
    action: {
      icon: 'close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      }
    },
    className: 'toast'
  })
}

class BaseService {
  static instance = null

  static getInstance () {
    if (BaseService.instance == null) {
      BaseService.instance = new BaseService()
    }
    return BaseService.instance
  }

  constructor () {
    this.client = this.getClient()
    this.authService = AuthService()
  }

  getClient () {
    const client = axios.create({
      baseURL: '',
      timeout: 60000
    })

    client.interceptors.response.use((response) => {
      return response
    }, (error) => {
      const response = JSON.parse(JSON.stringify(error)).response
      if (response && response.status === HttpStatus.UNAUTHORIZED) {
        window.location = window.location.origin
        return
      }

      showToast()
      return Promise.reject(error)
    })

    return client
  }

  get (url, hasToken) {
    const options = {}
    if (hasToken) {
      const token = this.authService.getToken()
      options.headers = {
        Authorization: `Bearer ${token}`
      }
    }

    return this.client.get(url)
  }

  post (url, data) {
    return this.client.post(url, data)
  }
}
export default () => {
  return BaseService.getInstance()
}
