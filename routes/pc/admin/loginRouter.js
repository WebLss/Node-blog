const express = require('express')
const Constant = require('../../../common/constant')
const router = express.Router()
const Tools = require('../../../common/tools')
// const _= require('lodash')
const Rs = require('../../../plugin/restful')
const UserModel = require('../../../models/oauthUserModel')
var svgCaptcha = require('svg-captcha')

/**
 * 登录页
 */
router.get('/', function (req, res, next) {
  res.render(Constant.router('admin', 'login/login'))
})

router.post('/', function (req, res, next) {
  console.log(req.session)
  if (req.body.verify !== req.session.captcha) {
    res.json(new Rs(300, '验证码不正确'))
    return
  }
  UserModel.findOne().then(function (success) {
    if (success == null || success === []) {
      UserModel.create({nickname: 'admin', is_admin: true, password: '123456'})
      res.json(new Rs(300, '已为您初始化账号admin、123456'))
    } else {
      if (success.password === req.body.ADMIN_PASSWORD) {
        req.session.user = success
        res.json(new Rs(200, '登录成功'))
      } else {
        res.json(new Rs(300, '密码错误'))
      }
    }
  }, function (err) {
    console.log(err)
  })
})
router.get('/showVerify', function (req, res, next) {
  var codeConfig = {
    size: 5, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    height: 44
  }
  var captcha = svgCaptcha.create(codeConfig)
  req.session.captcha = captcha.text.toLowerCase() // 存session用于验证接口获取文字码
  res.type('svg') // 响应的类型
  res.send(captcha.data)
})

module.exports = router
