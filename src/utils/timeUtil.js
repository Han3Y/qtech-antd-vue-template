import dayjs from 'dayjs'

export const DATE_FORMAT_TYPE = {
  DATE_TIME_FMT: 'YYYY-MM-DD HH:mm:ss',
  DATE_TIME_MINUTE_FMT: 'YYYY-MM-DD HH:mm',
  DATE_FMT: 'YYYY-MM-DD'
}
const REGEX_TYPE = {
  REGEX_T: /\x20|\s/
}

const PRE_NEXT = {
  'pre': 'pre',
  'next': 'next'
}

/**
 * 日期相关
 */
const TimeUtil = {
  /**
   * zero
   * */

  /**
   * 获取当前时间 YYYY-MM-DD HH:mm:ss
   */
  getNowFormatString() {
    return dayjs(Date.now()).format(DATE_FORMAT_TYPE.DATE_TIME_FMT)
  },
  /**
   *获取当前时间年月日 YYYY-MM-DD
   * */
  getNowDateFormatString(date = Date.now()) {
    return dayjs(date).format(DATE_FORMAT_TYPE.DATE_FMT)
  },
  /**
   * 时间戳转换成可视字符串
   * @param time
   * @param format
   */
  formatDate(time, format = DATE_FORMAT_TYPE.DATE_TIME_FMT) {
    return dayjs(time).format(format)
  },
  /**
   * 字符串时间转换为时间戳
   * @param formatDate
   */
  converDefaultTime(formatDate) {
    return dayjs(formatDate).valueOf()
  },
  /**
   * 获取秒
   * @param date
   */
  getSecond(date = Date.now()) {
    return dayjs(date).second()
  },
  /**
   * 获取分
   * @param date
   */
  getMinute(date = Date.now()) {
    return dayjs(date).minute()
  },
  /**
   * 获取小时
   * @param date
   */
  getHour(date = Date.now()) {
    return dayjs(date).hour()
  },
  /**
   * 获取是本月第几天
   * @param date
   */
  getDay(date = Date.now()) {
    return dayjs(date).date()
  },
  /**
   * 获取当前月份
   * @param date
   */
  getMonth(date = Date.now()) {
    return dayjs(date).month() + 1
  },
  /**
   * 获取当前年份
   * @param date
   */
  getYear(date = Date.now()) {
    return dayjs(date).year()
  },
  /**
   * 获取周几
   * @param date
   */
  getWeekDay(date = Date.now()) {
    return dayjs(date).day()
  },
  /**
   * 获取中文星期几
   * @param date
   * @param prefix
   */
  getWeekDayChinese(date = Date.now(), prefix = '星期') {
    const weekDay = this.getWeekDay(date)
    return prefix + ['日', '一', '二', '三', '四', '五', '六'][weekDay]
  },

  /**
   * 获取当前时间的 YYYY-MM-DD 00:00:00点并转换为T连接  -> YYYY:MM:DDT00:00:00
   * @param dateStamp 指定时间的时间戳： 0表示当前时间
   * @param day 表示前&后几天的零点
   * @param type 表示前或者后{pre|next}
   * */
  getNowDayStart(dateStamp = 0, day = 0, type = PRE_NEXT['pre']) {
    let millisecond = (`${type === PRE_NEXT['pre'] ? '-' : '+'}` + day * 24 * 60 * 60 * 1000) * 1
    // let nowDayStart = this.formatDate(new Date().setHours(0, 0, 0, 0) + millisecond)
    let nowDayStart = this.formatDate((dateStamp === 0 ? new Date() : new Date(dateStamp)).setHours(0, 0, 0, 0) + millisecond)
    let regT = nowDayStart.replace(REGEX_TYPE.REGEX_T, 'T')
    return regT
  },
  /**
   * YYYY-MM-DD hh:mm:ss转换为T连接 YYYY:MM:DDThh:mm:ss
   * */
  timeConvertTtime(dateStamp){
    let nowStamp=this.formatDate(dateStamp)
    let regT = nowStamp.replace(REGEX_TYPE.REGEX_T, 'T')
    return regT
  }
}

export default TimeUtil
