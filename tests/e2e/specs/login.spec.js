const fastLoremIpsum = require('fast-lorem-ipsum')
const xpathSection = '//section[contains(@class, "login")]'
const xpathUsername = `${xpathSection}//*[@id="username"]`
const xpathPassword = `${xpathSection}//*[@id="password"]`
const xpathLogin = `${xpathSection}//*[@id="login"]`
const xpathErrorMinLength = '//div[contains(@class, "v-messages__message") and contains(text(), "Insira pelo menos 3 caracteres")]'
const xpathToast = `//div[contains(@class, "toasted-container")]//div[contains(@class, "toasted") and contains(text(), "Username ou senha incorretos.")]//i[contains(text(), "info")]`
const username = 'ViRRO'
const password = '12345678'
const waitTime = 60000 * 3

module.exports = {
  '@tags': ['login'],
  beforeEach: (browser) => {
    browser
      .refresh()
      .waitForElementVisible(xpathSection)
      .waitForElementVisible(xpathUsername)
      .waitForElementVisible(xpathPassword)
  },

  'Should disabled login button when username and password is null': function (browser) {
    browser
      .assert.disabledProp(xpathLogin, true)
  },

  'Should disabled login button when username is null': function (browser) {
    browser
      .sendKeys(xpathPassword, 'a')
      .assert.disabledProp(xpathLogin, true)
  },

  'Should disabled login button when password is null': function (browser) {
    browser
      .sendKeys(xpathUsername, 'a')
      .assert.disabledProp(xpathLogin, true)
  },

  'Should enable login button when username and password is not null': function (browser) {
    browser
      .sendKeys(xpathUsername, 'a')
      .sendKeys(xpathPassword, 'a')
      .assert.disabledProp(xpathLogin, false)
  },

  'Should show a message when username length less than 3 characters': async function (browser) {
    await browser.sendKeys(xpathPassword, 'abcd')
    await validateMinLength(browser, xpathUsername)
  },

  'Should show a message when password length less than 3 characters': async function (browser) {
    await browser.sendKeys(xpathUsername, 'abcd')
    await validateMinLength(browser, xpathPassword)
  },

  'Should show a message when password is incorrect': async function (browser) {
    await browser.sendKeys(xpathUsername, username)
    await validateUsernameOrPassword(browser, xpathPassword)
  },

  'Should show a message when username is incorrect': async function (browser) {
    await browser.sendKeys(xpathPassword, password)
    await validateUsernameOrPassword(browser, xpathUsername)
  },

  'Should show a message when username is incorrect': async function (browser) {
    await browser.sendKeys(xpathPassword, password)
    await validateUsernameOrPassword(browser, xpathUsername)
  },

  'Should allow max characters in fields': async function (browser) {
    await validateMaxLength(browser, false)
  },

  'Should allow max characters in fields on copy and paste': async function (browser) {
    await validateMaxLength(browser, true)
  },

  'Should show home when login is successful': function (browser) {
    const xpathHome = '//section[contains(@class, "home")]'

    browser
      .sendKeys(xpathUsername, username)
      .sendKeys(xpathPassword, password)
      .click(xpathLogin)
      .waitForLoadingModal()
      .waitForElementVisible(xpathHome, waitTime)
      .expect.element(xpathHome).to.be.visible
  }
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

const validateUsernameOrPassword = (browser, xpath) => {
  return new Promise(async (resolve) => {
    await browser.sendKeys(xpath, '123asdfa1243')
    await browser.click(xpathLogin)
    await browser.waitForElementVisible(xpathToast)

    browser
      .expect.element(xpathToast).to.be.visible

    resolve()
  })
}

const validateMaxLength = (browser, copyAndPaste) => {
  return new Promise(async (resolve) => {
    const maxLength = 50
    const fields = [
      {
        xpath: xpathUsername,
        value: fastLoremIpsum(maxLength + 1, 'c')
      },
      {
        xpath: xpathPassword,
        value: fastLoremIpsum(maxLength + 1, 'c')
      }
    ]

    browser
      .perform((done) => {
        fields.forEach(async (field, index) => {
          const { xpath, value } = field

          browser
            .perform(async (done) => {
              if (!copyAndPaste) {
                return done()
              }

              await browser.sendKeys(xpathUsername, value.substring(0, 20))
              await browser.sendKeys(xpathUsername, [browser.Keys.CONTROL, 'a'])
              await browser.sendKeys(xpathUsername, [browser.Keys.CONTROL, 'x'])

              for (let index = 0;index < 5;index++) {
                await browser.sendKeys(xpath, [browser.Keys.CONTROL, 'v'])
              }

              done()
            })

          browser
            .perform(async (done) => {
              if (copyAndPaste) {
                return done()
              }

              await browser.sendKeys(xpath, value)
              done()
            })

          browser
            .perform(() => {
              browser
                .assert.valueLength(xpath, maxLength)
            })

          browser
            .perform(() => {
              if (index === (fields.length - 1)) {
                done()
              }
            })
        })
      })

    browser
      .perform(() => {
        resolve()
      })
  })
}
