const express = require('express')
const path = require('path')
const constant = require('../../../common/constant')
const router = express.Router()
const tagModel = require('../../../models/tagModel')
const Tools = require('../../../common/tools')
/**
 *  添加标签页
 */
router.get('/add', function (req, res, next) {
  /* tagModel.createAndUpdate('xiaochuan', function (message) {
    console.log(message)
  }) */
  res.render(path.join(constant.view_dir, '/admin/tag/add'))
})

router.post('/add', function (req, res, next) {
  var msg = ''
  /* try {
    var result = tagModel.addTag(req.body.tnames)
    if (result) { msg = '标签添加成功' }
  } catch (e) {
    msg = e.message
  } */

  res.render(path.join(constant.view_dir, '/admin/tag/add'), {message: Tools.Msg('error', '程度上激发')})
})

module.exports = router
