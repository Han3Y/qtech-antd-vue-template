import storage from 'good-storage'

/**
 * 此处定义localStorage的key
 */
export const StorageKey = {
  USER:  'user', // 用户信息
  TOKEN:'_token'
}

const StorageUtil = {
  /**
   * 存储
   * @param key
   * @param data
   */
  setKey(key, data){
    storage.set(key, data);
  },
  /**
   * 获取
   * @param key
   * @param defaultValue
   */
  getKey(key, defaultValue){
    return storage.get(key) || defaultValue;
  },
  /**
   * 删除
   * @param key
   */
  removeKey(key){
    storage.remove(key);
  }
};

export default StorageUtil;