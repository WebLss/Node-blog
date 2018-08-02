var config = require('../config/default')
var pathLib = require('path')

var env = process.env.NODE_ENV || 'development'

var log4js = require('log4js')
log4js.configure({
  appenders: {
    cheese: { type: 'file', filename: pathLib.join(config.log_dir, 'cheese.log') }
  },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})

var logger = log4js.getLogger('cheese')
logger.level = config.debug && env !== 'test' ? 'DEBUG' : 'ERROR'

module.exports = logger
