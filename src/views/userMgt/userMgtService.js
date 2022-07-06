import { $http } from '@/utils/request'

export const userMgtService = {
  /**
   * 获取用户列表
   * {Promise<{data: (*|*[]), pageNo: number, totalCount: *} | {data: []}>}
   * */
  async getUserList(params) {
    return $http.pageList('/person.cgi', params);
  },
  /**
   * 添加用户
   * */
  addUser(params) {
    return $http.post('/person.cgi', params)
  },
  /**
   * 编辑用户
   * */
  editUser(params) {
    return $http.post('/person.cgi', params)
  },
  /**
   *删除用户
   */
  delUser(params) {
    return $http.get('/person.cgi', params)
  }
}


//   [{auth:protoAudit, （协议审计）
//           key:"xxx"(0或1)}，
//           {auth：systemState，（系统状态）
//            key:"xxx"(0或1)},
// {auth：downReport，（报表统计及下载）
//            key:"xxx"(0或1)},
// {auth：queryLog，（日志查询）
//            key:"xxx"(0或1)},
// {auth：gatherFlow，（流量采集）
//            key:"xxx"(0或1)},
// {auth：getLogData，（日志导出）
//            key:"xxx"(0或1)},
// {auth：safeStrategy，（安全策略）
//            key:"xxx"(0或1)},
// {auth：deviceManage，（设备管理）
//            key:"xxx"(0或1)}
// {auth：systemInfo，（系统事件）
//            key:"xxx"(0或1)},
// {auth：operLookUp，（操作日志）
//            key:"xxx"(0或1)},
// ]
export const AUTH_LIST = {
  operator: [
    { label: '协议审计', value: 'protoAudit' },
    { label: '查看系统状态  ', value: 'systemState', disabled: true },
    { label: '报表统计及下载', value: 'downReport' },
    { label: '日志查看', value: 'queryLog', disabled: true },
    { label: '流量采集', value: 'gatherFlow' },
    { label: '日志导出', value: 'getLogData', disabled: true },
    { label: '安全策略配置', value: 'safeStrategy', disabled: true },
    { label: '设备配置', value: 'deviceManage', disabled: true }
  ],
  auditor: [
    { label: '系统事件', value: 'systemInfo', disabled: true },
    { label: '操作日志', value: 'operLookUp', disabled: true }
  ],
  admin: []
}
export const DEFAULT_LIST = {
  operator: ['systemState', 'queryLog', 'getLogData', 'deviceManage', 'safeStrategy'],
  auditor: ['systemInfo', 'operLookUp'],
  admin: []
}
export const ALL_AUTH = {
  operator: ['protoAudit', 'downReport', 'queryLog', 'gatherFlow', 'getLogData', 'safeStrategy', 'deviceManage', 'systemState'],
  auditor: ['systemInfo', 'operLookUp'],
  admin: []
}

export const ROLE_TYPE_NAME = {
  all: '全部',
  admin: '管理员',
  operator: '操作员',
  auditor: '审计员'
}
export const ROLE_TYPE = ['all', 'admin', 'auditor', 'operator']
export const columns = [
  {
    title: '用户姓名',
    dataIndex: 'userName',
    key: 'userName'
  },
  {
    title: '登录名称',
    dataIndex: 'loginName',
    key: 'loginName'
  },
  {
    title: '用户角色',
    key: 'authority',
    scopedSlots: { customRender: 'authority' }
  },
  {
    title: '上次登录时间',
    dataIndex: 'loginTime',
    key: 'loginTime',
    scopedSlots: { customRender: 'time' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
    width: 210
  }
]
