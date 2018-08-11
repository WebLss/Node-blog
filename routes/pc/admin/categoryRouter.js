/**
 *  Created by WebLss on 2018/8/10
 *  分类模块
 */
const express = require('express')
const ProxyEvent = require('eventproxy')
const Constant = require('../../../common/constant')
const router = express.Router()
const categoryModel = require('../../../models/categoryModel')
const Tools = require('../../../common/tools')
// const _= require('lodash')
const Rs = require('../../../plugin/restful')
const Logger = require('../../../common/logger')

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
      item.levels = level + 1
      item.html = repeat(html, level)

      temp.push(item)
      temp = temp.concat(toTreeArray(data, html, item._id, item.levels))
    }
  })
  return temp
}
/**
 * 分类首页
 */
router.get('/', function (req, res, next) {
  categoryModel.getAllData().then(function (data) {
    toTreeArray(data)
    res.render(Constant.router('admin', 'category/index'), {result: data || []})
  }, function (err) {
    res.json(new Rs(405, err.message))
  })
})
/**
 * 添加分类
 */
router.get('/add', function (req, res, next) {
  categoryModel.getAllData().then(function (data) {
    toTreeArray(data)
    res.render(Constant.router('admin', 'category/add'), {result: data || []})
  }, function (err) {
    res.json(new Rs(405, err.message))
  })
})

/**
 * 添加分类处理事件
 */
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

/**
 * 修改分类页面
 */
router.get('/edit', function (req, res, next) {
  var proxy = new ProxyEvent()
  proxy.all(['getCateList', 'getById'], function (getCateList, getById) {
    if (getCateList && getById) {
      toTreeArray(getCateList)
      res.render(Constant.router('admin', 'category/edit'), {result: getCateList, category: getById})
    } else {
      res.json(new Rs(300, '数据获取异常'))
    }
  }).fail(function (error) {
    Logger.debug('admin category edit %s debug: ', error)
  })
  categoryModel.getAllData().then(function (data) {
    proxy.emit('getCateList', data)
  }, function (err) {
    console.log(err.message)
    proxy.emit('getCateList', false)
  })
  categoryModel.findById(req.query.id).then(function (data) {
    proxy.emit('getById', data)
  }, function (err) {
    console.log(err.message)
    proxy.emit('getById', false)
  })
})
/**
 * 修改分类处理
 */
router.post('/edit', function (req, res, next) {

})

module.exports = router
