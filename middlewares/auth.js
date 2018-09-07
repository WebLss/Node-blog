/**
 *  Created by WebLss on 2018/9/7
 */
var promise = ['/admin/login', '/admin/login/showVerify']
// 验证用户是否登录
exports.authUser = function (req, res, next) {
  res.locals.current_user = null
  if (promise.indexOf(req.path) !== -1) {
    return next()
  } else {
    if (req.path.indexOf('admin')) {
      if (req.session.user != null) {
        if (req.session.user.is_admin === true) { return next() } else res.send('没有权限')
      } else {
        res.redirect('/admin/login')
      }
    }
  }
}
