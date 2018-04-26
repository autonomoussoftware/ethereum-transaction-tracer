'use strict'

const logger = require('./logger')

// warn usage of a deprecated route
const deprecated = function (req, res, next) {
  logger.warn(`Deprecated call to ${req.url}`)
  next()
}

// handle promise-returning middleware functions
const promiseToMiddleware = middleware => function (req, res, next) {
  Promise.resolve(middleware(req, res))
    .then(next)
    .catch(function (err) {
      logger.warn('<--', err.statusCode || 500, err.message)
      next(err)
    })
}

module.exports = { deprecated, promiseToMiddleware }
