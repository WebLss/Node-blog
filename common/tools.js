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
/**
 * 浅层拷贝对象值,即拷贝第二个对象的值给第一对象
 */
exports.copyObj = function (one, two) {
  if ((typeof one === 'object') && (typeof two === 'object')) {
    for (var item in one) {
      one[item] = two[item] || null
    }
    return one
  } else {
    throw new Error('不是对象')
  }
}
