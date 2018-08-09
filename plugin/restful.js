/**
 *  Created by WebLss on 2018/8/9
 */
/**
 * restful api
 * @param code
 * @param message
 * @param records
 */
var restful = function (code, message, datas) {
  this.code = code || null
  this.message = message || null
  this.datas = datas || null
  return this
}
/* restful.prototype = {
  get code () {
    return this.code
  },
  set code (code) {
    this.code = code
  },
  get message () {
    return this.message
  },
  set message (message) {
    this.message = message
  },
  get records () {
    return this.records
  },
  set records (records) {
    this.records = records
  }
} */
module.exports = restful
