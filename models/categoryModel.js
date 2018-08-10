var CategoryDb = require('../db').Category
var Tools = require('../common/tools')
var _ = require('lodash')
var async = require('async')
const Page = require('../plugin/paginate')
// var page = new Page(currentPage, pageSize, result.length)
var CategoryModel = {
  create: function (obj, callback) {
    var category = new CategoryDb()
    // console.log(Tools.copyObj(category, obj))
    category.cname = 'xiao'
    return category.save(callback)
  },
  /**
   * 添加分类
   * @param obj 分类对象
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
    return CategoryModel.create(obj, callback)
  },
  /**
   * 编辑分类
   * @param obj {id, name}
   */
  editTag: function (obj) {
  },
  findById: function (objectId) {
    return CategoryDb.findById(objectId).exec()
  }
}

module.exports = CategoryModel
