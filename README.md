使用express-generator


部署该项目需要nodemon 的安装：

       npm install -g nodemon

安装session-mongoose依赖库
npm install session-mongoose


~ express -h  # 检查看express的帮助命令
  Usage: express [options] [dir]
  Options:
    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css   add stylesheet  support (less|stylus|compass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory

express -e nodejs-demo  # 创建项目
 install dependencies:
     $ cd nodejs-demo && npm install
   run the app:
     $ DEBUG=nodejs-demo:* ./bin/www

     启动项目npm start

查看本地bower已经缓存的类库
bower cache list
Commands，列出了bower支持的各种命令。

cache:bower缓存管理
help:显示Bower命令的帮助信息
home:通过浏览器打开一个包的github发布页
info:查看包的信息
init:创建bower.json文件
install:安装包到项目
link:在本地bower库建立一个项目链接
list:列出项目已安装的包
lookup:根据包名查询包的URL
prune:删除项目无关的包
register:注册一个包
search:搜索包
update:更新项目的包
uninstall:删除项目的包

mongodb:
D:\Program Files\MongoDB\Server\3.4\bin>mongod --dbpath "D:\mongodb\data\db" 启动mongodb

小结一下，往后要重新启动 mongodb 服务、进入 mongodb 命令行的操作：
在一个iTerm2窗口执行：mongod //MongoDB starting........waiting for connections
另一个iTerm2窗口执行：mongo //MongoDB shell


mongolass: https://github.com/WebLss/mongolass

->package.json
小提示: npm i 是 npm install 的简写，建议使用 npm i。

直接使用 npm i 安装的模块是不会写入 package.json 的 dependencies (或 devDependencies)，需要额外加个参数:

npm i express --save/npm i express -S (安装 express，同时将 "express": "^4.14.0" 写入 dependencies )
npm i express --save-dev/npm i express -D (安装 express，同时将 "express": "^4.14.0" 写入 devDependencies )
npm i express --save --save-exact (安装 express，同时将 "express": "4.14.0" 写入 dependencies )
第三种方式将固定版本号写入 dependencies，建议线上的 Node.js 应用都采取这种锁定版本号的方式，因为你不可能保证第三方模块下个小版本是没有验证 bug 的，
即使是很流行的模块。拿 Mongoose 来说，Mongoose 4.1.4 引入了一个 bug 导致调用一个文档 entry 的 remove 会删除整个集合的文档，
见：https://github.com/Automattic/mongoose/blob/master/History.md#415--2015-09-01。
后面会介绍更安全的 npm shrinkwrap 的用法。

运行以下命令：

npm config set save-exact true
这样每次 npm i xxx --save 的时候会锁定依赖的版本号，相当于加了 --save-exact 参数。

小提示：npm config set 命令将配置写到了 ~/.npmrc 文件，运行 npm config list 查看。

2.6.4 npm shrinkwrap
前面说过要锁定依赖的版本，但这并不能完全防止意外情况的发生，因为锁定的只是最外一层的依赖，而里层依赖的模块的 package.json 有可能写的是 "mongoose": "*"。
为了彻底锁定依赖的版本，让你的应用在任何机器上安装的都是同样版本的模块（不管嵌套多少层），
通过运行 npm shrinkwrap，会在当前目录下产生一个 npm-shrinkwrap.json，里面包含了通过 node_modules 计算出的模块的依赖树及版本。
上面的截图也显示：只要目录下有 npm-shrinkwrap.json 则运行 npm install 的时候会优先使用 npm-shrinkwrap.json 进行安装，没有则使用 package.json 进行安装。

更多阅读：

https://docs.npmjs.com/cli/shrinkwrap
http://tech.meituan.com/npm-shrinkwrap.html

对应模块的用处：

express: web 框架
express-session: session 中间件
connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
connect-flash: 页面通知的中间件，基于 session 实现
ejs: 模板
express-formidable: 接收表单及文件上传的中间件
config-lite: 读取配置文件
marked: markdown 解析
moment: 时间格式化
mongolass: mongodb 驱动
objectid-to-timestamp: 根据 ObjectId 生成时间戳
sha1: sha1 加密，用于密码加密
winston: 日志
express-winston: express 的 winston 日志中间件


 ESLint
ESLint 是一个代码规范和语法错误检查工具。使用 ESLint 可以规范我们的代码书写，可以在编写代码期间就能发现一些低级错误。

ESLint 需要结合编辑器或 IDE 使用，如：
可以配置eslint啦~npm install -g eslint
npm install -g install-peerdepsinstall-peerdeps --dev eslint-config-airbnb
复制代码注意啦，首次一定要是全局安装，全局安装，全部全局安装，重要的事情说山遍~初始化一下吧eslint --init
复制代码根据自己的项目需求配置，我这里选择的标准是Airbnb标准。在use arrow keys的时候，有些是看不到箭头的移动，但是已经选择了，所以选择哪呢，就按上下键+enter就好，反正我的是看不见，也能选上。



Sublime Text 需要装两个插件：SublimeLinter + SublimeLinter-contrib-eslint
VS Code 需要装一个插件：ESLint
小提示：Sublime Text 安装插件通过 ctrl+shift+p 调出 Package Control，输入 install 选择 Install Package 回车。输入对应插件名搜索，回车安装。 小提示：VS Code 安装插件需要点击左侧『扩展』页

全局安装 eslint：

npm i eslint -g
运行：

eslint --init


 config-lite
config-lite 是一个轻量的读取配置文件的模块。config-lite 会根据环境变量（NODE_ENV）的不同加载 config 目录下不同的配置文件。如果不设置 NODE_ENV，则读取默认的 default 配置文件，如果设置了 NODE_ENV，则会合并指定的配置文件和 default 配置文件作为配置，config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。
如果程序以 NODE_ENV=test node app 启动，则 config-lite 会依次降级查找 config/test.js、config/test.json、config/test.node、config/test.yml、config/test.yaml 并合并 default 配置; 如果程序以 NODE_ENV=production node app 启动，则 config-lite 会依次降级查找 config/production.js、config/production.json、config/production.node、config/production.yml、config/production.yaml 并合并 default 配置。
config-lite 还支持冒泡查找配置，即从传入的路径开始，从该目录不断往上一级目录查找 config 目录，直到找到或者到达根目录为止。

npm shrinkwrap 强制相应版本依赖


mongodb:
brew services start mongodb  ---启动
brew services stop mongodb --停止
brew services restart mongodb --重启
或者
mongod --config /usr/local/etc/mongod.conf --启动


SET NODE_ENV =development


use admin, db.shutdownServer() --关闭

//在 Chrome 54-55、Firefox 49-50、IE 11、Edge 14、Safari 9-10、Node.js 6-7 和 PhantomJS 2.1.1 上通过测试。
  Automated browser & CI test runs are available.
https://www.lodashjs.com/  是一个一致性、模块化、高性能的 JavaScript 实用工具库。

https://www.npmjs.com/package/loader
上文没有提及的重要值是assetsMap，这个值需要通过构建产生，类似如下格式：

{
  "/assets/index.min.js":"/assets/index.min.ecf8427e.js",
  "/assets/index.min.css":"/assets/index.min.f2fdeab1.css"
}
如果需要线上执行，需要该对象的传入。而该对象需要通过以下构建脚本（loader-builder）来生成：

$ builder <views_dir> <output_dir>
$ # 或者
$ ./node_modules/loader-builder/bin/builder <views_dir> <output_dir>
以上脚本将会遍历视图目录中寻找Loader().js().css().done()这样的标记，然后得到合并文件与实际文件的关系。
如以上的assets/index.min.js文件并不一定需要真正存在，进行扫描构建后，会将相关的js文件进行编译和合并为一个文件。
并且根据文件内容进行md5取hash值，最终生成/assets/index.min.ecf8427e.js这样的文件。

http://www.ptbird.cn/node-js-svg-captcha.html

