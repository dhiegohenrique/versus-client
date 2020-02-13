const xpathSectionLogin = '//section[contains(@class, "login")]'
const xpathLogout = '//*[@id="logout"]'

module.exports = {
  '@disabled': true,
  beforeEach: (browser) => {
    browser
      .perform(() => {
        const loginPage = browser.page.login()
        loginPage.login()
      })
      .perform(async () => {
        await browser.waitForElementVisible(xpathLogout)
      })
  },

  'Should logout when click in logout button': async function (browser) {
    await browser.click(xpathLogout)
    await validateLoginPage(browser)
    await validateLocalStorage(browser)
  },

  'Should logout when click in back on navigation': async function (browser) {
    await browser.back()
    await validateLoginPage(browser)
    await validateLocalStorage(browser)
  },

  'Should logout when click in back and click in next on navigation': async function (browser) {
    await browser.back()
    await validateLoginPage(browser)
    await browser.forward()
    await validateLoginPage(browser)
    await validateLocalStorage(browser)
  },
}

const validateLoginPage = (browser) => {
  return new Promise(async (resolve) => {
    await browser.waitForElementVisible(xpathSectionLogin)
    await browser.expect.element(xpathSectionLogin).to.be.visible
    resolve()
  })
}

const validateLocalStorage = (browser) => {
  return new Promise((resolve) => {
    browser
      .execute(function () {
        return window.localStorage.getItem('user')
      }, [], (result) => {
        const user = result.value
        browser
          .assert.ok(!user, 'Should remove user from local storage')

        resolve()
      })
  })
}
