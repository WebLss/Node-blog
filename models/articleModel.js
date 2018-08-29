var ArticleDb = require('../db').Article
var articleTagModel = require('../models/articleTagModel')
var Tools = require('../common/tools')
var _ = require('lodash')
var async = require('async')
const Page = require('../plugin/paginate')
// var page = new Page(currentPage, pageSize, result.length)
var ArticleModel = {
  create: function (obj, callback) {
    ArticleDb.findOne({title: obj.title}).exec()
      .then(function (result) {
        if (result) {
          var msg = '文章标题名称已存在'
          callback(msg, null)
        } else {
          ArticleDb.create(obj, callback)
        }
      }, function (err) {
        callback(err.message, null)
      })
  },
  /**
   * 添加文章操作
   * @param obj
   * @param callback
   */
  addArticle: function (obj, callback) {
    var tids = obj.tids || []
    var categoryId = obj.cid
    delete obj.tids
    delete obj.cid
    obj.category_id = categoryId
    ArticleModel.create(obj, function (err, data) {
      if (!err) {
        articleTagModel.addData(data._id, tids)
        callback(null, '添加文章成功')
      } else {
        callback(err, null)
      }
    })
  },
  /**
   * 编辑文章列表
   * @param obj
   * @param callback
   */
  editArticle: function (obj, callback) {
    ArticleDb.findOne({title: obj.title, _id: {$nin: [obj.id]}}).exec()
      .then(function (result) {

        if (result) {
          var msg = '文章标题名称已存在'
          callback(msg, null)
        } else {
          var tids = obj.tids || []
          var categoryId = obj.cid
          var id = obj.id
          delete obj.tids
          delete obj.cid
          delete obj.id
          obj.category_id = categoryId
          ArticleDb.updateOne({_id: id}, {$set: obj}).exec(function (err, success) {
            if (!err) {
              articleTagModel.deleteData(id, function (err, writeO) {
                if (!err && (tids !== [])) {
                  articleTagModel.addData(id, tids)
                }
              })
              callback(null, '保存文章成功')
            } else {
              callback(err.message, null)
            }
          })
        }
      }, function (err) {
        callback(err.message, null)
      })
  },
  /**
   * 查询文章分页列表
   */
  getArticleList: function (option, currentPage, pageSize, callback) {
    var start = (currentPage - 1) * pageSize
    async.parallel({
      count: function (done) { // 查询数量
        ArticleDb.countDocuments(option, done)
      },
      records: function (done) { // 查询一页的记录
        ArticleDb.find(option).limit(pageSize).skip(start || 0)
          .exec(done)
      }
    }, function (err, results) {
      var page = new Page(currentPage, pageSize, results.count)
      callback(err, _.assignIn(page, {records: results.records}))
    })
  },
  findById: function (objectId) {
    return ArticleDb.findById(objectId).exec()
  }

}

module.exports = ArticleModel
