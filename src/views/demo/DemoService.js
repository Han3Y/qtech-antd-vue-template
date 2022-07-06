import { $http } from '@/utils/request'

export const DemoService = {

  list1: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '字段1',
      value: 'key1'
    },
    {
      label: '字段2',
      value: 'key2'
    }
  ],
  /**
   * 列表查询--分页
   * @param params
   * @returns {Promise<{data: (*|*[]), pageNo: number, totalCount: *} | {data: []}>}
   */
  async getListByPage(params){
    return $http.pageList('/demo/list', params)
  },
  /**
   * 列表查询--不分页
   * @param params,详细字段注释在此声明
   * @returns {Promise<{data: (*|*[]), pageNo: number, totalCount: *} | {data: []}>}
   */
  async getListWithoutPage(params){
    return $http.get('/demo/listWithoutPage', params)
  },
  /**
   * 新增
   * @param data
   * @returns {Promise<void>}
   */
  async create(data){
    return $http.post('/demo', data);
  },
  /**
   * 编辑
   * @param data
   * @returns {Promise<void>}
   */
  async edit(data){
    return $http.put('/demo', data);
  },
  /**
   * 编辑时根据id获取
   * @param id
   * @returns {Promise<unknown>}
   */
  async getEditItemById(id){
    return $http.get(`/demo/${id}`, {

    });
  },
  /**
   * 查看时根据id获取
   * @param id
   * @returns {Promise<unknown>}
   */
  async getViewItemById(id){
    return $http.get(`/demo/view/${id}`, {

    });
  },
  /**
   * 根据id单个删除
   * @param id
   * @returns {Promise<unknown>}
   */
  async deleteSingle(id){
    return $http.del(`/demo/${id}`, {

    });
  },
  /**
   * 根据id批量删除
   * @param ids
   * @returns {Promise<unknown>}
   */
  async batchDelete(ids){
    return $http.del('/demo',{
      ids
    });
  }
}