import { $http } from '@/utils/request'

export const SYSTEM_CGI = '/system.cgi'
export const PACK_CGI = '/pack.cgi'

export const commonServiceApi = {
  /**
   * 导出数据
   * @param {}
   * @return {Promise<unknown>>}
   * */
  exportData(params) {
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 获取系统时间
   *@param {}
   * @return {Promise<unknown>>}
   * */
  getTime() {
    let params = {
      action: 'getTime'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 系统重启
   * */
  reboot() {
    let params = {
      action: 'reboot'
    }
    return $http.get(SYSTEM_CGI, params)
  }

}