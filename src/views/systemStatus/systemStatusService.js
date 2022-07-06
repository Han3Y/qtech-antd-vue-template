import { $http } from '@/utils/request'
import { SYSTEM_CGI, PACK_CGI } from '@/api/common'

export const systemStatusService = {
  /**
   * 安全事件设备总统计
   * */
  getSafeInfoTimeCount() {
    let params = {
      action: 'getSafeInfoTimeCount'
    }
    return $http.get(PACK_CGI, params)
  },
  /**
   * 获取风险总数,获取某天安全事件等级统计（高，低，中）
   * */
  getSafeInfoLevelCount({ startTime, endTime }) {
    let params = {
      action: 'getSafeInfoLevelCount',
      startTime,
      endTime
    }
    return $http.get(PACK_CGI, params)
  },
  /**
   * 获取某天安全事件类型统计(黑名单，白名单)
   * */
  getSafeInfoEventCount({ startTime, endTime }) {
    let params = {
      action: 'getSafeInfoEventCount',
      startTime,
      endTime
    }
    return $http.get(PACK_CGI, params)
  },
  /**
   * 获取设备状态
   * */
  getDeviceInfo() {
    let params = {
      action: 'getDeviceInfo'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 获取4G状态信息
   * */
  query4GInfo() {
    let params = {
      action: 'query4GInfo'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 获取硬盘信息
   * */
  queryDiskInfo() {
    let params = {
      action: 'QueryDiskInfo'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 获取流量总数
   * */
  getFlowCount() {
    let params = {
      action: 'getFlowCount'
    }
    return $http.get(PACK_CGI, params)
  },

  /**
   * 获取系统时间
   * */
  getTime() {
    let params = {
      action: 'getTime'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 获取过去24小时等级统计
   * */
  getLastDaySafeInfoLevelCount() {
    let params = {
      action: 'getLastDaySafeInfoLevelCount'
    }
    return $http.get(PACK_CGI, params)
  },
  /**
   * 获取过去24小时流量统计
   * */
  getLastDayFlowCount() {
    let params = {
      action: 'getLastDayFlowCount'
    }
    return $http.get(PACK_CGI, params)
  },

  /**
   * 获取某月有安全事件的日期
   * */
  getMonthSafeInfoDay(params) {
    let args=Object.assign({},params,{
      action: 'getMonthSafeInfoDay'
    })
    return $http.get(PACK_CGI, args)
  }

}