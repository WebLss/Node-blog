const express = require('express')
const Constant = require('../../../common/constant')
const tools = require('../../../common/tools')
const router = express.Router()
var fs = require('fs')
const Rs = require('../../../plugin/restful')
/**
 * 标签列表
 */
router.get('/', function (req, res, next) {
  console.log('读取写入的数据！')
  fs.readFile('common/webConfig.txt', function (err, data) {
    if (err) {
      res.render(Constant.router('admin', 'config/index'), Constant.webConfig)
      return console.error(err)
    }
    console.log('异步读取文件数据: ')
    const obj = JSON.parse(data.toString())
    res.render(Constant.router('admin', 'config/index'), obj)
  })
})
router.post('/', function (req, res, next) {
  var webConfigDefault = Constant.webConfig
  for (var key in webConfigDefault) {
    if (!tools.isEmpty(req.body[key])) {
      webConfigDefault[key] = req.body[key]
    }
  }
  console.log('准备写入文件')
  fs.writeFile('common/webConfig.txt', JSON.stringify(webConfigDefault), function (err) {
    if (err) {
      console.error(err)
      res.json(new Rs(300, '保存失败'))
      return
    }
    res.json(new Rs(200, '保存成功'))
    console.log('数据写入成功！')
    console.log('--------我是分割线-------------')
  })
})
module.exports = router
