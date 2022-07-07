import { $http } from '@/utils/request'
import qs from 'qs'

export const changePwdService = {
  /**
   * 用户更新密码
   * @param data
   * @returns {Promise | Promise<unknown>}
   */
  updatePwd(data){
    return this.$http.post('/sys/user/changePassword', qs.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
    })
  },
  /**
   * 管理员设置密码
   * @param params
   * @returns {Promise | Promise<unknown>}
   */
  setPwd(data){
    return $http.put('/user/changePasswordByAdmin',qs.stringify(data),{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
    })
  }
}