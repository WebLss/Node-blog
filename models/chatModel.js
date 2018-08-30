var ChatDb = require('../db').Chat
var Tools = require('../common/tools')
var _ = require('lodash')
var async = require('async')
const Page = require('../plugin/paginate')
// var page = new Page(currentPage, pageSize, result.length)
var ChatModel = {
  create: function (obj, callback) {
    var chat = new ChatDb()
    chat.content = obj.content
    chat.is_show = obj.is_show == 1
    chat.save(callback)
  },
  /**
   * 传入一个换行的字符串
   * @param str
   */
  addChat: function (obj) {
    if (Tools.isEmpty(obj.content)) {
      throw new Error('内容不能为空')
    } else {
      ChatModel.create(obj)
      return true
    }
  },
  /**
   * 查询碎言分页列表
   */
  getChatList: function (option, currentPage, pageSize, callback) {
    var start = (currentPage - 1) * pageSize
    async.parallel({
      count: function (done) { // 查询数量
        ChatDb.countDocuments(option, done)
      },
      records: function (done) { // 查询一页的记录
        ChatDb.find(option).limit(pageSize).skip(start || 0).sort({'_id': -1})
          .exec(done)
      }
    }, function (err, results) {
      var page = new Page(currentPage, pageSize, results.count)
      callback(err, _.assignIn(page, {records: results.records}))
    })
  },
  findById: function (objectId) {
    return ChatDb.findById(objectId).exec()
  },
  /**
   * 编辑标签
   * @param obj {id, content, is_show}
   */
  editChat: function (obj) {
    obj.is_show = obj.is_show == 1
    if (Tools.isEmpty(obj.id)) {
      throw new Error('碎言id不能留空')
    } else if (Tools.isEmpty(obj.content)) {
      throw new Error('碎言内容不能留空')
    } else {
      return ChatDb.updateOne({_id: obj.id}, {$set: {content: obj.content, is_show: obj.is_show}}).exec()
    }
  },
  /**
   * 将碎言在回收站到列表间移动
   * @status : boolean
   */
  removeChat: function (objectId, status) {
    return ChatDb.updateOne({_id: objectId}, {$set: {is_delete: status}}).exec()
  }

}

module.exports = ChatModel
