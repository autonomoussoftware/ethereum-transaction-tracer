'use strict'

const { newRelic, port } = require('config')
const api = require('./src')

if (newRelic.licenseKey) {
  require('newrelic')
}

api.start(port)
