const waitTime = 60000 * 2
const xpathSectionLogin = '//section[contains(@class, "login")]'

module.exports = {
  beforeEach: (browser) => {
    const loginPage = browser.page.login()
    loginPage.login()
  },

  'Should logout when click in logout button': async function (browser) {
    const xpathLogout = '//*[@id="logout"]'

    await browser.waitForElementVisible(xpathLogout)
    await browser.click(xpathLogout)
    await browser.waitForElementVisible(xpathSectionLogin)
    await browser.expect.element(xpathSectionLogin).to.be.visible
    await validateLocalStorage(browser)
  }
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
