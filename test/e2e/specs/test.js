// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 1000)
      .assert.elementPresent('.title')
      .assert.containsText('h1', 'QUIZ-O-MATIC')
      .assert.elementPresent('.is-link')
      .click('.is-link')
      .pause(1000)
      .assert.elementPresent('.subtitle')
      .click('.is-link')
      .assert.elementPresent('.subtitle')
      .assert.containsText('p', 'You scored: 0%')
      // .assert.elementCount('img', 1)
      .end()
  }
}
