import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import cloneDeep from 'lodash.clonedeep'
import StorageUtil, { StorageKey } from '@/utils/storage'


/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}


/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}


function filterAsyncRouter(routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })

  return accessedRouters
}


function test(){}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {//权限路由菜单
      return new Promise(resolve => {
        const result = StorageUtil.getKey(StorageKey.USER)
        // let userAuth = result.userAuth.filter(item => item.key === '1').map(item => item.auth)
        const { roles } = data
        // hasPermission方法遍历的是接口返回来的数据(roles--->res.result.role)

        const routerMap = cloneDeep(asyncRouterMap)
        const accessedRouters = filterAsyncRouter(routerMap, roles)//处理路由
        console.log(accessedRouters, '角色路由')

        // 处理角色实际拥有权限
        // let roleMenuList = accessedRouters.filter((item, index) => {
        //     if (index === 0) {
        //       item.redirect=item.children[0].path
        //       item.children= item.children.filter(subItem=>{
        //
        //         if(subItem.meta.auth){
        //           if(userAuth.includes(subItem.meta.auth[0])){
        //             return  true
        //           }
        //           return  false
        //         }
        //         return true;
        //       })
        //     }
        //     return true
        //   }
        // )
        // console.log(roleMenuList,'11111')
        // commit('SET_ROUTERS', roleMenuList)

        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
