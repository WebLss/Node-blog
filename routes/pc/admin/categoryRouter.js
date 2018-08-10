/**
 *  Created by WebLss on 2018/8/10
 *  分类模块
 */
const express = require('express')
const Constant = require('../../../common/constant')
const router = express.Router()
const categoryModel = require('../../../models/categoryModel')
const Tools = require('../../../common/tools')
// const _= require('lodash')
const Rs = require('../../../plugin/restful')

/**
 * 分类首页
 */
router.get('/', function (req, res, next) {
  res.render(Constant.router('admin', 'category/index'))
})
/**
 * 添加分类
 */
router.get('/add', function (req, res, next) {
  res.render(Constant.router('admin', 'category/add'))
})

router.post('/add', function (req, res, next) {
  try {
    console.log(req.body)
    categoryModel.addCategory(req.body, function (err, result) {
      if (err) {
        res.json(new Rs(300, err))
      } else {
        res.json(new Rs(200, '添加分类成功'))
      }
    })
  } catch (e) {
    res.json(new Rs(405, e.message))
  }
})

module.exports = router
