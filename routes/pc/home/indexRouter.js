/**
 *  Created by WebLss on 2018/8/3
 *  主页
 */

var express = require('express')
var router = express.Router()
var constant = require('../../../common/constant')
var path = require('path')

/**
 * 主页
 */
router.get('/', function (req, res, next) {
  console.log(path.join(constant.view_dir, 'home/index'))
  res.render(path.join(constant.view_dir, 'home/index'))
})

module.exports = router
