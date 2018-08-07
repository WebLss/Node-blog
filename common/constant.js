/**
 *  Created by WebLss on 2018/8/3
 *  常量
 */
var envDir = Object.is(process.env.NODE_ENV, 'development') ? 'src' : 'dist'
var Constant = {
  view_dir: envDir,
  public_dir: {
    __ADMIN_CSS__: '/public/dist/admin/css/',
    __ADMIN_JS__: '/public/dist/admin/js/',
    __ADMIN_IMG__: '/public/dist/admin/image/',
    __HOME_CSS__: '/public/dist/home/css/',
    __HOME_JS__: '/public/dist/home/js/',
    __HOME_IMG__: '/public/dist/home/image/',
    __COMMON_JS__: '/public/dist/common/js/',
    __COMMON_CSS__: '/public/dist/common/css/',
    __COMMON_IMG__: '/public/dist/common/image/'
  }

}

module.exports = Constant
