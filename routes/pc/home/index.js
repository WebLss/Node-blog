var home = function (name, app) {
  app.use(name, require('./indexRouter'))

}

module.exports = home
