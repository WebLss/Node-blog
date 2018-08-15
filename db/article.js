var mongoose = require('mongoose')
var BaseDb = require('./base_db')
var Schema = mongoose.Schema

var ArticleSchema = new Schema({
  title: { type: String },
  author: { type: String },
  markdown: { type: String }, // markdown文章内容
  html: { type: String }, // markdown转的html页面
  keywords: { type: String },
  is_show: { type: Boolean, default: true }, // 是否显示
  is_delete: { type: Boolean, default: false }, // 是否删除
  is_top: { type: Boolean, default: false }, // 是否置顶
  is_original: { type: Boolean, default: true }, // 是否原创
  cover: { type: String, default: '' }, // 封面图
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
