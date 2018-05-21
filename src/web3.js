'use strict'

const { enode: { jsonRpcApiUrl } } = require('config')
const Web3 = require('web3')

const web3 = new Web3(jsonRpcApiUrl)

module.exports = web3
