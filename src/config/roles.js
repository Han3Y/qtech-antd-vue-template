// role
const roleObj = {
  id: 'admin',
  name: '管理员',
  describe: '拥有所有权限',
  status: 1,
  creatorId: 'system',
  createTime: 1497160610259,
  deleted: 0,
  permissions: [
    {
      roleId: 'admin',
      permissionId: 'other1',
      permissionName: '其他模块11'
    }
  ]
}

roleObj.permissions.push({
  roleId: 'admin',
  permissionId: 'support',
  permissionName: '超级模块'
})


export const roleNameMap = {
  admin: '管理员',
  operator: '操作员',
  auditor: '审计员'
}

/**
 * 转换角色权限信息
 * @param userInfo
 */
export function translateRole(userInfo) {
  // const roleId = roleMap[userInfo.roles[0]]
  const roleId = userInfo.authority
  const role = {
    id: roleId,
    name: userInfo.loginName,
    permissions: [{
      roleId: roleId,
      permissionId: roleId,
      permissionName: roleNameMap[roleId]
    }],
  }
  return role
}

export default roleObj