const waitTime = 30000

const loginCommands = {
  login: function () {
    const xpathLogin = '//*[@id="login"]'

    this.api
      .waitForElementVisible('//*[@id="app"]', waitTime)
      .assert.elementPresent('//section[contains(@class, "login")]')
      .sendKeys('//*[@id="username"]', 'ViRRO')
      .sendKeys('//*[@id="password"]', '12345678')
      .click(xpathLogin)
      .waitForLoadingModal()
      .waitForElementVisible('//section[contains(@class, "toolbar")]')

    return this
  }
}

module.exports = {
  commands: [loginCommands],
  url: function () {
    return this.api.globals.devServerURL
  }
}
