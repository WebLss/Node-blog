const express = require('express')
const Constant = require('../../../common/constant')
const router = express.Router()
const tagModel = require('../../../models/tagModel')
const Tools = require('../../../common/tools')
// const _= require('lodash')
const Rs = require('../../../plugin/restful')

/**
 * 标签列表
 */
router.get('/', function (req, res, next) {
  res.render(Constant.router('admin', 'tag/index'))
})

/**
 * 获取分页数据
 */
router.get('/getTags', function (req, res, next) {
  var pageSize = parseInt(req.query.rows || 3)
  console.log(pageSize)
  var currentPage = parseInt(req.query.page || 1)
  tagModel.queryByName({}, currentPage, pageSize, function (err, result) {
    if (err) {
      res.json(err.message)
    } else {
      res.json(new Rs(200, '', result))
    }
  })
})

/**
 *  添加标签页
 */
router.get('/add', function (req, res, next) {
  res.render(Constant.router('admin', 'tag/add'))
})
/**
 * 添加标签插入操作
 */
router.post('/add', function (req, res, next) {
  var msg = ''
  try {
    var result = tagModel.addTag(req.body.tnames)
    if (result) { msg = Tools.Msg('success', '标签添加成功') }
  } catch (e) {
    msg = Tools.Msg('error', e.message)
  }

  res.render(Constant.router('admin', 'tag/add'), {message: msg})
})

module.exports = router
