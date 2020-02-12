const xpathSection = '//section[contains(@class, "login")]'
const xpathUsername = `${xpathSection}//*[@id="username"]`
const xpathPassword = `${xpathSection}//*[@id="password"]`
const xpathLogin = `${xpathSection}//*[@id="login"]`
const xpathErrorMinLength = '//div[contains(@class, "v-messages__message") and contains(text(), "Insira pelo menos 3 caracteres")]'
const xpathToast = `//div[contains(@class, "toasted-container")]//div[contains(@class, "toasted") and contains(text(), "Username ou senha incorretos.")]//i[contains(text(), "info")]`
const username = 'ViRRO'
const password = '12345678'

module.exports = {
  before: (browser) => {
    const loginPage = browser.page.login()
    loginPage.login()
  },

  beforeEach: (browser) => {
    browser
      .refresh()
  },

  'Should show logo': function (browser) {
    const xpathSection = '//section[contains(@class, "logo")]'
    const xpathLogo = `${xpathSection}//*[@id="logo"]`

    browser
      .waitForElementVisible(xpathLogo)
      .expect.element(xpathLogo).to.be.visible
  },

}

const validateMinLength = (browser, xpath) => {
  return new Promise(async (resolve) => {
    await browser.sendKeys(xpath, 'a')
    await browser.click(xpathLogin)
    await browser.waitForElementVisible(xpathErrorMinLength)

    browser
      .expect.element(xpathErrorMinLength).to.be.visible

    resolve()
  })
}
