const express = require('express')
const Constant = require('../../../common/constant')
const webconfig = require('../../../common/webConfig')
const tools = require('../../../common/tools')
const router = express.Router()
var fs = require('fs')
/**
 * 标签列表
 */
router.get('/', function (req, res, next) {
  res.render(Constant.router('admin', 'config/index'), webconfig)
})
router.post('/', function (req, res, next) {
  var webConfigDefault = Constant.webConfig
  for (var key in webConfigDefault) {
    if (!tools.isEmpty(req.body[key])) {
      webConfigDefault[key] = req.body[key]
    }
  }
  console.log('准备写入文件')
  fs.writeFile('common/webConfig.js', 'module.exports =' + JSON.stringify(webConfigDefault), function (err) {
    if (err) {
      return console.error(err)
    }
    console.log('数据写入成功！')
    console.log('--------我是分割线-------------')
    console.log('读取写入的数据！')
    /* fs.readFile('input.txt', function (err, data) {
      if (err) {
        return console.error(err)
      }
      console.log('异步读取文件数据: ' + data.toString())
    }) */
  })
})
module.exports = router
