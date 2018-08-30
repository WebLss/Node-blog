var express = require('express')
var router = express.Router()
const Constant = require('../../../common/constant')
const chatModel = require('../../../models/chatModel')
const Tools = require('../../../common/tools')
var Rs = require('../../../plugin/restful')
/**
 * chat碎言控制器
 */
router.get('/', function (req, res, next) {
  res.render(Constant.router('admin', 'chat/index'))
})
router.get('/query', function (req, res, next) {
  var pageSize = parseInt(req.query.rows || 8)
  console.log(pageSize)
  var currentPage = parseInt(req.query.page || 1)
  chatModel.getChatList({is_delete: false}, currentPage, pageSize, function (err, result) {
    if (err) {
      res.json(err.message)
    } else {
      res.json(new Rs(200, '', result))
    }
  })
})

router.get('/add', function (req, res, next) {
  res.render(Constant.router('admin', 'chat/add'), {})
})

router.post('/add', function (req, res, next) {
  var msg = ''
  try {
    var result = chatModel.addChat(req.body)
    if (result) { msg = Tools.Msg('success', '碎言添加成功') }
  } catch (e) {
    msg = Tools.Msg('error', e.message)
  }

  res.render(Constant.router('admin', 'chat/add'), {message: msg})
})
/**
 * 碎言编辑
 */
router.get('/edit', function (req, res, next) {
  var _id = req.query.id || ''
  if (_id) {
    chatModel.findById(_id).then(function (result) {
      res.render(Constant.router('admin', 'chat/edit'), result)
    }, function (err) {
      res.json({error: err.message})
    })
  }
})
/**
 * 碎言修改
 */
router.post('/edit', function (req, res, next) {
  try {
    chatModel.editChat(req.body)
      .then(function () {
        res.json(new Rs(200, '修改标签成功'))
      }, function (err) {
        res.json(new Rs(300, err.message))
      })
  } catch (e) {
    res.json(new Rs(405, e.message))
  }
})
/**
 * 移除
 */
router.get('/delete', function (req, res, next) {
  var _id = req.query.id || ''
  if (_id) {
    chatModel.removeChat(_id, true).then(function (success) {
      res.redirect('/admin/chat')
    }, function (err) {
      res.json(new Rs(300, err.message))
    })
  }
})

module.exports = router
