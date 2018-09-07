var path = require('path')
var config = {
  // debug 为 true 时，用于本地调试
  // debug 为 true 时，用于本地调试
  debug: true,

  get mini_assets () { return !this.debug }, // 是否启用静态文件的合并压缩，详见视图中的Loader
  port: 3000,
  session: {
    secret: 'NodeBlog',
    key: 'NodeBlog',
    maxAge: 2592000000
  },
  // redis 配置，默认是本地
  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_db: 0,
  redis_password: '',

  session_secret: 'node_blog_secret', // 务必修改
  // mongodb 配置
  mongodb: 'mongodb://127.0.0.1:27017/NodeBlog',
  options: {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 20, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    keepAlive: true, // 保持长连接激活状态
    keepAliveInitialDelay: 300000
  },
  // 日志类配置
  log_dir: path.join(__dirname, 'logs'),

  // cdn host，如 http://cnodejs.qiniudn.com
  site_static_host: '' // 静态文件存储域名
}
if (process.env.NODE_ENV === 'development') {
  config.mongodb = 'mongodb://127.0.0.1:27017/NodeBlog_dev'
}
module.exports = config
