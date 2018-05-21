'use strict'

const { promisify } = require('util')
const cuid = require('cuid')

const logger = require('./logger')
const web3 = require('./web3')

const web3SendAsync = promisify(
  web3.currentProvider.send.bind(web3.currentProvider)
)

function parseRpcResponse ({ jsonrpc, error, result, id }) {
  if (jsonrpc !== '2.0') {
    return Promise.reject(
      new Error(`Invalid JSON RPC version: ${jsonrpc} (${id})`)
    )
  }
  if (error) {
    return Promise.reject(
      new Error(`Could not trace tx: ${error.code} ${error.message} (${id})`)
    )
  }
  return result
}

function traceTransaction (hash) {
  const id = cuid()

  logger.debug(`Tracing ${hash} (${id})`)

  return web3SendAsync({
    jsonrpc: '2.0',
    method: 'trace_transaction',
    params: [hash],
    id
  })
    .then(parseRpcResponse)
}

module.exports = { traceTransaction }
