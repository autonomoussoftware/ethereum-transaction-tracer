'use strict'

const Router = require('restify-router').Router

const { promiseToMiddleware } = require('./route-utils')
const logger = require('./logger')
const tracer = require('./tracer')

const ETH_TX_HASH_FORMAT = '^0x[0-9a-fA-F]{64}$'

const router = new Router()

function getTransactionTrace (req, res) {
  const { hash } = req.params

  return tracer.traceTransaction(hash)
    .then(function (traces) {
      traces || (traces = [])
      logger.verbose('<--', hash, traces.length)
      res.json(traces)
    })
}

router.get(
  `/transactions/:hash(${ETH_TX_HASH_FORMAT})`,
  promiseToMiddleware(getTransactionTrace)
)

module.exports = router
