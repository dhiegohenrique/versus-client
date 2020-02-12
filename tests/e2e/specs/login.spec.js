const b64 = require('base64-async')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const xpathSection = '//section[contains(@class, "login")]'
const xpathUsername = `${xpathSection}//*[@id="username"]`
const xpathPassword = `${xpathSection}//*[@id="password"]`
const xpathLogin = `${xpathSection}//*[@id="login"]`

module.exports = {
  beforeEach: (browser) => {
    browser
      .refresh()
      .waitForElementVisible(xpathSection)
  },

  'Should disabled login button when username and password is null': function (browser) {
    browser
      .waitForElementVisible(xpathUsername)
      .waitForElementVisible(xpathPassword)
      .assert.disabledProp(xpathLogin, true)
  },

  'Should disabled login button when username is null': function (browser) {
    browser
      .waitForElementVisible(xpathUsername)
      .assert.disabledProp(xpathLogin, true)
  },

  
}
