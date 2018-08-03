/**
 *  Created by WebLss on 2018/8/3
 *  常量
 */
var Constant = {
  view_dir: 'dist'
}
console.log(process.env.NODE_ENV)
if (Object.is(process.env.NODE_ENV, 'development')) {
  console.log('view_dir')
  Constant.view_dir = 'src'
}
module.exports = Constant
