import { $http } from '@/utils/request'

export const commonServiceApi = {

  /**
   * 获取系统时间
   *@param {}
   * @return {Promise<unknown>>}
   * */
  getTime() {
    return $http.get('/commons/systemTime')
  },

  /**
   * 获取版本信息
   * @returns {Promise<unknown>}
   */
  getVersionInfo(){
    return $http.get('');
  }

}