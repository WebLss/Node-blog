var TagDb = require('../db').TagDb
var Tools = require('../common/tools')
var _ = require('lodash')

var TagModel = {
  createAndUpdate: function (name, callback) {
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
        , function (tname) {
          TagModel.createAndUpdate(tname)
        })
      return true
    }
  }
}


module.exports = TagModel
