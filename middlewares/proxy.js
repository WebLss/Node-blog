var urllib = require('url')
var request = require('request')
var logger = require('../common/logger')

var ALLOW_HOSTNAME = [
  'veekergdn.cn', 'www.veekergdn.cn',
  'localhost:3000', 'www.google-analytics.com'
]
var omit = function (obj, arr) {
  arr.forEach(function (item) {
    if (obj.hasOwnProperty(item)) {
      delete obj[item]
    }
  })
}

exports.proxy = function (req, res, next) {
  var url = decodeURIComponent(req.query.url)
  var hostname = urllib.parse(url).hostname

  if (ALLOW_HOSTNAME.indexOf(hostname) === -1) {
    return res.send(hostname + ' is not allowed')
  }

  request.get({
    url: url,
    headers: this.omit(req.headers, ['cookie', 'refer'])
  })
    .on('response', function (response) {
      res.set(response.headers)
    })
    .on('error', function (err) {
      logger.error(err)
    })
    .pipe(res)
}
