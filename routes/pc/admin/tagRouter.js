const express = require('express')
const path = require('path')
const constant = require('../../../common/constant')
const router = express.Router()
const tagModel = require('../../../models/tagModel')
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
  console.log(req.body);
})

module.exports = router
