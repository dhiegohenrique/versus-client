const xpathSection = '//section[contains(@class, "login")]'
const xpathUsername = `${xpathSection}//*[@id="username"]`
const xpathPassword = `${xpathSection}//*[@id="password"]`
const xpathLogin = `${xpathSection}//*[@id="login"]`
const xpathErrorMinLength = '//div[contains(@class, "v-messages__message") and contains(text(), "Insira pelo menos 3 caracteres")]'
const xpathToast = `//div[contains(@class, "toasted-container")]//div[contains(@class, "toasted") and contains(text(), "Username ou senha incorretos.")]//i[contains(text(), "info")]`

module.exports = {
  beforeEach: (browser) => {
    browser
      .refresh()
      .waitForElementVisible(xpathSection)
      .waitForElementVisible(xpathUsername)
      .waitForElementVisible(xpathPassword)
  },

  'Should disabled login button when username and password is null': !function (browser) {
    browser
      .assert.disabledProp(xpathLogin, true)
  },

  'Should disabled login button when username is null': !function (browser) {
    browser
      .sendKeys(xpathPassword, 'a')
      .assert.disabledProp(xpathLogin, true)
  },

  'Should disabled login button when password is null': !function (browser) {
    browser
      .sendKeys(xpathUsername, 'a')
      .assert.disabledProp(xpathLogin, true)
  },

  'Should enable login button when username and password is not null': !function (browser) {
    browser
      .sendKeys(xpathUsername, 'a')
      .sendKeys(xpathPassword, 'a')
      .assert.disabledProp(xpathLogin, false)
  },

  'Should show a message when username length less than 3 characters': !async function (browser) {
    await browser.sendKeys(xpathPassword, 'abcd')
    await validateMinLength(browser, xpathUsername)
  },

  'Should show a message when password length less than 3 characters': !async function (browser) {
    await browser.sendKeys(xpathUsername, 'abcd')
    await validateMinLength(browser, xpathPassword)
  },

  'Should show a message when password is incorrect': function (browser) {
    browser
      .sendKeys(xpathUsername, 'ViRRO')
      .sendKeys(xpathPassword, '1234asdfasdf')
      .click(xpathLogin)
      .waitForElementVisible(xpathToast)
      .expect.element(xpathToast).to.be.visible
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
