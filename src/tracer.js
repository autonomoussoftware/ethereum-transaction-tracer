const web3 = require('./web3')

const tracer = {}

tracer.transaction = function (transactionHash) {
  return new Promise(function (resolve, reject) {
    web3.currentProvider.send({
      method: 'trace_transaction',
      params: [transactionHash],
      jsonrpc: '2.0',
      id: '1'
    }, (err, res) => {
      if (err) { return reject(err) }

      return resolve(res)
    })
  })
}

tracer.replayTransaction = function (transactionHash) {
  return new Promise(function (resolve, reject) {
    web3.currentProvider.send({
      method: 'trace_replayTransaction',
      params: [transactionHash, ['trace', 'stateDiff', 'vmTrace']],
      jsonrpc: '2.0',
      id: '1'
    }, (err, res) => {
      if (err) { return reject(err) }

      return resolve(res)
    })
  })
}

module.exports = tracer
