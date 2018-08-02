var mongoose = require('mongoose')
var BaseDb = require('./base_db')
var Schema = mongoose.Schema

var ArticleSchema = new Schema({
  title: { type: String },
  author: { type: String },
  content: { type: String },
  keywords: { type: String },
  is_show: { type: Boolean, default: true }, // 是否显示
  is_delete: { type: Boolean, default: false }, // 是否删除
  is_top: { type: Boolean, default: false }, // 是否置顶
  is_original: { type: Boolean, default: true }, // 是否原创
  click: { type: Number },
  description: { type: String },
  category_id: {type: Schema.Types.ObjectId},
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
})
ArticleSchema.plugin(BaseDb)
ArticleSchema.index({create_at: -1})
ArticleSchema.index({category_id: 1, create_at: -1})
mongoose.model('Article', ArticleSchema)
