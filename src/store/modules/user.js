import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome, objGet } from '@/utils/util'
import { roleNameMap, translateRole } from '@/config/roles'
import StorageUtil, { StorageKey } from '@/utils/storage'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: {},
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      console.log('roles', roles)
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          let userInfo = response
          userInfo.expired = +new Date() + 1000 * 60 * 24//过期时间
          userInfo.token = userInfo.id
          commit('SET_TOKEN', userInfo.id)
          commit('SET_INFO', userInfo)
          commit('SET_NAME', { name: userInfo.userName })
          commit('SET_ROLES', translateRole(userInfo))//转换出来的角色
          StorageUtil.setKey(StorageKey.USER, userInfo)
          StorageUtil.setKey(StorageKey.TOKEN, userInfo)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // SyncInfo({ commit }, userInfo) {
    /**
     * {
			bh: null
      department: null
      email: null
      id: "d5b7a008-aa4c-11ec-ae35-4d2ee5d58f98"
      initPwd: false
      job: null
      loginName: "admin"
      organizationCode: "ADMIN001"
      password: null
      phone: null
      policeNumber: null
      policeRank: null
      roleId: null
      roleName: "系统管理员"
      roles: [1]
      userName: "管理员"`
		}
     * @param commit
     * @returns {Promise<unknown>}
     * @constructor
     */
    SyncInfo({ commit }) {
      // const userInfo = goodStorage.get(user)
      return new Promise((resolve, reject) => {
        const result = StorageUtil.getKey(StorageKey.USER)
        if (result) {
          const formatRole = translateRole(result)
          const role = formatRole
          role.permissions.map(per => {
            if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
              const action = per.actionEntitySet.map(action => {
                return action.action
              })
              per.actionList = action
            }
          })
          role.permissionList = role.permissions.map(permission => {
            return permission.permissionId
          })
          commit('SET_ROLES', formatRole)
          commit('SET_INFO', result)
          commit('SET_NAME', { name: result.userName })
          resolve({
            data: Object.assign(result, { role: formatRole, roles: role })
          })
        } else {
          reject(new Error('getInfo: roles must be a non-null array !'))
        }
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_INFO', null)
          StorageUtil.removeKey(StorageKey.USER)
          StorageUtil.removeKey(ACCESS_TOKEN)
          resolve()
        }).catch((err) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          StorageUtil.removeKey(StorageKey.USER)
          StorageUtil.removeKey(ACCESS_TOKEN)
          reject('退出失败')
        }).finally(() => {
        })
      })
    }

  }
}

export default user
