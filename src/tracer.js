'use strict'

const cuid = require('cuid')

const web3 = require('./web3')

function traceTransaction (hash) {
  return new Promise(function (resolve, reject) {
    web3.currentProvider.send({
      method: 'trace_transaction',
      params: [hash],
      jsonrpc: '2.0',
      id: cuid()
    }, function (err, res) {
      if (err) { return reject(err) }

      return resolve(res)
    })
  })
}

module.exports = { traceTransaction }
