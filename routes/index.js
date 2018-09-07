var admin = require('./pc/admin')
var home = require('./pc/home')
var router = function (app) {
  admin('/admin', app) // 后台路由
  home('/', app) // 后台路由
  // 404 page
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}
module.exports = router
