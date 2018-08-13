var CategoryDb = require('../db').Category
var Tools = require('../common/tools')
var _ = require('lodash')
var CategoryModel = {
  create: function (obj, callback) {
    CategoryDb.findOne({cname: obj.cname}).exec()
      .then(function (result) {
        if (result) {
          var msg = '分类名称已存在'
          callback(msg, null)
        } else {
          CategoryDb.create(obj, callback)
        }
      }, function (err) {
        callback(err.message, null)
      })
  },
  /**
   * 添加分类
   * @param obj 分类对象
   * @param callback
   */
  addCategory: function (obj, callback) {
    if (!Tools.isEmpty(obj.pid)) {
      obj = _.assignIn(obj, {parent_id: obj.pid})
      delete obj.pid
    }
    if (Tools.isEmpty(obj.cname)) {
      throw new Error('分类名称不能为空')
    }
    if (!Tools.isEmpty(obj.sort)) {
      if (!_.isNumber(obj.sort)) {
        obj.sort = parseInt(obj.sort)
      }
    }
    obj.cname = obj.cname.trim()
    CategoryModel.create(obj, callback)
  },
  /**
   * 获取所有数据
   */
  getAllData: function () {
    return CategoryDb.find().exec()
  },
  /**
   * 编辑分类
   * @param obj {id, name}
   */
  editCategory: function (obj) {
    if (!Tools.isEmpty(obj.pid)) {
      obj = _.assignIn(obj, {parent_id: obj.pid})
      delete obj.pid
    }
    if (Tools.isEmpty(obj.cname)) {
      throw new Error('分类名称不能为空')
    }
    if (!Tools.isEmpty(obj.sort)) {
      if (!_.isNumber(obj.sort)) {
        obj.sort = parseInt(obj.sort)
      }
    }
    obj.cname = obj.cname.trim()
    return CategoryDb.where({_id: obj.id}).update({$set: obj}).exec()
  },
  findById: function (objectId) {
    return CategoryDb.findById(objectId).exec()
  }
}

module.exports = CategoryModel
