var UserDb = require('../db').User
var _ = require('lodash')
var UserModel = {
  create: function (obj, callback) {
    UserDb.create(obj, callback)
  },
  findOne: function () {
    return UserDb.findOne().exec()
  }
}

module.exports = UserModel
