var admin = function (name, app) {
  app.use(name, require('./mainRouter'))
  app.use(name + '/login', require('./loginRouter'))
  app.use(name + '/user', require('./userRouter'))
  app.use(name + '/tag', require('./tagRouter'))
  app.use(name + '/category', require('./categoryRouter'))
  app.use(name + '/article', require('./articleRouter'))
  app.use(name + '/chat', require('./chatRouter'))
  app.use(name + '/config', require('./configRouter'))

}

module.exports = admin
