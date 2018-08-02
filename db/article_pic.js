var mongoose = require('mongoose')
var BaseDb = require('./base_db')
var Schema = mongoose.Schema

var ArticlePicSchema = new Schema({
  path: { type: String }, // 图片路径
  article_id: {type: Schema.Types.ObjectId},
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
})
ArticlePicSchema.plugin(BaseDb)
ArticlePicSchema.index({create_at: -1})
ArticlePicSchema.index({article_id: 1, create_at: -1})
mongoose.model('ArticlePic', ArticlePicSchema)
