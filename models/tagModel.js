var TagDb = require('../db').TagDb
var Tools = require('../common/tools')
var _ = require('lodash')
var async = require('async')
const Page = require('../plugin/paginate')
// var page = new Page(currentPage, pageSize, result.length)
var TagModel = {
  create: function (name, callback) {
    var tag = new TagDb()
    tag.name = name
    tag.save(callback)
  },
  /**
   * 传入一个换行的字符串
   * @param str
   */
  addTag: function (str) {
    str = str.trim()

    if (Tools.isEmpty(str)) {
      throw new Error('标签名不能为空')
    } else {
      _.forEach(_.filter(str.split('\r\n'), function (value) { return !Tools.isEmpty(value) })
        , function (tName) {
          TagModel.create(tName)
        })
      return true
    }
  },
  /**
   * 编辑标签
   * @param obj {id, name}
   */
  editTag: function (obj) {
    if (obj.hasOwnProperty('id') && Tools.isEmpty(obj.id)) {
      throw new Error('标签id不能留空')
    } else if (obj.hasOwnProperty('name') && Tools.isEmpty(obj.name)){
      throw new Error('标签名称不能留空')
    } else {
      return TagDb.updateOne({_id: obj.id}, {$set: {name: obj.name}}).exec()
    }
  },
  /**
   * 按条件分页查询标签列表
   * @param option 条件对象
   * @param start =  (currentPage - 1) * pageSize 从哪开始
   * @param pageSize 每页显示多少条数据
   *  callback
   */
  queryByName: function (option, currentPage, pageSize, callback) {
    var start = (currentPage - 1) * pageSize
    async.parallel({
      count: function (done) { // 查询数量
        TagDb.countDocuments(option, function (err, count) { done(err, count) })
      },
      records: function (done) { // 查询一页的记录
        TagDb.find(option).limit(pageSize).skip(start || 0)
          .exec(function (err, list) { done(err, list) })
      }
    }, function (err, results) {
      var page = new Page(currentPage, pageSize, results.count)
      callback(err, _.assignIn(page, {records: results.records}))
    })
  },
  findById: function (objectId) {
    return TagDb.findById(objectId).exec()
  }
}

module.exports = TagModel
