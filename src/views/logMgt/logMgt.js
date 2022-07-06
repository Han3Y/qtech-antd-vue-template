import { $http } from '@/utils/request'

export const logMgtService = {
  getLogList(params) {
    let args = Object.assign({}, params, {
      action: 'operLookUp'
    })
    return $http.pageList('/system.cgi', args)
  }
}
export const columns = [
  {
    title: '事件主体用户姓名',
    dataIndex: 'userName',
    key: 'userName'
  },
  {
    title: '事件主体用户角色',
    dataIndex: 'authority',
    key: 'authority',
    scopedSlots: { customRender: 'authority' }
  },
  {
    title: '事件客体',
    dataIndex: 'target',
    key: 'target'
  },
  {
    title: '操作描述',
    dataIndex: 'text',
    key: 'text',
    scopedSlots: { customRender: 'text' },
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    width:170
  }
]