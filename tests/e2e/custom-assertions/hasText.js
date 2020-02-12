exports.assertion = function (selector) {
  this.message = `Testing if element ${selector} has text`
  this.expected = ''

  this.pass = function (value) {
    return value !== this.expected
  }

  this.value = function (result) {
    const value = result.value
    if (!value) {
      return ''
    }

    return value.trim()
  }

  this.command = function (callback) {
    return this.api.getText(selector, callback)
  }
}
