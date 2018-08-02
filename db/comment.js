var mongoose = require('mongoose')
var BaseDb = require('./base_db')
var Schema = mongoose.Schema

var CommentSchema = new Schema({
  oauth_user_id: { type: Number }, // 评论用户id 关联oauth_user表的id
  type: { type: String }, // 文章评论
  content: { type: String }, // 内容
  is_delete: { type: Boolean, default: false }, // 是否删除
  status: { type: Number, default: 0 }, // 1:已审核 0：未审核
  parent_id: {type: Schema.Types.ObjectId},
  article_id: {type: Schema.Types.ObjectId},
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
})
CommentSchema.plugin(BaseDb)
CommentSchema.index({create_at: -1})
CommentSchema.index({article_id: 1, create_at: -1})
mongoose.model('Comment', CommentSchema)
