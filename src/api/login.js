import { $http } from '@/utils/request'
import qs from 'qs'

/**
 * 校验用户名密码，返回是否需要验证指纹
 * @param data
 * @returns {Promise<unknown>}
 */
export const checkFinger = (data) => {
  return post('/user/login/checkFinger', data, {})
}

/**
 * 校验通过后登录
 * @param data
 * @returns {Promise<unknown>}
 */

export const login = (data) => {

  let params = Object.assign({}, { action: 'login' }, data)
  return $http.post('/person.cgi',params)
}


export function getInfo(userId) {
  return $http.get('/user/' + userId)
}

export function getCurrentUserNav() {
  return Promise.resolve({});
}


//退出登录
export function logout() {
  return new Promise((resolve, reject) => {
    $http.post('/person.cgi', { action: 'loginOut' }).then((res) => {
      resolve(res)
    }).catch((err) => {
      resolve(err)
    })
  })
}

export function getSmsCaptcha() {
  return null
}

