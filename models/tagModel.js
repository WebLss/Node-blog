var TagDb = require('../db').TagDb

exports.createAndUpdate = function (name, callback) {
  var tag = new TagDb()
  tag.name = name
  tag.save(callback)
}
