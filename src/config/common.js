export const FORMAT_TYPE = {
  'YMDHMS': 'YYYY-MM-DD HH:mm:ss'
}
// 前端密码加盐
export const PWD_SALT = '@12AQh#909';

export const UPDATE_PWD_TYPE = {
  UPDATE_PWD: 'update_pwd',//管理员修改密码
  SET_PWD: 'set_pwd'//账号设置密码
}

export const ROLE_TYPE_NAME = {
  all: '全部',
  admin: '管理员',
  operator: '操作员',
  auditor: '审计员'
}
export const ROLE_TYPE = ['all', 'admin', 'auditor', 'operator']