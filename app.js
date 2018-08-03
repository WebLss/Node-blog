var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const routes = require('./routes')

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
app.use(express.static(path.join(__dirname, 'public')))
// if (process.env.NODE_ENV === 'development') { }

routes(app) // 路由注册

module.exports = app
