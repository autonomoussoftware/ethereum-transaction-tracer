const Router = require('restify-router').Router

const pkg = require('../package')
const tracer = require('./tracer')

const router = new Router()

function getRoot (req, res) {
  res.send({ name: pkg.name, version: pkg.version })
}

function getTransactionTrace (req, res) {
  const hash = req.params.hash

  tracer.transaction(hash)
    .then(trace => res.send(trace))
    .catch(err => { throw err })
}

function getReplayTransactionTrace (req, res) {
  const hash = req.params.hash

  tracer.replayTransaction(hash)
    .then(trace => res.send(trace))
    .catch(err => { throw err })
}

router.get('/', getRoot)
router.get('/transactions/:hash', getTransactionTrace)
router.get('/transactions/:hash/replay/trace', getReplayTransactionTrace)

module.exports = router
