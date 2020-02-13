const waitTime = 60000 * 2

module.exports = {
  '@tags': ['home'],
  before: (browser) => {
    const loginPage = browser.page.login()
    loginPage.login()
  },

  'Should show logo': function (browser) {
    const xpathSection = '//section[contains(@class, "logo")]'
    const xpathLogo = `${xpathSection}//*[@id="logo"]`

    browser
      .waitForElementVisible(xpathLogo)
      .expect.element(xpathLogo).to.be.visible
  },

  'Should show toolbar': function (browser) {
    const xpathSection = '//section[contains(@class, "toolbar")]'
    const xpathUsername = `${xpathSection}//span[@id="username" and contains(text(), "ViRRO")]`
    const xpathWallet = `${xpathSection}//span[@id="wallet"]`
    const xpathLogout = '//*[@id="logout"]'

    browser
      .waitForElementVisible(xpathUsername)
      .expect.element(xpathUsername).to.be.visible

    browser
      .waitForElementVisible(xpathWallet)
      .expect.element(xpathWallet).text.which.matches(new RegExp('carteira', 'i'))

    browser
      .waitForElementVisible(xpathLogout)
      .expect.element(xpathLogout).to.be.visible
  },

  'Should show user data': function (browser) {
    const xpathFieldsLeft = '//div[contains(@class, "text-left")]'
    const xpathFieldsRight = '//div[contains(@class, "text-right")]'

    const fields = [
      'Username',
      'Steam account',
      'Riot account',
      'Campeonatos'
    ]

    browser
      .waitForElementNotPresent('//div[contains(@class, "v-progress-linear")]', waitTime)
      .waitForElementCount(xpathFieldsLeft, fields.length)
      .perform((done) => {
        browser
          .elements('xpath', xpathFieldsLeft, (elements) => {
            elements.value.forEach((el, index) => {
              browser
                .elementIdText(el.ELEMENT, (result) => {
                  const text = result.value.trim()
                  const label = fields[index]
                  browser
                    .assert.ok(text === label, `Should field has text: '${label}'`)

                  if (index === (elements.value.length - 1)) {
                    done()
                  }
                })
            })
          })
      })
      .waitForElementCount(xpathFieldsRight, fields.length)
      .perform((done) => {
        browser
          .elements('xpath', xpathFieldsRight, (elements) => {
            elements.value.forEach((el, index) => {
              browser
                .elementIdText(el.ELEMENT, (result) => {
                  const text = result.value.trim()
                  browser
                    .assert.ok(text.length > 0, `Should field '${fields[index]}' has text`)

                  if (index === (elements.value.length - 1)) {
                    done()
                  }
                })
            })
          })
      })
  }
}
