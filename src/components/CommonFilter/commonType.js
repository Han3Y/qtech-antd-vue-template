//协议类型
export const PROTO_TYPE_NAME = {
  all: '全部',
  modbus: 'modbus',
  opcda: 'opcda',
  ftp: 'ftp',
  pop3: 'pop3',
  smtp: 'smtp',
  telnet: 'telnet',
  http: 'http',
  pnDcp: 'pn-dcp',
  snmp: 'snmp',
  enipTcp: 'enip-tcp',
  opcua: 'opcus',
  enipIo: 'enipIo',
  s7comm: 's7comm',
  mms: 'mms',
  goose: 'goose',
  iec104: 'iec104'
}
export const PROTO_TYPE = ['all', 'modbus', 'opcda', 'ftp', 'pop3', 'smtp', 'telnet', 'http', 'pnDcp', 'snmp', 'enipTcp', 'opcua', 'enipIo', 's7comm', 'mms', 'goose', 'iec104']

//风险等级
export const RISK_TYPE_NAME = {
  all: '全部',
  high: '高',
  medium: '中',
  low: '低'
}
export const RISK_TYPE = ['all', 'high', 'medium', 'low']

//启用状态
export const STATUS_TYPE_NAME = {
  all: '全部',
  true: '已启用',
  false: '已停用'
}
export const STATUS_TYPE = ['all', 'true', 'false']

//事件类型
export const EVENT_TYPE_NAME = {
  all: '全部',
  black: '黑名单',
  defaultWhite: '白名单',
  studyWhite: '自学习白名单',
  customWhite: '自定义白名单',
  ipMAC: 'IP/MAC'
}
export const EVENT_TYPE = ['all', 'black', 'defaultWhite', 'studyWhite', 'customWhite', 'ipMAC']

//设备管理
export const SYSTEM_TYPE_NAME = {
  all: '全部',
  devManage: '设备管理',
  devPerformance: '设备性能'
}
export const SYSTEM_TYPE = ['all', 'devManage', 'devPerformance']

//动作
export const ACTION_TYPE = ['all', 'alert', 'pass']
export const ACTION_TYPE_NAME = {
  all: '全部',
  alert: '告警',
  pass: '通过'
}

