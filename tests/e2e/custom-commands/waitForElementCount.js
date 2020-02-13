const moment = require('moment')
const EventEmitter = require('events')
EventEmitter.defaultMaxListeners = 0
const waitTime = 60000

class WaitForElementCount extends EventEmitter {
  command (selector, count, cb) {
    count = parseInt(count)
    const self = this
    const duration = moment().add(waitTime, 'ms')

    self.api
      .perform((done) => {
        const checkAttribute = () => {
          const timer = setTimeout(() => {
            if (moment() >= duration) {
              const currentTest = self.api.currentTest
              const currentModule = currentTest.module
              const folder = currentModule.replace('.spec', '')

              let name = currentTest.name || 'error'
              name += moment().format('_DD_MM_YYYY_HH_mm_ss_SSS')

              let message = `Waiting for element '${selector}' count equals '${count}' fail in ${waitTime}ms`
              if (currentTest.name) {
                message += ` on test ${currentTest.name}`
              }

              self.api
                .saveScreenshot(`./test/e2e/screenshots/${folder}/${name}.png`)

              console.log('\x1b[31m', message)
              clearTimeout(timer)
              done()
              throw new Error()
            } else {
              self.api
                .elements('xpath', selector, (elements) => {
                  console.log(`Waiting for element ${selector} count equals '${count}'... Current count: ${elements.value.length}`)
                  if (!(elements.value.length === count)) {
                    checkAttribute()
                  } else {
                    clearTimeout(timer)
                    done()
                  }
                })
            }
          }, 1000)
        }
        checkAttribute()
      })
      .perform((done) => {
        if (cb) {
          cb()
        }

        self.emit('complete')
        done()
      })

    return this
  }
}

module.exports = WaitForElementCount
