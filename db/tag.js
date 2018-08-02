var mongoose = require('mongoose')
var BaseDb = require('./base_db')
var Schema = mongoose.Schema
// var ObjectId = Schema.ObjectId

var TagSchema = new Schema({
  name: { type: 'string', required: true },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
})
TagSchema.plugin(BaseDb)
TagSchema.index({create_at: -1})
mongoose.model('Tag', TagSchema)
