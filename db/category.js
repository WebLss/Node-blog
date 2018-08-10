var mongoose = require('mongoose')
var BaseDb = require('./base_db')
var Schema = mongoose.Schema
// var ObjectId = Schema.ObjectId

var CategorySchema = new Schema({
  cname: { type: 'string', required: true },
  keywords: { type: String },
  description: { type: String },
  sort: { type: Number, default: 0 },
  parent_id: { type: String, default: '0'},
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
})
CategorySchema.plugin(BaseDb)
CategorySchema.index({create_at: -1})
mongoose.model('Category', CategorySchema)
