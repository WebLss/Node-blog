var ArticleTagDb = require('../db').ArticleTag
var Tools = require('../common/tools')
var _ = require('lodash')
var async = require('async')
// var page = new Page(currentPage, pageSize, result.length)
var ArticleTagModel = {
  create: function (aid, tid) {
    console.log(aid, tid)
    var articleTag = new ArticleTagDb()
    articleTag.tag_id = tid
    articleTag.article_id = aid
    articleTag.save()
  },
  /**
   * 传入一个换行的字符串
   * @param str
   */
  addData: function (aid, tids) {
    if (!Tools.isEmpty(tids)) {
      tids.forEach(function (item) {
        ArticleTagModel.create(aid, item)
      })
    }
    return true
  },
  deleteData: function (aid, callback) {
    ArticleTagDb.deleteMany({ _id: aid }, callback)
  },
  /**
   * 根据文章id查询
   * @param aid
   */
  findByAid: function (aid) {
    return ArticleTagDb.find({article_id: aid}).exec()
  }

}

module.exports = ArticleTagModel
