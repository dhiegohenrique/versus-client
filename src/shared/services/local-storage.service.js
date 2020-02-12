class LocalStorageService {
  static instance = null;

  static getInstance () {
    if (LocalStorageService.instance == null) {
      LocalStorageService.instance = new LocalStorageService()
    }

    return LocalStorageService.instance
  }

  save (key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  get (key) {
    return JSON.parse(localStorage.getItem(key)) || null
  }

  remove (key) {
    localStorage.removeItem(key)
  }

  update (key, data) {
    this.save(key, data)
  }
}
export default () => {
  return LocalStorageService.getInstance()
}
