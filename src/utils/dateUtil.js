
export const DateUtil = {
  /**
   * 获取当前时间对象
   * @param longTypeDate
   * @returns {string}
   */
  getDate(longTypeDate) {
    const date = new Date()
    date.setTime(longTypeDate)
    return date
  },
  /**
   * yyyy年MM月dd日 hh:mm:ss
   * @param longTypeDate
   * @returns {string}
   */
  datetimeFormat_1(longTypeDate) {
    let datetimeType = ''
    const date = this.getDate(longTypeDate)
    // 年
    datetimeType += date.getFullYear()
    // 月
    datetimeType += '-' + this.getMonth(date)
    // 日
    datetimeType += '-' + this.getDay(date)
    // 时
    datetimeType += '  ' + this.getHours(date)
    // 分
    datetimeType += ':' + this.getMinutes(date)
    // 分
    datetimeType += ':' + this.getSeconds(date)
    return datetimeType
  },

  /**
   * HH:mm:ss
   */
  dateFormatHMS(longTypeDate) {
    let datetimeType = ''
    const date = this.getDate(longTypeDate)
    // 时
    datetimeType += '  ' + this.getHours(date)
    // 分
    datetimeType += ':' + this.getMinutes(date)
    datetimeType += ':' + this.getSeconds(date) // 秒
    return datetimeType
  },
  /**
   * HH
   */
  dateFormatH(longTypeDate) {
    let datetimeType = ''
    const date = this.getDate(longTypeDate)
    // 时
    datetimeType += '  ' + this.getHours(date)
    return datetimeType
  },
  /**
   * yyyy-MM-dd
   * @param longTypeDate
   * @returns {string}
   */
  dateFormat(longTypeDate) {
    const date = this.getDate(longTypeDate)
    const dateType = date.getFullYear() + '-' + this.getMonth(date) + '-' + this.getDay(date) // yyyy-MM-dd格式日期
    return dateType
  },

  // 返回 01-12 的月份值
  getMonth(date) {
    const month = date.getMonth() + 1 // getMonth()得到的月份是0-11
    return this.setTimeFillZero(month)
  },

  // 返回01-30的日期
  getDay(date) {
    const day = date.getDate()
    return this.setTimeFillZero(day)
  },

  // 返回小时
  getHours(date) {
    const hours = date.getHours()
    return this.setTimeFillZero(hours)
  },

  // 返回分
  getMinutes(date) {
    const minute = date.getMinutes()
    return this.setTimeFillZero(minute)
  },

  // 返回秒
  getSeconds(date) {
    const second = date.getSeconds()
    return this.setTimeFillZero(second)
  },
  setTimeFillZero(num) {
    return num < 10 ? '0' + num : num
  }
}
