'use strict'

const { corsOrigins } = require('config')
const beforeExit = require('before-exit')
const corsMiddleware = require('restify-cors-middleware')
const restify = require('restify')

const logger = require('./logger')
const routes = require('./routes')

const server = restify.createServer()

const cors = corsMiddleware({ origins: corsOrigins })
server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.queryParser())

function logRequest (req, res, next) {
  logger.verbose('-->', req.method, req.url)
  return next()
}

server.use(logRequest)

routes.applyRoutes(server)

beforeExit.do(function (signal) {
  logger.error('Tracer shutting down API on signal', signal)
})

function start (port) {
  server.listen(port, function () {
    logger.info(`Tracer started on port ${port}`)
  })
}

module.exports = { start }
