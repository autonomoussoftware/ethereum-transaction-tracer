const Router = require('restify-router').Router

const pkg = require('../package')

const { promiseToMiddleware } = require('./route-utils')
const logger = require('./logger')
const tracer = require('./tracer')

const ETH_TX_HASH_FORMAT = '^0x[0-9a-fA-F]{64}$'

const router = new Router()

function getRoot (req, res) {
  res.send({ name: pkg.name, version: pkg.version })
}

function getTransactionTrace (req, res) {
  const { hash } = req.params

  return tracer.transaction(hash)
    .then(function (data) {
      const { result } = data
      const traces = result ? result.length : 'none'
      logger.verbose('<--', hash, traces)
      res.json(data)
    })
}

function getReplayTransactionTrace (req, res) {
  const { hash } = req.params

  return tracer.replayTransaction(hash)
    .then(function (data) {
      const { result } = data
      const traces = result && result.trace ? result.trace.length : 'none'
      logger.verbose('<--', hash, traces)
      res.json(data)
    })
}

router.get(
  '/',
  promiseToMiddleware(getRoot)
)
router.get(
  `/transactions/:hash(${ETH_TX_HASH_FORMAT})`,
  promiseToMiddleware(getTransactionTrace)
)
router.get(
  `/transactions/:hash(${ETH_TX_HASH_FORMAT})/replay/trace`,
  promiseToMiddleware(getReplayTransactionTrace)
)

module.exports = router
