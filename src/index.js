'use strict'

const { corsOrigins } = require('config')
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
  logger.verbose('-->', req.url)
  return next()
}

server.use(logRequest)

function start (port) {
  routes.applyRoutes(server)

  server.listen(port, function () {
    logger.info(`Tracer started on port ${port}`)
  })
}

module.exports = { start }
