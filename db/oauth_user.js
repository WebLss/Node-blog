var mongoose = require('mongoose')
var BaseDb = require('./base_db')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  type: { type: Number, min: 0, max: 10, default: 0 }, // 类型0:默认 1：QQ  2：新浪微博 3：豆瓣 4：人人 5：开心网
  nickname: { type: String, default: '' }, // 第三方昵称
  head_img: { type: String }, // 头像
  keywords: { type: String },
  openid: { type: String }, // 第三方用户id
  password: { type: String }, // 密码
  access_token: { type: Number, default: '' }, // access_token token
  last_login_time: { type: Date, default: Date.now }, // 最后登录时间
  last_login_ip: { type: String, default: '' }, //  最后登录ip
  login_times: { type: Number, default: 0 }, // 登录次数
  status: { type: Number, default: 0 }, // 登录状态
  email: { type: String, default: '' }, // 邮箱
  is_admin: { type: Boolean, default: false }, // 是否是admin
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
})
UserSchema.plugin(BaseDb)
UserSchema.index({user_id: -1})
mongoose.model('User', UserSchema)
