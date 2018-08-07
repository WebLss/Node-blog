var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const routes = require('./routes')
var Loader = require('loader')
var _ = require('lodash')
var config = require('./config/default')
var Constant = require('./common/constant')
var proxyMiddleware = require('./middlewares/proxy')

var app = express()
// 设置正式环境和开发环境
console.log(process.env.NODE_ENV)
// 设置模板目录
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎为 ejs
// app.set('view engine', 'ejs')
app.set('view engine', 'html')
app.engine('html', require('ejs-mate'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// 静态资源文件目录,若不加路径，则在js\css前面就不需要加public,一般设置一下路径更好方便区分
app.use('/public', express.static(path.join(__dirname, 'public')))
// if (process.env.NODE_ENV === 'development') { }
app.use('/agent', proxyMiddleware.proxy) // 拦截图片被盗用，设置代理refer

// assets
var assets = {}
if (config.mini_assets) {
  try {
    assets = require('./assets.json')
  } catch (e) {
    logger.error('You must execute `make build` before start app when mini_assets is true.')
    throw e
  }
}

_.assignIn(app.locals, {config: config, Loader: Loader, assets: assets}
  , require('./common/render_helper'), {static: Constant.public_dir})

routes(app) // 路由注册

module.exports = app
