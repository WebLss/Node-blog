const express = require('express')
const router = express.Router()
const tagModel = require('../../../models/tagModel')
/* GET users listing. */
router.get('/', function (req, res, next) {
  tagModel.createAndUpdate('xiaochuan', function (message) {
    console.log(message)
  })
  res.send('hah')
})

module.exports = router
