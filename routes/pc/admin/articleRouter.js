/**
 *  Created by WebLss on 2018/8/13
 */
var express = require('express')
var router = express.Router()
var async = require('async')
const Constant = require('../../../common/constant')
var path = require('path')
const _ = require('lodash')
const tagModel = require('../../../models/tagModel')
const categoryModel = require('../../../models/categoryModel')
const articleModel = require('../../../models/articleModel')
const articleTagModel = require('../../../models/articleTagModel')
var Rs = require('../../../plugin/restful')
var renderHelper = require('../../../common/render_helper')
var formidable = require('formidable')
var fs = require('fs')
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
router.get('/query', function (req, res, next) {
  var pageSize = parseInt(req.query.rows || 3)
  console.log(pageSize)
  var currentPage = parseInt(req.query.page || 1)
  articleModel.getArticleList({}, currentPage, pageSize, function (err, result) {
    if (err) {
      res.json(err.message)
    } else {
      res.json(new Rs(200, '', result))
    }
  })
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
/**
 * 编辑文章
 */
router.get('/edit', function (req, res, next) {
  var _id = req.query.id || ''
  if (_id) {
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
      },
      article: function (done) {
        articleModel.findById(_id).then(function (data) {
          done('', data)
        })
      },
      artByTag: function (done) {
        articleTagModel.findByAid(_id).then(function (data) {
          done('', data)
        })
      }
    }, function (err, result) {
      if (!err) {
        // console.log(result)
        if (result.artByTag.length > 0) {
          var tids = []
          result.artByTag.forEach(function (item) {
            tids.push(item.tag_id.toString())
          })
          console.log(tids)
          result.artByTag = tids
        }
        res.render(Constant.router('admin', 'article/edit'), {result: result})
      } else {
        res.json(new Rs(300, err.message))
      }
    })
  }
})

/**
 * 处理编辑事件
 */
router.post('/edit', function (req, res, next) {
  var body = req.body
  body.html = renderHelper.markdown(body.markdown)
  console.log(console.log(body))
  // cid =>category_id
  if (!_.isEmpty(body.tids) && (typeof body.tids === 'string')) body.tids = [body.tids]
  if (!_.isEmpty(body.id)) {
    articleModel.editArticle(body, function (err, data) {
      if (err) res.json(new Rs(300, err))
      else res.json(new Rs(200, data))
    })
  }
})

/**
 * 处理添加事件
 */
router.post('/add', function (req, res, next) {
  // var hljs = require('highlight.js')
  // var body = req.body
  /* var md = require('markdown-it')({
    html: true,
    linkify: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>'
        } catch (__) {}
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
  }) */
  // body.html = md.render(body.markdown)
  // body.html = renderHelper.markdown(body.markdown)
  const form = new formidable.IncomingForm()
  form.encoding = 'utf-8'
  form.uploadDir = path.join(process.cwd(), '/public/upload_tmp')
  var newFileName = (new Date().getTime()) + '.png'
  var pathss = path.join(process.cwd(), '/public/upload', newFileName)
  console.log(pathss)
  form.keepExtensions = true
  form.parse(req, function (err, field, file) {
    if (!err) {
      if (_.isEmpty(file['cover'].name)) {
        deleteFile(file)
      } else {
        field.cover = newFileName
        field.html = renderHelper.markdown(field.markdown)
        articleModel.addArticle(field, function (err, data) {
          if (err) {
            deleteFile(file)
            res.json(new Rs(300, err))
          } else {
            fs.writeFileSync(pathss, fs.readFileSync(file['cover'].path))
            deleteFile(file)
            res.json(new Rs(200, '添加文章成功'))
          }
        })
      }
    }
    /* console.log(file['cover']) */
  }) // 解析request对象
  // cid =>category_id
  /* articleModel.addArticle(body, function (err, data) {
    if (err) res.json(new Rs(300, err))
    else res.json(new Rs(200, '添加文章成功'))
  }) */
  var deleteFile = function (file) {
    fs.unlink(file['cover'].path, function (err) {
      if (err) {
        return console.error(err)
      }
      console.log('文件删除成功！')
    })
  }

})
module.exports = router
