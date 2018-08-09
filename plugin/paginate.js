/**
 *  Created by WebLss on 2018/8/9
 */
/**
 * 分页插件类(缺少每页的显示数)
 * @param currentPage {Number} 当前页
 * @param pageSize {Number} 每页记录数
 * @param totalCounts {Number} 总记录数
 * @constructor
 */
function Paginate (currentPage, pageSize, totalCounts) {
  if (!currentPage || currentPage < 1) {
    currentPage = 1
  }
  if (!pageSize || pageSize < 1) {
    pageSize = 20
  }
  if (!totalCounts || totalCounts < 0) {
    totalCounts = 0
  }
  this.pageSize = pageSize
  this.totalCounts = totalCounts
  if (this.totalCounts % this.pageSize === 0) {
    this.totalPages = parseInt(this.totalCounts / this.pageSize)
  } else {
    this.totalPages = parseInt(this.totalCounts / this.pageSize) + 1
  }
  if (currentPage > this.totalPages) {
    this.currentPage = this.totalPages
  } else {
    this.currentPage = currentPage
  }
}
/*
* 当前开始的条数
*/
Paginate.prototype.first = function () {
  var first = (this.currentPage - 1) * this.pageSize
  if (first > this.totalCounts) {
    return (this.totalPages - 1) * this.pageSize
  }
  return first
}
/*
* 当前页最大的条数
*/
Paginate.prototype.last = function () {
  var last = this.first() + this.pageSize
  if (last > this.totalCounts) {
    return this.totalCounts
  }
  return last
}

/**
 * 上一页
 * @returns {number}
 */
Paginate.prototype.prev = function () {
  if (this.currentPage <= 1) {
    return false
  }
  return this.currentPage - 1
}

/**
 * 下一页
 * @returns {*}
 */
Paginate.prototype.next = function () {
  if (this.currentPage >= this.totalPages) {
    return false
  }
  return (parseInt(this.currentPage) + 1)
}
module.exports = Paginate
