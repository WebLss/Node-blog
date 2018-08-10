var admin = function (name, app) {
  app.use(name, require('./mainRouter'))
  app.use(name + '/user', require('./userRouter'))
  app.use(name + '/tag', require('./tagRouter'))
  app.use(name + '/category', require('./categoryRouter'))
}

module.exports = admin
