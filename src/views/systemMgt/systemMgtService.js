import { $http } from '@/utils/request'
import { SYSTEM_CGI, PACK_CGI } from '@/api/common'

export const systemMgtService = {
  /**
   * 获取设备状态
   * */
  getSysInfo() {
    let params = {
      action: 'getSysInfo'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 获取端口状态
   * */
  getPortInfo() {
    let params = {
      action: 'getPortInfo'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 设置IP地址
   * */
  setMngIp(params) {
    let args = Object.assign({}, params, {
      action: 'setMngIp'
    })
    return $http.get(SYSTEM_CGI, args)
  },
  /**
   * 设置时间
   * */
  setTime(params) {
    let args = Object.assign({}, params, {
      action: 'setTime'
    })
    return $http.get(SYSTEM_CGI, args)
  },
  /**
   * 系统白名单IP查询
   * */
  queryWhiteIp() {
    let params = {
      action: 'queryWhiteIp'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 白名单开启&关闭
   * */
  setWhiteIpState(params) {
    let args = Object.assign({}, params, {
      action: 'setWhiteIpState'
    })
    return $http.get(SYSTEM_CGI, args)
  },
  /**
   * 获取白名单状态
   * */
  getWhiteIpState() {
    let params = {
      action: 'getWhiteIpState'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 系统添加白名单ip
   * */
  setWhiteIp(params) {
    let args = Object.assign({}, params, {
      action: 'setWhiteIp'
    })
    return $http.get(SYSTEM_CGI, args)
  },
  /**
   * 删除白名单ip
   * */
  delWhiteIp(params) {
    let args = Object.assign({}, params, {
      action: 'delWhiteIp'
    })
    return $http.get(SYSTEM_CGI, args)
  },
  /**
   * 获取日志参数
   * */
  getLogArg() {
    let params = {
      action: 'getLogArg'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 设置日志审计
   * */
  setLogArg(params) {
    let args = Object.assign({}, params, {
      action: 'setLogArg'
    })
    return $http.get(SYSTEM_CGI, args)
  },
  /**
   * 获取系统登录参数
   * */
  getLoginArg() {
    let params = {
      action: 'getLoginArg'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 系统登录参数设置
   * */
  setLoginArg(params) {
    let args = Object.assign({}, params, {
      action: 'setLoginArg'
    })
    return $http.get(SYSTEM_CGI, args)
  },
  /**
   * 导出离线报表
   * */
  getOfflineData(params) {
    let args = Object.assign({}, params, {
      action: 'getOfflineData'
    })
    return $http.get(PACK_CGI, args)
  },
  /**
   * lice数据查询
   * */
  queryLice() {
    let params = {
      action: 'QueryLice'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 获取最近备份时间
   * */
  getBackupTime() {
    let params = {
      action: 'getBackupTime'
    }
    return $http.get(SYSTEM_CGI, params)
  },
  /**
   * 最近数据恢复时间
   * */
  getRecoverTime(){
    let params={
      action:'getRecoverTime'
    }
    return $http.get(SYSTEM_CGI,params)
  },
  /**
   * 获取平台注册信息
   * */
  getPlatformInfo(){
    let params={
      action:'getPlatformInfo'
    }
    return $http.get(SYSTEM_CGI,params)
  },
  /**
   * 一键备份
   * */
  sysBackup(){
    let params={
      action:'sysBackup'
    }
    return $http.get(SYSTEM_CGI,params)
  },
  /**
   * 恢复出厂设置
   * */
  sysBackToFrist(){
    let params={
      action:'sysBackToFrist'
    }
    return $http.get(SYSTEM_CGI,params)
  },
  /**
   * 机器码下载
   * */
  downLice(){
    let params={
      action:'downLice'
    }
    return $http.get(SYSTEM_CGI,params)
  },
  /**
   * 平台注册
   * */
  registerPlatform(params){
    let args=Object.assign({},params,{
      action:'registerPlatform'
    })
    return $http.get(SYSTEM_CGI,args)
  },
  /**
   * 平台取消注册
   * */
  calcelPlatformInfo(){
    let params={
      action:'calcelPlatformInfo'
    }
    return $http.get(SYSTEM_CGI,params)
  }
}