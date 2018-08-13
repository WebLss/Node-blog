/**
 *  Created by WebLss on 2018/8/13
 */
var express = require('express')
var router = express.Router()
var async = require('async')
const Constant = require('../../../common/constant')
var path = require('path')
const tagModel = require('../../../models/tagModel')
const categoryModel = require('../../../models/categoryModel')
var Rs = require('../../../plugin/restful')

var repeat = function (str, num) {
  return new Array(num + 1).join(str)
}
/**
 * 组建树状结构
 * @param data
 * @param html
 * @param pid
 * @param level
 */
var toTreeArray = function (data, html, pid, level) {
  html = html || '|——'
  pid = pid || '0'
  level = level || 0
  var temp = []
  data.forEach(function (item) {
    if (item.parent_id == null) {
      item.parent_id = '0'
    }
    if (item.parent_id == pid) {
      console.log('==', item.parent_id)
      item.levels = level + 1
      item.html = repeat(html, level)
      temp.push(item)
      temp = temp.concat(toTreeArray(data, html, item._id.toString(), item.levels))
    }
  })
  return temp
}
/**
 * 文章列表页
 */
router.get('/', function (req, res, next) {
  res.render(Constant.router('admin', 'article/index'))
})

/**
 * 添加文章页
 */
router.get('/add', function (req, res, next) {
  async.parallel({
    tagList: function (done) {
      tagModel.getAllData(done).then(function (data) {
        done('', data)
      })
    },
    cateList: function (done) {
      categoryModel.getAllData().then(function (data) {
        done('', toTreeArray(data))
      })
    }
  }, function (err, result) {
    if (!err) {
      res.render(Constant.router('admin', 'article/add'), {result: result})
    } else {
      res.json(new Rs(300, err.message))
    }
  })
})
module.exports = router
