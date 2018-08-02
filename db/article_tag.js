var mongoose = require('mongoose')
var BaseDb = require('./base_db')
var Schema = mongoose.Schema

var ArticleTagSchema = new Schema({
  tag_id: { type: Schema.Types.ObjectId }, // 标签id
  article_id: { type: Schema.Types.ObjectId }, // 文章id
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
})
ArticleTagSchema.plugin(BaseDb)
ArticleTagSchema.index({create_at: -1})
ArticleTagSchema.index({tag_id: 1})
ArticleTagSchema.index({article_id: 1})
mongoose.model('ArticleTag', ArticleTagSchema)
