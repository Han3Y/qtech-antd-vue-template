import { $http } from '@/utils/request'

export const changePwdService = {
  updatePwd(params){
    return $http.get('/person.cgi',params)
  },
  setPwd(params){
    return $http.get('/person.cgi',params)
  }
}