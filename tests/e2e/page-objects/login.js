const waitTime = 30000
const username = 'ViRRO'
const password = '12345678'

const loginCommands = {
  login: function () {
    const xpathLogin = '//*[@id="login"]'

    this.api
      .waitForElementVisible('//*[@id="app"]', waitTime)
      .assert.elementPresent('//section[contains(@class, "login")]')
      .sendKeys('//*[@id="username"]', username)
      .sendKeys('//*[@id="password"]', password)
      .click(xpathLogin)
      .waitForLoadingModal()
      .waitForElementVisible('//section[contains(@class, "home")]')

    return this
  }
}

module.exports = {
  commands: [loginCommands]
}
