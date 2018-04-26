const config = require('config')

if (config.newrelic.licenseKey) {
  require('newrelic')
}

const restify = require('restify')
const { corsOrigins } = require('config')
const corsMiddleware = require('restify-cors-middleware')

const logger = require('./logger.js')

const routes = require('./routes')
const server = restify.createServer()

server.use(restify.plugins.queryParser())

function logRequest (req, res, next) {
  logger.verbose('-->', req.url)
  return next()
}

const cors = corsMiddleware({ origins: corsOrigins })
server.pre(cors.preflight)
server.use(cors.actual)

server.use(logRequest)

function start () {
  routes.applyRoutes(server)

  server.listen(config.apiPort, function () {
    logger.info(`Tracer started on port ${config.apiPort}`)
  })
}

module.exports = {
  start
}
