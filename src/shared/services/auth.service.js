import LocalStorageService from './local-storage.service'

class AuthService {
  static instance = null;

  static getInstance () {
    if (AuthService.instance == null) {
      AuthService.instance = new AuthService()
    }

    return AuthService.instance
  }

  constructor () {
    this.localStorageService = LocalStorageService()
  }

  isAuthenticated () {
    return this.getUser() !== null
  }

  getToken () {
    const user = this.localStorageService.get('user')
    return user ? user.access_token : ''
  }

  getUser () {
    return this.localStorageService.get('user')
  }

  saveUser (user) {
    this.localStorageService.save('user', user)
  }

  removeUser () {
    this.localStorageService.remove('user')
  }
}

export default () => {
  return AuthService.getInstance()
}
