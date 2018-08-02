var mongoose = require('mongoose')
var config = require('../config/default')
var logger = require('../common/logger')

mongoose.connect(config.mongodb, config.options).then(
  function () { console.log('数据库连接成功！') }
  , function (error) {
    if (error) {
      logger.debug('connect to %s debug: ', config.mongodb, error.message)
      logger.error('connect to %s error: ', config.mongodb, error.message)
      process.exit(1)
    }
  })

require('./category')
require('./comment')
require('./chat')
require('./oauth_user')
require('./article')
require('./article_pic')
require('./article_tag')
require('./config')
require('./tag')

exports.TagDb = mongoose.model('Tag') // 这是一个对象
exports.Article = mongoose.model('Article')
exports.ArticlePic = mongoose.model('ArticlePic')
exports.ArticleTag = mongoose.model('ArticleTag')
exports.Category = mongoose.model('Category')
exports.Chat = mongoose.model('Chat')
exports.Comment = mongoose.model('Comment')
exports.User = mongoose.model('User')
// exports.TagDb = mongolass.model('Tag', tagSchema)
