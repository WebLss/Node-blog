var mongoose = require('mongoose')
var BaseDb = require('./base_db')
var Schema = mongoose.Schema

var ChatSchema = new Schema({
  content: { type: String },
  is_show: { type: Boolean, default: true }, // 是否显示
  is_delete: { type: Boolean, default: false }, // 是否删除
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
})
ChatSchema.plugin(BaseDb)
ChatSchema.index({create_at: -1})
mongoose.model('Chat', ChatSchema)
