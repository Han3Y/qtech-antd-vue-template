import { $http } from '@/utils/request'
import qs from 'qs'


/**
 * 校验通过后登录
 * @param data
 * @returns {Promise<unknown>}
 */

export const login = (data) => {

  let config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
  };

  return $http.post('/user/login', qs.stringify(data), config)
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
    $http.post('/user/logout').then((res) => {
      resolve(res)
    }).catch((err) => {
      resolve(err)
    })
  })
}

export function getSmsCaptcha() {
  return null
}

