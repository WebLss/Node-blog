/**
 *  Created by WebLss on 2018/8/3
 *  常量
 */
const Path = require('path')
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
    __COMMON_IMG__: '/public/dist/common/image/',
    __STATIC_JS__: '/public/static/js/',
    __STATIC__: '/public/static/',
    __PUBLIC__: '/public/'
  },
  router: function (module, route) { // 路由组装
    return Path.join(envDir, Path.join(module, route))
  },
  webConfig: {
    // 此配置项为自动生成请勿直接修改；如需改动请在后台网站设置
    //* ************************************网站设置****************************************
    'WEB_STATUS': '1', // 网站状态1:开启 0:关闭
    'WEB_CLOSE_WORD': '网站升级中，请稍后访问。', // 网站关闭时提示文字
    'WEB_ICP_NUMBER': '粤ICP备17035704号-1', // 网站ICP备案号
    'ADMIN_EMAIL': 'onbaby_520@outlook.com', // 站长邮箱

    //* ************************************优化推广****************************************
    'WEB_NAME': '微圆博客', // 网站名：
    'WEB_KEYWORDS': '微圆博客,小川,小川哲梦,技术博客,个人博客,veeker,PHP,JavaEE,微客圆,Web寻梦狮', // 网站关键字
    'WEB_DESCRIPTION': 'Web寻梦狮的技术博客，主要分享Node和php以及Ionic、angular等开发经验，欢迎加入微客圆大家庭', // 网站描述
    'AUTHOR': 'Web寻梦狮', // 默认作者
    'COPYRIGHT_WORD': '本文为Web寻梦狮原创文章,转载无需和我联系,但请注明来自Web寻梦狮博客veekergdn.cn', // 文章保留版权提示
    'IMAGE_TITLE_ALT_WORD': '微客圆', // 图片默认title和alt

    //* ************************************水印设置****************************************
    'WATER_TYPE': '1', // 水印类型 0:不使用水印 1:文字水印 2:图片水印 3:文字和图片水印同时使用
    'TEXT_WATER_WORD': 'veekergdn.cn', // 文字水印内容
    'TEXT_WATER_TTF_PTH': './Public/static/font/ariali.ttf', // 文字水印字体路径
    'TEXT_WATER_FONT_SIZE': '14', // 文字水印文字字号
    'TEXT_WATER_COLOR': '#008CBA', // 文字水印文字颜色
    'TEXT_WATER_ANGLE': '0', // 文字水印文字倾斜程度
    'TEXT_WATER_LOCATE': '9', // 文字水印位置 1：上左 2：上中 3：上右 4：中左 5：中中 6：中右 7：下左 8：下中 9：下右
    'IMAGE_WATER_PIC_PTAH': './Upload/image/logo/logo.png', // 图片水印 水印路径
    'IMAGE_WATER_LOCATE': '9', // 图片水印 水印位置 1：上左 2：上中 3：上右 4：中左 5：中中 6：中右 7：下左 8：下中 9：下右
    'IMAGE_WATER_ALPHA': '80', // 图片水印 水印透明度：0-100

    //* ************************************第三方登录****************************************
    'QQ_APP_ID': '101393876', // QQ登录APP D
    'QQ_APP_KEY': 'dc83e590defee93378a4f8b5658272b0', // QQ登录APP KEY
    'SINA_API_KEY': '3031008787', // 新浪登录API KEY
    'SINA_SECRET': '53c717065408cbba43cc8142454276a4', // 新浪登录SECRET
    'DOUBAN_API_KEY': '', // 豆瓣登录API KEY
    'DOUBAN_SECRET': '', // 豆瓣登录SECRET
    'RENREN_API_KEY': '', // 人人登录API KEY
    'RENREN_SECRET': '', // 人人登录SECRET
    'KAIXIN_API_KEY': '', // 开心网登录API KEY
    'KAIXIN_SECRET': '', // 开心网登录SECRET
    'GITHUB_CLIENT_ID': '', // github登录API KEY
    'GITHUB_CLIENT_SECRET': '', // github登录SECRET
    'SOHU_API_KEY': '', // 搜狐网登录API KEY
    'SOHU_SECRET': '', // 搜狐网登录SECRT
    //* **********************************其他第三方接口****************************************
    'WEB_STATISTICS': '', // 第三方统计代码
    'BAIDU_SITE_URL': 'http://data.zz.baidu.com/urls?site=www.veekergdn.cn&token=NAcPcUIsBt06cD4M', // 百度推送site提交接
    //* **********************************邮箱设置***********************************************
    'EMAIL_SMTP': 'smtp.qq.com', //  SMTP服务器
    'EMAIL_USERNAME': '1027820283@qq.com', //  邮箱用户名
    'EMAIL_PASSWORD': 'tiantian123', //  邮箱密码
    'EMAIL_FROM_NAME': 'Web寻梦狮', //  发件名
    //* **********************************评论管理***********************************************
    'COMMENT_REVIEW': '1', // 评论审核1:开启 0:关闭
    'COMMENT_SEND_EMAIL': '1', // 被评论邮件通知1:开启 0:关闭
    'EMAIL_RECEIVE': '1027820283@qq.com' // 接收评论通知邮箱
  }

}

module.exports = Constant
