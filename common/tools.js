var bcrypt = require('bcryptjs')
var moment = require('moment')

moment.locale('zh-cn') // 使用中文

// 格式化时间
exports.formatDate = function (date, friendly) {
  date = moment(date)

  if (friendly) {
    return date.fromNow()
  } else {
    return date.format('YYYY-MM-DD HH:mm')
  }
}

exports.validateId = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str)
}

exports.hash = function (str, callback) {
  bcrypt.hash(str, 10).then(callback)
}

exports.compare = function (str, hash, callback) {
  bcrypt.compare(str, hash).then(callback)
}
// 用于检查字符串是否为空、null或未定义的I:
exports.isEmpty = function (str) {
  return (!str || (str.length === 0))
}
// 消息提示样式转换
exports.Msg = function (type, message) {
  return {type: type, message: message}
}
