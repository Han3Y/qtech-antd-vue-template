import Vue from 'vue'

/**
 * 全局事件类型
 * @type {{}}
 */
export const EVENT_BUS_TYPES = {
  TEST: 'test',
  RISK_TOTAL:'risk_total',//风险总数
  RISK_SPREAD:'risk_spread',//风险分布
  DOWNLOAD_REPORT:'download_report',//报表下载
  ON_RESIZE:'on_resize',//系统状态风险图标随尺寸变化
}
const Bus = new Vue()
export default Bus